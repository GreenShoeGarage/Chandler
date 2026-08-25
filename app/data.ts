import { catalogSeeds } from "./catalog-seeds";

export type Domain = "Electronic" | "Electromechanical" | "Mechanical" | "Material";

export type InterfaceRecord = {
  id: string;
  name: string;
  domain: string;
  definition: string;
  standard: string;
  connection: string;
  limitations: string;
  confidence: "High" | "Medium" | "Low";
};

export type PartRecord = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  domain: Domain;
  category: string;
  subcategory: string;
  description: string;
  why: string;
  limitation: string;
  utility: number | null;
  commonness: number | null;
  confidence: "High" | "Medium" | "Low";
  verification: "Suggested" | "Data checked" | "Bench tested" | "Recommended" | "Watch";
  sample: true;
  interfaces: string[];
  specs: Record<string, string>;
  stages: string[];
  attributes: string[];
  aliases: string[];
  standards: string[];
  alternatives: { id: string; class: "A" | "B" | "C" | "D"; note: string }[];
  assets: string[];
  tools: string[];
  warning?: string;
};

export const interfaces: InterfaceRecord[] = [
  {
    id: "CH-I-000017",
    name: "M3 × 0.5 threaded fastening",
    domain: "Threaded fastening",
    definition: "ISO metric M3 nominal thread with 0.5 millimeter coarse pitch.",
    standard: "ISO 261 / ISO 965",
    connection: "Threaded fastener into tapped hole, nut, or insert",
    limitations: "Engagement, material, preload, and strength class still require design review.",
    confidence: "High",
  },
  {
    id: "CH-I-000021",
    name: "608 bearing envelope",
    domain: "Bearing and housing",
    definition: "8 millimeter bore × 22 millimeter outside diameter × 7 millimeter width.",
    standard: "ISO 15 dimensional series",
    connection: "8 millimeter shaft and 22 millimeter housing bore",
    limitations: "Fit class, clearance, sealing, speed, and load rating vary by variant.",
    confidence: "High",
  },
  {
    id: "CH-I-000024",
    name: "8 millimeter round shaft",
    domain: "Shaft and hub",
    definition: "8 millimeter nominal cylindrical shaft interface.",
    standard: "Application-specific tolerances",
    connection: "Bore, clamp, set screw, press fit, or bearing",
    limitations: "An 8 millimeter nominal bore does not establish the required fit.",
    confidence: "High",
  },
  {
    id: "CH-I-000031",
    name: "20 millimeter T-slot ecosystem",
    domain: "Structural extrusion",
    definition: "20 millimeter modular extrusion profile with ecosystem-specific slot geometry.",
    standard: "No universal cross-vendor interchangeability standard",
    connection: "T-nut, corner bracket, joining plate, or anchor fastener",
    limitations: "Slot geometry and hardware compatibility differ across V-slot and T-slot ecosystems.",
    confidence: "Medium",
  },
  {
    id: "CH-I-000038",
    name: "GT2 2 millimeter timing profile",
    domain: "Belt and pulley",
    definition: "Curvilinear synchronous belt tooth profile with 2 millimeter pitch.",
    standard: "Manufacturer profile specifications",
    connection: "Matched belt and pulley tooth profile",
    limitations: "Pitch alone does not establish belt width, tensile member, or torque capacity.",
    confidence: "Medium",
  },
  {
    id: "CH-I-000044",
    name: "5 volt transistor-transistor logic",
    domain: "Electrical signal",
    definition: "Nominal 5 volt digital signaling with device-specific thresholds.",
    standard: "Device datasheet",
    connection: "Logic signal and common reference",
    limitations: "Do not assume 3.3 volt devices are 5 volt tolerant.",
    confidence: "High",
  },
  {
    id: "CH-I-000049",
    name: "I²C two-wire bus",
    domain: "Communication protocol",
    definition: "Open-drain serial data and clock lines with pull-up resistors.",
    standard: "NXP UM10204",
    connection: "SDA, SCL, reference, and compatible supply domain",
    limitations: "Address conflicts, bus capacitance, voltage domains, and pull-ups must be checked.",
    confidence: "High",
  },
  {
    id: "CH-I-000055",
    name: "2.54 millimeter breadboard grid",
    domain: "Electrical mounting",
    definition: "0.1 inch / 2.54 millimeter through-hole lead and header pitch.",
    standard: "Common prototyping convention",
    connection: "Through-hole lead, socket, or pin header",
    limitations: "Pitch compatibility does not establish pinout or electrical compatibility.",
    confidence: "High",
  },
];

const detailedParts: PartRecord[] = [
  {
    id: "CH-M-000184", slug: "m3x8-socket-head-cap-screw", name: "M3 × 8 millimeter socket-head cap screw", shortName: "M3 × 8 SHCS", domain: "Mechanical", category: "Fasteners", subcategory: "Machine screws",
    description: "A compact metric machine screw that is convenient for printed parts, small mechanisms, electronics enclosures, and fixtures.",
    why: "The 3 millimeter system is compact, widely tooled, and supported by nuts, heat-set inserts, standoffs, washers, and tapped components.",
    limitation: "Length, engagement, material, head clearance, and strength class must be checked for the joint.", utility: 92, commonness: 89, confidence: "High", verification: "Data checked", sample: true,
    interfaces: ["CH-I-000017"], specs: { Thread: "M3 × 0.5", Length: "8 mm under head", Drive: "Hex socket", System: "Metric", Stock: "Unknown", Price: "Unknown" },
    stages: ["Proof of concept", "Functional prototype", "Test fixture", "Low-volume production"], attributes: ["Hand-tool friendly", "Reusable", "Broad ecosystem"], aliases: ["M3x8 SHCS", "M3 socket bolt 8mm", "DIN 912 M3x8"], standards: ["ISO 4762 / DIN 912 geometry reference"],
    alternatives: [{ id: "CH-M-000188", class: "C", note: "Button-head screw may work after checking head envelope and drive." }], assets: ["Dimension drawing reference"], tools: ["2.5 mm hex key"],
  },
  {
    id: "CH-M-000188", slug: "m3x8-button-head-screw", name: "M3 × 8 millimeter button-head screw", shortName: "M3 × 8 BHCS", domain: "Mechanical", category: "Fasteners", subcategory: "Machine screws",
    description: "A low-profile M3 fastener with a broad rounded head for light-duty assemblies and accessible surfaces.", why: "Its low visual profile and broad head are useful where a socket-head cap screw is too tall.", limitation: "Lower drive depth and reduced head strength make it a poor choice for high preload.", utility: 77, commonness: 66, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: ["CH-I-000017"], specs: { Thread: "M3 × 0.5", Length: "8 mm under head", Drive: "Hex socket", System: "Metric", Stock: "Unknown", Price: "Unknown" }, stages: ["Appearance prototype", "Functional prototype", "Educational use"], attributes: ["Hand-tool friendly", "Low-profile head"], aliases: ["M3x8 button screw", "M3 low profile screw"], standards: ["ISO 7380 geometry reference"], alternatives: [{ id: "CH-M-000184", class: "C", note: "Socket-head screw requires more head clearance." }], assets: ["Dimension drawing reference"], tools: ["2 mm hex key"],
  },
  {
    id: "CH-M-000242", slug: "608-deep-groove-bearing", name: "608 deep-groove ball bearing", shortName: "608 bearing", domain: "Mechanical", category: "Bearings and bushings", subcategory: "Ball bearings",
    description: "A widely available compact radial ball-bearing envelope used in rollers, small machines, fixtures, and educational mechanisms.", why: "The 8 × 22 × 7 millimeter envelope has broad availability and a large supporting ecosystem of shafts, wheels, and printed housings.", limitation: "Shield, seal, internal clearance, precision, lubricant, load, and speed ratings vary substantially.", utility: 90, commonness: 94, confidence: "High", verification: "Data checked", sample: true,
    interfaces: ["CH-I-000021", "CH-I-000024"], specs: { Bore: "8 mm", "Outside diameter": "22 mm", Width: "7 mm", Type: "Deep groove", Stock: "Unknown", Price: "Unknown" }, stages: ["Proof of concept", "Functional prototype", "Test fixture", "Repair and replacement"], attributes: ["Broad ecosystem", "Reusable", "CAD reference available"], aliases: ["608ZZ", "608-2RS", "skate bearing", "8x22x7 bearing"], standards: ["ISO 15 dimensional series"], alternatives: [], assets: ["Envelope STEP reference", "Dimension drawing reference"], tools: ["Bearing press or controlled arbor method"], warning: "Suffixes such as ZZ and 2RS describe closure styles, not identical performance.",
  },
  {
    id: "CH-M-000265", slug: "eight-millimeter-shaft-collar", name: "8 millimeter clamp-style shaft collar", shortName: "8 mm shaft collar", domain: "Mechanical", category: "Shafts, collars, and hubs", subcategory: "Shaft collars",
    description: "A split clamp collar for locating components, setting travel stops, and retaining 8 millimeter shafts without a point load from a set screw.", why: "Clamp collars are adjustable, reusable, and less likely to mar shafting than set-screw collars.", limitation: "Holding force depends on shaft finish, tolerance, clamp design, and applied torque.", utility: 88, commonness: 75, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: ["CH-I-000024"], specs: { Bore: "8 mm nominal", Style: "One-piece clamp", Material: "Variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Functional prototype", "Test fixture", "Pilot build"], attributes: ["Hand-tool friendly", "Reusable", "Adjustable"], aliases: ["8mm collar", "8 mm split collar", "shaft stop"], standards: [], alternatives: [], assets: ["Simplified envelope model"], tools: ["Hex key"],
  },
  {
    id: "CH-M-000310", slug: "twenty-millimeter-extrusion", name: "20 × 20 millimeter structural extrusion", shortName: "2020 extrusion", domain: "Mechanical", category: "Structural systems", subcategory: "Aluminum extrusion",
    description: "A modular aluminum profile used for frames, guards, test rigs, small machines, and adjustable workshop fixtures.", why: "It enables rapid, reversible assembly with little machining and supports a broad bracket and fastener ecosystem.", limitation: "T-slot, V-slot, slot width, center cavity, and fastener systems are not universally interchangeable.", utility: 93, commonness: 86, confidence: "High", verification: "Data checked", sample: true,
    interfaces: ["CH-I-000031"], specs: { Envelope: "20 × 20 mm", Material: "Aluminum alloy; variant dependent", Slot: "Ecosystem dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Proof of concept", "Functional prototype", "Test fixture", "Low-volume production"], attributes: ["Hand-tool friendly", "Reusable", "Adjustable", "Broad ecosystem"], aliases: ["2020 extrusion", "20mm profile", "2020 V-slot rail", "2020 T-slot"], standards: ["Supplier ecosystem geometry"], alternatives: [], assets: ["Cross-section drawing reference", "Simplified STEP envelope"], tools: ["Hex keys", "Square", "Saw or cut-to-length service"], warning: "Confirm the exact ecosystem before selecting nuts, brackets, wheels, or joining hardware.",
  },
  {
    id: "CH-M-000344", slug: "gt2-six-millimeter-belt", name: "GT2-profile 6 millimeter timing belt", shortName: "GT2 6 mm belt", domain: "Mechanical", category: "Motion transmission", subcategory: "Timing belts",
    description: "A compact synchronous belt commonly used for light-duty positioning systems and maker-scale motion axes.", why: "The 2 millimeter pitch supports compact pulleys and smooth motion with a large prototyping ecosystem.", limitation: "Width, tooth profile, tensile member, tension, wrap angle, speed, and torque capacity require verification.", utility: 84, commonness: 83, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: ["CH-I-000038"], specs: { Pitch: "2 mm", Width: "6 mm", Length: "Variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Proof of concept", "Functional prototype", "Educational use"], attributes: ["Low noise", "Broad ecosystem", "No lubrication"], aliases: ["GT2 belt", "2mm pitch belt", "6mm timing belt"], standards: ["Manufacturer tooth-profile definition"], alternatives: [], assets: ["Tooth profile reference"], tools: ["Tensioning method", "Straightedge"],
  },
  {
    id: "CH-E-000042", slug: "five-volt-buck-regulator-module", name: "Adjustable buck-regulator module", shortName: "Buck module", domain: "Electronic", category: "Power conversion", subcategory: "Direct-current converters",
    description: "A small step-down converter module for producing a lower regulated direct-current rail during prototyping.", why: "A module can validate power architecture quickly without committing to a board-level regulator design.", limitation: "Input range, output current, thermal behavior, ripple, layout, protection, and module authenticity vary.", utility: 91, commonness: 81, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: [], specs: { Input: "Variant dependent", Output: "Adjustable; variant dependent", Current: "Unknown until variant selected", Stock: "Unknown", Price: "Unknown" }, stages: ["Breadboard", "Proof of concept", "Test fixture"], attributes: ["Bench friendly", "Reusable module", "Screw-terminal variants"], aliases: ["DC DC step down", "buck converter", "5V regulator module"], standards: [], alternatives: [], assets: ["Reference wiring note"], tools: ["Digital multimeter", "Current-limited supply"], warning: "Set and verify output voltage before connecting the load.",
  },
  {
    id: "CH-E-000071", slug: "bidirectional-logic-level-shifter", name: "Four-channel bidirectional logic-level shifter module", shortName: "Logic level shifter", domain: "Electronic", category: "Logic and level conversion", subcategory: "Level translators",
    description: "A small module commonly used to explore low-speed open-drain signal translation between 3.3 volt and 5 volt systems.", why: "It is breadboard friendly and convenient for early I²C experiments between mixed-voltage modules.", limitation: "Common metal-oxide-semiconductor field-effect transistor modules are not universal translators and may fail for push-pull, high-speed, or strongly pulled buses.", utility: 74, commonness: 70, confidence: "Medium", verification: "Watch", sample: true,
    interfaces: ["CH-I-000044", "CH-I-000049", "CH-I-000055"], specs: { Channels: "4", "Typical use": "Low-speed open-drain buses", Package: "Breadboard module", Stock: "Unknown", Price: "Unknown" }, stages: ["Breadboard", "Proof of concept", "Educational use"], attributes: ["Breadboard friendly", "Hand-solderable headers"], aliases: ["5v level shifter", "3.3 to 5v converter", "I2C level converter"], standards: [], alternatives: [], assets: ["Reference circuit"], tools: ["Digital multimeter", "Oscilloscope recommended"], warning: "Confirm signal direction, edge rate, and device thresholds before use.",
  },
  {
    id: "CH-E-000103", slug: "arduino-compatible-atmega328p-board", name: "ATmega328P Arduino-compatible development board", shortName: "ATmega328P board", domain: "Electronic", category: "Microcontroller boards", subcategory: "Development boards",
    description: "A mature 5 volt microcontroller development platform with extensive beginner documentation and shield-compatible variants.", why: "It is forgiving, well documented, simple to power, and widely supported in workshops and classrooms.", limitation: "Memory, processing, communications, and 5 volt logic make it unsuitable for some modern connected products.", utility: 88, commonness: 93, confidence: "High", verification: "Recommended", sample: true,
    interfaces: ["CH-I-000044", "CH-I-000055", "CH-I-000049"], specs: { Logic: "5 V", Microcontroller: "ATmega328P family", Programming: "USB interface; variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Breadboard", "Proof of concept", "Educational use", "Test fixture"], attributes: ["Breadboard adjacent", "Large documentation ecosystem", "Hand-solderable headers"], aliases: ["Arduino Uno compatible", "328p dev board", "uno board"], standards: ["Board-layout ecosystem; variant dependent"], alternatives: [], assets: ["Pinout reference", "Example circuits", "EDA references"], tools: ["USB cable", "Computer"],
  },
  {
    id: "CH-E-000128", slug: "digital-temperature-humidity-breakout", name: "Digital temperature and humidity sensor breakout", shortName: "Temperature sensor", domain: "Electronic", category: "Sensors", subcategory: "Environmental sensors",
    description: "A breakout-board sensor for measuring room-scale temperature and relative humidity during prototypes and experiments.", why: "Digital breakouts reduce assembly effort and let makers validate placement, logging, and control concepts quickly.", limitation: "Accuracy, response time, condensation tolerance, self-heating, address, and supply range depend on the exact sensor.", utility: 85, commonness: 79, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: ["CH-I-000049", "CH-I-000055"], specs: { Measurement: "Temperature and relative humidity", Protocol: "I²C typical", Accuracy: "Variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Breadboard", "Proof of concept", "Educational use"], attributes: ["Breadboard friendly", "Library support common"], aliases: ["room temperature Arduino", "humidity sensor", "I2C temperature sensor"], standards: [], alternatives: [], assets: ["Example circuit", "Library references"], tools: ["Development board", "Jumper wires"],
  },
  {
    id: "CH-EM-000012", slug: "nema-seventeen-stepper-motor", name: "NEMA 17 frame stepper motor", shortName: "NEMA 17 stepper", domain: "Electromechanical", category: "Motors", subcategory: "Stepper motors",
    description: "A stepper-motor frame size widely used for small positioning systems, feeders, laboratory fixtures, and maker machines.", why: "The mounting pattern has a broad ecosystem of brackets, couplers, pulleys, and drivers.", limitation: "NEMA 17 defines a frame envelope, not torque, current, winding, shaft, connector, or dynamic performance.", utility: 89, commonness: 90, confidence: "High", verification: "Data checked", sample: true,
    interfaces: [], specs: { Frame: "NEMA 17 nominal", Torque: "Variant dependent", Current: "Variant dependent", Shaft: "Variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Proof of concept", "Functional prototype", "Test fixture"], attributes: ["Broad ecosystem", "Position control", "Reusable"], aliases: ["42mm stepper", "NEMA17 motor", "3D printer motor"], standards: ["NEMA motor frame convention"], alternatives: [], assets: ["Mounting envelope reference"], tools: ["Compatible current-regulating stepper driver", "Power supply"], warning: "Select the driver from winding current and voltage requirements, not frame size alone.",
  },
  {
    id: "CH-EM-000037", slug: "sixteen-millimeter-panel-pushbutton", name: "16 millimeter panel-mount momentary pushbutton", shortName: "16 mm pushbutton", domain: "Electromechanical", category: "Panel controls", subcategory: "Pushbuttons",
    description: "A compact panel control for human input on enclosures, test fixtures, and one-off instruments.", why: "The nominal panel cutout is easy to produce and variants cover illumination, contact form, and ingress protection.", limitation: "Cutout tolerance, anti-rotation features, contact ratings, seal claims, and rear clearance vary.", utility: 82, commonness: 72, confidence: "Medium", verification: "Suggested", sample: true,
    interfaces: [], specs: { Cutout: "16 mm nominal; verify drawing", Action: "Momentary", Contacts: "Variant dependent", Stock: "Unknown", Price: "Unknown" }, stages: ["Appearance prototype", "Functional prototype", "Test fixture"], attributes: ["Panel friendly", "Hand-wirable variants"], aliases: ["16mm button", "panel push switch", "momentary panel button"], standards: [], alternatives: [], assets: ["Panel cutout reference"], tools: ["Step drill or chassis punch", "Wire termination tools"],
  },
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function seedId(domain: Domain, index: number) {
  const prefix = domain === "Electronic" ? "E" : domain === "Electromechanical" ? "EM" : domain === "Material" ? "MAT" : "M";
  return `CH-${prefix}-${String(index + 1000).padStart(6, "0")}`;
}

const generatedParts: PartRecord[] = catalogSeeds
  .filter((seed) => !detailedParts.some((part) => part.name.toLowerCase() === seed.name.toLowerCase()))
  .map((seed, index) => ({
    id: seedId(seed.domain, index),
    slug: slugify(seed.name),
    name: seed.name,
    shortName: seed.name,
    domain: seed.domain,
    category: seed.category,
    subcategory: seed.subcategory,
    description: `${seed.name} is included as a candidate starter family for prototype selection, comparison, and Bill of Materials planning.`,
    why: "This family represents a commonly encountered maker and prototype-building need and is included to make the catalog broadly explorable from the first run.",
    limitation: "Candidate seed record: select and verify the exact variant, dimensions, ratings, tolerances, material, interfaces, and authoritative documentation before use.",
    utility: null,
    commonness: null,
    confidence: "Low",
    verification: "Suggested",
    sample: true,
    interfaces: [],
    specs: { Family: seed.subcategory, "Exact variant": "Required", Stock: "Unknown", Price: "Unknown" },
    stages: ["Breadboard", "Proof of concept", "Functional prototype", "Educational use"],
    attributes: ["Candidate seed", "Requires review"],
    aliases: [seed.name.toLowerCase(), seed.subcategory.toLowerCase()],
    standards: [],
    alternatives: [],
    assets: [],
    tools: [],
  }));

export const parts: PartRecord[] = [...detailedParts, ...generatedParts];

const categoryNotes: Record<string, string> = {
  "Passives": "Resistors, capacitors, inductors, and conditioning parts",
  "Semiconductors": "Diodes, transistors, logic, and analog building blocks",
  "Power conversion": "Regulation, charging, conversion, and power modules",
  "Microcontroller boards": "Development boards and small computers",
  "Sensors": "Environmental, optical, motion, position, and force sensing",
  "Motor drivers": "Motor, servo, solenoid, and load-control electronics",
  "Switching and protection": "Relays, fuses, suppression, and protection",
  "Displays and indicators": "Visual output, indicators, and display modules",
  "User controls": "Buttons, potentiometers, encoders, and human input",
  "Communication interfaces": "Wired, wireless, storage, and bus interfaces",
  "Connectors": "Board, wire, panel, and test connections",
  "Batteries and power entry": "Portable power, holders, and power entry",
  "Wire and prototyping": "Wire, cable, breadboards, and prototyping media",
  "Motors": "Rotary motors, gearmotors, steppers, and servos",
  "Actuators and fluid handling": "Solenoids, pumps, valves, and linear actuators",
  "Fans, sound, and switching": "Cooling, audio, and physical switches",
  "Fasteners": "Metric, imperial, retaining, and general fastening hardware",
  "Threaded inserts and standoffs": "Reusable threads, captive hardware, and spacing",
  "Bearings and bushings": "Rotary support and low-friction interfaces",
  "Shafts, collars, and hubs": "Rotary shafts, retention, hubs, and couplings",
  "Motion transmission": "Belts, pulleys, gears, chain, and lead screws",
  "Linear motion": "Linear shafts, rails, bushings, and slides",
  "Structural systems": "Extrusion, brackets, channel, and modular framing",
  "Wheels and mobility": "Robot wheels, casters, and leveling hardware",
  "Springs, hinges, and latches": "Stored energy, pivots, closure, and handles",
  "Magnets and isolation": "Magnetic retention, sealing, and vibration control",
  "Enclosures and cable management": "Project boxes, glands, strain relief, and routing",
  "Pneumatics and tubing": "Tubing, push fittings, hose hardware, and valves",
  "Knobs and control hardware": "Knobs, handwheels, plungers, and detents",
  "Raw materials": "Sheet, plate, bar, rod, tube, and laminate stock",
  "Additive manufacturing": "Filament, resin, and support materials",
  "Adhesives and consumables": "Bonding, soldering, tape, and shop consumables",
};

export const categories = [...new Set(parts.map((part) => part.category))]
  .map((name) => ({
    name,
    domain: parts.find((part) => part.category === name)?.domain ?? "Mechanical",
    count: parts.filter((part) => part.category === name).length,
    note: categoryNotes[name] ?? "Curated prototype component families",
  }))
  .sort((a, b) => {
    const domainOrder: Record<Domain, number> = { Electronic: 0, Electromechanical: 1, Mechanical: 2, Material: 3 };
    return domainOrder[a.domain] - domainOrder[b.domain] || a.name.localeCompare(b.name);
  });

export const sources = [
  { id: "SRC-OSHWA", name: "Open Source Hardware Association", method: "Application Programming Interface", terms: "Reviewed", license: "Project-specific", status: "Ready", last: "Not yet imported" },
  { id: "SRC-GITHUB", name: "GitHub hardware repositories", method: "Repository content", terms: "Per repository", license: "Per repository", status: "Ready", last: "Not yet imported" },
  { id: "SRC-HACKADAY", name: "Hackaday.io", method: "Application Programming Interface", terms: "Review required", license: "Project-specific", status: "Paused", last: "Not yet imported" },
  { id: "SRC-MANUAL", name: "Manual tabular import", method: "Local file or paste", terms: "Curator supplied", license: "Curator supplied", status: "Ready", last: "Demo workspace" },
];

export const observations = [
  { id: "OBS-00000001", source: "SRC-MANUAL", project: "demo-corexy", original: "M3x8 SHCS", qty: 24, unit: "each", candidate: "CH-M-000184", confidence: 0.98, state: "Matched" },
  { id: "OBS-00000002", source: "SRC-MANUAL", project: "demo-roller", original: "608ZZ", qty: 4, unit: "each", candidate: "CH-M-000242", confidence: 0.96, state: "Matched" },
  { id: "OBS-00000003", source: "SRC-MANUAL", project: "demo-frame", original: "2020 V-slot rail 500mm", qty: 6, unit: "length", candidate: "CH-M-000310", confidence: 0.84, state: "Review" },
  { id: "OBS-00000004", source: "SRC-MANUAL", project: "demo-sensor", original: "temp+humidity module", qty: 1, unit: "each", candidate: "CH-E-000128", confidence: 0.63, state: "Review" },
];

export const rules = [
  { id: "RULE-0014", type: "Alias", pattern: "SHCS", replacement: "socket-head cap screw", scope: "Fasteners", priority: 40, version: "1.2", state: "Approved" },
  { id: "RULE-0021", type: "Dimension", pattern: "{number}x{number}", replacement: "nominal × length", scope: "Metric fasteners", priority: 55, version: "1.4", state: "Approved" },
  { id: "RULE-0033", type: "Alias", pattern: "608ZZ", replacement: "608 bearing + dual metal shields", scope: "Bearings", priority: 60, version: "1.1", state: "Approved" },
  { id: "RULE-0048", type: "Taxonomy", pattern: "V-slot rail", replacement: "structural extrusion / V-slot", scope: "Structures", priority: 30, version: "0.9", state: "Draft" },
];

export const releaseHistory = [
  { version: "2026.08.24-starter", date: "2026-08-24", families: parts.length, observations: observations.length, state: "Active", note: "Expanded vendor-neutral starter catalog with 12 detailed passports and candidate seed coverage" },
  { version: "2026.08.24-demo", date: "2026-08-24", families: 12, observations: 4, state: "Checkpoint", note: "Previous detailed demonstration baseline" },
  { version: "2026.08.10-demo", date: "2026-08-10", families: 8, observations: 3, state: "Checkpoint", note: "Initial demonstration baseline" },
];

export const versionInfo = { application: "0.2.0", catalog: "2026.08.24-starter", schema: 3 };
