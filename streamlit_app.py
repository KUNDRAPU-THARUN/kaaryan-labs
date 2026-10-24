"""Kaaryan Labs website — run with: python -m streamlit run streamlit_app.py."""
from datetime import datetime
from pathlib import Path
import os
import time
from zoneinfo import ZoneInfo

from dotenv import load_dotenv
import streamlit as st

from streamlit_contact import PROJECT_TYPES, send_inquiry, validate_inquiry

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / ".env.local")
st.set_page_config(page_title="Kaaryan Labs — From Problem to Possibility", page_icon=str(ROOT / "kaaryan-logo-primary.jpeg"), layout="wide", initial_sidebar_state="collapsed")


def setting(name: str) -> str:
    value = os.getenv(name)
    if value is not None:
        return value
    try:
        return str(st.secrets.get(name, ""))
    except FileNotFoundError:
        return ""


def section(number: str, title: str, anchor: str):
    st.space("large")
    st.caption(number)
    st.header(title, anchor=anchor)


links = [("Home", "home"), ("About", "about"), ("Divisions", "divisions"), ("Expertise", "expertise"), ("Our Process", "process"), ("Contact", "contact")]
with st.container(horizontal=True, vertical_alignment="center", horizontal_alignment="distribute"):
    st.image(str(ROOT / "kaaryan-logo-horizontal.jpeg"), width=105)
    st.markdown(" · ".join(f"[{title}](#{anchor})" for title, anchor in links))
    st.link_button("Start a Project ↗", "#contact", type="primary")
with st.sidebar:
    st.image(str(ROOT / "kaaryan-logo-primary.jpeg"), width=110)
    st.markdown("### Explore Kaaryan Labs")
    for title, anchor in links:
        st.markdown(f"[{title}](#{anchor})")

left, right = st.columns([1.2, 1], gap="large", vertical_alignment="center")
with left:
    st.caption("RESEARCH-DRIVEN. SOFTWARE-FOCUSED.")
    st.title("FROM PROBLEM\nTO :blue[POSSIBILITY.]", anchor="home")
    st.subheader("We Research. We Engineer. We Build Software.")
    st.write("Kaaryan Labs is a research-driven software company transforming real-world challenges into purposeful digital products and customized software solutions.")
    with st.container(horizontal=True):
        st.link_button("Start a Project ↗", "#contact", type="primary")
        st.link_button("Explore Our Expertise →", "#expertise")
    st.caption("Good software starts with the right questions.")
with right:
    with st.container(border=True):
        st.caption("THE POSSIBILITY ENGINE / CONCEPTUAL SOFTWARE WORKFLOW")
        st.markdown("#### :material/search: A real-world problem")
        st.caption("↓ UNDERSTAND · RESEARCH · VALIDATE")
        st.code('possibility = build(\n    insight=research,\n    approach="purposeful",\n    impact=True,\n)', language="python")
        st.caption("↓ DESIGN · ENGINEER · IMPROVE")
        st.markdown("#### :material/layers: Software with purpose")
        st.caption("Built on understanding. Designed to make a difference.")

section("01 / WHO WE ARE", "Technology Begins With Understanding.", "about")
st.write("We are a software innovation company built around solving meaningful problems through research and engineering. Before we write a line of code, we ask a better question. We understand the context, validate the need and build software with a clear purpose.")
for column, (title, description) in zip(st.columns(3, gap="medium"), [
    ("Our mission", "Solve meaningful problems through thoughtful software research and engineering."),
    ("Our vision", "A future where purposeful software makes everyday work and life better."),
    ("Our purpose", "Bridge the space between a real-world challenge and a digital possibility."),
]):
    with column.container(border=True, height="stretch"):
        st.subheader(title)
        st.write(description)
st.caption("OUR PHILOSOPHY / Understand the Problem → Research → Validate → Design → Engineer → Test → Deploy → Improve")

section("02 / WHAT WE BUILD", "One Company. Two Software Divisions.", "divisions")
divisions = [
    ("DIVISION A", ":material/deployed_code:", "Proprietary Software Products", "We independently research, design and develop scalable digital products that solve validated real-world problems.", "SaaS applications · AI-powered software · Web & mobile apps · Digital platforms · Productivity & automation"),
    ("DIVISION B", ":material/code:", "Custom Software Solutions", "We collaborate with organizations to create secure, scalable and tailored software solutions for their unique challenges.", "Custom applications · Enterprise software · AI integrations · Databases & APIs · Integration & modernization"),
]
for column, (label, icon, title, description, tags) in zip(st.columns(2, gap="medium"), divisions):
    with column.container(border=True, height="stretch"):
        st.caption(label)
        st.subheader(f"{icon} {title}")
        st.write(description)
        st.caption(tags)
        st.link_button("Let’s explore your idea ↗", "#contact")

section("03 / OUR EXPERTISE", "Engineering Software That Solves Real Problems.", "expertise")
services = [
    ("language", "Web Application Development", "Fast, accessible web experiences built around the way your users work."),
    ("smartphone", "Mobile Application Development", "Thoughtful mobile software that brings useful experiences closer to people."),
    ("auto_awesome", "AI & Intelligent Automation", "Practical intelligence and automation for complex, repetitive workflows."),
    ("layers", "SaaS Product Engineering", "From validated idea to a scalable, maintainable software platform."),
    ("database", "Backend Systems & APIs", "Reliable foundations that connect your data, services and applications."),
    ("domain", "Custom Enterprise Software", "Purpose-built systems that fit your organization and evolve with it."),
]
for offset in range(0, len(services), 3):
    for column, (icon, title, description) in zip(st.columns(3, gap="medium"), services[offset:offset + 3]):
        with column.container(border=True, height="stretch"):
            st.markdown(f"### :material/{icon}: {title}")
            st.write(description)

section("04 / THE WAY WE WORK", "From Research to Real-World Impact.", "process")
steps = [
    ("Discover", "Listen closely. Define the real problem and the people it affects."),
    ("Research", "Explore the context, constraints and possibilities."),
    ("Validate", "Test assumptions before investing in a solution."),
    ("Design", "Turn insights into clear, human-centered experiences."),
    ("Engineer", "Build with deliberate architecture and maintainable code."),
    ("Test & Secure", "Verify behavior, performance and security."),
    ("Deploy", "Release thoughtfully with operational readiness."),
    ("Improve", "Learn from real usage. Refine what matters."),
]
for offset in (0, 4):
    for index, (column, (title, description)) in enumerate(zip(st.columns(4), steps[offset:offset + 4]), offset + 1):
        with column.container(border=True, height="stretch"):
            st.caption(f"{index:02} →")
            st.markdown(f"### {title}")
            st.write(description)
st.caption("A continuous cycle of learning and building.")

section("05 / OUR PRINCIPLES", "Built on Research. Driven by Purpose.", "principles")
principles = [
    ("Research First", "Evidence before assumptions. Understanding before implementation."),
    ("Meaningful Innovation", "Progress measured by the problems we help solve."),
    ("Software Quality", "Clear architecture, considered code and rigorous testing."),
    ("Security & Reliability", "Protection and resilience considered from the beginning."),
    ("Human-Centered Design", "Real people at the center of every experience."),
    ("Continuous Improvement", "Listen, learn and make the next iteration better."),
]
for offset in (0, 3):
    for column, (title, description) in zip(st.columns(3), principles[offset:offset + 3]):
        with column.container(border=True, height="stretch"):
            st.markdown(f"#### {title}")
            st.write(description)

section("06 / LET’S START A CONVERSATION", "Have a Problem Worth Solving?", "contact")
st.write("Tell us about your idea or software challenge. Let's explore how thoughtful engineering can turn it into a meaningful solution.")
endpoint = setting("CONTACT_FORM_ENDPOINT")
if not endpoint:
    st.info("Project inquiries are not available yet. The contact service is awaiting configuration.", icon=":material/info:")
with st.form("project_inquiry", clear_on_submit=False):
    first, second = st.columns(2)
    name = first.text_input("Full name *", max_chars=120, autocomplete="name")
    email = second.text_input("Email address *", max_chars=254, autocomplete="email")
    first, second = st.columns(2)
    company = first.text_input("Company / organization (optional)", max_chars=160)
    project_type = second.selectbox("Project type *", PROJECT_TYPES, index=None, placeholder="Select a project type")
    description = st.text_area("Project description *", max_chars=5000, height=150, placeholder="What problem are you looking to solve? (At least 20 characters)")
    human = st.checkbox("I am submitting a genuine project inquiry.")
    st.caption("We use the information you share to respond to your inquiry. Please do not include sensitive or confidential information.")
    submitted = st.form_submit_button("Send Project Inquiry ↗", type="primary", disabled=not bool(endpoint))

if submitted:
    data = dict(name=name, email=email, company=company, projectType=project_type, description=description)
    errors = validate_inquiry(data)
    if not human:
        errors.append("Please confirm that this is a genuine project inquiry.")
    if errors:
        for error in errors:
            st.error(error)
    else:
        now = time.monotonic()
        attempts = [stamp for stamp in st.session_state.get("contact_attempts", []) if now - stamp < 600]
        if len(attempts) >= 5:
            st.error("Too many attempts. Please wait ten minutes before trying again.")
        else:
            st.session_state.contact_attempts = [*attempts, now]
            with st.spinner("Sending your inquiry…"):
                success, message = send_inquiry(data, endpoint, setting("CONTACT_FORM_API_KEY"))
            if success:
                st.success(message)
            else:
                st.error(message)

st.space("large")
with st.container(border=True):
    st.markdown("### KAARYAN LABS")
    st.caption("FROM PROBLEM TO POSSIBILITY")
    st.write("Software Products & Solutions")
    st.markdown(" · ".join(f"[{title}](#{anchor})" for title, anchor in links))
    st.caption(f"© {datetime.now(ZoneInfo('Asia/Kolkata')).year} Kaaryan Labs. All rights reserved.")
