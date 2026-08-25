#!/usr/bin/env python3
"""Small, dependency-free CHANDLER ingestion and publishing command line."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path

SCHEMA_VERSION = 3
PARSER_VERSION = "0.1.0"


def normalize(text: str) -> dict:
    original = text
    value = " ".join(text.strip().split())
    paths: list[str] = []
    substitutions = [
        (r"\bDIN\s*912\b", "ISO 4762 geometry reference", "RULE-STD-DIN912"),
        (r"\bSHCS\b", "socket-head cap screw", "RULE-ALIAS-SHCS"),
        (r"\b608ZZ\b", "608 bearing + dual metal shields", "RULE-ALIAS-608ZZ"),
        (r"\bM(\d+)\s*[xX]\s*(\d+)\s*(?:mm)?\b", r"M\1 × \2 millimeters", "RULE-THREAD-METRIC"),
        (r"\b(\d+)\s*[xX]\s*(\d+)\s*(?:mm)?\b", r"\1 × \2 millimeters", "RULE-UNIT-METRIC-X"),
    ]
    for pattern, replacement, rule_id in substitutions:
        updated, count = re.subn(pattern, replacement, value, flags=re.IGNORECASE)
        if count:
            value = updated
            paths.append(rule_id)
    return {"original": original, "normalized": value, "rulePath": paths}


def import_tsv(source: Path, destination: Path) -> None:
    content = source.read_bytes()
    run_id = "RUN-" + hashlib.sha256(content).hexdigest()[:12].upper()
    rows = []
    with source.open("r", encoding="utf-8", newline="") as handle:
        for index, row in enumerate(csv.reader(handle, delimiter="\t"), start=1):
            if not row or not row[0].strip():
                continue
            description = row[0].strip()
            try:
                quantity = float(row[1]) if len(row) > 1 and row[1].strip() else None
            except ValueError:
                quantity = None
            observation = {
                "observationId": f"OBS-{index:08d}",
                "sourceId": "manual-tsv",
                "sourceProjectId": source.stem,
                "sourceProjectFamilyId": source.stem,
                "projectCategory": "needs-review",
                "originalDescription": description,
                "originalQuantity": quantity,
                "originalUnit": row[2].strip() if len(row) > 2 and row[2].strip() else None,
                "sourceUrl": "",
                "sourceLicense": "curator-supplied",
                "observedAt": datetime.now(timezone.utc).date().isoformat(),
                "parserVersion": PARSER_VERSION,
                "contentHash": hashlib.sha256("\t".join(row).encode()).hexdigest(),
                "ingestionRunId": run_id,
                "normalizationCandidate": normalize(description),
            }
            rows.append(observation)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps({"schemaVersion": SCHEMA_VERSION, "observations": rows}, indent=2) + "\n", encoding="utf-8")


def validate_catalog(path: Path) -> list[str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    errors: list[str] = []
    required = {"manifest", "families", "variants", "interfaces", "compatibility", "suppliers", "offers", "assets", "evidence"}
    missing = required - data.keys()
    if missing:
        errors.append("Missing top-level fields: " + ", ".join(sorted(missing)))
    ids = [record.get("id") for key in ("families", "variants", "interfaces") for record in data.get(key, [])]
    duplicates = sorted({value for value in ids if value and ids.count(value) > 1})
    if duplicates:
        errors.append("Duplicate identifiers: " + ", ".join(duplicates))
    interface_ids = {record.get("id") for record in data.get("interfaces", [])}
    for family in data.get("families", []):
        for interface_id in family.get("interfaces", []):
            if interface_id not in interface_ids:
                errors.append(f"{family.get('id')}: missing interface {interface_id}")
        for score in ("prototypeUtility", "observedCommonness"):
            value = family.get(score)
            if value is not None and not 0 <= value <= 100:
                errors.append(f"{family.get('id')}: invalid {score}")
    return errors


def write_manifest(catalog_path: Path, destination: Path) -> None:
    raw = catalog_path.read_bytes()
    data = json.loads(raw)
    manifest = dict(data.get("manifest", {}))
    manifest.update({
        "schemaVersion": SCHEMA_VERSION,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "partFamilyCount": len(data.get("families", [])),
        "partVariantCount": len(data.get("variants", [])),
        "checksumAlgorithm": "SHA-256",
        "checksum": hashlib.sha256(raw).hexdigest(),
    })
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="CHANDLER catalog ingestion utility")
    commands = parser.add_subparsers(dest="command", required=True)
    normalize_parser = commands.add_parser("normalize")
    normalize_parser.add_argument("text")
    import_parser = commands.add_parser("import-tsv")
    import_parser.add_argument("source", type=Path)
    import_parser.add_argument("destination", type=Path)
    validate_parser = commands.add_parser("validate")
    validate_parser.add_argument("catalog", type=Path)
    manifest_parser = commands.add_parser("manifest")
    manifest_parser.add_argument("catalog", type=Path)
    manifest_parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    if args.command == "normalize":
        print(json.dumps(normalize(args.text), indent=2))
        return 0
    if args.command == "import-tsv":
        import_tsv(args.source, args.destination)
        print(f"Wrote {args.destination}")
        return 0
    if args.command == "validate":
        errors = validate_catalog(args.catalog)
        print(json.dumps({"valid": not errors, "errors": errors}, indent=2))
        return 1 if errors else 0
    write_manifest(args.catalog, args.destination)
    print(f"Wrote {args.destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
