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
    // Hypothetical Sci-Fi Products Start Here (Prices Updated)
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
];
