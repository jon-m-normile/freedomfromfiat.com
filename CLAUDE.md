# freedomfromfiat.com — Marketing Site

## Deployment
- Hosted on **GitHub Pages** via the `main` branch of `jon-m-normile/freedomfromfiat.com`.
- Changes pushed to `main` go live automatically within ~1 minute.
- Custom domain: `freedomfromfiat.com` (CNAME file in repo root).

## Page Structure
| File | Purpose |
|---|---|
| `index.html` | Main marketing/landing page |
| `demo.html` | Public Tax Optimizer demo (embeds Crypto-Tax-Optimizer via iframe) |
| `trading.html` | Static login page for the trading dashboard |
| `plus.html` | Embeds the private Crypto-Tax-Optimizer-Plus app via iframe |
| `waitlist.html` | Waitlist signup form |
| `questionnaire.html` | User questionnaire |

## Login Flow
- Login buttons on `index.html` link to `trading.html` (static page — loads instantly).
- `trading.html` renders the login form immediately and silently polls `https://app.freedomfromfiat.com/health` every 2 seconds in the background.
- On form submit: if Render is awake, the form POSTs directly to `https://app.freedomfromfiat.com/login`. If not yet awake, the form is held and submitted automatically once `/health` returns 200.
- Do NOT link login buttons directly to `app.freedomfromfiat.com` — this wakes Render before the user even types credentials.

## Demo iframe
- `demo.html` embeds `https://crypto-tax-optimizer.onrender.com` (public version, no password).
- `plus.html` embeds `https://crypto-tax-optimizer-plus.onrender.com` (private, password protected).

## Key Decisions
- `plus.html` is not linked from any public page — access by direct URL only.
- Legal disclaimer in footer: services not yet available, nothing is financial advice.
