# freedomfromfiat.com — Infrastructure Reference

> **Last updated:** 2026-08-19  
> Keep this document current whenever infrastructure changes are made.

---

## Table of Contents
1. [Domain & Registrar](#1-domain--registrar)
2. [DNS — Cloudflare](#2-dns--cloudflare)
3. [Web Hosting — GitHub Pages](#3-web-hosting--github-pages)
4. [Applications — Render](#4-applications--render)
5. [Email — Google Workspace](#5-email--google-workspace)
6. [SSL — Cloudflare](#6-ssl--cloudflare)
7. [Troubleshooting Guide](#7-troubleshooting-guide)

---

## 1. Domain & Registrar

| Property | Value |
|----------|-------|
| Domain | `freedomfromfiat.com` |
| Registrar | [NameSilo](https://www.namesilo.com) |
| Account | jon.m.normile@gmail.com |
| Nameservers | `karina.ns.cloudflare.com`, `kip.ns.cloudflare.com` |

**Important:** Since nameservers point to Cloudflare, all DNS changes must be made in Cloudflare — **not** in NameSilo. Any edits made in NameSilo's DNS panel will have no effect.

---

## 2. DNS — Cloudflare

| Property | Value |
|----------|-------|
| Account | jon.m.normile@gmail.com |
| Dashboard | [dash.cloudflare.com](https://dash.cloudflare.com) |
| Plan | Free |
| Proxy status | Enabled (orange cloud) for web records |

### DNS Records

#### A Records (GitHub Pages)
| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | 185.199.108.153 | Proxied |
| A | `@` | 185.199.109.153 | Proxied |
| A | `@` | 185.199.110.153 | Proxied |
| A | `@` | 185.199.111.153 | Proxied |

#### AAAA Records (GitHub Pages IPv6)
| Type | Name | Value | Proxy |
|------|------|-------|-------|
| AAAA | `@` | 2606:50c0:8000::153 | Proxied |
| AAAA | `@` | 2606:50c0:8001::153 | Proxied |
| AAAA | `@` | 2606:50c0:8002::153 | Proxied |
| AAAA | `@` | 2606:50c0:8003::153 | Proxied |

#### CNAME Records
| Type | Name | Value | Proxy | Purpose |
|------|------|-------|-------|---------|
| CNAME | `www` | `jon-m-normile.github.io` | Proxied | Main website |
| CNAME | `app` | `threef-dc-ops.onrender.com` | Proxied | Trading dashboard (3FPA — see §4) |

#### MX Record (Google Workspace)
| Type | Name | Value | Priority |
|------|------|-------|----------|
| MX | `@` | `SMTP.GOOGLE.COM` | 1 |

> **Note on the `app` CNAME (2026-08-19):** this table previously listed `threef-trading-dashboard.onrender.com` — that's stale. The Render service serving `app.freedomfromfiat.com` today is named `3F-Payments-App` (GitHub repo `jon-m-normile/3F-Payments-App`, branded 3FPA — see §4), confirmed by curling `app.freedomfromfiat.com/login` and seeing the 3FPA login page. It was renamed same-day from its prior display name `3f-dc-ops`; per the Render dashboard's Custom Domains panel, its `.onrender.com` subdomain stayed `threef-dc-ops.onrender.com` across the rename — renaming a Render service's display Name does not regenerate its subdomain. Cloudflare proxies this record (orange cloud), so the literal CNAME target still can't be confirmed via public DNS lookup, but the value above is confirmed correct via the Render dashboard directly (not inferred), and no Cloudflare change was needed for this rename.

#### TXT Records
| Type | Name | Value | Purpose |
|------|------|-------|---------|
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | Email SPF |
| TXT | `@` | `google-site-verification=QxfEttyaECBd75oze_vGvxxSE0kGBD6ugERyc_eA_mA` | Google Workspace domain verification |
| TXT | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArUrQ/byzVCa9WLzwEQ2xOQFNifcp8qL/QQJ1VHiQ4A92kn4cjwsJe0LigrFNpCtC/I1uUDkSh5H9Vu5jX/mp2YR6tA5EJkkE6uWrf4BBR57pFBwWVXC23neZXZDUr7td306hXOdjP9GVUuV8RqDYmPY8Ze2kkoe0F5WtdFprQolOF7+qb31R0oQg1c0yU7gHV" "Syki8hOvzLQUJ71b5TlsYg3S0cbugpIzJOuQpZWZj0ZZv4uriCJP+HhuQD6Vqivyo9C1zVUJFePNH/gR4QESvBvAF90/9ppoTor51VddUc/NEyzXqEsiR+jsSrH/WgbBe4azbtjTCTFFXNI1jksyQIDAQAB` | Google DKIM email signing |
| TXT | `_github-pages-challenge-jon-m-normile` | `b12409c00c5f72686b6c4b0f31e25e0` | GitHub Pages domain verification |

---

## 3. Web Hosting — GitHub Pages

| Property | Value |
|----------|-------|
| Repository | [jon-m-normile/freedomfromfiat.com](https://github.com/jon-m-normile/freedomfromfiat.com) |
| Branch | `main` |
| Build | Static HTML — no build step, files served directly |
| Custom domain | `freedomfromfiat.com` configured in repo Settings → Pages |

### Key files
- `index.html` — Main landing page
- `questionnaire.html` — Client validation questionnaire / waitlist signup
- `js/bootstrap.bundle.min.js` — Local Bootstrap JS
- `js/carousel_layout.js` — Custom carousel height script
- `docs/INFRASTRUCTURE.md` — This file

### Deployment
Push to `main` branch → GitHub Pages serves automatically. No GitHub Actions workflow.

---

## 4. Applications — Render

All three applications are deployed on [Render](https://render.com) and accessible via subdomain.

| Service | GitHub Repo | URL | Purpose |
|---------|-------------|-----|---------|
| 3FPA (3F Payments App, formerly 3F_DC_Ops) | [jon-m-normile/3F-Payments-App](https://github.com/jon-m-normile/3F-Payments-App) | [app.freedomfromfiat.com](https://app.freedomfromfiat.com) | Live trading desk — successor to 3F Trading Dashboard, cutover already complete (Trello card 40) as of 2026-08-19 |
| Crypto Tax Optimizer Plus | [jon-m-normile/Crypto-Tax-Optimizer-Plus](https://github.com/jon-m-normile/Crypto-Tax-Optimizer-Plus) | Render URL (https://crypto-tax-optimizer-plus.onrender.com) | Full-featured Tax Waterfall demo (v2.3.2+) |
| Crypto Tax Optimizer | [jon-m-normile/Crypto-Tax-Optimizer](https://github.com/jon-m-normile/Crypto-Tax-Optimizer) | Render URL (https://crypto-tax-optimizer.onrender.com) | Original Tax Waterfall demo |

> **3F Trading Dashboard** (`jon-m-normile/3f-trading-dashboard`) is the retired predecessor. It is no longer what serves `app.freedomfromfiat.com` — confirm in the Render dashboard whether that old service still exists/is running before assuming it's fully decommissioned.

> **Note:** Render free-tier services spin down after inactivity. First load after idle may take 30–60 seconds.

---

## 5. Email — Google Workspace

| Property | Value |
|----------|-------|
| Provider | Google Workspace |
| Admin console | [admin.google.com](https://admin.google.com) |
| Account | jon.m.normile@gmail.com |

### Active Mailboxes
| Address | Purpose |
|---------|---------|
| `jon@freedomfromfiat.com` | Primary / founder |
| `jon.m.normile@freedomfromfiat.com` | Primary / founder (alternate) |
| `info@freedomfromfiat.com` | General inquiries |
| `support@freedomfromfiat.com` | Customer support |
| `help@freedomfromfiat.com` | Customer support (alternate) |

---

## 6. SSL — Cloudflare

SSL is fully managed by Cloudflare — **no manual renewal required.**

| Property | Value |
|----------|-------|
| Certificate type | Cloudflare Universal SSL (free) |
| Auto-renewal | Yes — handled automatically by Cloudflare |
| Coverage | `freedomfromfiat.com` and `*.freedomfromfiat.com` |
| SSL mode | Full (origin server is GitHub Pages, which also has SSL) |

> **History:** Prior to April 2026, the site used a NameSilo-issued Let's Encrypt certificate which expired on April 7, 2026. Migration to Cloudflare resolved this permanently.

---

## 7. Troubleshooting Guide

### Site shows SSL/security warning in browser
Cloudflare SSL has lapsed or there's a configuration issue.
1. Log into Cloudflare → `freedomfromfiat.com` → SSL/TLS
2. Verify Universal SSL is active
3. Check SSL mode is set to **Full**

### Site is down / not resolving
1. Check [Cloudflare Status](https://www.cloudflarestatus.com)
2. Check [GitHub Status](https://www.githubstatus.com)
3. Verify A records in Cloudflare still point to GitHub Pages IPs (185.199.108-111.153)
4. Check GitHub Pages settings in repo → Settings → Pages — confirm custom domain is set

### Trading dashboard (app.freedomfromfiat.com) is down
1. Log into [Render](https://render.com) and check service status for `3F-Payments-App` (renamed from `3f-dc-ops` on 2026-08-19; subdomain `threef-dc-ops.onrender.com` stayed the same across the rename)
2. If suspended due to inactivity, restart the service
3. Verify the `app` CNAME in Cloudflare still points to `threef-dc-ops.onrender.com` (see §2 note — confirmed stable across the 2026-08-19 rename, but would need updating if the service is ever recreated rather than renamed)

### Email not delivering
1. Verify MX record in Cloudflare points to `SMTP.GOOGLE.COM` with priority 1
2. Verify SPF TXT record: `v=spf1 include:_spf.google.com ~all`
3. Check Google Workspace admin console for delivery issues

### Need to make a DNS change
- **Always make DNS changes in Cloudflare** — not NameSilo
- NameSilo nameservers have been replaced by Cloudflare; NameSilo DNS edits have no effect
- Cloudflare dashboard: [dash.cloudflare.com](https://dash.cloudflare.com) → `freedomfromfiat.com` → DNS

### Domain renewal
- Domain is registered at NameSilo — check renewal date in NameSilo account
- DNS and SSL are separate from domain registration and do not need to be renewed
