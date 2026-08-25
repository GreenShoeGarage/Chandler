# Schema compatibility

CHANDLER currently writes project and backup schema version 3.

| Input version | Status | Migration |
| --- | --- | --- |
| 1 | Supported | Adds explicit catalog snapshot, line intent, and local-overlay containers. |
| 2 | Supported | Adds recovery metadata and preserves unknown safe fields. |
| 3 | Native | Validated without migration. |
| 4 or later | Rejected | Future schema; no mutation is attempted. |

Import always reads the version before mutation, retains the original bytes, migrates a copy, previews changes, validates the result, creates a recovery checkpoint, and replaces active state only after success. No migration may discard an unknown field unless it is unsafe and the user receives an explicit report.
