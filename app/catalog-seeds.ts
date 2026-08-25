import type { Domain } from "./data";

export type CatalogSeed = {
  domain: Domain;
  category: string;
  subcategory: string;
  name: string;
};

type SeedGroup = Omit<CatalogSeed, "name"> & { names: string[] };

const groups: SeedGroup[] = [
  {
    domain: "Electronic", category: "Passives", subcategory: "Resistors",
    names: [
      "100 ohm quarter-watt through-hole resistor", "220 ohm quarter-watt through-hole resistor", "330 ohm quarter-watt through-hole resistor",
      "1 kilohm quarter-watt through-hole resistor", "2.2 kilohm quarter-watt through-hole resistor", "4.7 kilohm quarter-watt through-hole resistor",
      "10 kilohm quarter-watt through-hole resistor", "47 kilohm quarter-watt through-hole resistor", "100 kilohm quarter-watt through-hole resistor",
      "1 megohm quarter-watt through-hole resistor", "10 kilohm resistor-network array", "assorted one-percent metal-film resistor kit",
    ],
  },
  {
    domain: "Electronic", category: "Passives", subcategory: "Capacitors and inductors",
    names: [
      "100 picofarad ceramic capacitor", "1 nanofarad ceramic capacitor", "10 nanofarad ceramic capacitor", "100 nanofarad ceramic decoupling capacitor",
      "1 microfarad ceramic capacitor", "10 microfarad electrolytic capacitor", "47 microfarad electrolytic capacitor", "100 microfarad electrolytic capacitor",
      "470 microfarad electrolytic capacitor", "1,000 microfarad electrolytic capacitor", "assorted film-capacitor kit", "10 microhenry power inductor",
      "100 microhenry power inductor", "common-mode choke family", "ferrite bead family",
    ],
  },
  {
    domain: "Electronic", category: "Semiconductors", subcategory: "Diodes and indicators",
    names: [
      "1N4148 small-signal diode", "1N4007 rectifier diode", "1N5819 Schottky diode", "5.1 volt Zener diode", "bidirectional transient-voltage-suppression diode family",
      "3 millimeter indicator light-emitting diode", "5 millimeter indicator light-emitting diode", "addressable RGB light-emitting diode", "infrared emitter diode", "infrared photodiode",
      "bridge rectifier module", "phototransistor family",
    ],
  },
  {
    domain: "Electronic", category: "Semiconductors", subcategory: "Transistors and integrated circuits",
    names: [
      "2N3904 NPN small-signal transistor", "2N3906 PNP small-signal transistor", "2N2222 NPN switching transistor", "logic-level N-channel power MOSFET family",
      "small-signal N-channel MOSFET family", "P-channel load-switch MOSFET family", "Darlington transistor array", "PC817 optocoupler family",
      "LM358 dual operational-amplifier family", "LM393 dual comparator family", "NE555 timer family", "74HC14 Schmitt-trigger inverter family",
      "74HC595 serial-in parallel-out register", "74HC165 parallel-in serial-out register", "74HC00 quad NAND gate", "CD4017 decade counter",
      "analog multiplexer family", "rail-to-rail operational-amplifier breakout", "instrumentation-amplifier breakout", "precision voltage-reference family",
    ],
  },
  {
    domain: "Electronic", category: "Power conversion", subcategory: "Regulation and charging",
    names: [
      "7805 five-volt linear regulator family", "3.3 volt low-dropout regulator family", "adjustable linear-regulator family", "fixed five-volt buck-converter module",
      "adjustable boost-converter module", "buck-boost converter module", "isolated direct-current converter module", "USB Type-C power-delivery trigger module",
      "single-cell lithium-ion charger module", "single-cell lithium-ion protection module", "two-cell battery-management module", "constant-current light-emitting-diode driver module",
      "breadboard power-supply module", "panel-mount direct-current voltmeter module",
    ],
  },
  {
    domain: "Electronic", category: "Microcontroller boards", subcategory: "Development boards and computers",
    names: [
      "Arduino Nano-compatible development board", "Arduino Mega-compatible development board", "Raspberry Pi Pico development board", "ESP32 development board",
      "ESP8266 development board", "BBC micro:bit development board", "Seeed Studio XIAO form-factor development board", "RP2040 compact development board",
      "ARM Cortex-M0 development board family", "ARM Cortex-M4 development board family", "Raspberry Pi Zero form-factor computer", "single-board Linux computer family",
    ],
  },
  {
    domain: "Electronic", category: "Sensors", subcategory: "Environmental and optical sensors",
    names: [
      "DS18B20 digital temperature sensor", "10 kilohm NTC thermistor", "type-K thermocouple interface module", "barometric-pressure sensor breakout",
      "air-quality sensor breakout", "carbon-dioxide sensor module", "soil-moisture sensor family", "rain-detection sensor module", "photoresistor light sensor",
      "digital ambient-light sensor breakout", "passive infrared motion sensor", "time-of-flight distance sensor breakout", "ultrasonic distance sensor module",
      "infrared reflective sensor module", "flame sensor module", "microphone sound-level breakout",
    ],
  },
  {
    domain: "Electronic", category: "Sensors", subcategory: "Motion, force, and position sensors",
    names: [
      "six-axis inertial measurement unit breakout", "three-axis accelerometer breakout", "three-axis magnetometer breakout", "Hall-effect switch sensor",
      "linear Hall-effect sensor", "reed-switch magnetic sensor", "load cell with amplifier module", "force-sensitive resistor", "flex sensor family",
      "rotary encoder module", "optical interrupter sensor", "inductive proximity sensor", "capacitive proximity sensor", "liquid-level float switch",
      "water-flow pulse sensor", "current-sensor breakout", "voltage-divider sensor module",
    ],
  },
  {
    domain: "Electronic", category: "Motor drivers", subcategory: "Motion-control electronics",
    names: [
      "dual brushed-direct-current motor-driver breakout", "TB6612FNG motor-driver breakout", "L298N dual H-bridge module", "A4988 stepper-driver module",
      "DRV8825 stepper-driver module", "silent stepper-driver module family", "PCA9685 sixteen-channel pulse-width-modulation driver", "brushless-motor electronic-speed-controller family",
      "servo signal tester", "solenoid driver module", "high-side load-switch module", "four-channel MOSFET switching module",
    ],
  },
  {
    domain: "Electronic", category: "Switching and protection", subcategory: "Relays, fuses, and protection",
    names: [
      "single-channel five-volt relay module", "four-channel relay module", "direct-current solid-state relay family", "alternating-current solid-state relay family",
      "miniature automotive blade-fuse holder", "resettable polymer fuse family", "glass-cartridge fuse holder", "reverse-polarity protection module",
      "flyback-diode module", "electrostatic-discharge protection-array family", "surge-protection metal-oxide varistor family", "crowbar overvoltage-protection module",
    ],
  },
  {
    domain: "Electronic", category: "Displays and indicators", subcategory: "Visual output",
    names: [
      "0.96 inch I²C organic light-emitting-diode display", "16 × 2 character liquid-crystal display", "20 × 4 character liquid-crystal display", "single-digit seven-segment display",
      "four-digit seven-segment display module", "8 × 8 light-emitting-diode matrix module", "addressable RGB light-emitting-diode strip", "e-paper display module family",
      "small serial thin-film-transistor display", "panel-mount indicator lamp family", "light bar-graph display", "neopixel-style ring module",
    ],
  },
  {
    domain: "Electronic", category: "User controls", subcategory: "Human input",
    names: [
      "6 millimeter tactile pushbutton", "12 millimeter tactile pushbutton", "10 kilohm rotary potentiometer", "10 kilohm slide potentiometer",
      "incremental rotary encoder with push switch", "two-axis analog joystick module", "four-by-four membrane keypad", "capacitive-touch button module",
      "single-pole slide switch", "dual-inline-package switch bank", "thumbwheel potentiometer", "panel-mount emergency-stop switch family",
    ],
  },
  {
    domain: "Electronic", category: "Communication interfaces", subcategory: "Wired and wireless interfaces",
    names: [
      "USB-to-UART serial adapter", "RS-485 transceiver module", "CAN-bus transceiver module", "W5500 Ethernet module",
      "microSD storage module", "real-time clock module", "433 megahertz radio transmitter-receiver pair", "LoRa radio module family",
      "Bluetooth serial module family", "Wi-Fi coprocessor module family", "near-field-communication reader module", "global-navigation-satellite-system receiver module",
      "infrared remote-control receiver module", "I²C port-expander breakout", "SPI flash-memory breakout", "isolated serial-interface module",
    ],
  },
  {
    domain: "Electronic", category: "Connectors", subcategory: "Board and wire connectors",
    names: [
      "2.54 millimeter male pin-header strip", "2.54 millimeter female socket-header strip", "2.54 millimeter jumper-wire housing family", "JST-PH two-pin connector family",
      "JST-XH connector family", "locking wire-to-wire connector family", "two-position 5.08 millimeter terminal block", "three-position 5.08 millimeter terminal block",
      "pluggable terminal-block family", "2.1 millimeter direct-current barrel jack", "USB Type-C power breakout", "micro-USB power breakout",
      "panel-mount USB feedthrough family", "panel-mount RJ45 feedthrough family", "BNC panel connector family", "SMA radio-frequency connector family",
      "3.5 millimeter audio jack family", "RCA phono connector family", "banana binding-post family", "insulated spade-terminal family",
      "ring-terminal assortment", "Dupont-style jumper-wire set", "ribbon-cable insulation-displacement connector family", "dual-inline integrated-circuit socket family",
    ],
  },
  {
    domain: "Electronic", category: "Batteries and power entry", subcategory: "Portable and bench power",
    names: [
      "single 18650 battery holder", "dual 18650 battery holder", "four-cell AA battery holder", "six-cell AA battery holder", "nine-volt battery clip",
      "single-cell lithium-polymer pouch battery family", "sealed lead-acid battery family", "panel-mount fused power-entry module", "panel-mount rocker power switch",
      "bench-supply binding-post adapter", "automotive accessory-socket plug", "USB power-bank module family",
    ],
  },
  {
    domain: "Electronic", category: "Wire and prototyping", subcategory: "Wire, cable, and prototyping media",
    names: [
      "22 American Wire Gauge solid hookup wire", "22 American Wire Gauge stranded hookup wire", "18 American Wire Gauge silicone wire", "four-conductor ribbon cable",
      "shielded twisted-pair signal cable", "assorted heat-shrink tubing kit", "solderless breadboard", "half-size solderless breadboard", "plated through-hole prototyping board",
      "stripboard prototyping board", "copper-clad laminate board", "alligator-clip test-lead set", "silicone oscilloscope test-lead wire", "wire ferrule assortment",
    ],
  },
  {
    domain: "Electromechanical", category: "Motors", subcategory: "Rotary motors",
    names: [
      "TT-style plastic gearmotor", "6 volt micro metal gearmotor family", "12 volt metal gearmotor family", "130-size brushed direct-current motor",
      "370-size brushed direct-current motor", "775-size brushed direct-current motor", "small brushless outrunner motor family", "NEMA 14 frame stepper motor",
      "NEMA 23 frame stepper motor", "28BYJ-48 geared stepper motor", "continuous-rotation hobby servo", "micro hobby servo", "standard-size metal-gear hobby servo",
    ],
  },
  {
    domain: "Electromechanical", category: "Actuators and fluid handling", subcategory: "Linear, pneumatic, and fluid actuators",
    names: [
      "five-volt push-pull solenoid", "12 volt push-pull solenoid", "miniature linear-actuator family", "12 volt diaphragm pump", "five-volt peristaltic pump",
      "submersible direct-current water pump", "miniature vacuum pump", "12 volt two-way solenoid valve", "micro air pump", "standard pneumatic cylinder family",
    ],
  },
  {
    domain: "Electromechanical", category: "Fans, sound, and switching", subcategory: "Cooling, audio, and switches",
    names: [
      "40 millimeter direct-current axial fan", "60 millimeter direct-current axial fan", "80 millimeter direct-current axial fan", "centrifugal blower fan family",
      "piezoelectric buzzer", "magnetic buzzer", "8 ohm miniature loudspeaker", "electret microphone capsule", "roller-lever limit switch",
      "miniature snap-action switch", "panel-mount toggle switch", "panel-mount rocker switch", "key-operated switch family", "rotary selector switch family",
      "panel-mount digital encoder", "miniature power relay family",
    ],
  },
  {
    domain: "Mechanical", category: "Fasteners", subcategory: "Metric screws, nuts, and washers",
    names: [
      "M2 × 6 millimeter socket-head cap screw", "M2.5 × 8 millimeter socket-head cap screw", "M3 × 6 millimeter socket-head cap screw", "M3 × 10 millimeter socket-head cap screw",
      "M3 × 12 millimeter socket-head cap screw", "M3 × 16 millimeter socket-head cap screw", "M4 × 10 millimeter socket-head cap screw", "M4 × 16 millimeter socket-head cap screw",
      "M5 × 10 millimeter socket-head cap screw", "M5 × 20 millimeter socket-head cap screw", "M6 × 20 millimeter socket-head cap screw", "M3 hex nut",
      "M3 nylon-insert locknut", "M4 hex nut", "M5 hex nut", "M6 hex nut", "M3 flat washer", "M4 flat washer", "M5 flat washer", "M6 flat washer",
    ],
  },
  {
    domain: "Mechanical", category: "Fasteners", subcategory: "Imperial screws and general hardware",
    names: [
      "number 4-40 machine-screw family", "number 6-32 machine-screw family", "number 8-32 machine-screw family", "quarter-inch-20 machine-screw family",
      "number 4-40 hex nut", "number 6-32 hex nut", "number 8-32 hex nut", "quarter-inch-20 hex nut", "assorted split lock-washer kit",
      "assorted external-tooth washer kit", "small cotter-pin assortment", "clevis-pin assortment", "E-clip retaining-ring assortment", "snap-ring assortment",
    ],
  },
  {
    domain: "Mechanical", category: "Threaded inserts and standoffs", subcategory: "Reusable threaded hardware",
    names: [
      "M3 brass heat-set insert for thermoplastics", "M4 brass heat-set insert for thermoplastics", "M5 T-slot nut family", "M3 rivet-nut family",
      "M4 rivet-nut family", "M3 captive square nut", "M3 press-fit PEM-style nut family", "M3 male-female hex standoff", "M3 female-female hex standoff",
      "number 4-40 female-female hex standoff", "nylon printed-circuit-board spacer assortment", "threaded insert for wood family",
    ],
  },
  {
    domain: "Mechanical", category: "Bearings and bushings", subcategory: "Rotary and linear bearings",
    names: [
      "625 deep-groove ball bearing", "626 deep-groove ball bearing", "688 deep-groove ball bearing", "6000 deep-groove ball bearing", "6001 deep-groove ball bearing",
      "flanged miniature ball-bearing family", "thrust ball-bearing family", "needle-roller bearing family", "oil-impregnated bronze bushing family", "flanged polymer bushing family",
      "LM8UU linear ball bearing", "LM10UU linear ball bearing", "pillow-block bearing unit family", "mounted flanged bearing unit family",
    ],
  },
  {
    domain: "Mechanical", category: "Shafts, collars, and hubs", subcategory: "Rotary interfaces",
    names: [
      "5 millimeter precision round shaft", "6 millimeter precision round shaft", "8 millimeter precision round shaft", "10 millimeter precision round shaft", "12 millimeter precision round shaft",
      "5 millimeter clamp-style shaft collar", "6 millimeter clamp-style shaft collar", "10 millimeter clamp-style shaft collar", "set-screw shaft-collar assortment",
      "5-to-8 millimeter flexible shaft coupling", "6.35-to-8 millimeter flexible shaft coupling", "rigid shaft-coupling family", "jaw-coupling family", "universal-joint coupling family",
      "clamping hub family", "set-screw hub family", "keyed shaft and hub family",
    ],
  },
  {
    domain: "Mechanical", category: "Motion transmission", subcategory: "Belts, pulleys, gears, and screws",
    names: [
      "GT2 twenty-tooth pulley for 5 millimeter shaft", "GT2 twenty-tooth pulley for 8 millimeter shaft", "GT2 idler pulley family", "HTD 3M timing-belt family",
      "HTD 5M timing-belt family", "round polyurethane drive-belt family", "miniature roller-chain family", "spur-gear assortment", "module 0.5 spur-gear family",
      "module 1 spur-gear family", "worm-gear set family", "bevel-gear set family", "rack-and-pinion family", "T8 lead-screw family", "T8 lead-screw nut family",
      "ball-screw family", "anti-backlash lead-screw nut family",
    ],
  },
  {
    domain: "Mechanical", category: "Linear motion", subcategory: "Guides and slides",
    names: [
      "8 millimeter supported linear-shaft family", "10 millimeter supported linear-shaft family", "MGN9 miniature linear-rail family", "MGN12 miniature linear-rail family",
      "MGN15 miniature linear-rail family", "V-slot wheel family", "Delrin V-wheel family", "miniature ball-bearing drawer slide", "full-extension drawer-slide family",
      "linear-bushing pillow-block family", "dovetail slide family", "crossed-roller slide family", "telescoping rail family",
    ],
  },
  {
    domain: "Mechanical", category: "Structural systems", subcategory: "Extrusion, brackets, and framing",
    names: [
      "20 × 40 millimeter structural extrusion", "30 × 30 millimeter structural extrusion", "40 × 40 millimeter structural extrusion", "OpenBuilds C-Beam profile family",
      "2020 extrusion corner bracket", "2040 extrusion corner bracket", "adjustable extrusion joining plate", "T-slot drop-in nut family", "T-slot roll-in nut family",
      "V-slot gantry plate family", "maker-style perforated metal channel", "slotted steel angle family", "modular tube-clamp framing family",
    ],
  },
  {
    domain: "Mechanical", category: "Wheels and mobility", subcategory: "Wheels, casters, and mobile hardware",
    names: [
      "65 millimeter robot wheel", "90 millimeter robot wheel", "omnidirectional wheel family", "Mecanum wheel family", "skate wheel with 608 bearings",
      "small swivel caster", "small locking swivel caster", "fixed plate caster", "ball-transfer unit family", "rubber equipment-foot family", "threaded leveling-foot family",
    ],
  },
  {
    domain: "Mechanical", category: "Springs, hinges, and latches", subcategory: "Mechanism hardware",
    names: [
      "compression-spring assortment", "extension-spring assortment", "torsion-spring assortment", "constant-force spring family", "miniature piano-hinge family",
      "small butt-hinge family", "friction-hinge family", "spring-loaded hinge family", "draw-latch family", "toggle-latch family", "magnetic cabinet latch",
      "quarter-turn panel latch family", "recessed equipment handle family", "folding equipment handle family",
    ],
  },
  {
    domain: "Mechanical", category: "Magnets and isolation", subcategory: "Retention and vibration control",
    names: [
      "10 millimeter disc neodymium magnet", "20 millimeter disc neodymium magnet", "rectangular neodymium magnet family", "pot magnet with threaded stud",
      "rubber vibration-isolation mount family", "wire-rope vibration isolator family", "silicone equipment-foot family", "closed-cell foam gasket tape",
      "rubber grommet assortment", "O-ring assortment", "shaft-seal family", "felt pad family",
    ],
  },
  {
    domain: "Mechanical", category: "Enclosures and cable management", subcategory: "Boxes, glands, and routing",
    names: [
      "small ABS project box", "medium ABS project box", "die-cast aluminum electronics enclosure", "polycarbonate weather-resistant enclosure",
      "desktop instrument enclosure family", "19-inch rack-panel family", "PG7 cable gland", "PG9 cable gland", "M12 cable gland", "snap-in strain-relief bushing family",
      "adhesive cable-tie mount", "screw-mount cable-tie base", "nylon cable-tie assortment", "hook-and-loop cable wrap", "split braided cable sleeving",
      "spiral cable wrap", "cable carrier drag-chain family", "DIN-rail mounting clip family",
    ],
  },
  {
    domain: "Mechanical", category: "Pneumatics and tubing", subcategory: "Fluid connections",
    names: [
      "4 millimeter polyurethane pneumatic tubing", "6 millimeter polyurethane pneumatic tubing", "push-to-connect straight fitting family", "push-to-connect elbow fitting family",
      "push-to-connect tee fitting family", "barbed hose fitting family", "silicone tubing family", "vinyl tubing family", "miniature hose-clamp assortment",
      "manual needle-valve family", "check-valve family", "small pressure-regulator family",
    ],
  },
  {
    domain: "Mechanical", category: "Knobs and control hardware", subcategory: "Human-machine hardware",
    names: [
      "6 millimeter shaft instrument knob", "quarter-inch shaft instrument knob", "collet-style instrument knob family", "pointer knob family", "knurled thumb-screw family",
      "star knob with threaded stud", "star knob with threaded insert", "handwheel family", "indexing plunger family", "spring-loaded ball detent family",
    ],
  },
  {
    domain: "Material", category: "Raw materials", subcategory: "Sheet, plate, rod, and tube",
    names: [
      "3 millimeter birch plywood sheet", "6 millimeter birch plywood sheet", "12 millimeter birch plywood sheet", "medium-density fiberboard sheet family",
      "3 millimeter cast acrylic sheet", "6 millimeter cast acrylic sheet", "polycarbonate sheet family", "high-density polyethylene sheet family", "acetal sheet family",
      "6061 aluminum sheet family", "5052 aluminum sheet family", "mild-steel sheet family", "stainless-steel sheet family", "aluminum flat-bar family",
      "aluminum angle family", "aluminum round-tube family", "mild-steel square-tube family", "brass rod family", "copper sheet family", "FR-4 laminate sheet family",
    ],
  },
  {
    domain: "Material", category: "Additive manufacturing", subcategory: "Three-dimensional printing materials",
    names: [
      "1.75 millimeter PLA filament", "1.75 millimeter PETG filament", "1.75 millimeter ABS filament", "1.75 millimeter ASA filament", "1.75 millimeter TPU flexible filament",
      "1.75 millimeter nylon filament", "carbon-fiber-filled filament family", "support-material filament family", "standard ultraviolet-curing printing resin", "tough ultraviolet-curing printing resin",
    ],
  },
  {
    domain: "Material", category: "Adhesives and consumables", subcategory: "Bonding, soldering, and shop consumables",
    names: [
      "medium-viscosity cyanoacrylate adhesive", "two-part five-minute epoxy", "two-part structural epoxy family", "removable thread-locking compound", "high-strength thread-locking compound",
      "hot-melt glue stick family", "double-sided acrylic foam tape", "general-purpose double-sided tape", "contact adhesive family", "silicone sealant family",
      "lead-free electronics solder", "tin-lead electronics solder", "no-clean flux pen", "solder-wick assortment", "isopropyl alcohol electronics cleaner",
      "Kapton-style polyimide tape", "masking tape", "layout dye and marking fluid family", "abrasive-paper assortment", "hook-and-loop fastener tape",
    ],
  },
];

export const catalogSeeds: CatalogSeed[] = groups.flatMap(({ names, ...group }) => names.map((name) => ({ ...group, name })));
