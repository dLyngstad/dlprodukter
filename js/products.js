// Fil: products.js
const products = [
    {
        id: 'prod_005',
        ecwidId: '778175166',
        name: 'Prisklasse E12',
        price: '49.00',
        images: ['Bilder/bilde1.jpeg', 'Bilder/bilde2.jpeg'],
        description: 'Beskrivelse for Prisklasse E12.',
        moreInfo: 'Mer informasjon om produktet.'
    },
    {
        id: 'prod_006',
        ecwidId: '778175153',
        name: 'Prisklasse E13',
        price: '99.00',
        images: ['Bilder/bilde3.jpeg', 'Bilder/bilde4.jpeg'],
        description: 'Beskrivelse for Prisklasse E13.',
        moreInfo: 'Mer informasjon om produktet.'
    },
    {
        id: 'prod_007',
        ecwidId: '778180876',
        name: 'Prisklasse E14',
        price: '149.00',
        images: ['Bilder/bilde5.jpeg', 'Bilder/bilde6.jpeg'],
        description: 'Beskrivelse for Prisklasse E14.',
        moreInfo: 'Mer informasjon om produktet.'
    },
    {
        id: 'prod_008',
        ecwidId: '778175158',
        name: 'Prisklasse E16',
        price: '249.00',
        images: ['Bilder/bilde7.jpeg', 'Bilder/bilde8.jpeg'],
        description: 'Beskrivelse for Prisklasse E16.',
        moreInfo: 'Mer informasjon om produktet.'
    },
    {
        id: 'prod_009',
        ecwidId: '778329845',
        name: 'Garmin Forerunner 245 Music GPS Running Watch',
        price: '975',
        images: ['Bilder/garmin1.jpeg', 'Bilder/garmin2.jpeg'],
        description: 'Garmin Forerunner 245 Music watch, a perfect companion for any runner or athlete.',
        moreInfo: 'Advanced running metrics,<br> gps and navigation,<br> health & welness monitoring.'
    },
    // Hypothetical Sci-Fi Products (Batch 1)
    {
        id: 'prod_010',
        ecwidId: '998329801',
        name: 'Hyperdrive Coolant (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_1.jpeg', 'Bilder/sci_fi_2.jpeg'],
        description: 'Essential fluid for preventing FTL drive overheating during long interstellar journeys.',
        moreInfo: 'Quantum-stabilized formula for maximum efficiency.'
    },
    {
        id: 'prod_011',
        ecwidId: '998329802',
        name: 'Plasma Scrubber Unit (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_3.jpeg', 'Bilder/sci_fi_4.jpeg'],
        description: 'Filters harmful radiation from the ship\'s primary plasma conduits.',
        moreInfo: 'Lasts for approximately 2000 light-years.'
    },
    {
        id: 'prod_012',
        ecwidId: '998329803',
        name: 'Zero-G Magnetic Work Boots (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_5.jpeg', 'Bilder/sci_fi_6.jpeg'],
        description: 'Allows for safe and stable hull repairs in a zero-gravity environment.',
        moreInfo: 'Variable magnetic adhesion strength.'
    },
    {
        id: 'prod_013',
        ecwidId: '998329804',
        name: 'Inertial Dampener Fluid (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_7.jpeg', 'Bilder/sci_fi_8.jpeg'],
        description: 'Absorbs G-forces during rapid acceleration to protect the crew.',
        moreInfo: 'Non-Newtonian properties for instant response.'
    },
    {
        id: 'prod_014',
        ecwidId: '998329805',
        name: 'Warp Core Stabilizer Ring (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_9.jpeg', 'Bilder/sci_fi_10.jpeg'],
        description: 'Maintains the delicate balance of the matter/antimatter reaction in the warp core.',
        moreInfo: 'Forged in the heart of a neutron star.'
    },
    {
        id: 'prod_015',
        ecwidId: '998329806',
        name: 'Deflector Shield Emitter (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_11.jpeg', 'Bilder/sci_fi_12.jpeg'],
        description: 'Projects a powerful energy field to deflect space debris and hostile fire.',
        moreInfo: 'Requires direct connection to the main reactor.'
    },
    {
        id: 'prod_016',
        ecwidId: '998329807',
        name: 'Subspace Comms Relay (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_13.jpeg', 'Bilder/sci_fi_14.jpeg'],
        description: 'Boosts FTL communication signals for clear contact across star systems.',
        moreInfo: 'Compact and easy to install.'
    },
    {
        id: 'prod_017',
        ecwidId: '998329808',
        name: 'Universal Translator Chip (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_15.jpeg', 'Bilder/sci_fi_16.jpeg'],
        description: 'Instantly translates over seven million known galactic languages.',
        moreInfo: 'Connects directly to your neural interface.'
    },
    {
        id: 'prod_018',
        ecwidId: '998329809',
        name: 'Holographic Display Projector (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_17.jpeg', 'Bilder/sci_fi_18.jpeg'],
        description: 'Creates high-fidelity, interactive 3D projections for navigation and briefings.',
        moreInfo: 'Supports multi-touch gestural commands.'
    },
    {
        id: 'prod_019',
        ecwidId: '998329810',
        name: 'Nanite Repair Swarm Canister (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_19.jpeg', 'Bilder/sci_fi_20.jpeg'],
        description: 'A single canister can autonomously repair minor hull breaches and system failures.',
        moreInfo: 'Programmed with your ship\'s complete schematics.'
    },
    {
        id: 'prod_020',
        ecwidId: '998329811',
        name: 'Antimatter Containment Cell (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_21.jpeg', 'Bilder/sci_fi_22.jpeg'],
        description: 'Safely stores highly volatile antimatter for the main power reactor.',
        moreInfo: 'Triple-redundant magnetic field generators.'
    },
    {
        id: 'prod_021',
        ecwidId: '998329812',
        name: 'Graviton Plating (1 sqm) (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_23.jpeg', 'Bilder/sci_fi_24.jpeg'],
        description: 'Reinforces the hull with gravity-manipulating plates for superior defense.',
        moreInfo: 'Can withstand directed energy weapon fire.'
    },
    {
        id: 'prod_022',
        ecwidId: '998329813',
        name: 'Fusion Reactor Catalyst Rod (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_25.jpeg', 'Bilder/sci_fi_26.jpeg'],
        description: 'Initiates and sustains the fusion reaction in the ship\'s secondary power core.',
        moreInfo: 'Enriched with rare element 138.'
    },
    {
        id: 'prod_023',
        ecwidId: '998329814',
        name: 'Laser Cannon Focusing Crystal (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_27.jpeg', 'Bilder/sci_fi_28.jpeg'],
        description: 'A flawless crystal that focuses energy into a coherent, powerful beam.',
        moreInfo: 'Grown in zero-gravity labs for perfection.'
    },
    {
        id: 'prod_024',
        ecwidId: '998329815',
        name: 'Tractor Beam Modulator (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_29.jpeg', 'Bilder/sci_fi_30.jpeg'],
        description: 'Allows for precise manipulation of asteroids, cargo, or disabled vessels.',
        moreInfo: 'Features both push and pull functionalities.'
    },
    {
        id: 'prod_025',
        ecwidId: '998329816',
        name: 'Cryo-Stasis Pod Coolant (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_31.jpeg', 'Bilder/sci_fi_32.jpeg'],
        description: 'Maintains the occupant of a stasis pod in suspended animation.',
        moreInfo: 'One canister lasts a full century.'
    },
    {
        id: 'prod_026',
        ecwidId: '998329817',
        name: 'Synthetic Nutrient Paste (Case of 12) (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_33.jpeg', 'Bilder/sci_fi_34.jpeg'],
        description: 'Provides all necessary vitamins and minerals for a standard human diet.',
        moreInfo: 'Now available in "Vaguely Chicken" flavor.'
    },
    {
        id: 'prod_027',
        ecwidId: '998329818',
        name: 'Quantum Entanglement Communicator (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_35.jpeg', 'Bilder/sci_fi_36.jpeg'],
        description: 'Provides instantaneous, unjammable communication across any distance.',
        moreInfo: 'Sold as a pre-entangled pair.'
    },
    {
        id: 'prod_028',
        ecwidId: '998329819',
        name: 'Wormhole Navigation Data Chip (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_37.jpeg', 'Bilder/sci_fi_38.jpeg'],
        description: 'Contains the latest stable wormhole routes for the entire Alpha Quadrant.',
        moreInfo: 'Updates available via subspace download.'
    },
    {
        id: 'prod_029',
        ecwidId: '998329820',
        name: 'AI Core Interface Jack (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_39.jpeg', 'Bilder/sci_fi_40.jpeg'],
        description: 'A universal port for diagnosing and interfacing with the ship\'s main AI.',
        moreInfo: 'Compatible with all Mark IV and V AI Cores.'
    },
    // Hypothetical Sci-Fi Products (Batch 2)
    {
        id: 'prod_030',
        ecwidId: '998329821',
        name: 'Medbay Auto-Suture (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_41.jpeg', 'Bilder/sci_fi_42.jpeg'],
        description: 'A handheld device for quick, sterile sealing of wounds on the go.',
        moreInfo: 'Comes with 50 bio-gel suture packs.'
    },
    {
        id: 'prod_031',
        ecwidId: '998329822',
        name: 'Replicator Energy Cell (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_43.jpeg', 'Bilder/sci_fi_44.jpeg'],
        description: 'Powers a standard domestic replicator for up to 1,000 synthesis cycles.',
        moreInfo: 'Rechargeable at any standard power conduit.'
    },
    {
        id: 'prod_032',
        ecwidId: '998329823',
        name: 'Artificial Gravity Plating (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_45.jpeg', 'Bilder/sci_fi_46.jpeg'],
        description: 'Generates a stable 1G field for a single room or corridor section.',
        moreInfo: 'Easy to install modular floor plate.'
    },
    {
        id: 'prod_033',
        ecwidId: '998329824',
        name: 'Escape Pod Thruster (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_47.jpeg', 'Bilder/sci_fi_48.jpeg'],
        description: 'A compact, high-impulse chemical thruster for emergency evacuation pods.',
        moreInfo: 'Certified for atmospheric and vacuum use.'
    },
    {
        id: 'prod_034',
        ecwidId: '998329825',
        name: 'Stellar Cartography Database (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_49.jpeg', 'Bilder/sci_fi_50.jpeg'],
        description: 'A data crystal updated with the latest star charts for the Outer Rim.',
        moreInfo: 'Includes known anomalies and trade routes.'
    },
    {
        id: 'prod_035',
        ecwidId: '998329826',
        name: 'Astrometrics Sensor Probe (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_51.jpeg', 'Bilder/sci_fi_52.jpeg'],
        description: 'A launchable probe for detailed analysis of nearby celestial bodies.',
        moreInfo: 'Transmits data up to 10 light-minutes away.'
    },
    {
        id: 'prod_036',
        ecwidId: '998329827',
        name: 'Hydroponics Bay UV Lamp (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_53.jpeg', 'Bilder/sci_fi_54.jpeg'],
        description: 'Simulates the light spectrum of a G-type star for optimal plant growth.',
        moreInfo: 'Energy-efficient with a 5-year lifespan.'
    },
    {
        id: 'prod_037',
        ecwidId: '998329828',
        name: 'Life Support Oxygen Filter (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_55.jpeg', 'Bilder/sci_fi_56.jpeg'],
        description: 'Scrub carbon dioxide and other contaminants from recycled air.',
        moreInfo: 'One filter services a crew of ten for one year.'
    },
    {
        id: 'prod_038',
        ecwidId: '998329829',
        name: 'EVA Suit Patch Kit (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_57.jpeg', 'Bilder/sci_fi_58.jpeg'],
        description: 'An emergency kit for instantly sealing micro-punctures in an EVA suit.',
        moreInfo: 'Contains three single-use adhesive patches.'
    },
    {
        id: 'prod_039',
        ecwidId: '998329830',
        name: 'Sonic Shower Oscillator (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_59.jpeg', 'Bilder/sci_fi_60.jpeg'],
        description: 'The core component that generates high-frequency waves to remove grime.',
        moreInfo: 'Universal fitting for most shower units.'
    },
    {
        id: 'prod_040',
        ecwidId: '998329831',
        name: 'Handheld Bio-Scanner (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_61.jpeg', 'Bilder/sci_fi_62.jpeg'],
        description: 'Scans and identifies alien lifeforms, detailing their biology and threat level.',
        moreInfo: 'Connects to the ship\'s main computer.'
    },
    {
        id: 'prod_041',
        ecwidId: '998329832',
        name: 'Decontamination Archway (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_63.jpeg', 'Bilder/sci_fi_64.jpeg'],
        description: 'A replacement particle emitter for the ship\'s main decontamination arch.',
        moreInfo: 'Neutralizes 99.9% of known microbes.'
    },
    {
        id: 'prod_042',
        ecwidId: '998329833',
        name: 'Food Synthesizer Cartridge (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_65.jpeg', 'Bilder/sci_fi_66.jpeg'],
        description: 'A flavor cartridge for the galley synthesizer, this one is "Orion Alde-Pie".',
        moreInfo: 'Sufficient for approximately 200 meals.'
    },
    {
        id: 'prod_043',
        ecwidId: '998329834',
        name: 'Jump Drive Capacitor (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_67.jpeg', 'Bilder/sci_fi_68.jpeg'],
        description: 'Stores the immense energy required to initiate a jump to hyperspace.',
        moreInfo: 'Check compatibility with your drive model.'
    },
    {
        id: 'prod_044',
        ecwidId: '998329835',
        name: 'Neutrino Detector Array (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_69.jpeg', 'Bilder/sci_fi_70.jpeg'],
        description: 'A sensitive replacement sensor for detecting cloaked ships and subspace anomalies.',
        moreInfo: 'Requires professional installation.'
    },
    {
        id: 'prod_045',
        ecwidId: '998329836',
        name: 'Engine Room Diagnostic Tool (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_71.jpeg', 'Bilder/sci_fi_72.jpeg'],
        description: 'A handheld device that interfaces with engine systems to find and report faults.',
        moreInfo: 'Includes a full set of interface cables.'
    },
    {
        id: 'prod_046',
        ecwidId: '998329837',
        name: 'Anti-Radiation Injector (Prisklasse E12)',
        price: '49.00',
        images: ['Bilder/sci_fi_73.jpeg', 'Bilder/sci_fi_74.jpeg'],
        description: 'A single-use hypospray that protects against lethal doses of radiation.',
        moreInfo: 'Standard issue in all medkits.'
    },
    {
        id: 'prod_047',
        ecwidId: '998329838',
        name: 'Combat Drone Targeting Chip (Prisklasse E13)',
        price: '99.00',
        images: ['Bilder/sci_fi_75.jpeg', 'Bilder/sci_fi_76.jpeg'],
        description: 'An upgrade chip that improves a defense drone\'s accuracy by 20%.',
        moreInfo: 'Plug-and-play installation.'
    },
    {
        id: 'prod_048',
        ecwidId: '998329839',
        name: 'Cargo Bay Force Field Emitter (Prisklasse E14)',
        price: '149.00',
        images: ['Bilder/sci_fi_77.jpeg', 'Bilder/sci_fi_78.jpeg'],
        description: 'A small unit that generates a force field to hold cargo in place during maneuvers.',
        moreInfo: 'Covers a 10x10 meter area.'
    },
    {
        id: 'prod_049',
        ecwidId: '998329840',
        name: 'Scrub Bot Maintenance Kit (Prisklasse E16)',
        price: '249.00',
        images: ['Bilder/sci_fi_79.jpeg', 'Bilder/sci_fi_80.jpeg'],
        description: 'Contains replacement brushes, solvent cartridges, and batteries for a T-2 scrub bot.',
        moreInfo: 'Sufficient for one year of standard maintenance.'
    },
];
