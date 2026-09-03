# abhaybhandarkar.github.io

My personal portfolio — computer vision, neurosymbolic AI, explainability and multimodal ML.

Live: https://abhaybhandarkar.github.io/

## Stack
Static site, no build step. Plain HTML + CSS + a small vanilla JS file — GitHub Pages friendly.

- `index.html` — home (hero, news, selected publications).
- `publications.html` — full publications with Main / Undergrad tabs, pagination and a Google Scholar link.
- `projects.html` — projects grid (paginated) and patents.
- `experience.html` — experience timeline.
- `blog.html` — writing.
- `css/style.css` — design system, light/dark themes, animated aurora background, responsive layout.
- `js/main.js` — theme toggle, publication tabs, scroll reveals, mobile nav, client-side pagination.
- `images/`, `pdf/` — assets.

## Develop locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```