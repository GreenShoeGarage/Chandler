# CHANDLER — Static Hosting Package

This ZIP is the full CHANDLER interface shown in the preview, compiled as ordinary static website files. It includes the same component explorer, 530-family starter catalog, Part Passports, comparison tools, Project Bill of Materials, local favorites, Curator Mode, themes, backup, and restore features.

## Install

1. Extract the ZIP.
2. Upload all extracted files and folders directly into one public folder on your server.
3. Keep `assets` beside `index.html`.
4. Open the address for that folder.

The folder should look like this:

```text
chandler/
  index.html
  manifest.webmanifest
  service-worker.js
  favicon.svg
  README.md
  assets/
    [compiled JavaScript and stylesheet files]
```

No package manager, build command, database, or server-side language is required. The catalog is bundled into the compiled application.

Do not upload the ZIP itself and expect it to run. Extract it first. Do not move files out of `assets` or rename the compiled files.

## Test locally

Opening `index.html` directly with a `file://` address is not supported. Test the extracted folder through a small local web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Browser storage

Projects, favorites, comparisons, notes, review decisions, and preferences are stored locally in each user's browser. CHANDLER has no telemetry, account requirement, advertising, or hidden network request.

Replacing the hosted files does not normally erase browser data as long as the website address remains unchanged. Users can also export a backup from **Catalog Updates** before replacing files.

## Offline use

`service-worker.js` caches the application after the first successful visit. Public service-worker caching requires Hypertext Transfer Protocol Secure (HTTPS). CHANDLER still runs as an ordinary online static page when offline caching is unavailable.

## Release

- Application: `0.2.0`
- Catalog: `2026.08.24-starter`
- Schema: `3`
- Families: `530` across `34` categories
- Detailed demonstration passports: `12`
- Unscored candidate seed families: `518`

Candidate seeds intentionally leave supplier facts, price, stock, exact variants, scores, dimensions, standards, interfaces, and compatibility unknown until evidence and human review are added.

## Troubleshooting

- **Blank page:** Confirm the `assets` folder and all its files were uploaded beside `index.html`.
- **Old version remains visible:** Refresh once while online. If necessary, clear site data for the address to remove the previous service-worker cache.
- **Offline mode does not activate:** Confirm the page uses HTTPS and every file listed above can be opened from the server.
- **Files are under an extra folder:** Move the extracted contents up one level so `index.html` is directly inside the intended web folder.

## Important limitation

CHANDLER is a starting-point library, not proof that two parts are interchangeable. Verify manufacturer documentation, drawings, dimensions, tolerances, fits, ratings, loads, duty cycles, environmental requirements, safety requirements, and the exact selected variant before committing a design.
