# CHANDLER

**Curated Hardware And Normalized Design Library for Engineering Reuse**

CHANDLER is a local-first common-parts library and sourcing workbench for makers, product developers, educators, repairers, laboratories, hardware startups, and small engineering teams. It answers: **What proven, readily available part or part family should I reach for to solve this design problem?**

CHANDLER is curated rather than exhaustive. It keeps stable engineering definitions separate from approved variants and frequently changing supplier offers, treats interfaces as first-class records, preserves source provenance, and presents Observed Commonness separately from Prototype Utility.

## Current release

- Application version: `0.1.0`
- Demonstration catalog: `2026.08.24-demo`
- Schema version: `3`
- Data status: all bundled families, scores, observations, and review records are clearly labeled demonstration data. Price and stock are `Unknown`.

## Run the application

### Hosted development application

The primary application is implemented in `app/` and runs through the repository's existing package scripts:

```bash
npm ci
npm run dev
```

### No-compile, host-anywhere application

`index.html` is a self-contained public build with no external runtime dependencies. Serve the repository from any ordinary static web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. The portable build also works when copied with `manifest.webmanifest` and `service-worker.js` to an ordinary static host. A local web server is recommended because browsers restrict service workers and some file operations under `file://`.

## Maker Mode

- Intent, alias, part-number, category, dimension, unit, standard, and interface search
- Curated category browsing and reusable interface records
- Part Passports with normalized specifications, limitations, design-stage tags, assets, evidence state, and separate scores
- Side-by-side comparison for up to four families
- Local favorites, stock, notes, and custom parts
- Project Bill of Materials (BOM) editing with quantity, unit, intent, notes, and revision snapshots
- JSON, comma-separated value, Markdown, and print exports
- Full local backup, validated restore, Fresh Start, and catalog rollback previews
- Dark, light, and high-contrast themes; keyboard focus; reduced-motion support; responsive layouts

## Curator Mode

- Source registry and isolated adapter status
- Paste-based manual import with column interpretation, preview, validation, and staging
- Immutable raw observations and candidate matches
- Human review decisions with local audit events
- Canonical-family table and first-class interface records
- Transparent, deterministic normalization-rule tester
- Community proposal builder with JSON export
- Package-quality dashboard, catalog manifests, releases, checkpoints, and rollback previews

The demonstration interface never performs automatic crawling or live supplier requests.

## Local data and privacy

The application stores user work in the browser's Indexed Database API, with a browser-storage fallback only when Indexed Database API access is unavailable. Stored data includes favorites, comparison selections, project lines, stock, notes, custom parts, curator decisions, and theme preferences.

There is no telemetry, advertising, mandatory account, supplier credential, or hidden network request. Network access is used only when the user deliberately opens a reference or configures a future update or supplier service.

## Data architecture

CHANDLER separates four layers:

1. **Raw observations** — immutable original Bill of Materials lines and source evidence.
2. **Normalization rules** — versioned aliases, units, classification, parsing, and matching transformations.
3. **Canonical catalog** — curator-controlled families, variants, interfaces, relationships, and recommendations.
4. **Published catalog** — generated, validated packages consumed by the public application.

Part families, approved variants, and supplier offers have distinct identities and mutation policies. Changing a price or stock fact cannot rewrite an engineering definition.

See `docs/data-model.md`, `docs/methodology.md`, `docs/governance.md`, `docs/source-policy.md`, and `docs/compatibility.md`.

## Ingestion toolchain

The Python command-line tool is independent from the public application and uses only the Python standard library:

```bash
python3 ingestion/chandler_ingest.py normalize "DIN 912 M3x8"
python3 ingestion/chandler_ingest.py import-tsv tests/fixtures/demo-bom.tsv reports/observations.json
python3 ingestion/chandler_ingest.py validate data/catalog.json
python3 ingestion/chandler_ingest.py manifest data/catalog.json reports/catalog-manifest.json
```

Every adapter must emit the same raw-observation structure and retain original text, project identity, source, license, collection date, parser version, content hash, and ingestion-run identifier.

## Catalog publishing

1. Run approved source adapters.
2. Deduplicate projects and immutable observations.
3. Apply versioned normalization rules to candidate data.
4. Review candidate clusters and every compatibility proposal.
5. Validate schemas, identifiers, references, provenance, licenses, units, scores, migrations, and cycles.
6. Generate the catalog package, manifest, SHA-256 checksum, release diff, and methodology report.
7. Import the package into a copy of the current local catalog.
8. Create a recovery checkpoint, preview migrations, validate, activate, and retain the previous package for rollback.

## Backward compatibility

The current project schema is version 3. Importers must detect the version before mutation, preserve the original file, migrate a copy, validate the result, and retain unknown fields when safe. Future schema versions are rejected with a clear error. Compatibility guarantees and fixtures are documented in `docs/compatibility.md`.

## Testing

```bash
npm test
python3 -m unittest discover tests/python
```

Validation covers duplicate identifiers, required fields, family-interface references, quantities, provenance, score inputs, circular relationships, schema compatibility, checksums, offline assets, and backup safety. The starter-provided production build verification remains the deployment gate.

## Important limitations

CHANDLER does not guarantee that parts are interchangeable. Before committing a design, review manufacturer datasheets and drawings, applicable standards, tolerances and fits, loads and duty cycles, environmental and safety requirements, exact variants, and current supplier facts. Class A and Class B mechanical substitution claims require human approval and documented evidence.

## Contributing

Technical contributors may propose catalog or code changes through a pull request. Ordinary makers may use Curator Mode's Community Proposal Builder and attach its JSON output to an issue or other configured submission channel. See `docs/contributing.md`.

## License

Application code is available under the MIT License. Catalog observations, linked assets, supplier text, drawings, Computer-Aided Design (CAD) models, and Electronic Design Automation (EDA) assets retain their own source-specific licenses and must not be redistributed unless permission is recorded.
