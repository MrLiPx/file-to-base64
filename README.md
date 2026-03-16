# 📦 file-to-base64

> Encode **any file** to Base64 — or decode Base64 back to a file — right in your browser. No installs, no uploads, no server.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/MrLiPx/file-to-base64/releases)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://mrlipx.github.io/file-to-base64)

---

## ✨ Features

- **Any file type** — images, video, audio, PDF, ZIP, fonts, binary blobs — anything
- **Encode & decode** — full round-trip with a single click
- **URL import** — fetch a remote file directly, with automatic CORS proxy fallback
- **`?import=`** — load a URL automatically via query parameter
- **Live previews** — image, video, audio, PDF, and text previews rendered from `blob://` URLs
- **Data URI builder** — generates a ready-to-use `data:image/png;base64,…` string with editable MIME type
- **Drag & drop** — drop any file onto the page
- **Truncation** — large outputs show a preview with "Show all" / "Copy full" controls
- **Zero dependencies** — pure HTML, CSS, and vanilla JS

---

## 🚀 Usage

### Open in browser

Just open `index.html` in any modern browser — no build step needed.

```
open index.html
```

Or serve it locally:

```bash
npx serve .
# → http://localhost:3000
```

### Encode a file

1. Drop a file onto the drop zone, or click **Browse**
2. The Base64 output appears instantly
3. Copy the raw Base64, or copy the full **Data URI** (ready to paste into HTML/CSS)

### Decode Base64

1. Switch to **DECODE** mode
2. Paste a Base64 string (or a full `data:…;base64,…` data URI)
3. The decoded content appears, with a live preview if it's an image, video, audio, or PDF

### Import a file from a URL

Paste a URL into the **Import file from URL** field and click **FETCH**.

The tool first attempts a direct fetch. If the server blocks cross-origin requests (CORS), it automatically retries through the [AllOrigins](https://allorigins.win) proxy.

**Tip:** share a pre-loaded URL using the `?import=` query parameter:

```
https://mrlipx.github.io/file-to-base64?import=https://example.com/image.png
```

---

## 🔗 `?import=` Parameter

Any URL opened with `?import=<url>` will automatically fetch the target file on page load:

```
https://mrlipx.github.io/file-to-base64?import=https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png
```

Useful for linking directly to an encoded version of a public file.

---

## 🖼️ Supported Previews

| Type | Formats |
|------|---------|
| Image | JPEG, PNG, GIF, WebP, SVG, ICO |
| Video | MP4, WebM |
| Audio | MP3, OGG, WAV |
| Document | PDF |
| Text | Plain text, JSON, XML, HTML |

Previews use `blob://` URLs created with `URL.createObjectURL()` — nothing is sent to a server.

---

## 📁 Project Structure

```
file-to-base64/
├── index.html        # Single-file app
├── assets/
│   └── logo.png      # App logo / favicon
└── README.md
```

---

## ⚙️ Options

| Option | Description |
|--------|-------------|
| **URL-safe** | Replaces `+` with `-` and `/` with `_` for safe use in URLs |
| **No padding** | Removes trailing `=` padding characters |
| **Auto-run** | Re-encodes/decodes automatically as you type |
| **Data URI auto-generate** | Keeps the `data:…;base64,…` field up to date as output changes |

---

## 🛠️ Built With

- [IBM Plex Mono & Sans](https://fonts.google.com/specimen/IBM+Plex+Mono) — typography
- [Flaticon UIcons](https://www.flaticon.com/uicons) — icons
- [AllOrigins](https://allorigins.win) — CORS proxy fallback for URL imports

---

## 🤝 Contributing

1. Fork this repo
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

Please keep the project dependency-free (no npm, no bundler).

---

## 📄 License

MIT © [MrLiPx](https://github.com/MrLiPx)

---

<p align="center">
  Made by <a href="https://github.com/MrLiPx">@MrLiPx</a> · Star ⭐ if it's useful!
</p>
