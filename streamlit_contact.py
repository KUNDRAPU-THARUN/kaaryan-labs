"""Server-side contact adapter for Streamlit. Never logs inquiry data or tokens."""
from __future__ import annotations

import re
from urllib.parse import urlsplit

import requests

PROJECT_TYPES = ["Web Application", "Mobile Application", "AI / Automation", "SaaS Platform", "Custom Software", "Partnership", "Other"]


def validate_inquiry(data: dict) -> list[str]:
    errors = []
    name = data.get("name", "")
    email = data.get("email", "")
    company = data.get("company", "")
    description = data.get("description", "")
    if not isinstance(name, str) or not name.strip() or len(name) > 120:
        errors.append("Enter your full name (up to 120 characters).")
    if not isinstance(email, str) or len(email) > 254 or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        errors.append("Enter a valid email address.")
    if not isinstance(company, str) or len(company) > 160:
        errors.append("Company name must be at most 160 characters.")
    if data.get("projectType") not in PROJECT_TYPES:
        errors.append("Choose a project type.")
    if not isinstance(description, str) or not 20 <= len(description.strip()) <= 5000:
        errors.append("Describe your project in 20–5,000 characters.")
    return errors


def send_inquiry(data: dict, endpoint: str, api_key: str = "") -> tuple[bool, str]:
    errors = validate_inquiry(data)
    if errors:
        return False, " ".join(errors)
    if not endpoint:
        return False, "The contact service is not configured. Your inquiry has not been sent."
    parsed = urlsplit(endpoint)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
        return False, "The contact service requires a valid HTTPS endpoint. Your inquiry has not been sent."
    headers = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    try:
        response = requests.post(endpoint, json={key: value.strip() for key, value in data.items()}, headers=headers, timeout=10, allow_redirects=False)
        if 200 <= response.status_code < 300:
            return True, "Your inquiry has been received. Thank you for sharing your project with Kaaryan Labs."
        return False, "The contact service could not accept your inquiry. Please try again later."
    except requests.RequestException:
        return False, "The contact service is temporarily unavailable. Your submission could not be confirmed."
