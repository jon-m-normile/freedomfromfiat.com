# Freedom From Fiat Website Package

Complete website files for freedomfromfiat.com, ready to deploy to GitHub Pages.

## Files Included

| File | Description |
|------|-------------|
| `index.html` | Homepage with hero, features, how it works, tax optimization section |
| `waitlist.html` | Email signup form with success state |
| `demo.html` | Tax Optimizer demo page (placeholder until Streamlit deployed) |
| `questionnaire.html` | Full 33-question client validation survey with conditional logic |

## Quick Start (Claude Code)

```bash
# 1. Clone your repo
git clone https://github.com/YOUR_USERNAME/freedomfromfiat.com
cd freedomfromfiat.com

# 2. Copy all HTML files to the repo root
# (files are in /mnt/user-data/outputs/)

# 3. Commit and push
git add .
git commit -m "New website design with questionnaire"
git push origin main
```

## Features

### Homepage (index.html)
- Clean, modern design inspired by Kraken/Coinbase
- Fixed navigation with logo
- Hero section with "Launching 2026" badge
- 4-card features grid (Self-Custody, Tax Engine, Spend Anywhere, IRS-Ready)
- "How It Works" 4-step process
- Tax Optimization section with dark background
- Responsive design (mobile-friendly)

### Waitlist (waitlist.html)
- Email capture form with name field
- Consent checkbox
- Success state with animation
- Links to questionnaire after signup
- **TODO**: Connect to backend (Google Forms, Formspree, or Apps Script)

### Demo (demo.html)
- Placeholder for Streamlit Tax Optimizer
- Information cards explaining:
  - How the tax optimization algorithm works
  - Demo features
- CTA to join waitlist
- **TODO**: Deploy Streamlit app and update `STREAMLIT_URL` in the script

### Questionnaire (questionnaire.html)
- All 33 questions from the PDF
- 9-step multi-page flow with progress bar
- Conditional logic:
  - Q3 = "No" OR Q6 ≠ "discretionary/household" → disqualification screen
- Question types:
  - Radio buttons (single select)
  - Checkboxes (multi-select)
  - Text inputs
  - Number inputs
  - Range sliders (1-10 scales, percentages)
  - Dropdowns (country, state)
- "Other" options show text input when selected
- US state dropdown appears when "United States" selected
- **TODO**: Connect to backend for form submissions

## Design System

### Colors
- Primary: `#5046e5` (purple)
- Accent: `#00d4aa` (teal)
- Dark: `#0f0f0f`
- Gray scale: `#1a1a1a`, `#374151`, `#6b7280`, `#d1d5db`, `#f3f4f6`

### Typography
- Headlines: Space Grotesk (600, 700)
- Body: Inter (400, 500, 600, 700)
- Both loaded from Google Fonts

### Components
- Cards with 16px border-radius, subtle shadows
- Buttons with 10px border-radius, hover lift effect
- Progress bar with gradient fill
- Form inputs with focus states

## Next Steps

### 1. Deploy Website
Upload all HTML files to your GitHub repo and enable GitHub Pages.

### 2. Connect Form Backends
Options for waitlist and questionnaire forms:
- **Formspree**: Easy, free tier available
- **Google Forms/Sheets**: Free, integrates with your existing setup
- **Custom Apps Script**: Most control, already familiar with

### 3. Deploy Streamlit Demo
```bash
# Install Streamlit CLI
pip install streamlit

# Deploy to Streamlit Cloud
streamlit run app.py
```
Then update `STREAMLIT_URL` in demo.html.

### 4. Add Analytics
Consider adding:
- Google Analytics 4
- Plausible (privacy-focused)
- Hotjar (heatmaps)

### 5. Domain Configuration
Your DNS should already be configured from earlier work:
- 4 A records → GitHub Pages IPs (185.199.108-111.153)
- CNAME www → your-username.github.io

## File Structure for GitHub

```
freedomfromfiat.com/
├── index.html
├── waitlist.html
├── demo.html
├── questionnaire.html
├── img/
│   ├── cardtoinspire.png    (recovered from Wayback)
│   ├── fiatmerchant.png     (recovered from Wayback)
│   └── takecustody.png      (recovered from Wayback)
├── css/                      (optional, currently inline)
└── js/                       (optional, currently inline)
```

## Notes

- All CSS is inline for easy single-file deployment
- All JS is inline at the bottom of each file
- No external dependencies except Google Fonts
- Responsive breakpoint at 640px for mobile
- Forms log to console (connect backend to actually capture data)
