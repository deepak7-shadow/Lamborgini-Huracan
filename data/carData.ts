export interface CarSpec {
  label: string;
  value: string;
  unit?: string;
  detail?: string;
}

export interface DriveMode {
  id: string;
  name: string;
  badge: string;
  tone: string;
  description: string;
  accent: string;
  gearShift: string;
  exhaust: string;
  esc: string;
}

export const carData = {
  model: "HURACÁN",
  brand: "LAMBORGHINI",
  badge: "LP 640-4 PERFORMANTE",
  edition: "SANT'AGATA BOLOGNESE SPECIAL EDITION",
  tagline: "FORGED IN CARBON. DRIVEN BY INSTINCT.",
  price: {
    usd: "$261,274",
    eur: "€245,000",
    disclaimer: "BASE MSRP EXCLUDING DESTINATION & BESPOKE AD PERSONAM OPTIONS",
  },
  status: "LIMITED PRODUCTION ALLOCATION",
  phases: {
    hero: {
      phaseTag: "PHASE 01 // OVERVIEW",
      title: "LAMBORGHINI HURACÁN",
      subtitle: "NATURALLY ASPIRATED V10 AERODINAMICA",
      price: "$261,274",
      highlightMetric: "640 CV",
      highlightMetricLabel: "MAX POWER",
      secondaryMetric: "2.9s",
      secondaryMetricLabel: "0-100 KM/H",
      topSpeed: "325 KM/H",
      description:
        "Engineered to slice through turbulence. The Huracán fuses extreme aerodynamic downforce with the raw, visceral howl of a 5.2-liter naturally aspirated V10.",
      cta: "INITIALIZE INQUIRY",
    },
    design: {
      phaseTag: "PHASE 02 // CHASSIS & AERODYNAMICS",
      title: "FORGED COMPOSITES® & ALA",
      subtitle: "AERODINAMICA LAMBORGHINI ATTIVA",
      description:
        "The Huracán incorporates patented Forged Composites® carbon matrix structure, enabling complex aerodynamic geometries impossible with conventional weave. Active aerodynamics dynamically adapt downforce and drag in milliseconds.",
      metrics: [
        { label: "CHASSIS", value: "HYBRID", detail: "CARBON FIBER & ALUMINUM" },
        { label: "DRY WEIGHT", value: "1,382", unit: "KG", detail: "43/57 WEIGHT DISTRIBUTION" },
        { label: "AERO DOWNFORCE", value: "+750%", detail: "OVER STANDARD COUPE" },
        { label: "DOWNFORCE BIAS", value: "AERO VECTORING", detail: "ACTIVE FLAPS SYSTEM" },
      ],
      designNotes: [
        "Hexagonal aeronautical design language inspired by stealth fighter jets",
        "Full carbon fiber rear wing with integrated internal active air channels",
        "Front splitter with active electrically actuated aerodynamic flaps",
      ],
    },
    engine: {
      phaseTag: "PHASE 03 // POWERTRAIN & TELEMETRY",
      title: "5.2L NATURALLY ASPIRATED V10",
      subtitle: "8,500 RPM OF ACOUSTIC PURITY",
      description:
        "No turbos. No latency. Pure mechanical resonance. Titanium intake valves, dry sump lubrication, and high-pressure dual injection deliver razor-sharp throttle response that redlines into a thunderous Italian symphony.",
      specs: [
        { label: "DISPLACEMENT", value: "5,204", unit: "CC" },
        { label: "MAX POWER", value: "640", unit: "CV / 470 kW @ 8,000 RPM" },
        { label: "MAX TORQUE", value: "600", unit: "NM @ 6,500 RPM" },
        { label: "0-100 KM/H", value: "2.9", unit: "SECONDS" },
        { label: "0-200 KM/H", value: "8.9", unit: "SECONDS" },
        { label: "BRAKING 100-0", value: "31.5", unit: "METERS (CCB)" },
        { label: "TOP SPEED", value: "> 325", unit: "KM/H (202 MPH)" },
        { label: "TRANSMISSION", value: "7-SPEED LDF", unit: "DUAL-CLUTCH GEARBOX" },
      ],
    },
  },
  driveModes: [
    {
      id: "strada",
      name: "STRADA",
      badge: "COMFORT / GT",
      tone: "Smooth traction & linear touring throttle",
      description: "Optimized for high-speed cruising with active dampening and seamless shifts.",
      accent: "#D4AF37",
      gearShift: "Smooth electro-hydraulic transitions",
      exhaust: "Variable bypass flaps open above 4,000 RPM",
      esc: "Maximum stability intervention",
    },
    {
      id: "sport",
      name: "SPORT",
      badge: "REAR-BIASED / DRIFT",
      tone: "Rear-wheel power bias for oversteer exhilaration",
      description: "Unleashes rear-biased torque delivery with thunderous exhaust backfires on throttle lift.",
      accent: "#FF9900",
      gearShift: "Aggressive, intermediate quick-shift cadence",
      exhaust: "Permanent open bypass for unfiltered V10 bark",
      esc: "Dynamic slip allowance with torque vectoring",
    },
    {
      id: "corsa",
      name: "CORSA",
      badge: "TRACK / MOTORSPORT",
      tone: "Zero compromise. Millisecond paddle response.",
      description: "Formula 1 calibrated gear shifting with telemetry logging and maximum aerodynamic stiffness.",
      accent: "#FF3333",
      gearShift: "Instantaneous violent clutch engagement",
      exhaust: "Maximum acoustic projection directly via race manifolds",
      esc: "Minimal track calibration / Race ABS active",
    },
  ] as DriveMode[],
  technicalDetails: [
    {
      category: "BRAKING SYSTEM",
      title: "Carbon Ceramic Brakes (CCB)",
      specs: [
        "Front: 380mm x 38mm ventilated discs with 6-piston monobloc calipers",
        "Rear: 356mm x 32mm discs with 4-piston calipers",
        "Bespoke titanium heat shields & track cooling ducts",
      ],
    },
    {
      category: "DYNAMICS & SUSPENSION",
      title: "MagneRide & Dynamic Steering (LDS)",
      specs: [
        "Magneto-rheological dampers reacting within 2 milliseconds",
        "Double wishbone aluminum suspension architecture",
        "Lamborghini Piattaforma Inerziale (LPI) 3D sensor array",
      ],
    },
    {
      category: "AERODYNAMICS",
      title: "Aero Vectoring Active Aero (ALA)",
      specs: [
        "Twin active aero flaps integrated inside the front spoiler",
        "Electro-actuated rear wing channeling with L/R vectoring",
        "Zero-compromise high downforce or low drag on command",
      ],
    },
    {
      category: "COCKPIT ARCHITECTURE",
      title: "Aeronautic Digital HUD & Alcantara",
      specs: [
        "12.3-inch configurable TFT digital cockpit instrumentation",
        "Forged carbon air vents, paddles, and door release handles",
        "Sport bucket racing seats wrapped in black laser-etched Alcantara",
      ],
    },
  ],
  dealership: {
    name: "AUTOMOBILI LAMBORGHINI S.P.A.",
    location: "Sant'Agata Bolognese, Bologna, Italy",
    coordinates: "44.6625° N, 11.1278° E",
    conciergePhone: "+39 051 9597282",
    email: "vip.concierge@lamborghini.it",
  },
};
