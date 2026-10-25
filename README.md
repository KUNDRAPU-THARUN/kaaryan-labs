# Kaaryan Labs

A Kaaryan Labs website available as a native Streamlit app and a Next.js implementation. Both use the original supplied logos.

The reference-driven design is implemented in **Next.js** and runs with `npm run dev`. The earlier native Streamlit version remains available separately.

## Reference design and visual checks

`design/website-reference.png` preserves the supplied reference. `src/components/sections.tsx` implements its hero, capability strip, About, divisions, expertise, workflow, principles, contact and footer. Navigation, form behavior and Motion scroll reveals are separate components. All fonts and artwork are served locally.

The hero/studio images and division artwork are isolated crops of the image you supplied; no page screenshot is embedded as a website. The environment images are concepts, not claims about a physical office. The two original JPEGs are unchanged. `scripts/prepare-reference-assets.mjs` trims only surrounding whitespace to create display-ready logo assets. The file named `primary` contains the horizontal lockup; the file named `horizontal` contains the stacked design.

Intentional differences from the reference: truthful positioning labels replace invented statistics, five capability labels replace unverified customer endorsements, no unconfigured social accounts or legal links are shown, and the form includes a required Project Type field and privacy/configuration messaging. The footer preserves the original black logo on a white tile. “Insights” navigates to the principles section rather than invented articles. The contact block is taller to accommodate real form states and notices. This is a close reference implementation, not a claim of pixel-perfect identity.

With the Next.js server running, run:

```sh
node scripts/visual-check.mjs
```

The browser check discovers installed Chrome on Windows, macOS or Linux (override `CHROME_PATH` for another location), falling back to Playwright Chromium. If neither browser is installed, run `npx playwright install chromium`. It writes desktop/mobile screenshots and a report under `design/qa/`. It checks eight widths from 320px to 1920px, horizontal overflow, headline clipping, mobile menu/Escape/focus behavior, anchor targets, form validity and browser errors. Set `TEST_BASE_URL` if the server runs on another port. Screenshots at 1122px and 375px were directly reviewed against the supplied reference; saved screenshots use reduced motion to show every section. You can also run `npm run test:visual` and `npm run test:smoke`.

## Run with Streamlit

On this Windows machine, run the included launcher from the project directory:

```powershell
.\run-streamlit.cmd
```

It uses the project's `.venv` when available, then your existing Anaconda Python. The direct command for your current installation is:

```powershell
& "$env:USERPROFILE\anaconda3\python.exe" -m streamlit run streamlit_app.py
```

Open http://127.0.0.1:8501. Stop the server with Ctrl+C. No Node.js process is required for the Streamlit version.

On another machine with Python 3.11 or newer:

```sh
python -m pip install -r requirements.txt
python -m streamlit run streamlit_app.py
```

`streamlit_app.py` contains all sections and a native Streamlit form. `.streamlit/config.toml` defines the light brand theme, local Geist font, and port. The layout uses Streamlit's responsive containers and navigation links rather than the Next.js sticky navigation and animation system.

The Streamlit contact form reads the same `CONTACT_FORM_ENDPOINT` and optional `CONTACT_FORM_API_KEY` from `.env.local`, environment variables, or `.streamlit/secrets.toml`. Set these as top-level string values in Streamlit Community Cloud secrets when deploying there. `streamlit_contact.py` validates and submits on the Python server; no Next.js API is required. Provider 2xx responses must confirm acceptance. The form is disabled when no endpoint is configured.

Spam safeguards include an inquiry confirmation and a five-attempt, ten-minute session limit. The session limit is a local safeguard and can be bypassed by starting a new session; use provider-side abuse protection and hosting limits before public deployment. No inquiry is stored locally. The original Next.js route's honeypot and IP limiter do not apply to Streamlit.

## Run with Next.js

Requires Node.js 20.9 or newer. On Windows PowerShell use `npm.cmd` if execution policy blocks `npm`.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For production, run `npm run build` followed by `npm start`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

With the dev server running and no contact provider configured, `node scripts/smoke-test.mjs` checks the rendered sections, logo assets, server validation, spam controls, malformed/oversized payloads and missing-provider behavior. It simulates isolated test addresses so repeated checks do not exhaust the normal local visitor's submission limit. Run this test only against a local or dedicated test instance.

## Contact configuration

Copy `.env.example` to `.env.local`. Set `CONTACT_FORM_ENDPOINT` to an HTTPS provider endpoint accepting JSON fields `name`, `email`, `company`, `projectType`, and `description`. Optionally set `CONTACT_FORM_API_KEY` for server-side bearer authentication. Choose a provider whose 2xx response confirms acceptance; adapt `src/app/api/contact/route.ts` if the provider uses a different payload or response contract. Never put secrets in `NEXT_PUBLIC_` variables.

Until a provider is configured, the page explicitly explains that inquiries are unavailable, submission is disabled, and the endpoint returns 503 for valid inquiries. No inquiry is stored locally. Configure `SITE_URL` with the real deployment origin to make Open Graph image URLs absolute.

The route validates fields on the server, rejects cross-origin browser submissions, limits payload size, includes a honeypot, times out provider requests, and limits attempts to five per ten minutes per address. The in-memory limiter is a local/single-instance safeguard. Before multi-instance production hosting, use a shared limiter or hosting-edge rules and ensure the reverse proxy overwrites `x-forwarded-for` with a trusted client address. Provider privacy/retention settings must match your actual policy.

The original JPEG logos are retained unmodified in `public/brand`. The whitespace-trimmed WebP derivatives preserve the original artwork proportions. The primary JPEG is also used as the favicon.

## Structure

- `src/app/page.tsx`: section composition
- `src/components/sections.tsx`: reference-driven sections
- `src/app/globals.css`: responsive visual system and reduced-motion behavior
- `src/components`: navigation, contact form and progressive scroll reveals
- `src/lib/content.ts`: navigation, expertise, process and project options
- `src/app/api/contact/route.ts`: server-only submission adapter

No hosting deployment, analytics, invented contact details, or external font requests are included.
