"""Local checks: python -m unittest discover -s tests -v."""
import os
import unittest
from unittest.mock import Mock, patch

import requests
from streamlit.testing.v1 import AppTest

from streamlit_contact import send_inquiry, validate_inquiry

INQUIRY = dict(name="Test Person", email="test@example.com", company="", projectType="Web Application", description="A local test of a meaningful software project.")


class ContactTests(unittest.TestCase):
    def test_validation(self):
        self.assertEqual(validate_inquiry(INQUIRY), [])
        self.assertTrue(validate_inquiry({**INQUIRY, "email": "invalid"}))
        self.assertTrue(validate_inquiry({**INQUIRY, "description": "short"}))

    def test_no_provider_does_not_send(self):
        with patch("streamlit_contact.requests.post") as post:
            self.assertFalse(send_inquiry(INQUIRY, "")[0])
            self.assertFalse(send_inquiry(INQUIRY, "http://example.com")[0])
            post.assert_not_called()

    def test_provider_confirmation_is_required(self):
        with patch("streamlit_contact.requests.post", return_value=Mock(status_code=202)) as post:
            self.assertTrue(send_inquiry(INQUIRY, "https://provider.example", "test-token")[0])
            self.assertEqual(post.call_args.kwargs["headers"]["Authorization"], "Bearer test-token")
            self.assertFalse(post.call_args.kwargs["allow_redirects"])
        with patch("streamlit_contact.requests.post", return_value=Mock(status_code=500)):
            self.assertFalse(send_inquiry(INQUIRY, "https://provider.example")[0])
        with patch("streamlit_contact.requests.post", side_effect=requests.Timeout):
            self.assertFalse(send_inquiry(INQUIRY, "https://provider.example")[0])


class AppTests(unittest.TestCase):
    def test_renders_and_disables_unconfigured_form(self):
        with patch.dict(os.environ, {"CONTACT_FORM_ENDPOINT": ""}):
            app = AppTest.from_file("streamlit_app.py", default_timeout=20).run()
            self.assertEqual(len(app.exception), 0)
            self.assertTrue(app.button[0].disabled)
            self.assertEqual(len(app.header), 6)

    def test_form_validation_and_confirmed_submission(self):
        with patch.dict(os.environ, {"CONTACT_FORM_ENDPOINT": "https://provider.example"}):
            app = AppTest.from_file("streamlit_app.py", default_timeout=20).run()
            app.button[0].click().run()
            self.assertGreater(len(app.error), 0)
            app.text_input[0].set_value(INQUIRY["name"])
            app.text_input[1].set_value(INQUIRY["email"])
            app.selectbox[0].select(INQUIRY["projectType"])
            app.text_area[0].set_value(INQUIRY["description"])
            app.checkbox[0].check()
            with patch("streamlit_contact.requests.post", return_value=Mock(status_code=200)) as post:
                app.button[0].click().run()
                self.assertEqual(len(app.exception), 0)
                self.assertEqual(len(app.success), 1)
                post.assert_called_once()
            app.session_state["contact_attempts"] = [__import__('time').monotonic()] * 5
            with patch("streamlit_contact.requests.post") as post:
                app.button[0].click().run()
                self.assertIn("Too many attempts", app.error[0].value)
                post.assert_not_called()


if __name__ == "__main__":
    unittest.main()
