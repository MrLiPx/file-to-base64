# Base64 Image Converter

> Free, open-source, privacy-first tool to convert between Base64 strings and images — no signup, no server, no tracking.

**Live:** [mrlipx.github.io/base64-image-converter](https://mrlipx.github.io/base64-image-converter/)

---

## Features

### Base64 → Image
- Auto-converts on paste — no button click needed
- Preview via `Blob` + `URL.createObjectURL()` — data never leaves the browser
- Auto-detects format from Data URL mime type or Base64 magic byte prefixes
- Shows pixel dimensions, mime type, and file size
- One-click image download with correct filename and extension
- `Ctrl`/`Cmd`+`Enter` keyboard shortcut

### Image → Base64
- Drag & drop, click-to-upload, or **paste from clipboard**
- Toggle between **Data URL** and **Raw Base64** output
- One-click copy to clipboard
- Character count and decoded size estimate

---

## Privacy

| What we do | What we don't do |
|------------|-----------------|
| Process everything in your browser | Upload anything to a server |
| Use `URL.createObjectURL()` for previews | Store any images or data |
| Serve the site over HTTPS | Use tracking or advertising |
| Collect anonymous page-view stats via GitHub Pages | Collect personal information |

---

## Project Structure

```
base64-image-converter/
├── index.html                  # Base64 → Image converter
├── image-to-base64/
│   └── index.html              # Image → Base64 converter
├── privacy/
│   └── index.html
├── terms/
│   └── index.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── site.webmanifest
├── favicon.ico
├── android-chrome-*.png
├── apple-touch-icon.png
├── assets/
│   ├── main-logo.png           # Site logo
│   ├── css/
│   │   └── styles.css          # Shared stylesheet (all pages)
│   ├── js/
│   │   ├── main.js             # Shared: toast, FAQ, nav active state
│   │   ├── converter.js        # Base64 → Image logic
│   │   └── uploader.js         # Image → Base64 logic
│   └── img/
│       ├── og-base64-to-image.png
│       └── og-image-to-base64.png
├── .nojekyll
├── LICENSE
└── README.md
```

---

## Local Development

No build step required — pure static HTML/CSS/JS.

```bash
git clone https://github.com/MrLiPx/base64-image-converter.git
cd base64-image-converter

# Python
python3 -m http.server 8080

# Node
npx serve .

# Open: http://localhost:8080/base64-image-converter/
```

---

## Deploying to GitHub Pages

1. Fork or clone this repo
2. Go to **Settings → Pages** → Deploy from branch → `main` → `/ (root)`
3. Live at `https://<your-username>.github.io/base64-image-converter/`

> If you rename the repo, find-and-replace `/base64-image-converter/` across all files.

---

## Contributing

1. Fork → feature branch → PR
2. Bugs & ideas: [Issues](https://github.com/MrLiPx/base64-image-converter/issues) · [Discussions](https://github.com/MrLiPx/base64-image-converter/discussions)

---

## License

MIT © 2026 [MrLiPx](https://github.com/MrLiPx)
