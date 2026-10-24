# Kaaryan Labs

A Kaaryan Labs website available as a native Streamlit app and a Next.js implementation. Both use the original supplied logos.

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

With the dev server running and no contact provider configured, `node scripts/smoke-test.mjs` checks the rendered sections, logo assets, server validation, spam controls and missing-provider behavior. It intentionally exhausts the local ten-minute submission limit; restart the dev server before repeating it.

## Contact configuration

Copy `.env.example` to `.env.local`. Set `CONTACT_FORM_ENDPOINT` to an HTTPS provider endpoint accepting JSON fields `name`, `email`, `company`, `projectType`, and `description`. Optionally set `CONTACT_FORM_API_KEY` for server-side bearer authentication. Choose a provider whose 2xx response confirms acceptance; adapt `src/app/api/contact/route.ts` if the provider uses a different payload or response contract. Never put secrets in `NEXT_PUBLIC_` variables.

Until a provider is configured, the page explicitly explains that inquiries are unavailable, submission is disabled, and the endpoint returns 503 for valid inquiries. No inquiry is stored locally. Configure `SITE_URL` with the real deployment origin to make Open Graph image URLs absolute.

The route validates fields on the server, rejects cross-origin browser submissions, limits payload size, includes a honeypot, times out provider requests, and limits attempts to five per ten minutes per address. The in-memory limiter is a local/single-instance safeguard. Before multi-instance production hosting, use a shared limiter or hosting-edge rules and ensure the reverse proxy overwrites `x-forwarded-for` with a trusted client address. Provider privacy/retention settings must match your actual policy.

The original JPEG logos are retained unmodified in `public/brand`. Both supplied files have square canvases; they are displayed with their original aspect ratios. The primary image is also used as the favicon. The software visuals illustrate the approach and do not represent shipped products.

## Structure

- `src/app/page.tsx`: all nine landing-page sections
- `src/app/globals.css`: responsive visual system and reduced-motion behavior
- `src/components`: navigation, contact form and progressive scroll reveals
- `src/lib/content.ts`: navigation, expertise, process and project options
- `src/app/api/contact/route.ts`: server-only submission adapter

No hosting deployment, analytics, invented contact details, or external font requests are included.
