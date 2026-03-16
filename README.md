<div align="center">

# 🖼 Base64 Image Converter

[![Base64 Converter](https://img.shields.io/badge/Base64-Image%20Converter-2563eb?style=for-the-badge&logo=html5&logoColor=white)](https://mrlipx.github.io/base64-image-converter/)
[![Version](https://img.shields.io/badge/version-1.1.0-f85149?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-3fb950?style=for-the-badge)](./LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-d29922?style=for-the-badge)](#)
[![Open Source](https://img.shields.io/badge/open-source-f778ba?style=for-the-badge&logo=github)](#)

**Free, open-source, privacy-first tool to convert between Base64 strings and images.**  
No signup. No server. No tracking. Runs 100% in your browser.

[🚀 Live Demo](https://mrlipx.github.io/base64-image-converter/) · [🐛 Issues](https://github.com/MrLiPx/base64-image-converter/issues) · [💬 Discussions](https://github.com/MrLiPx/base64-image-converter/discussions) · [🌐 MrLiPx.com](https://mrlipx.com)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tools](#-tools)
- [What's New in v1.1.0](#-whats-new-in-v110)
- [Privacy](#-privacy)
- [Keyboard Shortcuts](#%EF%B8%8F-keyboard-shortcuts)
- [URL Import & Shareable Links](#-url-import--shareable-links)
- [File Structure](#-file-structure)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔎 Overview

Base64 Image Converter is a **zero-dependency**, **single-file-per-page**, browser-based tool for converting between Base64-encoded strings and image files. There is no build step, no npm, no server, and no account required — just open the page and start converting.

---

## 🛠 Tools

### [Base64 → Image](https://mrlipx.github.io/base64-image-converter/app/base64-to-image/)

| Feature | Detail |
|---|---|
| **Auto-converts on paste** | Paste a Base64 string and the image renders immediately — no button click needed |
| **Accepts raw Base64 or Data URL** | Both `data:image/png;base64,…` and raw `iVBOR…` strings are supported |
| **Format auto-detection** | Detects PNG, JPEG, GIF, WebP, SVG, BMP, ICO from mime type or magic bytes |
| **Blob URL preview** | Decoded to a `Blob` in-browser — data never transmitted |
| **Image metadata** | Shows pixel dimensions, mime type, and file size |
| **One-click download** | Correct filename and extension, full quality, no re-encoding |
| **`Ctrl/Cmd+Enter` shortcut** | Keyboard-friendly conversion trigger |

### [Image → Base64](https://mrlipx.github.io/base64-image-converter/app/image-to-base64/)

| Feature | Detail |
|---|---|
| **Drag-and-drop** | Drop any image onto the drop zone |
| **Click to browse** | Standard file picker |
| **Paste from clipboard** | `Ctrl+V` anywhere on the page to paste a copied image |
| **Import from URL** | Fetch any public image URL; CORS-blocked URLs auto-retry via 3 proxies |
| **`?import=<url>` param** | Shareable links — auto-fetches the URL on load |
| **Data URL / Raw Base64 toggle** | Switch between output formats with one click |
| **One-click copy** | `navigator.clipboard` with graceful `execCommand` fallback |
| **Character count + decoded size** | Shows output length and estimated decoded file size |
| **Max 10 MB per file** | Client-side validation with friendly error message |

---

## 🆕 What's New in v1.1.0

- **Dark / Light / System theme** — theme toggle button in the header; follows OS preference by default; preference persists in `localStorage`. `Alt+T` keyboard shortcut.
- **Mobile hamburger navigation** — responsive slide-down nav at `≤700px` with close-on-outside-click and `Escape` key support.
- **Skip-to-content link** — keyboard users can jump straight to `#main` via a hidden skip link in every header.
- **Focus-visible rings** — all interactive elements show a clear blue focus ring for keyboard navigation.
- **3 CORS proxies** for URL import — allorigins.win → corsproxy.io → thingproxy.freeboard.io, each with `AbortController` timeout (12 s).
- **Paste listener fix** — global `Ctrl+V` no longer intercepts text paste inside `<input>` or `<textarea>` fields.
- **Fixed duplicate `<link rel="preload">`** bug on all pages.
- **`aria-current="page"`** on active breadcrumb items.
- **Full JSON-LD graph** on the homepage: `SoftwareApplication` with `featureList` (14 items), `FAQPage` (5 Q&As), `BreadcrumbList`, `WebSite`.
- **`BreadcrumbList` JSON-LD** on every app page.
- **Dual `theme-color` meta tags** (dark + light OS preference) on all pages.
- **`twitter:site` / `twitter:creator`** meta tags on all pages.
- **`og:image:width` / `og:image:height`** added for richer link previews.
- **Homepage FAQ accordion** — five Q&As surfaced directly on the landing page.
- **Centralised error handling** in encoder — timeout vs. all-proxies-failed vs. generic failure, each with a distinct message.

---

## 🔒 Privacy

| What the tool does | What it never does |
|---|---|
| Processes everything in your browser | Upload your images to any server |
| Uses `FileReader` / `atob()` / `URL.createObjectURL()` | Store any image data |
| Serves the site over HTTPS | Use advertising or tracking |
| Uses browser `localStorage` only for theme preference | Collect personal information |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Page | Action |
|---|---|---|
| `Ctrl/Cmd` + `V` | Image → Base64 | Paste image from clipboard |
| `Ctrl/Cmd` + `Enter` | Base64 → Image | Trigger conversion |
| `Alt` + `T` | All pages | Toggle dark/light theme |
| `Escape` | All pages | Close open FAQ item / close mobile nav |

---

## 🔗 URL Import & Shareable Links

The Image → Base64 tool supports a `?import=<url>` query parameter. When present, the tool auto-fetches and converts the image on load, then removes the parameter from the address bar.

```
# Opens the encoder and immediately fetches + converts the image:
https://mrlipx.github.io/base64-image-converter/app/image-to-base64/?import=https://example.com/photo.png
```

CORS-blocked URLs are automatically retried via a chain of three proxies. If all fail, a clear error toast is shown.

---

## 📁 File Structure

```
base64-image-converter/
│
├── index.html                       ← Landing / hub page
├── 404.html                         ← 404 page
├── README.md
├── LICENSE                          ← MIT
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── .nojekyll                        ← Disables Jekyll on GitHub Pages
│
├── app/
│   ├── index.html                   ← App hub (choose a tool)
│   ├── base64-to-image/
│   │   └── index.html               ← Base64 → Image converter
│   └── image-to-base64/
│       └── index.html               ← Image → Base64 converter
│
├── privacy-policy/
│   └── index.html
├── tos/
│   └── index.html
│
└── assets/
    ├── core_YwCdbQMX.js             ← Shared: header/footer, theme, toast, FAQ, mobile nav
    ├── decoder_E2DdEdTI.js          ← Base64 → Image logic
    ├── encoder_JKX22aUs.js          ← Image → Base64 logic
    ├── styles_Z5jCVG3c.css          ← Shared stylesheet (all pages + dark mode)
    ├── logo.png                     ← Site logo / favicon
    ├── og-base64-to-image.png       ← Open Graph image (decoder)
    └── og-image-to-base64.png       ← Open Graph image (encoder)
```

---

## 🚀 Local Development

No build step required — pure static HTML/CSS/JS.

```bash
git clone https://github.com/MrLiPx/base64-image-converter.git
cd base64-image-converter

# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .

# Then open: http://localhost:8080/base64-image-converter/
```

> **Important:** always serve from a local HTTP server rather than opening `file://` directly. The `BASE` path prefix (`/base64-image-converter/`) assumes an origin-relative URL, which requires an HTTP server.

---

## 🚢 Deployment

### GitHub Pages (current)

Push to `main` → Pages serves the repo root at `https://<user>.github.io/base64-image-converter/`.

> GitHub Pages does not support server-side redirects. Clean URLs work via directory `index.html` files (already set up).

### Netlify / Cloudflare Pages

Drop the repo in — no extra config needed. Add a `_redirects` file if you want 308 redirects for any legacy paths.

### Vercel

Add a `vercel.json` with `"cleanUrls": true` and your redirect rules. All static assets are picked up automatically.

### Self-hosting (rename the repo)

If you rename the repo, find-and-replace `/base64-image-converter/` across all HTML files and the `BASE` constant in `core_YwCdbQMX.js`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Pure HTML / CSS / JS | Everything — zero runtime dependencies |
| Google Fonts (Outfit + JetBrains Mono) | Typography |
| Flaticon UIcons (`fi fi-rr-*`, `fi fi-brands-*`) | Icon set |
| `FileReader` API | Local file → Data URL encoding |
| `atob()` + `Uint8Array` | Base64 → binary decoding |
| `Blob` + `URL.createObjectURL()` | Blob URL preview and file download |
| `navigator.clipboard` | One-click copy with `execCommand` fallback |
| `fetch` + `AbortController` | URL image import with timeout |
| CORS proxy chain | allorigins.win → corsproxy.io → thingproxy |
| `localStorage` | Theme preference persistence |
| `history.replaceState` | Clean URL after `?import=` auto-fetch |

---

## 🤝 Contributing

PRs are welcome! For large changes, open a Discussion or Issue first.

```bash
git clone https://github.com/MrLiPx/base64-image-converter.git
cd base64-image-converter

# Make your changes — no build step needed.
# Serve locally with: python3 -m http.server 8080
# Open: http://localhost:8080/base64-image-converter/

git checkout -b feature/your-feature-name
git add .
git commit -m "feat: describe the change"
git push origin feature/your-feature-name
# Then open a Pull Request on GitHub.
```

### Commit conventions

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code refactoring (no behaviour change) |
| `style:` | CSS / visual-only changes |
| `docs:` | README or comment changes |
| `chore:` | Build, CI, or config changes |

### Code style

- Vanilla **ES5-compatible** JavaScript — no transpiler, no bundler; targets all modern browsers without a build step
- CSS custom properties (`var(--c-*)`) for all colours and radii — makes dark mode trivial
- All interactive elements must have accessible labels (`aria-label`, `role`, `aria-expanded`, etc.)
- Keep each page **self-contained** — no new external runtime dependencies

---

## 📄 License

MIT © 2026 [MrLiPx](https://github.com/MrLiPx)

See [LICENSE](./LICENSE) for the full text.

---

<div align="center">

Made with ❤️ by [Mr Li Px](https://github.com/MrLiPx) · [mrlipx.com](https://mrlipx.com)

⭐ If this tool saves you time, a [GitHub star](https://github.com/MrLiPx/base64-image-converter) goes a long way!

</div>
