# KoalaEdit

Cross-platform Markdown Editor — Website + Desktop (Windows, Linux, macOS).

## Project Structure

```
KoalaEdit/
├── src/              # Web app source
├── src-tauri/        # Tauri desktop wrapper (Rust)
├── public/           # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Commands

```bash
# Development (web)
npm run dev

# Desktop (via Tauri)
npm run tauri dev

# Build for production
npm run build
npm run tauri build
```

## Desktop Targets

| Platform | Format |
|----------|--------|
| Windows | `.msi` / `.exe` |
| macOS   | `.dmg` / `.app` |
| Linux   | `.deb` / `.AppImage` |
