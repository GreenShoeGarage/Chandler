# CHANDLER — Static Hosting Package

CHANDLER is a local-first parts explorer for makers and prototype development. This package contains the complete no-compile application and a catalog of 530 electronic, electromechanical, mechanical, and material component families.

## Install on a website

1. Extract `CHANDLER-v0.2.0-static-folder.zip`.
2. Upload all extracted files and folders directly into one public folder on your web server.
3. Keep `data` and `public` beside `index.html`.
4. Visit the address for that folder.

For example, to run CHANDLER at `https://example.com/chandler/`, the server should contain:

```text
chandler/
  index.html
  manifest.webmanifest
  service-worker.js
  README.md
  data/
    catalog.json
    catalog-manifest.json
  public/
    favicon.svg
```

There is no installation command, package manager, build step, database, or server-side language. Do not upload the ZIP itself and expect it to run; extract it first.

## Test locally

Opening `index.html` directly with a `file://` address prevents some browsers from loading the catalog. Test it through a small local web server instead:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Browser storage

Projects, favorites, comparisons, review decisions, and preferences are stored locally in each user's browser. CHANDLER has no telemetry, account requirement, advertising, or hidden network request.

Replacing the hosted application files does not normally erase browser data as long as the website address remains the same. Users can also export a backup from **Updates & Backup** before replacing files.

## Offline use

`service-worker.js` caches the application after the first successful visit. Public service-worker caching requires Hypertext Transfer Protocol Secure (HTTPS). CHANDLER still runs as an ordinary online static page when service-worker caching is unavailable.

## Catalog status

- Application: `0.2.0`
- Catalog: `2026.08.24-starter`
- Schema: `3`
- Families: `530` across `34` categories
- Detailed demonstration passports: `12`
- Unscored candidate seed families: `518`

Candidate seeds intentionally leave supplier facts, price, stock, exact variants, scores, dimensions, standards, interfaces, and compatibility unknown until evidence and human review are added.

## Updating the catalog

Replace `data/catalog.json` and `data/catalog-manifest.json` with a newer compatible catalog package. If application files also change, replace the full contents of the static folder while preserving its web address.

## Troubleshooting

- **Catalog does not appear:** Confirm `data/catalog.json` exists with the same capitalization and relative folder structure shown above.
- **Old version remains visible:** Refresh the page once while online. If necessary, clear site data for this address so the previous service-worker cache is removed.
- **Offline mode does not activate:** Confirm the page is served through HTTPS and every listed file can be opened from the server.
- **Double folder in the address:** Move the contents of the extracted folder up one level so `index.html` is directly inside the intended web folder.

## Important limitation

CHANDLER is a starting-point library, not proof that two parts are interchangeable. Verify manufacturer documentation, drawings, dimensions, tolerances, fits, ratings, loads, duty cycles, environmental requirements, safety requirements, and the exact selected variant before committing a design.
