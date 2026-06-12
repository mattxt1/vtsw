import type {
  ProductCategory,
  ProductFinish,
  ProductHighlight,
  ProductSpecGroup,
} from "../types/content";
import type { ProductProfile } from "./productProfiles";

type Pair = [label: string, value: string];

const highlights = (...items: Pair[]): ProductHighlight[] =>
  items.map(([value, label]) => ({ value, label }));

const specs = (title: string, ...items: Pair[]): ProductSpecGroup => ({
  title,
  items: items.map(([label, value]) => ({ label, value })),
});

const finishes = (...items: Pair[]): ProductFinish[] =>
  items.map(([name, color]) => ({ name, color }));

const consumerFinishes = finishes(
  ["Atlas Black", "#101113"],
  ["Graphite", "#252729"],
  ["Arctic Silver", "#d8d6ce"],
);

const subscriptionProfile = (
  tagline: string,
  description: string,
  compatibility: string,
  featureItems: Pair[],
  highlightItems: Pair[],
): ProductProfile => ({
  tagline,
  description,
  highlights: highlights(...highlightItems),
  specifications: [
    specs(
      "Plan",
      ["Hardware compatibility", compatibility],
      ["Launch", "2027 model year"],
      ["Safety", "Legally required safety features remain active without a subscription"],
    ),
    specs("Included capabilities", ...featureItems),
  ],
});

export const atlasCategory: ProductCategory = {
  id: "atlas",
  eyebrow: "mobility preview",
  name: "atlas mobility",
  title: "Know the road ahead.",
  description:
    "A complete 2027 vehicle intelligence platform combining cameras, radar, lidar, maps, connectivity, vOS 27 mobility, and vela pulse a9 silicon.",
  media: {
    kind: "image",
    alt: "vela atlas sensors mapping the road around a vehicle",
  },
  groups: [
    {
      name: "consumer systems",
      models: ["atlas core", "atlas", "atlas pro", "atlas ultra"],
    },
    {
      name: "enterprise systems",
      models: ["atlas fleet", "atlas response"],
    },
    {
      name: "pilot + services",
      models: [
        "atlas connect",
        "atlas assist",
        "atlas pilot",
        "atlas pilot pro",
        "atlas pilot max",
        "atlas pilot ultra",
        "atlas scout",
        "atlas concierge",
        "atlas fleet command",
        "atlas response network",
      ],
    },
    {
      name: "atlas network",
      models: ["atlas network", "atlas link", "atlas satellite"],
    },
    {
      name: "vOS 27 mobility",
      models: [
        "atlas app",
        "atlas guardian",
        "atlas memory drive",
        "atlas trip view",
      ],
    },
  ],
  note:
    "Atlas is a preview of the 2027 model-year mobility platform. Availability, mapped-road coverage, regional approvals, installer access, and final service terms remain subject to change.",
};

export const atlasBasePrices: Record<string, number> = {
  "atlas core": 3999,
  atlas: 6999,
  "atlas pro": 12999,
  "atlas ultra": 24999,
  "atlas fleet": 14999,
  "atlas response": 39999,
  "atlas connect": 19,
  "atlas assist": 49,
  "atlas pilot": 129,
  "atlas pilot pro": 199,
  "atlas pilot max": 299,
  "atlas pilot ultra": 499,
  "atlas scout": 29,
  "atlas concierge": 99,
  "atlas fleet command": 399,
  "atlas response network": 3999,
};

export const atlasProfiles: Record<string, ProductProfile> = {
  "atlas core": {
    tagline: "Essential safety, connectivity, and driver assistance.",
    description:
      "The accessible atlas retrofit for older and mainstream vehicles, combining six-camera vision, front 4D radar, driver monitoring, and connected safety around vela pulse a9.",
    highlights: highlights(
      ["256 TOPS", "neural autonomy engine"],
      ["6 cameras", "atlas vision system"],
      ["1 front 4D radar", "object awareness"],
      ["10 years", "safety firmware updates"],
    ),
    specifications: [
      specs(
        "Compute",
        ["Chip", "vela pulse a9"],
        ["Architecture", "12-core CPU and 24-core GPU"],
        ["Autonomy engine", "256 TOPS"],
        ["Memory and cache", "16GB unified memory and 256GB local map cache"],
        ["Security", "Automotive secure enclave and secure event recorder"],
      ),
      specs(
        "Sensor system",
        ["Vision", "Six cameras including driver monitoring"],
        ["Radar", "One front 4D radar"],
        ["Localization", "GPS and IMU module"],
        ["LiDAR", "Not included"],
      ),
      specs(
        "Driver assistance",
        ["Highway", "Adaptive cruise, lane centering, and traffic-aware following"],
        ["Safety", "Emergency braking, blind-spot awareness, and driver monitoring"],
        ["Parking", "Parking visualization"],
        ["Recording", "Dashcam mode and remote vehicle status"],
      ),
      specs(
        "Connectivity and installation",
        ["Network", "5G sub-6, Wi-Fi 7, Bluetooth 5.4, and atlas link"],
        ["Installation", "Windshield camera bar, radar, side and rear cameras, hidden compute module"],
        ["Estimated install", "3.5-5 hours"],
        ["Support", "8 years hardware and 10 years safety firmware"],
      ),
    ],
    finishes: finishes(
      ["Gloss Black", "#101113"],
      ["Matte Graphite", "#252729"],
    ),
  },
  atlas: {
    tagline: "The complete everyday atlas system for modern vehicles.",
    description:
      "The default atlas recommendation for most consumer vehicles, with nine-camera exterior vision, cabin awareness, four radar units, high-precision localization, and vela pulse a9 pro.",
    highlights: highlights(
      ["512 TOPS", "neural autonomy engine"],
      ["9 cameras", "exterior vision system"],
      ["4 radar units", "surround awareness"],
      ["8 years", "hardware support"],
    ),
    specifications: [
      specs(
        "Compute",
        ["Chip", "vela pulse a9 pro"],
        ["Architecture", "16-core CPU and 36-core GPU"],
        ["Autonomy engine", "512 TOPS"],
        ["Memory and cache", "24GB unified memory and 512GB local storage"],
        ["Safety", "Redundant safety controller and triple sensor-fusion pipeline"],
      ),
      specs(
        "Sensor system",
        ["Exterior vision", "Nine-camera atlas vision system"],
        ["Cabin awareness", "Driver and occupancy cameras"],
        ["Radar", "Two front and two rear-corner 4D radar units"],
        ["LiDAR", "Not included as standard"],
      ),
      specs(
        "Pilot capability",
        ["Highway", "Smoother highway pilot and supported-road hands-on autonomy"],
        ["Navigation", "Confirmed automatic lane changes and interchange handling"],
        ["Awareness", "Traffic light, sign, night, and rain detection"],
        ["Guardian", "Advanced collision prediction and atlas guardian interventions"],
      ),
      specs(
        "Connectivity and installation",
        ["Network", "Wide-band 5G, optional mmWave, Wi-Fi 7, Bluetooth 5.4"],
        ["Local link", "atlas link pro with supported local vehicle awareness"],
        ["Estimated install", "5-7 hours"],
        ["Support", "8 years hardware and 10 years safety firmware"],
      ),
    ],
    finishes: consumerFinishes,
  },
  "atlas pro": {
    tagline: "Advanced sensor fusion for city, highway, and trail.",
    description:
      "The premium atlas system adds front LiDAR, a 12-camera vision array, 4D radar fusion, satellite safety connectivity, and vela pulse a9 max for supervised city and hands-free highway capability where approved.",
    highlights: highlights(
      ["900 TOPS", "neural autonomy engine"],
      ["12 cameras", "atlas vision pro"],
      ["Front LiDAR", "point-cloud confirmation"],
      ["12 years", "safety firmware updates"],
    ),
    specifications: [
      specs(
        "Compute",
        ["Chip", "vela pulse a9 max"],
        ["Architecture", "20-core CPU and 54-core GPU"],
        ["Autonomy engine", "900 TOPS"],
        ["Memory and cache", "48GB unified memory and 1TB local storage"],
        ["Redundancy", "Dual autonomy partitions, power safety module, and event-recorder enclave"],
      ),
      specs(
        "Sensor system",
        ["Vision", "12-camera atlas vision pro system"],
        ["Radar", "Four short/mid-range zones and dual long-range front channels"],
        ["LiDAR", "One front LiDAR scanner"],
        ["Cabin", "Driver monitoring and occupancy sensing"],
      ),
      specs(
        "Pilot capability",
        ["City", "Supervised city pilot on supported mapped roads"],
        ["Highway", "Hands-free highway pilot where approved"],
        ["Navigation", "Ramp-to-ramp navigation, intersections, signals, and stop signs"],
        ["Parking", "Automatic parking, remote parking, and private-lot summon"],
        ["Scout", "Trail and off-road assistance"],
      ),
      specs(
        "Network and ownership",
        ["Connectivity", "Wide-band 5G, mmWave, Wi-Fi 7, atlas link ultra"],
        ["Fallback", "atlas satellite low-band safety link"],
        ["Estimated install", "8-12 hours"],
        ["Support", "10 years hardware and 12 years safety firmware"],
      ),
    ],
    finishes: finishes(
      ["Atlas Black", "#101113"],
      ["Graphite", "#252729"],
      ["Natural Titanium", "#c8c0b4"],
    ),
  },
  "atlas ultra": {
    tagline: "The most advanced atlas system, built for premium vehicles.",
    description:
      "An invite-only, ultra-premium autonomy and mapping system with dual a9 ultra compute, sixteen-camera redundant vision, three LiDAR scanners, eight radar zones, and a custom vehicle-specific installation.",
    highlights: highlights(
      ["1,800 TOPS", "dual autonomy compute"],
      ["16 cameras", "redundant vision system"],
      ["3 LiDAR scanners", "front and rear fusion"],
      ["12 years", "hardware support"],
    ),
    specifications: [
      specs(
        "Compute",
        ["System", "Dual vela pulse a9 ultra compute modules"],
        ["Architecture", "32-core CPU and 96-core GPU per ultra module"],
        ["Autonomy engine", "1,800 TOPS"],
        ["Memory and cache", "96GB unified memory and 2TB local model/map cache"],
        ["Fallback", "Independent autonomy stacks and emergency safe-stop compute path"],
      ),
      specs(
        "Sensor system",
        ["Vision", "16-camera atlas vision ultra system"],
        ["LiDAR", "Dual front LiDAR and one rear LiDAR"],
        ["Radar", "Eight-zone surround radar array"],
        ["Localization", "Redundant GPS, IMU, wheel-speed, and steering bridge"],
      ),
      specs(
        "Pilot capability",
        ["Urban", "Advanced supervised urban pilot and enhanced maneuvering"],
        ["Private spaces", "Low-speed garage parking and driverless repositioning where legal"],
        ["Comfort", "Executive ride smoothing and predictive route comfort"],
        ["Scout", "atlas scout pro trail mode"],
        ["Fallback", "Severe-weather caution and emergency safe-stop"],
      ),
      specs(
        "Installation and support",
        ["Treatment", "Custom vehicle integration with hidden compute and factory-style controls"],
        ["Calibration", "Custom calibration and road-test certification"],
        ["Estimated install", "2-4 days"],
        ["Support", "12 years hardware and safety firmware"],
        ["Service", "Priority service included for the first three years"],
      ),
    ],
    finishes: finishes(
      ["Black Ceramic", "#0e0f10"],
      ["Natural Titanium", "#c8c1b6"],
      ["Graphite", "#252729"],
    ),
  },
  "atlas fleet": {
    tagline: "Commercial vehicle intelligence at fleet scale.",
    description:
      "An enterprise atlas system for delivery, rideshare, campus, security, and municipal fleets, combining commercial sensor hardware with telemetry, route safety, remote diagnostics, and controlled depot automation.",
    highlights: highlights(
      ["12 cameras", "commercial sensor system"],
      ["6 radar zones", "surround awareness"],
      ["Fleet command", "routing and telemetry"],
      ["8 years", "hardware support"],
    ),
    specifications: [
      specs(
        "Hardware",
        ["Compute", "vela pulse a9 max fleet module"],
        ["Vision", "12-camera commercial sensor system"],
        ["Radar", "Six-zone surround array"],
        ["LiDAR", "Optional front LiDAR"],
        ["Monitoring", "Driver, cabin, and cargo sensing with tamper detection"],
      ),
      specs(
        "Fleet intelligence",
        ["Operations", "Fleet dashboard, live status, and route optimization"],
        ["Safety", "Driver and route safety scores, fatigue alerts, and incident replay"],
        ["Maintenance", "Remote diagnostics and automated maintenance prediction"],
        ["Automation", "Geofenced pilot modes, depot arrival, and controlled yard movement"],
      ),
      specs(
        "Connectivity",
        ["Network", "Wide-band 5G, optional mmWave and satellite safety link"],
        ["Depot", "Wi-Fi 7 synchronization and Ethernet service port"],
        ["Service", "atlas fleet network with contract software support"],
      ),
    ],
    finishes: finishes(
      ["Commercial Black", "#101113"],
      ["Fleet Gray", "#747a80"],
      ["District Blue", "#496b95"],
    ),
  },
  "atlas response": {
    tagline: "Mission-ready awareness for approved public-safety fleets.",
    description:
      "A restricted government and public-safety atlas system with hardened redundant compute, thermal-assisted sensing, evidence-grade recording, emergency routing, and agency-controlled response networking.",
    highlights: highlights(
      ["Dual a9 ultra", "hardened response compute"],
      ["16 cameras", "redundant sensor coverage"],
      ["3 LiDAR scanners", "surround confirmation"],
      ["Agency only", "restricted availability"],
    ),
    specifications: [
      specs(
        "Hardened hardware",
        ["Compute", "Dual vela pulse a9 ultra response modules"],
        ["Vision", "16-camera redundant system with plate-recognition bar"],
        ["LiDAR and radar", "Dual front LiDAR, rear LiDAR, and eight radar zones"],
        ["Specialized sensing", "Thermal-assist module and redundant localization"],
        ["Evidence", "Tamper-evident, evidence-grade event recording"],
      ),
      specs(
        "Response capability",
        ["Routing", "Emergency corridor routing and blocked-road prediction"],
        ["Coordination", "Fleet-wide location, dispatch feed, and light/siren synchronization"],
        ["Awareness", "Parked perimeter view and officer-approach cameras"],
        ["Restricted controls", "Agency-managed maneuver and pursuit-assistance tools"],
        ["Responsibility", "The trained driver remains responsible at all times"],
      ),
      specs(
        "Network and compliance",
        ["Connectivity", "Carrier-unlocked 5G, mmWave, satellite, and agency radio bridge"],
        ["Mesh", "Encrypted vehicle-to-vehicle response network"],
        ["Audit", "Offline logging, public-safety audit trails, and incident export"],
        ["Support", "12 years hardware with agency contract updates"],
      ),
    ],
    finishes: finishes(
      ["Response Black", "#0e0f10"],
      ["Graphite", "#252729"],
      ["Emergency Blue", "#1557ff"],
      ["Emergency Red", "#c8172d"],
    ),
  },
  "atlas connect": subscriptionProfile(
    "The connected foundation for every atlas vehicle.",
    "Atlas connect keeps vehicle status, maps, safety events, maintenance, family access, and vOS handoff synchronized through the atlas network.",
    "All atlas hardware",
    [
      ["Vehicle access", "Remote status, theft tracking, and family vehicle sharing"],
      ["Maps", "Connected map and road-hazard updates"],
      ["Safety", "Emergency crash alerts and safety-event upload"],
      ["Ecosystem", "vOS vehicle widget and device-to-vehicle handoff"],
      ["Ownership", "Maintenance alerts and basic dashcam cloud backup"],
    ],
    [
      ["All atlas", "hardware compatibility"],
      ["3-5 years", "included with eligible hardware"],
      ["Connected", "maps and vehicle status"],
    ],
  ),
  "atlas assist": subscriptionProfile(
    "Everyday assistance, built on atlas guardian.",
    "A broader driver-assistance plan for atlas core and above, adding adaptive control, enhanced prediction, road alerts, and parking visualization.",
    "atlas core and above",
    [
      ["Driving", "Adaptive cruise, lane centering, and smart speed adjustment"],
      ["Safety", "Blind-spot assist, emergency steering, and collision prediction"],
      ["Awareness", "Traffic-aware route and road-hazard alerts"],
      ["Monitoring", "Driver attention and parking visualization"],
    ],
    [
      ["Core+", "hardware compatibility"],
      ["Guardian", "safety integration"],
      ["1-3 years", "included on selected hardware"],
    ],
  ),
  "atlas pilot": subscriptionProfile(
    "Supervised highway intelligence for the everyday drive.",
    "Atlas pilot brings supported-highway navigation, confirmed lane changes, assisted merging, and signal awareness to atlas hardware.",
    "atlas and above; limited capability on atlas core",
    [
      ["Highway", "Supervised pilot and ramp-to-ramp navigation"],
      ["Lane changes", "Automatic changes with driver confirmation"],
      ["Road awareness", "Traffic lights, stop signs, and merging behavior"],
      ["Attention", "Continuous driver-attention monitoring"],
    ],
    [
      ["Highway", "supervised pilot"],
      ["Ramp to ramp", "supported navigation"],
      ["Driver monitored", "at all times"],
    ],
  ),
  "atlas pilot pro": subscriptionProfile(
    "Hands-free highway capability where approved.",
    "Pilot pro adds approved-road hands-free driving, more autonomous lane behavior, urban arterial assistance, parking automation, and enhanced weather tuning.",
    "atlas and above; best on atlas pro and ultra",
    [
      ["Highway", "Hands-free pilot where approved"],
      ["Navigation", "Interchanges and automatic lane changes where legal"],
      ["Parking", "Automatic and remote parking"],
      ["Conditions", "Construction, night, and rain performance"],
      ["History", "30-day event history"],
    ],
    [
      ["Hands-free", "approved highways"],
      ["Automatic", "parking and lane changes"],
      ["30 days", "event history"],
    ],
  ),
  "atlas pilot max": subscriptionProfile(
    "Supervised city navigation on mapped roads.",
    "Pilot max unlocks the full atlas pro city experience, including intersections, turns, multi-lane navigation, private-lot summon, parking-garage assistance, and atlas scout.",
    "atlas pro and above",
    [
      ["City", "Supervised pilot on supported mapped roads"],
      ["Intersections", "Protected and unprotected turn assistance"],
      ["Prediction", "Pedestrian and cyclist behavior modeling"],
      ["Private spaces", "Valet-style summon and garage assistance"],
      ["History", "90-day event history"],
    ],
    [
      ["Mapped roads", "city pilot"],
      ["Scout", "included"],
      ["90 days", "event history"],
    ],
  ),
  "atlas pilot ultra": subscriptionProfile(
    "The complete supervised atlas ultra experience.",
    "Pilot ultra combines advanced urban supervision, garage-to-curb assistance, low-speed private-space autonomy, executive comfort, severe-weather caution, and emergency fallback.",
    "atlas ultra",
    [
      ["Urban", "Advanced supervised urban pilot"],
      ["Private spaces", "Garage-to-curb and low-speed repositioning where legal"],
      ["Comfort", "Executive ride smoothing"],
      ["Fallback", "Severe-weather caution and emergency safe-stop"],
      ["Priority", "Premium maps, routing, and one-year event history"],
    ],
    [
      ["Ultra only", "hardware compatibility"],
      ["1 year", "included with atlas ultra"],
      ["Safe-stop", "fallback system"],
    ],
  ),
  "atlas scout": subscriptionProfile(
    "See and understand the trail around you.",
    "Atlas scout extends atlas pro hardware beyond paved roads with trail visualization, incline and surface detection, low-speed assistance, breadcrumb return, and remote-location marking.",
    "atlas pro and above",
    [
      ["Trail view", "Off-road visualization and camera-guided wheel views"],
      ["Terrain", "Incline, surface, and water-depth caution where supported"],
      ["Assistance", "Low-speed trail guidance"],
      ["Return", "Breadcrumb route return and remote-location marking"],
    ],
    [
      ["Pro+", "hardware compatibility"],
      ["Trail", "visualization and assistance"],
      ["Breadcrumb", "route return"],
    ],
  ),
  "atlas concierge": subscriptionProfile(
    "Human support for more complex atlas ownership.",
    "Concierge combines priority support, remote diagnostics, calibration care, trip-readiness checks, service scheduling, and human review for complex incidents.",
    "atlas pro and above",
    [
      ["Support", "Priority assistance and human incident review"],
      ["Vehicle care", "Remote diagnostics and annual calibration check"],
      ["Service", "Mobile scheduling and trip-readiness scan"],
      ["Planning", "Road-trip planning across traffic, weather, charging, or fuel"],
    ],
    [
      ["Priority", "human support"],
      ["Annual", "calibration check"],
      ["1 year", "included with atlas ultra"],
    ],
  ),
  "atlas fleet command": subscriptionProfile(
    "One operational view across an atlas fleet.",
    "Fleet command unifies dispatch, routing, safety reporting, geofencing, maintenance, incident replay, insurance export, and depot automation.",
    "atlas fleet and approved atlas pro fleet contracts",
    [
      ["Operations", "Dashboard, dispatch integration, and route optimization"],
      ["Safety", "Driver reports, incident replay, and insurance export"],
      ["Control", "Geofencing and shift handoff logs"],
      ["Maintenance", "Prediction and depot automation"],
    ],
    [
      ["Per vehicle", "fleet service"],
      ["25+", "volume contract tier"],
      ["Depot", "automation support"],
    ],
  ),
  "atlas response network": subscriptionProfile(
    "A restricted command network for approved response fleets.",
    "The agency-only atlas response service provides encrypted coordination, emergency routing, evidence workflows, dispatch integration, and public-safety audit controls.",
    "atlas response",
    [
      ["Network", "Encrypted response mesh and remote command feed"],
      ["Dispatch", "Emergency route prediction and fleet-wide synchronization"],
      ["Evidence", "Event recording, plate scanning, and incident packages"],
      ["Compliance", "Agency controls and public-safety audit logs"],
    ],
    [
      ["Agency only", "restricted service"],
      ["Encrypted", "response mesh"],
      ["Evidence-grade", "recording workflow"],
    ],
  ),
  "atlas network": {
    tagline: "The connected road layer behind every atlas experience.",
    description:
      "The successor to vDrive Network combines wide-band connectivity, local atlas link awareness, satellite safety fallback, encrypted maps, road hazards, vehicle handoff, and fleet telemetry.",
    highlights: highlights(
      ["5G + mmWave", "wide-area connectivity"],
      ["Live hazards", "shared road intelligence"],
      ["Encrypted", "maps and telemetry"],
    ),
    specifications: [
      specs(
        "Network capabilities",
        ["Wide area", "5G wide band with mmWave where available"],
        ["Local", "atlas link short-range vehicle and device connection"],
        ["Fallback", "atlas satellite on eligible hardware"],
        ["Maps", "Encrypted updates and live road-hazard sharing"],
        ["Telemetry", "Emergency upload and fleet data where enabled"],
      ),
    ],
  },
  "atlas link": {
    tagline: "Low-latency awareness around the vehicle.",
    description:
      "Atlas link connects nearby vela devices, supported vehicles, garages, and local controls without depending on a wide-area network.",
    highlights: highlights(
      ["Short range", "low-latency connection"],
      ["Proximity", "phone and watch access"],
      ["Local", "parking and garage control"],
    ),
    specifications: [
      specs(
        "Local connection",
        ["Devices", "Phone and watch proximity unlock"],
        ["Home", "Garage and home beacon support"],
        ["Vehicles", "Local vehicle awareness where supported"],
        ["Control", "Parking-lot summon and low-latency commands"],
      ),
    ],
  },
  "atlas satellite": {
    tagline: "A safety link beyond conventional coverage.",
    description:
      "Atlas satellite provides low-band crash, location, route, disaster, and fleet check-in packets for eligible pro, ultra, fleet, and response hardware.",
    highlights: highlights(
      ["Remote areas", "location fallback"],
      ["Low band", "emergency packets"],
      ["Disaster mode", "network resilience"],
    ),
    specifications: [
      specs(
        "Satellite safety",
        ["Availability", "Standard on atlas pro, ultra, and response; optional on fleet"],
        ["Emergency", "Crash alert backup and remote-area location ping"],
        ["Route", "Status fallback and low-band text packets"],
        ["Operations", "Disaster mode and fleet fallback check-in"],
      ),
    ],
  },
  "atlas app": {
    tagline: "Your atlas vehicle, across every vela screen.",
    description:
      "The vOS 27 mobility control surface for vehicle status, subscriptions, calibration, safety reports, trips, recordings, maps, sensors, service, and software updates.",
    highlights: highlights(
      ["6 surfaces", "phone to vehicle display"],
      ["Live status", "vehicle and sensor health"],
      ["One place", "service and subscriptions"],
    ),
    specifications: [
      specs(
        "Experience",
        ["Surfaces", "Phone, tablet, notebook, watch, vehicle display, and fleet web"],
        ["Vehicle", "Status, calibration, sensor health, and software updates"],
        ["Journeys", "Trip history, recordings, driver score, and coverage maps"],
        ["Ownership", "Subscription management and service scheduling"],
      ),
    ],
  },
  "atlas guardian": {
    tagline: "The standard safety layer across every atlas system.",
    description:
      "Guardian keeps core collision, lane, pedestrian, attention, traffic, exit, and parked-vehicle protections active without requiring a paid autonomy plan.",
    highlights: highlights(
      ["Standard", "on every atlas system"],
      ["No plan required", "core safety features"],
      ["360° awareness", "driving and parked"],
    ),
    specifications: [
      specs(
        "Safety layer",
        ["Forward", "Collision prediction and emergency braking"],
        ["Lane", "Departure prevention and blind-spot monitoring"],
        ["People", "Pedestrian and cyclist detection"],
        ["Driver", "Attention and stopped-traffic warnings"],
        ["Parked", "Exit warning and perimeter awareness"],
      ),
    ],
  },
  "atlas memory drive": {
    tagline: "A route system that learns with permission.",
    description:
      "An opt-in, local-first vOS 27 mobility feature that learns frequent routes, preferred lanes, parking entries, recurring hazards, and better departure times.",
    highlights: highlights(
      ["Local first", "route intelligence"],
      ["Opt in", "privacy model"],
      ["Prepared", "routes before departure"],
    ),
    specifications: [
      specs(
        "Personal route memory",
        ["Learning", "Frequent routes, preferred lanes, and parking entries"],
        ["Safety", "Recurring hazards and safer departure suggestions"],
        ["Context", "Calendar and maps preparation"],
        ["Privacy", "Opt-in, deletable history, and admin-managed fleet retention"],
      ),
    ],
  },
  "atlas trip view": {
    tagline: "The road, sensors, and route in one live view.",
    description:
      "A real-time 3D road visualization combining maps and sensor fusion with turns, lane planning, signals, construction, vulnerable-road-user awareness, and weather.",
    highlights: highlights(
      ["Real-time 3D", "road visualization"],
      ["Map + sensors", "fused awareness"],
      ["5 displays", "vehicle and vela screens"],
    ),
    specifications: [
      specs(
        "Trip visualization",
        ["Road model", "Real-time 3D map and sensor fusion"],
        ["Navigation", "Turns, lane planning, and traffic-light countdown where supported"],
        ["Awareness", "Construction, pedestrian, cyclist, and weather alerts"],
        ["Displays", "Vehicle, phone, tablet, notebook, and vela tv route preview"],
      ),
    ],
  },
};
