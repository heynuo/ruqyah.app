# Ruqyah — Personal Website, Technical Hub & Quranic Library

[![GitHub Repository](https://img.shields.io/badge/GitHub-heynuo%2FRuqyah.io-181717?style=for-the-badge&logo=github)](https://github.com/heynuo/Ruqyah.io)
[![Live Site](https://img.shields.io/badge/Live%20Website-heynuo.github.io-blue?style=for-the-badge&logo=github)](https://heynuo.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](js/script.js)
[![HTML5 & CSS3](https://img.shields.io/badge/Stack-HTML5%20%2F%20CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)](css/style.css)
[![Tracker Free](https://img.shields.io/badge/Privacy-100%25%20Tracker--Free-success?style=for-the-badge)](privacy.html)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-purple?style=for-the-badge)](manifest.json)

> **Ruqyah** is a fast, 100% tracker-free static website and knowledge base featuring clean tutorials on Java Object-Oriented Programming, accessible web development guides, and an authentic Quran reference library with streaming recitation.

---

## 🌐 Live Website & Mirrors

- **Site Link:** [https://github.com/heynuo/Ruqyah.io](https://heynuo.github.io/Ruqyah.io/)
- **Quran Audio Library & PDFs:** [https://heynuo.github.io/quran.html](https://heynuo.github.io/quran.html)
- **108 Master Verses Compilation:** [https://heynuo.github.io/quran-verses.html](https://heynuo.github.io/quran-verses.html)
- **Privacy & Source Disclosures:** [https://heynuo.github.io/privacy.html](https://heynuo.github.io/privacy.html)
- **RSS 2.0 Feed:** [https://heynuo.github.io/rss.xml](https://heynuo.github.io/rss.xml)

---

## ✨ Features & Architecture

- **100% Tracker-Free & Privacy First:**
  - Zero Google Analytics, Facebook Pixel, telemetry, or marketing cookies.
  - Transparent `localStorage` usage documented on [`privacy.html`](privacy.html).
  - Direct mailto dispatch with formatted clipboard copying — zero third-party form processors.

- **Resilient Static & No-JS Architecture:**
  - All scripture verse cards are pre-rendered directly in HTML with full Arabic (`lang="ar" dir="rtl"`), transliteration, translation, and scholarly source tags.
  - Full content is readable with JavaScript disabled; client-side JS only progressively enhances audio streaming and instant filtering.
  - Multi-tier audio fallback: Primary streams with automatic fallback to EveryAyah mirrors.

- **Dual-Theme & Modern Aesthetic:**
  - Sleek dark and light themes with smooth transitions and system preference detection (`prefers-color-scheme`).
  - Glassmorphic panels, ambient lighting canvases, and responsive card grids.
  - Accessible typography with Google Fonts (*Plus Jakarta Sans*, *Inter*, *Amiri* for Arabic calligraphy, and *Merriweather*).

- **WCAG 2.2 AA Accessibility & Keyboard Shortcuts:**
  - Full command palette (`Ctrl + K` or `/`).
  - Single-key shortcuts (`T` for theme, `H` for home, `A` for about, `C` for contact, `Space` for audio playback, `V` for player toggle) with a user toggle in the shortcuts dialog conforming strictly to **WCAG 2.1.4**.
  - Visible focus rings, skip-to-content links, and semantic landmark roles.

- **Offline Progressive Web App (PWA):**
  - Web App Manifest (`manifest.json`) with app shortcuts and theme colors.
  - Cache-first Service Worker (`sw.js`) that caches core pages, CSS, and UI assets for offline study.

- **Performance & Responsive Engineering:**
  - Global styles ship as one flattened `css/heynuo.css` bundle instead of a 29-request `@import` waterfall (regenerate with `tools/build-css.ps1`).
  - Banners use responsive `srcset`: `tools/optimize-images.ps1` generates compact 800px variants that the browser picks per viewport and pixel density.
  - Card grids use `minmax(0, 1fr)` tracks and height-only `contain-intrinsic-size`, so off-screen cards can never inflate a track and clip content on phones.

---

## 📂 Project Structure

```text
heynuo.github.io/
├── index.html                   # Homepage (featured articles, stats, search, audio preview)
├── quran.html                   # Complete 114 Surahs audio library and King Fahd Mushaf PDFs
├── quran-verses.html            # Master compilation of 108 Quranic verses from 62 books
├── about.html                   # Bio, journey, technical values, and background
├── contact.html                 # Direct privacy-first contact & interactive subject helper
├── privacy.html                 # Privacy policy, local storage disclosure, and source citations
├── 404.html                     # Custom accessible 404 error page with quick jump links
├── manifest.json                # Progressive Web App manifest
├── sw.js                        # Service worker with static cache-first offline strategy
├── rss.xml                      # RSS 2.0 syndication feed for all articles & guides
├── sitemap.xml                  # XML sitemap with accurate lastmod dates
├── robots.txt                   # Search engine crawl rules
├── LICENSE                      # MIT Open Source License
├── README.md                    # Project documentation
├── css/
│   ├── heynuo.css               # GENERATED: single-file bundle every page links to (do not hand-edit)
│   ├── style.css                # Bundle manifest: lists the partial import order for build-css.ps1
│   ├── partials/                # Modular design-system sources merged into heynuo.css
│   ├── home.css                 # Home-specific layouts, typewriter, and interactive grid
│   ├── about.css                # About page hero, timeline, and value-section refinements
│   ├── contact.css              # Contact page layout, presence clock, and topic pills
│   ├── quran.css                # Surah search, playlist, and PDF grid styles
│   ├── quran-player.css         # Persistent bottom audio recitation bar
│   └── master-verses.css        # 108 verses view modes and bookmarking styles
├── buttons.js                   # Shared button/UI enhancement behaviours (root-level, linked by all pages)
├── js/
│   ├── script.js                # Theme engine, command palette, shortcuts modal, mailto copier
│   ├── quran-player.js          # Persistent audio streaming engine with mirror failover
│   ├── quran-page.js            # 114 Surahs controller, audio routing, and PDF reader
│   ├── master-verses.js         # 108 verses controller, search, and bookmarking
│   └── data/                    # Structured datasets separated from controller logic
│       └── master-verses-data.js# Dataset of 108 verses from 62 classical sources
├── assets/
│   ├── banners/                 # Optimized OpenGraph banners (1200x630, webp/jpg)
│   └── icons/                   # Crisp UI graphics, theme icons, and metadata
└── tools/                       # Maintenance and automation toolchain
    ├── build-css.ps1            # Flattens css/partials into the single css/heynuo.css bundle
    ├── stamp-build.ps1          # Writes the release build stamp used by the service worker cache
    ├── optimize-images.ps1      # Generates downscaled -800.jpg variants used by the srcset markup
    ├── check-css.ps1            # CSS structure validator (balanced braces, unterminated strings)
    ├── validate-site.ps1        # Site integrity validator (links, assets, schemas)
    ├── sync-components.ps1      # Component stamping script for headers, footers & modals
    ├── serve.ps1                # Local static preview server
    └── components/              # Canonical HTML component templates
        ├── header.html          # Standard navigation with crisp inline SVGs
        ├── footer.html          # Standard footer with GitHub & shortcut triggers
        └── shortcuts-modal.html # WCAG 2.1.4 compliant accessible shortcuts dialog
```

---

## ✍️ How to Add a New Article

Adding a new article to Ruqyah takes four simple steps:

### 1. Create the HTML File
Create your new page (e.g. `hadith-science-guide.html`) using `about.html` as a template:
- Include the shared `<header>` navigation and standard `<footer>`.
- Include `<link rel="manifest" href="manifest.json">` and the RSS link in `<head>`.
- Set OpenGraph metadata (`og:title`, `og:description`, `og:image`).
- Add a table of contents `<nav class="article-toc-box">` and pagination links (`<nav class="article-pagination-nav">`).
- Add the shortcuts modal markup before `</body>`.

### 2. Register in `js/script.js`
Open `js/script.js` and add an entry to the `POSTS` array:
```javascript
{
  title: "Principles of Hadith Verification & Sanad Analysis",
  url: "hadith-science-guide.html",
  category: "Theology",
  date: "Oct 15, 2026",
  readTime: "10 min read",
  description: "Critical analysis of chain transmission, narrator verification, and grading methodology.",
  tags: ["hadith", "theology", "isnad", "scholarship"]
}
```
This automatically wires the new article into the **Command Palette (`Ctrl + K`)**, instant live search, category filters, and preview modals.

### 3. Update `rss.xml`
Add a `<item>` entry to `rss.xml`:
```xml
<item>
  <title>Principles of Hadith Verification &amp; Sanad Analysis</title>
  <link>https://heynuo.github.io/hadith-science-guide.html</link>
  <guid>https://heynuo.github.io/hadith-science-guide.html</guid>
  <pubDate>Thu, 15 Oct 2026 00:00:00 GMT</pubDate>
  <description>Critical analysis of chain transmission, narrator verification, and grading methodology.</description>
  <category>Theology</category>
</item>
```

### 4. Update `sitemap.xml`
Add a `<url>` block with the current date:
```xml
<url>
  <loc>https://heynuo.github.io/hadith-science-guide.html</loc>
  <lastmod>2026-10-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 🛠️ Tech Stack & Philosophy

| Layer | Implementation | Notes |
|---|---|---|
| **Structure** | Semantic HTML5 | Validated markup with ARIA landmarks & JSON-LD schema |
| **Styling** | Vanilla CSS3 | Modular CSS Custom Properties, no Tailwind, zero build overhead |
| **Typography** | Google Fonts | Amiri, Plus Jakarta Sans, Inter, Merriweather (`display=swap`) |
| **Scripting** | Vanilla ES6+ | Zero npm dependencies, no jQuery, lightweight modular controllers |
| **Offline** | Service Worker & Manifest | Cache-first shell strategy, instant second loads |
| **Hosting** | GitHub Pages | Automated zero-cost global edge delivery |

---

## 🚀 Local Preview

Since this project has zero external build tools, running it locally requires no build steps:

### Option 1: Direct Browser
Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local HTTP Server (Recommended for PWA & Audio)
Using Python:
```bash
python -m http.server 8000
```
Or using Node:
```bash
npx serve .
```
Then visit `http://localhost:8000`.

---

## 🔧 Rebuilding the CSS Bundle

Page-specific stylesheets (`home.css`, `quran.css`, …) are linked directly, but the global
design system lives in `css/partials/` and is merged into a single `css/heynuo.css` that every
page loads. After editing anything under `css/partials/` (or the import list in `css/style.css`),
regenerate the bundle:

```powershell
pwsh tools/build-css.ps1
```

The generated file is committed, so the site also works with no build step. `tools/optimize-images.ps1`
regenerates the `-800.jpg` banner variants the `srcset` markup references when banner images change.

---

## 🚀 Release Checklist

Before pushing a site update, run these three steps in order:

```powershell
pwsh tools/build-css.ps1      # 1. Rebuild the CSS bundle (only if css/partials/ changed)
pwsh tools/stamp-build.ps1    # 2. Stamp the build so the service worker cache is busted
pwsh tools/validate-site.ps1  # 3. Verify links, assets, and schemas
```

**Why the build stamp matters.** `sw.js` derives its cache name from the stamp written into
`js/script.js` by `tools/stamp-build.ps1`. Returning visitors automatically get the refreshed
stylesheet and scripts instead of a stale cached copy — there is no version constant to bump by hand.
Skipping this step is the usual cause of "the site looks unchanged" after a deploy.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to learn from, adapt, and build upon the open-source code!
The Quranic texts and audio recitations remain under public-domain and religious educational fair use.
