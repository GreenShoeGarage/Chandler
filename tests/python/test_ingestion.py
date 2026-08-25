import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("chandler_ingest", ROOT / "ingestion" / "chandler_ingest.py")
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


class IngestionTests(unittest.TestCase):
    def test_alias_and_dimension_normalization(self):
        result = MODULE.normalize("DIN 912 M3x8 SHCS")
        self.assertIn("M3 × 8 millimeters", result["normalized"])
        self.assertIn("socket-head cap screw", result["normalized"])
        self.assertGreaterEqual(len(result["rulePath"]), 3)

    def test_demo_catalog_validates(self):
        self.assertEqual(MODULE.validate_catalog(ROOT / "data" / "catalog.json"), [])

    def test_import_preserves_original_text(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "observations.json"
            MODULE.import_tsv(ROOT / "tests" / "fixtures" / "demo-bom.tsv", destination)
            data = json.loads(destination.read_text())
            self.assertEqual(data["observations"][0]["originalDescription"], "M3x8 SHCS")
            self.assertTrue(data["observations"][0]["contentHash"])


if __name__ == "__main__":
    unittest.main()
