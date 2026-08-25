# Data model

The canonical schema includes CatalogManifest, CatalogRelease, SourceRegistryEntry, SourceSnapshot, ProjectSource, RawObservation, NormalizationRule, Alias, CandidateCluster, PartFamily, PartVariant, Interface, CompatibilityRelationship, Supplier, SupplierOffer, AssetReference, EvidenceRecord, ReviewDecision, CommunityProposal, ProjectBOM, ProjectBOMLine, LocalStockItem, UserPartOverride, RecoveryCheckpoint, and AuditEvent.

Permanent identifiers are opaque and never reused. Retired records remain resolvable with a disposition of Superseded, Merged, Deprecated, Obsolete, or Incorrect and include a replacement or reason.

Part families describe stable engineering intent; variants capture exact material, package, finish, class, or manufacturer attributes; supplier offers capture volatile stock, price, lead time, minimum quantity, region, and freshness.
