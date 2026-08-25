"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { categories, interfaces, parts, type PartRecord, versionInfo } from "./data";
import { clearWorkspace, downloadText, readWorkspace, writeWorkspace } from "./storage";
import { BOMWorkspace, CompareWorkspace, CuratorWorkspace, ExplorerWorkspace, HelpWorkspace, MyPartsWorkspace, UpdatesWorkspace, type BOMLine, type CustomPart } from "./workspaces";

type IconName = "home" | "search" | "grid" | "link" | "compare" | "bom" | "box" | "update" | "help" | "spark" | "sun" | "moon" | "contrast" | "menu" | "star" | "plus" | "close" | "check" | "chevron" | "shield" | "file" | "filter";
type NavItem = { id: string; label: string; icon: IconName };

const makerNav: NavItem[] = [
  { id: "home", label: "Home", icon: "home" }, { id: "discover", label: "Discover", icon: "search" },
  { id: "explorer", label: "All Components", icon: "box" },
  { id: "categories", label: "Categories", icon: "grid" }, { id: "interfaces", label: "Interfaces", icon: "link" },
  { id: "compare", label: "Compare", icon: "compare" }, { id: "bom", label: "Project BOM", icon: "bom" },
  { id: "my-parts", label: "My Parts", icon: "box" }, { id: "updates", label: "Catalog Updates", icon: "update" },
  { id: "help", label: "Help", icon: "help" },
];

const featuredCategories = ["Microcontroller boards", "Sensors", "Fasteners", "Structural systems"]
  .map((name) => categories.find((item) => item.name === name))
  .filter((item): item is (typeof categories)[number] => Boolean(item));

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>, search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>,
    compare: <><path d="M7 3v18M17 3v18M3 7l4-4 4 4M13 17l4 4 4-4"/></>, bom: <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7v10l8 4 8-4V7M12 11v10"/></>, update: <><path d="M20 7h-5V2"/><path d="M20 7a9 9 0 1 0 1 8"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 3.3 2.6c-.8.3-.8 1-.8 1.7M12 17h.01"/></>,
    spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>, moon: <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
    contrast: <><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/></>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>, plus: <path d="M12 5v14M5 12h14"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>, check: <path d="m5 12 4 4L19 6"/>, chevron: <path d="m9 18 6-6-6-6"/>,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.9 8.1 7 10 4.1-1.9 7-5.3 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    file: <><path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>, filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function PartGlyph({ part }: { part: PartRecord }) {
  if (part.category === "Bearings and bushings") return <div className="part-glyph bearing-glyph"><span /></div>;
  if (part.category === "Fasteners") return <div className="part-glyph screw-glyph"><span /></div>;
  if (part.category === "Structural systems") return <div className="part-glyph extrusion-glyph"><i/><i/><i/><i/></div>;
  if (part.domain === "Electronic") return <div className="part-glyph board-glyph"><span/><i/><i/><b/></div>;
  if (part.category === "Motors") return <div className="part-glyph motor-glyph"><span/><i/></div>;
  return <div className="part-glyph generic-glyph"><span /></div>;
}

function Meter({ value, label }: { value: number | null; label: string }) {
  const tone = value === null ? "unknown" : value >= 85 ? "good" : value >= 70 ? "mid" : "low";
  const word = value === null ? "Not yet scored" : value >= 85 ? "Strong" : value >= 70 ? "Useful" : "Situational";
  return <div className="meter" aria-label={`${label}: ${value === null ? "unknown" : `${value} out of 100, demonstration score`}`}><div className="meter-top"><span>{label}</span><strong>{value ?? "Unknown"}</strong></div><div className="meter-track"><span className={tone} style={{ width: `${value ?? 0}%` }} /></div><small>{value === null ? word : `${word} · demonstration score`}</small></div>;
}

export default function Home() {
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All domains");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Utility");
  const [selectedId, setSelectedId] = useState<string | null>("CH-M-000242");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [bom, setBom] = useState<BOMLine[]>([]);
  const [stock, setStock] = useState<Record<string,number>>({});
  const [notes, setNotes] = useState<Record<string,string>>({});
  const [customParts, setCustomParts] = useState<CustomPart[]>([]);
  const [reviewDecisions, setReviewDecisions] = useState<Record<string,string>>({});
  const [mode, setMode] = useState<"maker" | "curator">("maker");
  const [theme, setTheme] = useState<"dark" | "light" | "contrast">("dark");
  const [navOpen, setNavOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saveState, setSaveState] = useState<"Saved" | "Saving" | "Error">("Saved");
  const [online, setOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    readWorkspace().then((value) => {
      if (value) {
        setFavorites(value.favorites ?? []); setCompare(value.compare ?? []);
        setBom((value.bom as BOMLine[] ?? []).map((line) => ({ id: line.id, qty: line.qty ?? 1, unit: line.unit ?? "each", status: line.status ?? "Required", note: line.note ?? "" })));
        setStock(value.stock ?? {}); setNotes(value.notes ?? {}); setCustomParts(value.customParts as CustomPart[] ?? []); setReviewDecisions(value.reviewDecisions ?? {}); setTheme(value.theme ?? "dark");
      } else {
        const legacy = localStorage.getItem("chandler-shell");
        if (legacy) { const parsed = JSON.parse(legacy); setFavorites(parsed.favorites ?? []); setCompare(parsed.compare ?? []); setBom((parsed.bom ?? []).map((line: Partial<BOMLine>) => ({ id: line.id ?? "", qty: line.qty ?? 1, unit: "each", status: "Required", note: "" }))); setTheme(parsed.theme ?? "dark"); }
      }
    }).catch(() => setSaveState("Error")).finally(() => setHydrated(true));
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/service-worker.js").catch(() => undefined);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => { setSaveState("Saving"); writeWorkspace({ schemaVersion: versionInfo.schema, savedAt: new Date().toISOString(), favorites, compare, bom, stock, notes, customParts, reviewDecisions, theme }).then(() => setSaveState("Saved")).catch(() => setSaveState("Error")); }, 320);
    return () => window.clearTimeout(timer);
  }, [favorites, compare, bom, stock, notes, customParts, reviewDecisions, theme, hydrated]);

  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => { const shortcut = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchRef.current?.focus(); } }; window.addEventListener("keydown", shortcut); return () => window.removeEventListener("keydown", shortcut); }, []);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim().replace(/millimet(er|re)s?/g, "mm").replace(/socket head cap screw/g, "shcs").replace(/temperature.*arduino/g, "temperature sensor").replace(/bearing.*8\s*mm.*shaft/g, "608 bearing").replace(/join.*20\s*mm.*extrusion/g, "2020 extrusion");
    return parts.filter((part) => {
      const haystack = [part.name, part.shortName, part.description, part.why, part.category, part.subcategory, ...part.aliases, ...part.stages, ...part.attributes, ...Object.values(part.specs)].join(" ").toLowerCase();
      return (!needle || needle.split(/\s+/).every((term) => haystack.includes(term))) && (domain === "All domains" || part.domain === domain) && (category === "All categories" || part.category === category);
    }).sort((a, b) => sort === "Commonness" ? (b.commonness ?? -1) - (a.commonness ?? -1) : sort === "Name" ? a.name.localeCompare(b.name) : (b.utility ?? -1) - (a.utility ?? -1));
  }, [query, domain, category, sort]);
  const visibleCards = filtered.slice(0, 60);

  const selected = parts.find((part) => part.id === selectedId) ?? null;
  const notify = (message: string) => setToast(message);
  const toggleFavorite = (id: string) => { setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); notify(favorites.includes(id) ? "Removed from My Parts" : "Saved to My Parts"); };
  const toggleCompare = (id: string) => { setCompare((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 4 ? [...current, id] : current); if (!compare.includes(id) && compare.length >= 4) notify("Compare holds up to four parts"); };
  const addToBom = (id: string) => { setBom((current) => current.some((line) => line.id === id) ? current.map((line) => line.id === id ? { ...line, qty: line.qty + 1 } : line) : [...current, { id, qty: 1, unit: "each", status: "Required", note: "" }]); notify("Added to Bench Supply project"); };
  const backup = () => downloadText(`chandler-backup-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify({ format: "CHANDLER_BACKUP", applicationVersion: versionInfo.application, catalogVersion: versionInfo.catalog, schemaVersion: versionInfo.schema, exportedAt: new Date().toISOString(), workspace: { favorites, compare, bom, stock, notes, customParts, reviewDecisions, theme } }, null, 2), "application/json");
  const restore = async (file: File) => { try { const parsed = JSON.parse(await file.text()); if (parsed.format !== "CHANDLER_BACKUP" || !parsed.workspace || Number(parsed.schemaVersion) > versionInfo.schema) throw new Error("Unsupported backup"); const value = parsed.workspace; setFavorites(value.favorites ?? []); setCompare(value.compare ?? []); setBom((value.bom ?? []).map((line: Partial<BOMLine>) => ({ id: line.id ?? "", qty: line.qty ?? 1, unit: line.unit ?? "each", status: line.status ?? "Required", note: line.note ?? "" }))); setStock(value.stock ?? {}); setNotes(value.notes ?? {}); setCustomParts(value.customParts ?? []); setReviewDecisions(value.reviewDecisions ?? {}); notify(`Backup validated and restored from schema ${parsed.schemaVersion}`); } catch { notify("Restore blocked: unsupported or invalid CHANDLER backup"); } };
  const freshStart = async () => { if (!window.confirm("Clear projects, favorites, stock, notes, and curator decisions from this device?")) return; await clearWorkspace(); setFavorites([]); setCompare([]); setBom([]); setStock({}); setNotes({}); setCustomParts([]); setReviewDecisions({}); notify("Local workspace cleared; demonstration catalog retained"); };
  const runSearch = (value?: string) => { if (value !== undefined) setQuery(value); setActive("discover"); setSelectedId(null); };

  return <main className={`app-shell theme-${theme} ${navOpen ? "nav-open" : "nav-closed"}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="topbar">
      <div className="brand-lockup"><button className="icon-button" onClick={() => setNavOpen((open) => !open)} aria-label={navOpen ? "Collapse navigation" : "Expand navigation"}><Icon name="menu" /></button><button className="wordmark" onClick={() => setActive("home")}><span className="mark">CH</span><span><strong>CHANDLER</strong><small>Curated hardware library</small></span></button></div>
      <div className="global-search"><Icon name="search" /><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Find a part or describe the job…" aria-label="Search CHANDLER" /><kbd>⌘ K</kbd></div>
      <div className="top-actions"><div className="mode-switch" aria-label="Application mode"><button className={mode === "maker" ? "active" : ""} onClick={() => { setMode("maker"); setActive("home"); }}>Maker</button><button className={mode === "curator" ? "active" : ""} onClick={() => { setMode("curator"); setActive("curator-home"); }}>Curator</button></div><button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "contrast" : "dark")} aria-label={`Theme: ${theme}`}><Icon name={theme === "dark" ? "moon" : theme === "light" ? "sun" : "contrast"} /></button></div>
    </header>

    <aside className="sidebar" aria-label="Primary navigation"><nav><p className="nav-label">{mode === "maker" ? "Workbench" : "Catalog operations"}</p>
      {(mode === "maker" ? makerNav : makerNav.slice(0, 4)).map((item) => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)} title={!navOpen ? item.label : undefined}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "compare" && compare.length > 0 && <b>{compare.length}</b>}{item.id === "bom" && bom.length > 0 && <b>{bom.length}</b>}</button>)}
      {mode === "curator" && <><div className="nav-rule"/><CuratorButton id="curator-home" label="Curator Overview" icon="spark" active={active} setActive={setActive}/><CuratorButton id="sources" label="Sources" icon="link" active={active} setActive={setActive}/><CuratorButton id="imports" label="Imports & Observations" icon="file" active={active} setActive={setActive}/><CuratorButton id="review" label="Review Queue" icon="check" active={active} setActive={setActive} count={4}/><CuratorButton id="canonical" label="Canonical Parts" icon="box" active={active} setActive={setActive}/><CuratorButton id="rules" label="Normalization Rules" icon="filter" active={active} setActive={setActive}/><CuratorButton id="proposals" label="Community Proposals" icon="bom" active={active} setActive={setActive}/><CuratorButton id="quality" label="Quality Dashboard" icon="shield" active={active} setActive={setActive}/><CuratorButton id="releases" label="Releases & Audit" icon="update" active={active} setActive={setActive}/></>}
    </nav><div className="sidebar-foot"><div className="freshness"><span className="status-dot amber"/><span><strong>Starter catalog</strong><small>Seed evidence and sourcing are unknown</small></span></div><button onClick={() => setActive("updates")}>Catalog {versionInfo.catalog}<Icon name="chevron" size={14}/></button></div></aside>

    <section className="workspace" id="main-content">
      {(active === "home" || active === "discover") && <>
        <section className="workbench-head"><div><span className="eyebrow">Maker workbench · {parts.length} component families</span><h1>{active === "home" ? "What are you trying to build?" : "Discover proven starting parts"}</h1><p>Describe the job, a size, an interface, or a known part—or open All Components for a simple, searchable view of the complete starter catalog.</p></div><div className="catalog-trust"><Icon name="shield"/><span><strong>Local-first</strong><small>No telemetry · no hidden network requests</small></span></div></section>
        <div className="hero-search"><Icon name="search" size={22}/><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Try “bearing for an 8 mm shaft”" aria-label="Describe your design problem" /><button onClick={() => runSearch()}>Search catalog <Icon name="chevron" size={15}/></button></div>
        <div className="intent-row" aria-label="Example searches"><span>Try a task:</span>{["Join two pieces of 20 mm extrusion", "Bearing for an 8 mm shaft", "Measure room temperature with an Arduino", "Hand-solderable 5 V level shifter"].map((example) => <button key={example} onClick={() => runSearch(example)}>{example}</button>)}</div>
        {active === "home" && !query && <section className="category-strip"><div className="section-title"><div><span className="eyebrow">Start with a system</span><h2>Browse the bench</h2></div><div className="section-links"><button className="action-button" onClick={() => setActive("explorer")}>All {parts.length} components</button><button onClick={() => setActive("categories")}>All categories <Icon name="chevron" size={14}/></button></div></div><div className="category-grid">{featuredCategories.map((item, index) => <button key={item.name} className="category-card" onClick={() => { setCategory(item.name); setActive("discover"); }}><span className={`category-visual v${index + 1}`}><i/><i/><i/></span><span><strong>{item.name}</strong><small>{item.note}</small></span><b>{item.count}</b></button>)}</div></section>}
        <section className="results-section"><div className="results-toolbar"><div><span className="eyebrow">{query ? "Search results" : "Recommended starting points"}</span><h2>{filtered.length} {filtered.length === 1 ? "family" : "families"}</h2></div><div className="toolbar-controls"><button className={filtersOpen ? "soft-button active" : "soft-button"} onClick={() => setFiltersOpen((open) => !open)}><Icon name="filter" size={16}/>Filters{domain !== "All domains" || category !== "All categories" ? <b>•</b> : null}</button><label>Sort <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Utility</option><option>Commonness</option><option>Name</option></select></label></div></div>
          {filtersOpen && <div className="filter-drawer"><label>Domain<select value={domain} onChange={(e) => setDomain(e.target.value)}><option>All domains</option><option>Mechanical</option><option>Electronic</option><option>Electromechanical</option></select></label><label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>All categories</option>{[...new Set(parts.map((part) => part.category))].sort().map((item) => <option key={item}>{item}</option>)}</select></label><button onClick={() => { setDomain("All domains"); setCategory("All categories"); }}>Clear filters</button></div>}
          {filtered.length ? <><div className="part-grid">{visibleCards.map((part) => <article className={`part-card ${selectedId === part.id ? "selected" : ""}`} key={part.id} onClick={() => setSelectedId(part.id)}><div className="part-card-top"><PartGlyph part={part}/><div className="card-actions"><button className={favorites.includes(part.id) ? "active" : ""} aria-label={favorites.includes(part.id) ? "Remove favorite" : "Favorite"} onClick={(e) => { e.stopPropagation(); toggleFavorite(part.id); }}><Icon name="star" size={16}/></button><button className={compare.includes(part.id) ? "active" : ""} aria-label="Add to compare" onClick={(e) => { e.stopPropagation(); toggleCompare(part.id); }}><Icon name="compare" size={16}/></button></div></div><div className="part-meta"><span>{part.domain}</span><span>{part.verification}</span><span className="sample-chip">{part.utility === null ? "Seed" : "Sample"}</span></div><h3>{part.name}</h3><p>{part.description}</p><dl className="key-specs">{Object.entries(part.specs).slice(0, 3).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><div className="mini-scores"><span><i style={{ width: `${part.utility ?? 0}%` }}/><b>{part.utility ?? "?"}</b> Utility</span><span><i style={{ width: `${part.commonness ?? 0}%` }}/><b>{part.commonness ?? "?"}</b> Commonness</span></div><div className="limitation"><strong>Check</strong>{part.limitation}</div><footer><button onClick={(e) => { e.stopPropagation(); setSelectedId(part.id); }}>Open passport</button><button className="primary-small" onClick={(e) => { e.stopPropagation(); addToBom(part.id); }}><Icon name="plus" size={14}/> Project</button></footer></article>)}</div>{filtered.length > visibleCards.length && <div className="show-all-results"><p>Showing the first {visibleCards.length} card results.</p><button className="action-button" onClick={() => setActive("explorer")}>Explore all {filtered.length} matches</button></div>}</> : <div className="empty-state"><div className="empty-mark"><Icon name="search" size={28}/></div><h3>No family matches every term</h3><p>Try a broader job description, remove a filter, or search by an interface such as “M3” or “I²C.”</p><button onClick={() => { setQuery(""); setDomain("All domains"); setCategory("All categories"); }}>Reset search</button></div>}
        </section>
      </>}

      {active === "explorer" && (
        <ExplorerWorkspace favoriteIds={favorites} compareIds={compare} onOpen={setSelectedId} onFavorite={toggleFavorite} onCompare={toggleCompare} onAddToBOM={addToBom}/>
      )}
      {active === "categories" && <section className="simple-page"><PageHeading eyebrow="Browse" title="Categories" body="Move from a system or function toward a curated family—not a wall of supplier listings."/><div className="full-category-grid">{categories.map((item, index) => <button key={item.name} onClick={() => { setCategory(item.name); setActive("discover"); }}><span className={`category-visual v${(index % 4) + 1}`}><i/><i/><i/></span><span><small>{item.domain}</small><strong>{item.name}</strong><p>{item.note}</p></span><b>{item.count} {item.count === 1 ? "family" : "families"}</b></button>)}</div></section>}
      {active === "interfaces" && <section className="simple-page"><PageHeading eyebrow="Compatibility starts here" title="Interfaces" body="Search reusable mechanical, electrical, mounting, and communication definitions before choosing a part."/><div className="interface-list">{interfaces.map((item) => <article key={item.id}><div className="interface-icon"><Icon name="link"/></div><div><div className="part-meta"><span>{item.domain}</span><span>{item.confidence} confidence</span></div><h3>{item.name}</h3><p>{item.definition}</p><dl><div><dt>Standard</dt><dd>{item.standard}</dd></div><div><dt>Connection</dt><dd>{item.connection}</dd></div></dl><aside><strong>Constraint</strong>{item.limitations}</aside></div><button onClick={() => { const related = parts.find((part) => part.interfaces.includes(item.id)); if (related) { setSelectedId(related.id); setActive("discover"); } else notify("No sample family is linked yet"); }}>View linked parts <Icon name="chevron" size={14}/></button></article>)}</div></section>}
      {active === "compare" && <CompareWorkspace ids={compare} onRemove={toggleCompare} onAddToBOM={addToBom} onBrowse={() => setActive("discover")}/>} 
      {active === "bom" && <BOMWorkspace lines={bom} setLines={setBom} notify={notify} onBrowse={() => setActive("discover")}/>} 
      {active === "my-parts" && <MyPartsWorkspace favoriteIds={favorites} stock={stock} setStock={setStock} notes={notes} setNotes={setNotes} customParts={customParts} setCustomParts={setCustomParts} onOpen={(id) => { setSelectedId(id); setActive("discover"); }}/>} 
      {active === "updates" && <UpdatesWorkspace onBackup={() => { backup(); notify("Full local backup downloaded"); }} onRestore={restore} onFreshStart={freshStart} notify={notify}/>} 
      {active === "help" && <HelpWorkspace/>}
      {active.startsWith("curator") || ["sources","imports","review","canonical","rules","proposals","quality","releases"].includes(active) ? <CuratorWorkspace active={active} decisions={reviewDecisions} setDecisions={setReviewDecisions} notify={notify}/> : null}
    </section>

    {selected && <aside className="inspector" aria-label="Part Passport"><header><div><span className="eyebrow">Part Passport</span><code>{selected.id}</code></div><button className="icon-button" onClick={() => setSelectedId(null)} aria-label="Close Part Passport"><Icon name="close"/></button></header><div className="inspector-scroll"><div className="passport-hero"><PartGlyph part={selected}/><div className="part-meta"><span>{selected.domain}</span><span>{selected.verification}</span><span className="sample-chip">{selected.utility === null ? "Seed" : "Sample"}</span></div><h2>{selected.name}</h2><p>{selected.description}</p></div>{selected.warning && <div className="warning"><strong>Important limitation</strong><p>{selected.warning}</p></div>}<div className="passport-scores"><Meter value={selected.utility} label="Prototype utility"/><Meter value={selected.commonness} label="Observed commonness"/></div><section><h3>Why makers reach for it</h3><p>{selected.why}</p></section><section><h3>Normalized specifications</h3><dl className="passport-specs">{Object.entries(selected.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section><section><h3>Interfaces</h3><div className="tag-list">{selected.interfaces.length ? selected.interfaces.map((id) => <button key={id} onClick={() => setActive("interfaces")}><Icon name="link" size={13}/>{interfaces.find((item) => item.id === id)?.name ?? id}</button>) : <span className="unknown">No reusable interface recorded</span>}</div></section><section><h3>Good for</h3><div className="tag-list">{selected.stages.map((item) => <span key={item}>{item}</span>)}</div></section><section><h3>Verify before committing</h3><p>{selected.limitation}</p></section><section className="evidence-note"><Icon name="shield"/><div><h3>Evidence state</h3><p>{selected.utility === null ? "This is a candidate seed for catalog coverage, not a verified recommendation. Scores, exact variants, sourcing, dimensions, standards, interfaces, price, and stock remain Unknown until reviewed." : "This is a detailed demonstration record. Scores exercise the interface and are not published census results. Supplier price and stock remain Unknown."}</p></div></section></div><footer><button className={favorites.includes(selected.id) ? "soft-button active" : "soft-button"} onClick={() => toggleFavorite(selected.id)}><Icon name="star" size={16}/>{favorites.includes(selected.id) ? "Saved" : "Save"}</button><button className="primary-button" onClick={() => addToBom(selected.id)}><Icon name="plus" size={16}/>Add to project</button></footer></aside>}

    <footer className="statusbar"><span><i className={`status-dot ${online ? "green" : "amber"}`}/>{online ? "Online" : "Offline"}</span><span><i className={`status-dot ${saveState === "Saved" ? "green" : saveState === "Error" ? "red" : "amber"}`}/>{saveState}</span><span>App v{versionInfo.application}</span><span>Catalog {versionInfo.catalog}</span><span>Schema {versionInfo.schema}</span><span className="status-mode">{mode === "maker" ? "Maker Mode" : "Curator Mode"}</span></footer>
    {toast && <div className="toast" role="status"><Icon name="check" size={16}/>{toast}</div>}
  </main>;
}

function CuratorButton({ id, label, icon, active, setActive, count }: { id: string; label: string; icon: IconName; active: string; setActive: (id: string) => void; count?: number }) { return <button className={active === id ? "active" : ""} onClick={() => setActive(id)}><Icon name={icon}/><span>{label}</span>{count ? <b>{count}</b> : null}</button>; }
function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <header className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{body}</p></header>; }
