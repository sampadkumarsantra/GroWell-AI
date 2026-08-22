const libraryData = [

    // =========================================================
    // RICE — DISEASES
    // =========================================================

    {
        id: "rice-blast",

        crop: "Rice",

        category: "Disease",

        name: "Rice Blast",

        scientificName: "Magnaporthe oryzae",

        aliases: [
            "Blast",
            "Rice blast disease",
            "Pyricularia blast"
        ],

        affectedParts: [
            "Leaves",
            "Nodes",
            "Neck",
            "Panicle"
        ],

        symptoms: [
            "Spindle-shaped or diamond-shaped lesions may develop on leaves.",
            "Lesions commonly have grey or whitish centres with darker margins.",
            "Numerous lesions can cause extensive leaf blighting.",
            "Node infection may cause dark lesions and weakening of the stem.",
            "Neck infection can cause the panicle to partially or completely fail to fill.",
            "Severely affected panicles may bend or break at the infected neck."
        ],

        fieldIdentification: [
            "Look for characteristic spindle-shaped lesions on leaves.",
            "Inspect the panicle neck when symptoms occur around flowering.",
            "Check nearby plants because disease may occur in patches under favourable conditions."
        ],

        favourableConditions: [
            "High relative humidity",
            "Long periods of leaf wetness",
            "Frequent rainfall or dew",
            "Dense crop canopy",
            "Excessive nitrogen availability",
            "Large differences between day and night temperature"
        ],

        spread: [
            "The pathogen produces spores that can be dispersed by wind and rain.",
            "Disease can spread rapidly when foliage remains wet for long periods.",
            "Infected crop residues and planting material can contribute to disease survival."
        ],

        riskFactors: [
            "Excessive nitrogen fertilization",
            "Highly susceptible varieties",
            "Dense planting",
            "Poor air circulation",
            "Frequent leaf wetness"
        ],

        similarProblems: [
            "Brown spot",
            "Sheath blight",
            "Other leaf spotting diseases"
        ],

        management: {
            cultural: [
                "Use balanced nutrient management.",
                "Avoid excessive nitrogen application.",
                "Maintain appropriate plant spacing.",
                "Remove or properly manage infected crop residues where practical."
            ],

            biological: [
                "Use locally recommended biological control products where their effectiveness is established.",
                "Maintain soil and crop health to reduce disease pressure."
            ],

            chemical: [
                "Use only locally registered fungicides when chemical control is justified.",
                "Follow the product label for dose, timing, safety interval and application method.",
                "Rotate fungicide groups where appropriate to reduce resistance risk."
            ]
        },

        prevention: [
            "Use resistant or tolerant varieties when suitable.",
            "Maintain balanced fertilization.",
            "Monitor susceptible fields from early crop stages.",
            "Avoid unnecessary excessive nitrogen application."
        ],

        fieldNotes: [
            "Neck blast is particularly important because infection around flowering can directly affect grain formation.",
            "Disease severity can vary strongly with variety, weather and crop management."
        ],

        references: [
            "International rice pathology literature",
            "National agricultural extension recommendations",
            "Peer-reviewed plant pathology literature"
        ]
    },


    // =========================================================
    // RICE — BACTERIAL DISEASE
    // =========================================================

    {
        id: "rice-bacterial-leaf-blight",

        crop: "Rice",

        category: "Disease",

        name: "Bacterial Leaf Blight",

        scientificName: "Xanthomonas oryzae pv. oryzae",

        aliases: [
            "BLB",
            "Bacterial blight of rice"
        ],

        affectedParts: [
            "Leaves",
            "Leaf margins",
            "Leaf tips",
            "Seedlings"
        ],

        symptoms: [
            "Water-soaked lesions may begin near leaf tips or margins.",
            "Lesions gradually become yellowish to straw-coloured.",
            "Lesions may extend along the leaf and cause extensive blighting.",
            "Severely affected leaves may dry completely.",
            "Young plants may show rapid wilting under severe infection.",
            "Seedlings can develop a severe form known as kresek."
        ],

        fieldIdentification: [
            "Inspect leaf margins and tips for water-soaked or yellowish lesions.",
            "Observe whether lesions extend along the leaf veins.",
            "Check for wilting of young plants in severe outbreaks."
        ],

        favourableConditions: [
            "Warm temperatures",
            "High humidity",
            "Frequent rainfall",
            "Strong winds and storms",
            "Excess nitrogen",
            "Standing water movement between fields"
        ],

        spread: [
            "Bacteria can enter plants through natural openings and wounds.",
            "Rain splash can move bacteria between plants.",
            "Floodwater can contribute to movement between plants and fields.",
            "Infected plant material can contribute to disease spread."
        ],

        riskFactors: [
            "Excessive nitrogen",
            "Susceptible varieties",
            "Storm damage",
            "Strong winds",
            "Poor field sanitation"
        ],

        similarProblems: [
            "Rice blast",
            "Brown spot",
            "Abiotic leaf scorching"
        ],

        management: {
            cultural: [
                "Use balanced fertilizer management.",
                "Avoid excessive nitrogen.",
                "Maintain field sanitation.",
                "Use suitable resistant varieties where available."
            ],

            biological: [
                "Use locally recommended microbial products where supported by evidence.",
                "Maintain a healthy crop environment."
            ],

            chemical: [
                "Chemical control options vary by region and product registration.",
                "Use only locally approved products and follow label directions.",
                "Do not rely on unnecessary pesticide applications."
            ]
        },

        prevention: [
            "Use resistant varieties where available.",
            "Maintain balanced nutrition.",
            "Avoid practices that create unnecessary plant wounds.",
            "Monitor fields after storms and periods of prolonged wetness."
        ],

        fieldNotes: [
            "The disease can become particularly damaging during periods of frequent rainfall and strong winds.",
            "Early identification is important because severe outbreaks can develop quickly."
        ],

        references: [
            "Rice bacterial disease research literature",
            "Agricultural extension recommendations",
            "Peer-reviewed plant pathology literature"
        ]
    },


    // =========================================================
    // RICE — FUNGAL DISEASE
    // =========================================================

    {
        id: "rice-brown-spot",

        crop: "Rice",

        category: "Disease",

        name: "Rice Brown Spot",

        scientificName: "Bipolaris oryzae",

        aliases: [
            "Brown spot disease",
            "Rice brown spot"
        ],

        affectedParts: [
            "Leaves",
            "Leaf sheaths",
            "Glumes",
            "Grains"
        ],

        symptoms: [
            "Small brown lesions may appear on leaves.",
            "Lesions can enlarge and develop darker margins.",
            "Severe infection can cause extensive leaf spotting.",
            "Grain infection may result in discoloured or poorly filled grains.",
            "Symptoms can be more severe in nutritionally stressed crops."
        ],

        fieldIdentification: [
            "Look for numerous brown spots on leaves.",
            "Check grains and glumes when disease is severe.",
            "Evaluate crop nutrition and soil conditions."
        ],

        favourableConditions: [
            "Nutrient-poor soils",
            "Plant stress",
            "High humidity",
            "Extended leaf wetness",
            "Poor crop nutrition"
        ],

        spread: [
            "Spores can be dispersed through wind and rain.",
            "Infected seed and crop residues can contribute to disease survival and spread."
        ],

        riskFactors: [
            "Low soil fertility",
            "Nitrogen deficiency",
            "Poor soil conditions",
            "Susceptible varieties",
            "Prolonged leaf wetness"
        ],

        similarProblems: [
            "Rice blast",
            "Nutrient-related leaf symptoms",
            "Other leaf spot diseases"
        ],

        management: {
            cultural: [
                "Correct nutrient deficiencies.",
                "Maintain balanced crop nutrition.",
                "Use healthy seed.",
                "Maintain appropriate crop management."
            ],

            biological: [
                "Use locally recommended biological products where supported by evidence."
            ],

            chemical: [
                "Use registered fungicides only when economically justified.",
                "Follow local label recommendations.",
                "Rotate fungicide modes of action when repeated applications are necessary."
            ]
        },

        prevention: [
            "Maintain adequate soil fertility.",
            "Use healthy planting material.",
            "Avoid prolonged crop stress.",
            "Monitor fields regularly."
        ],

        fieldNotes: [
            "Brown spot is often associated with plant stress and poor nutritional status.",
            "Disease severity should be interpreted together with soil and crop nutrition information."
        ],

        references: [
            "Rice pathology literature",
            "Soil fertility and plant nutrition references",
            "Agricultural extension literature"
        ]
    },


    // =========================================================
    // RICE — PEST
    // =========================================================

    {
        id: "rice-yellow-stem-borer",

        crop: "Rice",

        category: "Pest",

        name: "Yellow Stem Borer",

        scientificName: "Scirpophaga incertulas",

        aliases: [
            "Rice stem borer",
            "Yellow rice stem borer"
        ],

        affectedParts: [
            "Stem",
            "Tillers",
            "Panicles"
        ],

        symptoms: [
            "Central shoots may wilt and produce dead hearts during vegetative growth.",
            "Affected tillers may be easily pulled from the plant.",
            "Whiteheads may develop after panicle emergence.",
            "Affected panicles may contain poorly filled or empty grains."
        ],

        fieldIdentification: [
            "Inspect the crop for dead hearts.",
            "Look for whiteheads after panicle emergence.",
            "Split affected stems and inspect for larval feeding damage where appropriate."
        ],

        favourableConditions: [
            "Warm weather",
            "Dense crop growth",
            "High pest population",
            "Continuous rice cultivation"
        ],

        spread: [
            "Adult moths can move between rice fields.",
            "Egg masses and larvae contribute to population development within crops."
        ],

        riskFactors: [
            "Continuous rice cultivation",
            "Excessively dense crop",
            "Poor monitoring",
            "High surrounding pest population"
        ],

        similarProblems: [
            "Other stem borers",
            "Mechanical stem injury",
            "Certain causes of dead heart"
        ],

        management: {
            cultural: [
                "Remove and destroy severely affected plant material where practical.",
                "Maintain field sanitation.",
                "Avoid excessive nitrogen that promotes overly lush growth."
            ],

            biological: [
                "Conserve natural enemies.",
                "Use biological control methods recommended for the local production system."
            ],

            chemical: [
                "Use insecticides only when monitoring indicates treatment is justified.",
                "Use locally registered products.",
                "Follow label instructions and pre-harvest intervals.",
                "Rotate insecticide modes of action to reduce resistance risk."
            ]
        },

        prevention: [
            "Regularly scout rice fields.",
            "Use resistant or tolerant varieties where available.",
            "Maintain balanced crop nutrition.",
            "Follow integrated pest management principles."
        ],

        fieldNotes: [
            "Dead hearts are more commonly associated with vegetative-stage attack.",
            "Whiteheads are an important symptom around the reproductive stage."
        ],

        references: [
            "Rice insect pest management literature",
            "Integrated pest management references",
            "Agricultural extension recommendations"
        ]
    },


    // =========================================================
    // RICE — NUTRIENT DISORDER
    // =========================================================

    {
        id: "rice-nitrogen-deficiency",

        crop: "Rice",

        category: "Nutrient Disorder",

        name: "Nitrogen Deficiency",

        scientificName: "",

        aliases: [
            "N deficiency",
            "Nitrogen starvation"
        ],

        affectedParts: [
            "Older leaves",
            "Whole plant"
        ],

        symptoms: [
            "Older leaves generally become pale green to yellow.",
            "Plants may show reduced vegetative growth.",
            "Tillering may be reduced.",
            "Overall canopy colour may become uniformly pale.",
            "Severe deficiency can result in significant yield reduction."
        ],

        fieldIdentification: [
            "Compare plant colour across the field.",
            "Check whether older leaves show symptoms first.",
            "Confirm suspected deficiency with soil or plant tissue analysis where possible."
        ],

        favourableConditions: [
            "Low soil nitrogen supply",
            "Low organic matter",
            "Nitrogen losses",
            "Poor fertilizer management",
            "High crop demand without adequate nitrogen supply"
        ],

        spread: [
            "Nutrient deficiency is not an infectious disease and does not spread between plants like a pathogen."
        ],

        riskFactors: [
            "Low soil fertility",
            "Insufficient nitrogen application",
            "Nitrogen losses through water movement",
            "High-yielding crop varieties with high nutrient demand"
        ],

        similarProblems: [
            "Sulfur deficiency",
            "Iron deficiency",
            "General plant stress",
            "Some disease-related yellowing"
        ],

        management: {
            cultural: [
                "Use soil-test-based nutrient management where possible.",
                "Apply nitrogen according to crop requirement.",
                "Use split applications to improve nitrogen-use efficiency.",
                "Maintain appropriate organic matter."
            ],

            biological: [
                "Use locally appropriate biological nutrient-management approaches where supported by evidence.",
                "Maintain healthy soil biological activity."
            ],

            chemical: [
                "Apply an appropriate nitrogen fertilizer source according to soil test and local recommendations.",
                "Avoid excessive application because surplus nitrogen can increase environmental losses and certain pest or disease risks."
            ]
        },

        prevention: [
            "Conduct soil testing where practical.",
            "Use balanced fertilizer management.",
            "Apply nitrogen at appropriate crop stages.",
            "Monitor crop colour and growth."
        ],

        fieldNotes: [
            "Nitrogen deficiency should not be diagnosed from leaf colour alone.",
            "Soil type, water management, crop age and other nutrient deficiencies can produce similar symptoms.",
            "Field diagnosis should be confirmed with soil or plant analysis where practical."
        ],

        references: [
            "Soil fertility literature",
            "Plant nutrition references",
            "Rice nutrient management recommendations"
        ]
    }

/* =========================================================
   WHEAT
========================================================= */

/* WHEAT DISEASES */

,{
    id: "wheat-disease-rust-yellow",
    crop: "Wheat",
    category: "Disease",
    name: "Yellow Rust",
    scientificName: "Puccinia striiformis f. sp. tritici",
    aliases: ["Stripe Rust"],
    affectedParts: ["Leaves", "Leaf sheaths"],
    symptoms: [
        "Yellow-orange stripe-like pustules appear on leaves.",
        "Pustules are commonly arranged in narrow longitudinal stripes.",
        "Severely infected leaves lose photosynthetic capacity.",
        "Premature leaf drying can occur under severe infection."
    ],
    fieldIdentification: [
        "Look for yellow to orange pustules arranged in stripes.",
        "Examine the upper leaf surface during cool and humid weather."
    ],
    favourableConditions: [
        "Cool temperatures",
        "High relative humidity",
        "Extended leaf wetness",
        "Frequent dew"
    ],
    spread: [
        "Wind-borne urediniospores spread the disease between fields."
    ],
    riskFactors: [
        "Susceptible varieties",
        "Cool humid weather",
        "Dense crop canopy"
    ],
    similarProblems: [
        "Leaf rust",
        "Tan spot"
    ],
    management: {
        cultural: [
            "Grow locally recommended resistant or tolerant varieties.",
            "Avoid excessive nitrogen application."
        ],
        biological: [],
        chemical: [
            "Use locally registered fungicides according to label recommendations when disease risk warrants treatment."
        ]
    },
    prevention: [
        "Use resistant varieties where available.",
        "Monitor fields regularly during cool humid periods."
    ],
    fieldNotes: [
        "Early detection is important because upper leaves contribute substantially to grain filling."
    ],
    references: [
        "ICAR wheat disease management resources"
    ]
},

{
    id: "wheat-disease-leaf-rust",
    crop: "Wheat",
    category: "Disease",
    name: "Leaf Rust",
    scientificName: "Puccinia triticina",
    aliases: ["Brown Rust"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Small orange-brown pustules develop mainly on leaves.",
        "Pustules are generally scattered rather than arranged in stripes.",
        "Severe infection causes premature leaf senescence."
    ],
    fieldIdentification: [
        "Orange-brown powdery pustules are visible on leaf surfaces."
    ],
    favourableConditions: [
        "Moderate temperatures",
        "High humidity",
        "Leaf wetness"
    ],
    spread: [
        "Spores are dispersed primarily by wind."
    ],
    riskFactors: [
        "Susceptible cultivars",
        "Warm humid conditions"
    ],
    similarProblems: [
        "Yellow rust",
        "Stem rust"
    ],
    management: {
        cultural: [
            "Use resistant varieties.",
            "Maintain balanced crop nutrition."
        ],
        biological: [],
        chemical: [
            "Apply registered fungicides when economically justified."
        ]
    },
    prevention: [
        "Select resistant varieties.",
        "Monitor disease development from tillering onward."
    ],
    fieldNotes: [
        "Disease severity depends strongly on cultivar resistance and weather."
    ],
    references: [
        "ICAR wheat pathology resources"
    ]
},

{
    id: "wheat-disease-stem-rust",
    crop: "Wheat",
    category: "Disease",
    name: "Stem Rust",
    scientificName: "Puccinia graminis f. sp. tritici",
    aliases: ["Black Rust"],
    affectedParts: ["Stems", "Leaf sheaths", "Leaves", "Glumes"],
    symptoms: [
        "Large reddish-brown to dark pustules develop on stems.",
        "Pustules may rupture the epidermis.",
        "Severe infection weakens stems and may cause lodging.",
        "Grain filling can be reduced."
    ],
    fieldIdentification: [
        "Inspect stems and leaf sheaths for elongated dark rust pustules."
    ],
    favourableConditions: [
        "Warm temperatures",
        "High humidity",
        "Leaf wetness"
    ],
    spread: [
        "Airborne spores spread between plants and fields."
    ],
    riskFactors: [
        "Susceptible varieties",
        "Warm humid weather"
    ],
    similarProblems: [
        "Leaf rust",
        "Yellow rust"
    ],
    management: {
        cultural: [
            "Use resistant cultivars.",
            "Control volunteer wheat where appropriate."
        ],
        biological: [],
        chemical: [
            "Use locally registered fungicides when required."
        ]
    },
    prevention: [
        "Use resistant varieties.",
        "Monitor fields during favourable weather."
    ],
    fieldNotes: [
        "Stem rust can cause substantial yield loss when infection becomes severe before grain maturity."
    ],
    references: [
        "ICAR wheat pathology resources"
    ]
},

{
    id: "wheat-disease-powdery-mildew",
    crop: "Wheat",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Blumeria graminis f. sp. tritici",
    aliases: ["Wheat Powdery Mildew"],
    affectedParts: ["Leaves", "Leaf sheaths", "Stems"],
    symptoms: [
        "White powdery fungal growth appears on leaves.",
        "Colonies may become greyish with age.",
        "Affected tissue may yellow and senesce."
    ],
    fieldIdentification: [
        "White superficial fungal colonies are characteristic."
    ],
    favourableConditions: [
        "Cool conditions",
        "High humidity",
        "Dense canopy"
    ],
    spread: [
        "Airborne conidia spread the pathogen."
    ],
    riskFactors: [
        "Dense planting",
        "Excessive nitrogen",
        "Susceptible varieties"
    ],
    similarProblems: [
        "Downy mildew",
        "Rust diseases"
    ],
    management: {
        cultural: [
            "Avoid excessive nitrogen.",
            "Use resistant varieties."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides when necessary."
        ]
    },
    prevention: [
        "Maintain balanced nutrition.",
        "Select resistant cultivars."
    ],
    fieldNotes: [
        "Dense crop canopies favour disease development."
    ],
    references: [
        "ICAR wheat pathology resources"
    ]
},

{
    id: "wheat-disease-tan-spot",
    crop: "Wheat",
    category: "Disease",
    name: "Tan Spot",
    scientificName: "Pyrenophora tritici-repentis",
    aliases: ["Yellow Leaf Spot"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Small brown lesions develop on leaves.",
        "Lesions enlarge and develop tan centres.",
        "A yellow halo may surround lesions.",
        "Severe infection causes extensive leaf blighting."
    ],
    fieldIdentification: [
        "Look for tan lesions with darker margins and yellow halos."
    ],
    favourableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Crop residue on soil surface"
    ],
    spread: [
        "Spores develop on infected crop residue and spread to foliage."
    ],
    riskFactors: [
        "Minimum or zero tillage with infected residue",
        "Susceptible varieties"
    ],
    similarProblems: [
        "Septoria leaf blotch",
        "Leaf rust"
    ],
    management: {
        cultural: [
            "Use crop rotation.",
            "Manage infected crop residue where practical.",
            "Use resistant cultivars."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides when justified."
        ]
    },
    prevention: [
        "Rotate crops.",
        "Use clean seed and resistant varieties."
    ],
    fieldNotes: [
        "Residue management can reduce the amount of primary inoculum."
    ],
    references: [
        "ICAR wheat disease resources"
    ]
},


/* WHEAT PESTS */

{
    id: "wheat-pest-termite",
    crop: "Wheat",
    category: "Pest",
    name: "Wheat Termite",
    scientificName: "Odontotermes spp.",
    aliases: ["White Ant"],
    affectedParts: ["Roots", "Lower stem"],
    symptoms: [
        "Plants wilt and dry in patches.",
        "Roots may be damaged or eaten.",
        "Affected plants can be pulled out easily.",
        "Termite galleries may be visible around damaged roots."
    ],
    fieldIdentification: [
        "Inspect roots and soil around wilted plants for termites."
    ],
    favourableConditions: [
        "Dry soil",
        "Low organic moisture availability",
        "Poorly decomposed residues"
    ],
    spread: [
        "Colonies persist in soil and attack plants locally."
    ],
    riskFactors: [
        "Dry conditions",
        "Previous termite infestation"
    ],
    similarProblems: [
        "Root rot",
        "Drought stress"
    ],
    management: {
        cultural: [
            "Maintain adequate soil moisture.",
            "Use well-decomposed organic matter."
        ],
        biological: [],
        chemical: [
            "Use only locally registered termite management products according to label directions."
        ]
    },
    prevention: [
        "Maintain good field sanitation.",
        "Avoid severe moisture stress."
    ],
    fieldNotes: [
        "Patchy wilting is an important field clue."
    ],
    references: [
        "ICAR wheat pest management resources"
    ]
},

{
    id: "wheat-pest-aphid",
    crop: "Wheat",
    category: "Pest",
    name: "Wheat Aphid",
    scientificName: "Sitobion avenae",
    aliases: ["English Grain Aphid"],
    affectedParts: ["Leaves", "Tillers", "Ears"],
    symptoms: [
        "Small aphids cluster on leaves and developing ears.",
        "Leaves may show yellowing.",
        "Heavy infestation reduces plant vigour.",
        "Honeydew can support sooty mould growth."
    ],
    fieldIdentification: [
        "Inspect leaf surfaces and ears for colonies of small soft-bodied insects."
    ],
    favourableConditions: [
        "Moderate temperatures",
        "Dry weather",
        "Dense crop canopy"
    ],
    spread: [
        "Winged aphids disperse between plants and fields."
    ],
    riskFactors: [
        "High aphid population",
        "Excess nitrogen"
    ],
    similarProblems: [
        "Thrips",
        "Leafhopper infestation"
    ],
    management: {
        cultural: [
            "Maintain balanced nitrogen nutrition.",
            "Conserve natural enemies."
        ],
        biological: [
            "Predators such as ladybird beetles and lacewings can suppress aphid populations."
        ],
        chemical: [
            "Use registered insecticides only when thresholds and local recommendations justify treatment."
        ]
    },
    prevention: [
        "Regularly monitor crop and natural enemies."
    ],
    fieldNotes: [
        "Not every aphid colony requires insecticide treatment."
    ],
    references: [
        "ICAR wheat entomology resources"
    ]
},

{
    id: "wheat-pest-jassid",
    crop: "Wheat",
    category: "Pest",
    name: "Wheat Jassid",
    scientificName: "Cicadellidae spp.",
    aliases: ["Leafhopper"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Leaves develop pale stippling.",
        "Feeding can cause yellowing and reduced vigour.",
        "Severe infestations may cause leaf drying."
    ],
    fieldIdentification: [
        "Small mobile leafhoppers jump or fly when foliage is disturbed."
    ],
    favourableConditions: [
        "Warm weather",
        "Dry conditions"
    ],
    spread: [
        "Adults move actively between plants and fields."
    ],
    riskFactors: [
        "High pest population",
        "Favourable warm weather"
    ],
    similarProblems: [
        "Aphid damage",
        "Nutrient deficiency"
    ],
    management: {
        cultural: [
            "Maintain balanced nutrition.",
            "Avoid unnecessary insecticide use that disrupts natural enemies."
        ],
        biological: [
            "Conserve predators and parasitoids."
        ],
        chemical: [
            "Use locally registered insecticides only when recommended."
        ]
    },
    prevention: [
        "Regular crop scouting."
    ],
    fieldNotes: [
        "Different leafhopper species may occur depending on region."
    ],
    references: [
        "Regional agricultural extension recommendations"
    ]
},

{
    id: "wheat-pest-cutworm",
    crop: "Wheat",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Army Cutworm"],
    affectedParts: ["Seedlings", "Stem base"],
    symptoms: [
        "Young plants are cut near the soil surface.",
        "Missing plants appear in patches.",
        "Larvae may hide in soil during the day."
    ],
    fieldIdentification: [
        "Inspect soil near damaged seedlings for curled caterpillars."
    ],
    favourableConditions: [
        "Presence of grassy weeds",
        "Crop residues",
        "Suitable soil moisture"
    ],
    spread: [
        "Adult moths disperse and lay eggs in suitable fields."
    ],
    riskFactors: [
        "Weedy fields",
        "Previous infestation"
    ],
    similarProblems: [
        "Termite damage",
        "Poor germination"
    ],
    management: {
        cultural: [
            "Control weeds before crop establishment.",
            "Maintain field sanitation."
        ],
        biological: [
            "Conserve parasitoids and predators."
        ],
        chemical: [
            "Use registered treatments only when economically justified."
        ]
    },
    prevention: [
        "Control weeds and scout fields after emergence."
    ],
    fieldNotes: [
        "Damage is often most visible shortly after emergence."
    ],
    references: [
        "ICAR pest management resources"
    ]
},

{
    id: "wheat-pest-thrips",
    crop: "Wheat",
    category: "Pest",
    name: "Wheat Thrips",
    scientificName: "Thrips spp.",
    aliases: ["Thrips"],
    affectedParts: ["Leaves", "Ears"],
    symptoms: [
        "Leaves develop silvery or pale streaks.",
        "Feeding may distort young tissues.",
        "Heavy infestations can reduce grain development."
    ],
    fieldIdentification: [
        "Tiny slender insects may be found inside leaf folds or around ears."
    ],
    favourableConditions: [
        "Warm dry weather",
        "Low rainfall"
    ],
    spread: [
        "Adults move between plants and fields."
    ],
    riskFactors: [
        "Warm dry conditions",
        "Dense crop canopy"
    ],
    similarProblems: [
        "Jassid damage",
        "Mite injury"
    ],
    management: {
        cultural: [
            "Maintain crop vigour.",
            "Avoid unnecessary broad-spectrum insecticide applications."
        ],
        biological: [
            "Conserve predatory insects."
        ],
        chemical: [
            "Use registered insecticides only when recommended."
        ]
    },
    prevention: [
        "Regularly inspect young foliage and ears."
    ],
    fieldNotes: [
        "Species composition varies by location."
    ],
    references: [
        "Regional agricultural extension recommendations"
    ]
},


/* WHEAT DISORDERS */

{
    id: "wheat-disorder-nitrogen",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "Nitrogen deficiency",
    aliases: ["N Deficiency"],
    affectedParts: ["Older leaves", "Whole plant"],
    symptoms: [
        "Older leaves become pale green to yellow.",
        "Plants remain small and have reduced tillering.",
        "Overall crop canopy becomes thin."
    ],
    fieldIdentification: [
        "Symptoms usually begin on older leaves because nitrogen is mobile in the plant."
    ],
    favourableConditions: [
        "Low soil nitrogen",
        "Leaching",
        "Poor organic matter supply"
    ],
    spread: [
        "Not infectious; symptoms reflect nutrient availability."
    ],
    riskFactors: [
        "Low nitrogen input",
        "Heavy rainfall and leaching"
    ],
    similarProblems: [
        "Sulfur deficiency",
        "Waterlogging"
    ],
    management: {
        cultural: [
            "Use soil-test-based nitrogen management.",
            "Split nitrogen applications according to crop demand."
        ],
        biological: [],
        chemical: [
            "Apply nitrogen fertilizer according to soil test and local crop recommendations."
        ]
    },
    prevention: [
        "Use balanced nutrient management."
    ],
    fieldNotes: [
        "Avoid diagnosing nitrogen deficiency from colour alone."
    ],
    references: [
        "ICAR soil fertility recommendations"
    ]
},

{
    id: "wheat-disorder-zinc",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "Zinc deficiency",
    aliases: ["Zn Deficiency"],
    affectedParts: ["Young leaves", "Whole plant"],
    symptoms: [
        "Plants become stunted.",
        "Young leaves may develop pale areas.",
        "Internode growth can be reduced.",
        "Tillering may decline."
    ],
    fieldIdentification: [
        "Confirm suspected zinc deficiency with soil or plant analysis where possible."
    ],
    favourableConditions: [
        "High soil pH",
        "Low available zinc",
        "High phosphorus availability in susceptible soils"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Alkaline soils",
        "Low organic matter"
    ],
    similarProblems: [
        "Iron deficiency",
        "Nitrogen deficiency"
    ],
    management: {
        cultural: [
            "Use soil-test-based micronutrient management."
        ],
        biological: [],
        chemical: [
            "Apply zinc fertilizers using locally recommended rates and methods."
        ]
    },
    prevention: [
        "Regular soil testing.",
        "Maintain balanced fertilization."
    ],
    fieldNotes: [
        "Laboratory confirmation is preferable when symptoms overlap."
    ],
    references: [
        "ICAR micronutrient management resources"
    ]
},

{
    id: "wheat-disorder-sulfur",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Sulfur Deficiency",
    scientificName: "Sulfur deficiency",
    aliases: ["S Deficiency"],
    affectedParts: ["Young leaves", "Whole plant"],
    symptoms: [
        "Young leaves become pale green or yellow.",
        "Plants may remain short.",
        "Tillering and protein accumulation can be affected."
    ],
    fieldIdentification: [
        "Unlike nitrogen deficiency, sulfur deficiency commonly appears first on younger tissues."
    ],
    favourableConditions: [
        "Low soil organic matter",
        "Sandy soils",
        "High rainfall and leaching"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low sulfur inputs",
        "Light-textured soils"
    ],
    similarProblems: [
        "Nitrogen deficiency",
        "Iron deficiency"
    ],
    management: {
        cultural: [
            "Use soil-test-based sulfur management."
        ],
        biological: [],
        chemical: [
            "Use suitable sulfur-containing fertilizers according to local recommendations."
        ]
    },
    prevention: [
        "Include sulfur in routine soil testing where deficiency is suspected."
    ],
    fieldNotes: [
        "Visual diagnosis can be confused with nitrogen deficiency."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},

{
    id: "wheat-disorder-iron",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "Iron deficiency",
    aliases: ["Fe Deficiency"],
    affectedParts: ["Young leaves"],
    symptoms: [
        "Young leaves develop interveinal chlorosis.",
        "Leaf veins may remain greener than surrounding tissue.",
        "Severe deficiency can reduce plant growth."
    ],
    fieldIdentification: [
        "Look for chlorosis between veins of young leaves."
    ],
    favourableConditions: [
        "High soil pH",
        "Calcareous soils",
        "Poor iron availability"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Alkaline soils",
        "Calcareous conditions"
    ],
    similarProblems: [
        "Zinc deficiency",
        "Sulfur deficiency"
    ],
    management: {
        cultural: [
            "Improve soil management and organic matter where appropriate."
        ],
        biological: [],
        chemical: [
            "Use locally recommended iron sources after confirming deficiency."
        ]
    },
    prevention: [
        "Monitor micronutrient status in high-pH soils."
    ],
    fieldNotes: [
        "Soil and plant testing helps distinguish micronutrient deficiencies."
    ],
    references: [
        "ICAR micronutrient resources"
    ]
},

{
    id: "wheat-disorder-potassium",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "Potassium deficiency",
    aliases: ["K Deficiency"],
    affectedParts: ["Older leaves", "Leaf margins"],
    symptoms: [
        "Older leaves may develop yellowing along margins.",
        "Leaf margins can become necrotic under severe deficiency.",
        "Plants may have weaker stems and reduced stress tolerance."
    ],
    fieldIdentification: [
        "Marginal chlorosis and scorching on older leaves are characteristic clues."
    ],
    favourableConditions: [
        "Low exchangeable soil potassium",
        "Light-textured soils"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low potassium reserves",
        "Intensive cropping"
    ],
    similarProblems: [
        "Magnesium deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based potassium management."
        ],
        biological: [],
        chemical: [
            "Apply potassium fertilizer according to soil test recommendations."
        ]
    },
    prevention: [
        "Maintain balanced NPK fertilization."
    ],
    fieldNotes: [
        "Confirm deficiency through soil or tissue analysis where possible."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},


/* =========================================================
   MAIZE
========================================================= */

/* MAIZE DISEASES */

{
    id: "maize-disease-fall-army",
    crop: "Maize",
    category: "Disease",
    name: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    aliases: ["Turcicum Leaf Blight"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Long cigar-shaped grey-green to tan lesions develop on leaves.",
        "Lesions enlarge and may merge.",
        "Severe infection causes extensive leaf blighting."
    ],
    fieldIdentification: [
        "Characteristic elongated cigar-shaped lesions are a major field clue."
    ],
    favourableConditions: [
        "Cool to moderate temperatures",
        "High humidity",
        "Extended leaf wetness"
    ],
    spread: [
        "Spores are dispersed by wind and rain splash."
    ],
    riskFactors: [
        "Susceptible hybrids",
        "Dense canopy",
        "High humidity"
    ],
    similarProblems: [
        "Gray leaf spot",
        "Southern corn leaf blight"
    ],
    management: {
        cultural: [
            "Use resistant hybrids.",
            "Manage infected residues where practical.",
            "Use crop rotation."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides when disease risk and local recommendations justify treatment."
        ]
    },
    prevention: [
        "Use resistant hybrids and monitor fields."
    ],
    fieldNotes: [
        "Protecting upper leaves is important for grain filling."
    ],
    references: [
        "ICAR maize disease resources"
    ]
},

{
    id: "maize-disease-gray-leaf",
    crop: "Maize",
    category: "Disease",
    name: "Gray Leaf Spot",
    scientificName: "Cercospora zeae-maydis",
    aliases: ["GLS"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Narrow rectangular grey-brown lesions develop between veins.",
        "Lesions may merge under severe disease.",
        "Premature leaf death can occur."
    ],
    fieldIdentification: [
        "Rectangular lesions limited by leaf veins are characteristic."
    ],
    favourableConditions: [
        "Warm humid conditions",
        "Extended leaf wetness"
    ],
    spread: [
        "Spores develop on infected residue and spread by wind and rain."
    ],
    riskFactors: [
        "Continuous maize",
        "Heavy crop residue",
        "Susceptible hybrids"
    ],
    similarProblems: [
        "Northern corn leaf blight",
        "Southern corn leaf blight"
    ],
    management: {
        cultural: [
            "Use resistant hybrids.",
            "Rotate crops.",
            "Manage infected residues."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides according to local recommendations."
        ]
    },
    prevention: [
        "Crop rotation and resistant hybrids reduce risk."
    ],
    fieldNotes: [
        "Disease can progress rapidly during warm humid periods."
    ],
    references: [
        "ICAR maize pathology resources"
    ]
},

{
    id: "maize-disease-southern-leaf",
    crop: "Maize",
    category: "Disease",
    name: "Southern Corn Leaf Blight",
    scientificName: "Bipolaris maydis",
    aliases: ["Maydis Leaf Blight"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Small tan to brown lesions develop on leaves.",
        "Lesions enlarge under favourable conditions.",
        "Severe infection causes leaf blighting."
    ],
    fieldIdentification: [
        "Inspect leaves for elongated tan lesions with darker margins."
    ],
    favourableConditions: [
        "Warm humid weather",
        "Frequent rainfall"
    ],
    spread: [
        "Spores spread through air and rain splash."
    ],
    riskFactors: [
        "Susceptible hybrids",
        "Warm humid weather"
    ],
    similarProblems: [
        "Northern corn leaf blight",
        "Gray leaf spot"
    ],
    management: {
        cultural: [
            "Use resistant hybrids.",
            "Rotate crops.",
            "Manage infected residues."
        ],
        biological: [],
        chemical: [
            "Use locally registered fungicides where recommended."
        ]
    },
    prevention: [
        "Use resistant planting material."
    ],
    fieldNotes: [
        "Correct diagnosis is important because several maize leaf blights look similar."
    ],
    references: [
        "ICAR maize pathology resources"
    ]
},

{
    id: "maize-disease-rust",
    crop: "Maize",
    category: "Disease",
    name: "Common Rust",
    scientificName: "Puccinia sorghi",
    aliases: ["Maize Rust"],
    affectedParts: ["Leaves", "Leaf sheaths"],
    symptoms: [
        "Small reddish-brown rust pustules appear on leaves.",
        "Pustules may occur on both leaf surfaces.",
        "Severe infection reduces photosynthetic area."
    ],
    fieldIdentification: [
        "Look for powdery rust pustules that release spores when rubbed."
    ],
    favourableConditions: [
        "Cool to moderate temperatures",
        "High humidity"
    ],
    spread: [
        "Airborne spores spread between plants."
    ],
    riskFactors: [
        "Susceptible hybrids",
        "Humid weather"
    ],
    similarProblems: [
        "Southern rust",
        "Leaf blight"
    ],
    management: {
        cultural: [
            "Use resistant hybrids.",
            "Maintain balanced crop nutrition."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides when locally recommended."
        ]
    },
    prevention: [
        "Use resistant hybrids and regular scouting."
    ],
    fieldNotes: [
        "Rust species should be distinguished where possible because epidemiology differs."
    ],
    references: [
        "ICAR maize pathology resources"
    ]
},

{
    id: "maize-disease-downy",
    crop: "Maize",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronosclerospora spp.",
    aliases: ["Maize Downy Mildew"],
    affectedParts: ["Leaves", "Growing point"],
    symptoms: [
        "Leaves may develop pale green to yellow streaks.",
        "White downy growth can occur under humid conditions.",
        "Plants may become stunted.",
        "Severe infection can interfere with tassel and ear development."
    ],
    fieldIdentification: [
        "Look for pale longitudinal striping and downy growth during humid mornings."
    ],
    favourableConditions: [
        "High humidity",
        "Warm humid weather",
        "Leaf wetness"
    ],
    spread: [
        "Spores spread through air and infected planting material depending on species."
    ],
    riskFactors: [
        "Susceptible hybrids",
        "Persistent humidity"
    ],
    similarProblems: [
        "Nutrient deficiency",
        "Viral diseases"
    ],
    management: {
        cultural: [
            "Use resistant hybrids.",
            "Remove severely affected plants where recommended.",
            "Maintain field sanitation."
        ],
        biological: [],
        chemical: [
            "Use locally registered treatments when recommended."
        ]
    },
    prevention: [
        "Use clean seed and resistant hybrids."
    ],
    fieldNotes: [
        "Downy mildew identification should be confirmed because symptoms can overlap with other problems."
    ],
    references: [
        "ICAR maize disease resources"
    ]
},


/* MAIZE PESTS */

{
    id: "maize-pest-fall-armyworm",
    crop: "Maize",
    category: "Pest",
    name: "Fall Armyworm",
    scientificName: "Spodoptera frugiperda",
    aliases: ["FAW"],
    affectedParts: ["Leaves", "Whorl", "Tassel", "Ear"],
    symptoms: [
        "Young larvae feed inside the whorl.",
        "Leaves develop irregular holes and ragged margins.",
        "Fresh frass may be visible deep inside the whorl.",
        "Severe infestation can damage the growing point."
    ],
    fieldIdentification: [
        "Inspect whorls for larvae, feeding damage and fresh frass."
    ],
    favourableConditions: [
        "Warm weather",
        "Continuous maize cultivation"
    ],
    spread: [
        "Adults can disperse over long distances."
    ],
    riskFactors: [
        "Young maize",
        "High adult moth activity"
    ],
    similarProblems: [
        "Stem borer",
        "Cutworm"
    ],
    management: {
        cultural: [
            "Scout fields regularly.",
            "Use integrated pest management.",
            "Destroy heavily infested crop residues where appropriate."
        ],
        biological: [
            "Conserve parasitoids and predators."
        ],
        chemical: [
            "Use locally registered insecticides and rotate modes of action when treatment is necessary."
        ]
    },
    prevention: [
        "Early scouting is essential.",
        "Use integrated pest management rather than routine spraying."
    ],
    fieldNotes: [
        "Fresh frass inside the whorl is a useful diagnostic clue."
    ],
    references: [
        "ICAR fall armyworm management resources"
    ]
},

{
    id: "maize-pest-stem-borer",
    crop: "Maize",
    category: "Pest",
    name: "Maize Stem Borer",
    scientificName: "Chilo partellus",
    aliases: ["Spotted Stem Borer"],
    affectedParts: ["Stem", "Leaves", "Tassel"],
    symptoms: [
        "Young leaves may show shot-hole damage.",
        "Central shoots may dry, producing dead-heart symptoms.",
        "Older plants may develop stem tunnelling.",
        "Lodging can occur."
    ],
    fieldIdentification: [
        "Split affected stems to find larvae and tunnels."
    ],
    favourableConditions: [
        "Warm weather",
        "Dense crop",
        "Continuous cereal cultivation"
    ],
    spread: [
        "Adults lay eggs on maize foliage and larvae bore into stems."
    ],
    riskFactors: [
        "Continuous maize",
        "Infested crop residues"
    ],
    similarProblems: [
        "Fall armyworm",
        "Shoot fly"
    ],
    management: {
        cultural: [
            "Remove or manage crop residues.",
            "Practice crop rotation.",
            "Use resistant or tolerant hybrids where available."
        ],
        biological: [
            "Conserve parasitoids such as Trichogramma where locally recommended."
        ],
        chemical: [
            "Use registered insecticides according to local recommendations."
        ]
    },
    prevention: [
        "Scout young crops for shot-hole and dead-heart symptoms."
    ],
    fieldNotes: [
        "Stem splitting is useful for confirming larval tunnelling."
    ],
    references: [
        "ICAR maize entomology resources"
    ]
},

{
    id: "maize-pest-shoot-fly",
    crop: "Maize",
    category: "Pest",
    name: "Shoot Fly",
    scientificName: "Atherigona spp.",
    aliases: ["Maize Shoot Fly"],
    affectedParts: ["Seedlings", "Central shoot"],
    symptoms: [
        "Central shoot dries and forms a dead heart.",
        "Plants may produce side shoots.",
        "Larval feeding occurs near the growing point."
    ],
    fieldIdentification: [
        "Inspect young plants for dead-heart symptoms."
    ],
    favourableConditions: [
        "Warm dry conditions",
        "Delayed crop establishment"
    ],
    spread: [
        "Adult flies lay eggs on young plants."
    ],
    riskFactors: [
        "Late sowing",
        "Poor crop establishment"
    ],
    similarProblems: [
        "Stem borer",
        "Termite damage"
    ],
    management: {
        cultural: [
            "Sow at the recommended time.",
            "Maintain good crop establishment."
        ],
        biological: [
            "Conserve natural enemies."
        ],
        chemical: [
            "Use registered treatments only when recommended."
        ]
    },
    prevention: [
        "Timely sowing can reduce risk."
    ],
    fieldNotes: [
        "Dead-heart symptoms in very young maize require examination of the stem base."
    ],
    references: [
        "ICAR maize pest management resources"
    ]
},

{
    id: "maize-pest-aphid",
    crop: "Maize",
    category: "Pest",
    name: "Corn Leaf Aphid",
    scientificName: "Rhopalosiphum maidis",
    aliases: ["Maize Aphid"],
    affectedParts: ["Leaves", "Tassels", "Whorl"],
    symptoms: [
        "Colonies of aphids develop on young tissues.",
        "Leaves may curl or become yellow.",
        "Honeydew deposits may encourage sooty mould."
    ],
    fieldIdentification: [
        "Look for clusters of small bluish-green aphids."
    ],
    favourableConditions: [
        "Moderate temperatures",
        "Dry weather"
    ],
    spread: [
        "Winged aphids disperse between plants."
    ],
    riskFactors: [
        "High nitrogen",
        "Favourable dry weather"
    ],
    similarProblems: [
        "Thrips",
        "Mite injury"
    ],
    management: {
        cultural: [
            "Maintain balanced nitrogen.",
            "Conserve beneficial insects."
        ],
        biological: [
            "Ladybird beetles, lacewings and parasitoids can suppress aphids."
        ],
        chemical: [
            "Use registered insecticides only when necessary."
        ]
    },
    prevention: [
        "Monitor colonies and natural enemies."
    ],
    fieldNotes: [
        "Natural enemies can provide substantial control."
    ],
    references: [
        "ICAR maize entomology resources"
    ]
},

{
    id: "maize-pest-cutworm",
    crop: "Maize",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cutworm"],
    affectedParts: ["Seedlings", "Stem base"],
    symptoms: [
        "Seedlings are cut near the soil surface.",
        "Plant stand becomes irregular.",
        "Larvae hide in soil during the daytime."
    ],
    fieldIdentification: [
        "Search soil around damaged plants for curled larvae."
    ],
    favourableConditions: [
        "Weedy fields",
        "Crop residue",
        "Suitable soil moisture"
    ],
    spread: [
        "Adult moths lay eggs near suitable hosts."
    ],
    riskFactors: [
        "Heavy weed growth",
        "Previous infestation"
    ],
    similarProblems: [
        "Termites",
        "Shoot fly"
    ],
    management: {
        cultural: [
            "Control weeds before planting.",
            "Maintain field sanitation."
        ],
        biological: [
            "Conserve natural enemies."
        ],
        chemical: [
            "Use registered products only when locally recommended."
        ]
    },
    prevention: [
        "Keep fields relatively free of host weeds before emergence."
    ],
    fieldNotes: [
        "Most serious damage occurs during early crop establishment."
    ],
    references: [
        "ICAR maize pest management resources"
    ]
},


/* MAIZE DISORDERS */

{
    id: "maize-disorder-nitrogen",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "Nitrogen deficiency",
    aliases: ["N Deficiency"],
    affectedParts: ["Older leaves", "Whole plant"],
    symptoms: [
        "Older leaves develop a characteristic V-shaped yellowing from the tip toward the midrib.",
        "Plants become pale and stunted.",
        "Leaf area and yield potential decline."
    ],
    fieldIdentification: [
        "Look for V-shaped chlorosis beginning at older leaf tips."
    ],
    favourableConditions: [
        "Low soil nitrogen",
        "Leaching",
        "High crop demand"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low nitrogen supply",
        "Heavy rainfall"
    ],
    similarProblems: [
        "Sulfur deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based nitrogen management.",
            "Split nitrogen applications."
        ],
        biological: [],
        chemical: [
            "Apply nitrogen according to soil testing and local recommendations."
        ]
    },
    prevention: [
        "Maintain balanced nitrogen supply throughout crop development."
    ],
    fieldNotes: [
        "Maize has high nitrogen demand during rapid vegetative growth."
    ],
    references: [
        "ICAR maize nutrient management resources"
    ]
},

{
    id: "maize-disorder-phosphorus",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "Phosphorus deficiency",
    aliases: ["P Deficiency"],
    affectedParts: ["Leaves", "Roots", "Whole plant"],
    symptoms: [
        "Young plants may become stunted.",
        "Leaves can develop reddish-purple coloration.",
        "Root development may be restricted."
    ],
    fieldIdentification: [
        "Purple or reddish leaf coloration in young plants can be a clue."
    ],
    favourableConditions: [
        "Cold soil",
        "Low available phosphorus",
        "High or very low soil pH"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low soil phosphorus",
        "Cold early-season conditions"
    ],
    similarProblems: [
        "Phosphorus-related stress",
        "Temperature stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based phosphorus management."
        ],
        biological: [],
        chemical: [
            "Apply suitable phosphorus fertilizer according to local recommendations."
        ]
    },
    prevention: [
        "Maintain adequate phosphorus availability before and during establishment."
    ],
    fieldNotes: [
        "Cold soil can temporarily reduce phosphorus uptake even when total soil phosphorus is adequate."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},

{
    id: "maize-disorder-potassium",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "Potassium deficiency",
    aliases: ["K Deficiency"],
    affectedParts: ["Older leaves", "Leaf margins"],
    symptoms: [
        "Yellowing begins along margins of older leaves.",
        "Leaf margins can become brown and necrotic.",
        "Plants may have weaker stems and greater stress sensitivity."
    ],
    fieldIdentification: [
        "Marginal chlorosis and scorching on older leaves are key clues."
    ],
    favourableConditions: [
        "Low soil potassium",
        "Sandy soils"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low exchangeable potassium",
        "Intensive cropping"
    ],
    similarProblems: [
        "Magnesium deficiency",
        "Drought stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based potassium management."
        ],
        biological: [],
        chemical: [
            "Apply potassium fertilizer according to soil test recommendations."
        ]
    },
    prevention: [
        "Maintain balanced NPK nutrition."
    ],
    fieldNotes: [
        "Confirm suspected deficiency with soil or plant testing."
    ],
    references: [
        "ICAR nutrient management resources"
    ]
},

{
    id: "maize-disorder-zinc",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "Zinc deficiency",
    aliases: ["Zn Deficiency"],
    affectedParts: ["Young leaves", "Whole plant"],
    symptoms: [
        "Broad white to pale bands may develop near the leaf midrib.",
        "Young leaves may become chlorotic.",
        "Plants may remain stunted."
    ],
    fieldIdentification: [
        "Look for pale bands on young leaves and reduced plant height."
    ],
    favourableConditions: [
        "High soil pH",
        "Low available zinc",
        "High phosphorus availability"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Alkaline soils",
        "Low organic matter"
    ],
    similarProblems: [
        "Iron deficiency",
        "Nitrogen deficiency"
    ],
    management: {
        cultural: [
            "Use soil-test-based micronutrient management."
        ],
        biological: [],
        chemical: [
            "Apply zinc fertilizers using locally recommended rates and methods."
        ]
    },
    prevention: [
        "Monitor zinc status in high-pH soils."
    ],
    fieldNotes: [
        "Zinc deficiency is relatively common in maize on certain alkaline soils."
    ],
    references: [
        "ICAR micronutrient management resources"
    ]
},

{
    id: "maize-disorder-magnesium",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "Magnesium deficiency",
    aliases: ["Mg Deficiency"],
    affectedParts: ["Older leaves"],
    symptoms: [
        "Interveinal chlorosis develops on older leaves.",
        "Veins remain greener while tissue between veins becomes yellow.",
        "Severe deficiency may lead to reddish or necrotic tissue."
    ],
    fieldIdentification: [
        "Interveinal chlorosis beginning on older leaves is a useful clue."
    ],
    favourableConditions: [
        "Low soil magnesium",
        "Acidic soils",
        "High potassium availability"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low exchangeable magnesium",
        "Imbalanced fertilization"
    ],
    similarProblems: [
        "Potassium deficiency",
        "Iron deficiency"
    ],
    management: {
        cultural: [
            "Use balanced soil fertility management."
        ],
        biological: [],
        chemical: [
            "Apply magnesium-containing amendments according to soil test and local recommendations."
        ]
    },
    prevention: [
        "Maintain balanced cation nutrition."
    ],
    fieldNotes: [
        "Laboratory testing helps distinguish magnesium deficiency from other chloroses."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},


/* =========================================================
   POTATO
========================================================= */

/* POTATO DISEASES */

{
    id: "potato-disease-late-blight",
    crop: "Potato",
    category: "Disease",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    aliases: ["Potato Late Blight"],
    affectedParts: ["Leaves", "Stems", "Tubers"],
    symptoms: [
        "Water-soaked lesions develop on leaves.",
        "Lesions rapidly turn brown to dark brown.",
        "White sporulation may occur under humid conditions.",
        "Tubers may develop brown to reddish-brown internal lesions."
    ],
    fieldIdentification: [
        "Rapidly expanding dark lesions during cool wet weather are highly suggestive."
    ],
    favourableConditions: [
        "Cool temperatures",
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness"
    ],
    spread: [
        "Spores and infected plant material spread the pathogen."
    ],
    riskFactors: [
        "Dense canopy",
        "Frequent rainfall",
        "Susceptible varieties"
    ],
    similarProblems: [
        "Early blight",
        "Frost injury"
    ],
    management: {
        cultural: [
            "Use healthy seed tubers.",
            "Destroy volunteer potato plants where appropriate.",
            "Maintain good field sanitation."
        ],
        biological: [],
        chemical: [
            "Use locally registered fungicides according to disease forecasting and label recommendations."
        ]
    },
    prevention: [
        "Monitor weather and crop regularly.",
        "Use healthy seed and resistant/tolerant varieties where available."
    ],
    fieldNotes: [
        "Late blight can progress very rapidly under favourable weather."
    ],
    references: [
        "ICAR potato disease management resources"
    ]
},

{
    id: "potato-disease-early-blight",
    crop: "Potato",
    category: "Disease",
    name: "Early Blight",
    scientificName: "Alternaria solani",
    aliases: ["Target Spot"],
    affectedParts: ["Leaves", "Stems", "Tubers"],
    symptoms: [
        "Brown circular lesions develop on older leaves.",
        "Concentric rings may give lesions a target-like appearance.",
        "Severe disease causes premature defoliation."
    ],
    fieldIdentification: [
        "Concentric rings inside brown lesions are characteristic."
    ],
    favourableConditions: [
        "Warm temperatures",
        "Alternating wet and dry periods",
        "Plant stress"
    ],
    spread: [
        "Spores spread through wind, rain and infected debris."
    ],
    riskFactors: [
        "Older stressed plants",
        "Infected crop residue",
        "Nutrient stress"
    ],
    similarProblems: [
        "Late blight",
        "Nutrient deficiency"
    ],
    management: {
        cultural: [
            "Maintain balanced crop nutrition.",
            "Remove or manage infected residues.",
            "Use crop rotation."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides according to local recommendations."
        ]
    },
    prevention: [
        "Maintain crop vigour and field sanitation."
    ],
    fieldNotes: [
        "Early blight generally develops more slowly than late blight."
    ],
    references: [
        "ICAR potato pathology resources"
    ]
},

{
    id: "potato-disease-black-scurf",
    crop: "Potato",
    category: "Disease",
    name: "Black Scurf",
    scientificName: "Rhizoctonia solani",
    aliases: ["Rhizoctonia Disease"],
    affectedParts: ["Tubers", "Stems", "Roots", "Sprouts"],
    symptoms: [
        "Black crust-like sclerotia develop on tuber surfaces.",
        "Sprout emergence may be delayed.",
        "Stem lesions can develop below ground.",
        "Plants may become weak or uneven."
    ],
    fieldIdentification: [
        "Hard black structures adhering to tuber skin are characteristic."
    ],
    favourableConditions: [
        "Cool soil",
        "High soil moisture",
        "Poorly managed seed"
    ],
    spread: [
        "Soil and infected seed tubers are important sources."
    ],
    riskFactors: [
        "Infected seed",
        "Continuous potato cultivation"
    ],
    similarProblems: [
        "Powdery scab",
        "Common scab"
    ],
    management: {
        cultural: [
            "Use healthy certified seed.",
            "Practice crop rotation.",
            "Avoid planting badly infected seed."
        ],
        biological: [],
        chemical: [
            "Use locally registered seed treatments where recommended."
        ]
    },
    prevention: [
        "Use disease-free seed tubers."
    ],
    fieldNotes: [
        "Black scurf is particularly important on seed tubers."
    ],
    references: [
        "ICAR potato disease resources"
    ]
},

{
    id: "potato-disease-common-scab",
    crop: "Potato",
    category: "Disease",
    name: "Common Scab",
    scientificName: "Streptomyces scabies",
    aliases: ["Potato Common Scab"],
    affectedParts: ["Tubers"],
    symptoms: [
        "Rough corky lesions develop on tuber skin.",
        "Lesions may be superficial or deeply pitted.",
        "Market quality is reduced."
    ],
    fieldIdentification: [
        "Corky rough lesions confined mainly to tuber surfaces are typical."
    ],
    favourableConditions: [
        "Dry soil during tuber initiation",
        "Alkaline soil conditions"
    ],
    spread: [
        "Soil and infected planting material can carry the pathogen."
    ],
    riskFactors: [
        "High soil pH",
        "Dry conditions during tuber initiation"
    ],
    similarProblems: [
        "Black scurf",
        "Powdery scab"
    ],
    management: {
        cultural: [
            "Use healthy seed.",
            "Maintain suitable soil moisture during tuber initiation.",
            "Avoid excessive liming."
        ],
        biological: [],
        chemical: []
    },
    prevention: [
        "Maintain appropriate soil pH and moisture."
    ],
    fieldNotes: [
        "Common scab mainly affects tuber appearance and marketability."
    ],
    references: [
        "ICAR potato disease resources"
    ]
},

{
    id: "potato-disease-bacterial-wilt",
    crop: "Potato",
    category: "Disease",
    name: "Bacterial Wilt",
    scientificName: "Ralstonia solanacearum",
    aliases: ["Brown Rot"],
    affectedParts: ["Roots", "Stems", "Tubers"],
    symptoms: [
        "Plants wilt, sometimes without initial yellowing.",
        "Vascular browning may occur.",
        "Cut stems may release bacterial ooze.",
        "Tubers may show vascular discoloration and bacterial ooze."
    ],
    fieldIdentification: [
        "A stem-streaming test can help confirm bacterial wilt when performed correctly."
    ],
    favourableConditions: [
        "Warm soil",
        "High soil moisture",
        "Poor drainage"
    ],
    spread: [
        "Contaminated soil, irrigation water, infected seed and equipment can spread the pathogen."
    ],
    riskFactors: [
        "Infested fields",
        "Infected seed",
        "Poor drainage"
    ],
    similarProblems: [
        "Fusarium wilt",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use certified disease-free seed.",
            "Rotate away from susceptible hosts.",
            "Improve sanitation and drainage."
        ],
        biological: [],
        chemical: []
    },
    prevention: [
        "Do not plant infected seed tubers.",
        "Prevent movement of contaminated soil and water."
    ],
    fieldNotes: [
        "Bacterial wilt is a serious soil- and seed-borne disease."
    ],
    references: [
        "ICAR potato bacterial disease resources"
    ]
},


/* POTATO PESTS */

{
    id: "potato-pest-aphid",
    crop: "Potato",
    category: "Pest",
    name: "Potato Aphid",
    scientificName: "Macrosiphum euphorbiae",
    aliases: ["Aphid"],
    affectedParts: ["Leaves", "Young shoots"],
    symptoms: [
        "Aphid colonies cluster on tender tissues.",
        "Leaves may curl and yellow.",
        "Honeydew deposits can support sooty mould."
    ],
    fieldIdentification: [
        "Inspect young shoots and leaf undersides for aphid colonies."
    ],
    favourableConditions: [
        "Moderate temperatures",
        "Dry weather"
    ],
    spread: [
        "Winged aphids disperse between plants."
    ],
    riskFactors: [
        "High nitrogen",
        "High aphid population"
    ],
    similarProblems: [
        "Whitefly",
        "Thrips"
    ],
    management: {
        cultural: [
            "Avoid excessive nitrogen.",
            "Conserve natural enemies."
        ],
        biological: [
            "Ladybird beetles, lacewings and parasitoids can suppress aphids."
        ],
        chemical: [
            "Use registered insecticides only when necessary."
        ]
    },
    prevention: [
        "Monitor aphid populations regularly."
    ],
    fieldNotes: [
        "Aphids can also act as vectors for plant viruses."
    ],
    references: [
        "ICAR potato pest management resources"
    ]
},

{
    id: "potato-pest-potato-tuber-moth",
    crop: "Potato",
    category: "Pest",
    name: "Potato Tuber Moth",
    scientificName: "Phthorimaea operculella",
    aliases: ["PTM"],
    affectedParts: ["Leaves", "Tubers"],
    symptoms: [
        "Larvae mine leaves and stems.",
        "Tunnels may develop inside tubers.",
        "Infested tubers may rot secondarily."
    ],
    fieldIdentification: [
        "Inspect tubers for larval tunnels and frass."
    ],
    favourableConditions: [
        "Warm dry conditions",
        "Exposed tubers",
        "Poor field sanitation"
    ],
    spread: [
        "Adults lay eggs near leaves or exposed tubers."
    ],
    riskFactors: [
        "Exposed tubers",
        "Late harvesting",
        "Poor sanitation"
    ],
    similarProblems: [
        "Wireworm damage",
        "Mechanical injury"
    ],
    management: {
        cultural: [
            "Maintain adequate soil cover over developing tubers.",
            "Harvest on time.",
            "Remove infested tubers."
        ],
        biological: [
            "Conserve natural enemies."
        ],
        chemical: [
            "Use locally registered treatments when recommended."
        ]
    },
    prevention: [
        "Prevent tuber exposure and maintain field hygiene."
    ],
    fieldNotes: [
        "Tuber protection is especially important during dry conditions."
    ],
    references: [
        "ICAR potato entomology resources"
    ]
},

{
    id: "potato-pest-whitefly",
    crop: "Potato",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["Silverleaf Whitefly"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Adults and nymphs occur on leaf undersides.",
        "Leaves may yellow and weaken.",
        "Honeydew can lead to sooty mould.",
        "Whiteflies may transmit plant viruses."
    ],
    fieldIdentification: [
        "Small white adults fly from foliage when disturbed."
    ],
    favourableConditions: [
        "Warm weather",
        "Dry conditions"
    ],
    spread: [
        "Adults move between plants and fields."
    ],
    riskFactors: [
        "Warm dry weather",
        "Dense host vegetation"
    ],
    similarProblems: [
        "Aphids",
        "Thrips"
    ],
    management: {
        cultural: [
            "Remove heavily infested plant material where appropriate.",
            "Control alternate hosts."
        ],
        biological: [
            "Conserve parasitoids and predators."
        ],
        chemical: [
            "Use registered insecticides only when necessary and rotate modes of action."
        ]
    },
    prevention: [
        "Regular monitoring of leaf undersides."
    ],
    fieldNotes: [
        "Virus transmission makes vector management particularly important."
    ],
    references: [
        "ICAR vegetable pest management resources"
    ]
},

{
    id: "potato-pest-cutworm",
    crop: "Potato",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cutworm"],
    affectedParts: ["Young plants", "Stem base"],
    symptoms: [
        "Young plants are cut close to soil level.",
        "Plant stand becomes irregular.",
        "Larvae hide in soil during daylight."
    ],
    fieldIdentification: [
        "Search soil near damaged plants for larvae."
    ],
    favourableConditions: [
        "Weedy fields",
        "Crop residues"
    ],
    spread: [
        "Adult moths lay eggs near suitable host plants."
    ],
    riskFactors: [
        "High weed pressure",
        "Previous infestation"
    ],
    similarProblems: [
        "Termite damage",
        "Mechanical damage"
    ],
    management: {
        cultural: [
            "Control weeds.",
            "Maintain field sanitation."
        ],
        biological: [
            "Conserve natural enemies."
        ],
        chemical: [
            "Use registered products only when recommended."
        ]
    },
    prevention: [
        "Scout after crop emergence."
    ],
    fieldNotes: [
        "Damage is most important during early establishment."
    ],
    references: [
        "Regional potato pest recommendations"
    ]
},

{
    id: "potato-pest-potato-beetle",
    crop: "Potato",
    category: "Pest",
    name: "Potato Tuber Beetle",
    scientificName: "Epilachna spp.",
    aliases: ["Potato Leaf Beetle"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Adults and larvae feed on leaves.",
        "Skeletonization of leaves may occur.",
        "Severe defoliation reduces photosynthetic area."
    ],
    fieldIdentification: [
        "Inspect leaves for leaf-eating beetles and larvae."
    ],
    favourableConditions: [
        "Warm weather",
        "Dense foliage"
    ],
    spread: [
        "Adults move between plants and fields."
    ],
    riskFactors: [
        "Repeated potato cultivation",
        "High pest population"
    ],
    similarProblems: [
        "Other leaf-eating beetles",
        "Caterpillar damage"
    ],
    management: {
        cultural: [
            "Use crop rotation.",
            "Remove heavily infested foliage when practical."
        ],
        biological: [
            "Conserve predators."
        ],
        chemical: [
            "Use registered insecticides according to local recommendations."
        ]
    },
    prevention: [
        "Regularly inspect foliage."
    ],
    fieldNotes: [
        "Correct species identification is important before treatment."
    ],
    references: [
        "ICAR potato entomology resources"
    ]
},


/* POTATO DISORDERS */

{
    id: "potato-disorder-nitrogen",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "Nitrogen deficiency",
    aliases: ["N Deficiency"],
    affectedParts: ["Older leaves", "Whole plant"],
    symptoms: [
        "Older leaves become pale green or yellow.",
        "Plants remain small.",
        "Leaf area and canopy development decline."
    ],
    fieldIdentification: [
        "Symptoms generally begin on older leaves."
    ],
    favourableConditions: [
        "Low available nitrogen",
        "Leaching",
        "Low organic matter"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low nitrogen input",
        "High rainfall"
    ],
    similarProblems: [
        "Sulfur deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based fertilizer planning."
        ],
        biological: [],
        chemical: [
            "Apply nitrogen according to local potato recommendations."
        ]
    },
    prevention: [
        "Use balanced nutrient management."
    ],
    fieldNotes: [
        "Excess nitrogen can also reduce tuber quality, so balanced management is important."
    ],
    references: [
        "ICAR potato nutrient management resources"
    ]
},

{
    id: "potato-disorder-potassium",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "Potassium deficiency",
    aliases: ["K Deficiency"],
    affectedParts: ["Older leaves", "Leaf margins"],
    symptoms: [
        "Older leaves develop marginal chlorosis.",
        "Leaf margins may become brown and necrotic.",
        "Plants may show reduced stress tolerance."
    ],
    fieldIdentification: [
        "Look for marginal scorching beginning on older leaves."
    ],
    favourableConditions: [
        "Low soil potassium",
        "Light-textured soils"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low potassium reserves",
        "Intensive cropping"
    ],
    similarProblems: [
        "Magnesium deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based potassium management."
        ],
        biological: [],
        chemical: [
            "Apply potassium fertilizer according to local recommendations."
        ]
    },
    prevention: [
        "Maintain balanced NPK nutrition."
    ],
    fieldNotes: [
        "Potassium is important for tuber quality and plant stress tolerance."
    ],
    references: [
        "ICAR potato nutrient management resources"
    ]
},

{
    id: "potato-disorder-magnesium",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "Magnesium deficiency",
    aliases: ["Mg Deficiency"],
    affectedParts: ["Older leaves"],
    symptoms: [
        "Interveinal chlorosis develops on older leaves.",
        "Veins remain relatively green.",
        "Severe symptoms may progress to necrosis."
    ],
    fieldIdentification: [
        "Interveinal chlorosis on older leaves is a major clue."
    ],
    favourableConditions: [
        "Low soil magnesium",
        "Acidic soils",
        "High potassium availability"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Imbalanced fertilization",
        "Low magnesium soil"
    ],
    similarProblems: [
        "Potassium deficiency",
        "Iron deficiency"
    ],
    management: {
        cultural: [
            "Maintain balanced soil fertility."
        ],
        biological: [],
        chemical: [
            "Apply magnesium sources according to soil test recommendations."
        ]
    },
    prevention: [
        "Include magnesium in soil testing where deficiency is suspected."
    ],
    fieldNotes: [
        "Laboratory confirmation is useful when symptoms overlap."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},

{
    id: "potato-disorder-iron",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "Iron deficiency",
    aliases: ["Fe Deficiency"],
    affectedParts: ["Young leaves"],
    symptoms: [
        "Young leaves develop interveinal chlorosis.",
        "Severe deficiency can cause almost complete yellowing."
    ],
    fieldIdentification: [
        "Young leaves are affected first while veins may remain green."
    ],
    favourableConditions: [
        "High soil pH",
        "Calcareous soil",
        "Poor iron availability"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Alkaline soil",
        "High bicarbonate conditions"
    ],
    similarProblems: [
        "Zinc deficiency",
        "Sulfur deficiency"
    ],
    management: {
        cultural: [
            "Improve soil organic matter and overall soil management."
        ],
        biological: [],
        chemical: [
            "Use locally recommended iron sources after confirming deficiency."
        ]
    },
    prevention: [
        "Monitor micronutrient status in high-pH soils."
    ],
    fieldNotes: [
        "Visual diagnosis should ideally be supported by soil or tissue testing."
    ],
    references: [
        "ICAR micronutrient resources"
    ]
},

{
    id: "potato-disorder-zinc",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "Zinc deficiency",
    aliases: ["Zn Deficiency"],
    affectedParts: ["Young leaves", "Whole plant"],
    symptoms: [
        "Plants become stunted.",
        "Young leaves may show chlorosis.",
        "Leaf size may decrease."
    ],
    fieldIdentification: [
        "Look for stunting combined with young-leaf chlorosis."
    ],
    favourableConditions: [
        "High soil pH",
        "Low available zinc"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Alkaline soils",
        "Low organic matter"
    ],
    similarProblems: [
        "Iron deficiency",
        "Nitrogen deficiency"
    ],
    management: {
        cultural: [
            "Use soil-test-based micronutrient management."
        ],
        biological: [],
        chemical: [
            "Apply zinc fertilizer according to local recommendations."
        ]
    },
    prevention: [
        "Monitor soil micronutrient status."
    ],
    fieldNotes: [
        "Confirm suspected zinc deficiency before corrective treatment where possible."
    ],
    references: [
        "ICAR micronutrient management resources"
    ]
},


/* =========================================================
   TOMATO
========================================================= */

/* TOMATO DISEASES */

{
    id: "tomato-disease-early-blight",
    crop: "Tomato",
    category: "Disease",
    name: "Early Blight",
    scientificName: "Alternaria solani",
    aliases: ["Target Spot"],
    affectedParts: ["Leaves", "Stems", "Fruits"],
    symptoms: [
        "Dark brown circular lesions develop on older leaves.",
        "Concentric rings may appear inside lesions.",
        "Leaves may yellow and drop.",
        "Dark lesions can occur near the stem end of fruit."
    ],
    fieldIdentification: [
        "Target-like concentric rings are a useful identification clue."
    ],
    favourableConditions: [
        "Warm temperatures",
        "High humidity",
        "Leaf wetness"
    ],
    spread: [
        "Spores spread by wind, rain splash and infected debris."
    ],
    riskFactors: [
        "Older stressed plants",
        "Infected residues",
        "Poor crop nutrition"
    ],
    similarProblems: [
        "Late blight",
        "Septoria leaf spot"
    ],
    management: {
        cultural: [
            "Remove infected debris.",
            "Use crop rotation.",
            "Maintain adequate plant nutrition."
        ],
        biological: [],
        chemical: [
            "Use locally registered fungicides according to recommendations."
        ]
    },
    prevention: [
        "Maintain field sanitation and avoid prolonged leaf wetness."
    ],
    fieldNotes: [
        "Disease often begins on older foliage."
    ],
    references: [
        "ICAR vegetable pathology resources"
    ]
},

{
    id: "tomato-disease-late-blight",
    crop: "Tomato",
    category: "Disease",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    aliases: ["Tomato Late Blight"],
    affectedParts: ["Leaves", "Stems", "Fruits"],
    symptoms: [
        "Water-soaked dark lesions develop on leaves.",
        "Lesions enlarge rapidly under wet conditions.",
        "White fungal growth may develop under humid conditions.",
        "Fruit develops firm brown lesions."
    ],
    fieldIdentification: [
        "Rapid dark water-soaked lesions during cool wet weather are characteristic."
    ],
    favourableConditions: [
        "Cool temperatures",
        "High humidity",
        "Frequent rainfall"
    ],
    spread: [
        "Spores spread through air, water and infected plant material."
    ],
    riskFactors: [
        "Cool wet weather",
        "Dense canopy",
        "Susceptible varieties"
    ],
    similarProblems: [
        "Early blight",
        "Bacterial leaf spot"
    ],
    management: {
        cultural: [
            "Improve air circulation.",
            "Remove infected plant material.",
            "Avoid overhead irrigation where practical."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides based on local disease forecasts and recommendations."
        ]
    },
    prevention: [
        "Monitor weather and plants frequently during wet periods."
    ],
    fieldNotes: [
        "Late blight can spread extremely quickly."
    ],
    references: [
        "ICAR vegetable pathology resources"
    ]
},

{
    id: "tomato-disease-bacterial-wilt",
    crop: "Tomato",
    category: "Disease",
    name: "Bacterial Wilt",
    scientificName: "Ralstonia solanacearum",
    aliases: ["Tomato Bacterial Wilt"],
    affectedParts: ["Roots", "Stems", "Vascular tissue"],
    symptoms: [
        "Plants wilt rapidly.",
        "Leaves may remain green during early wilting.",
        "Vascular tissues become discoloured.",
        "Bacterial streaming may be observed from cut stems."
    ],
    fieldIdentification: [
        "A properly performed bacterial streaming test can support diagnosis."
    ],
    favourableConditions: [
        "Warm soil",
        "High soil moisture",
        "Poor drainage"
    ],
    spread: [
        "Soil, irrigation water, infected transplants and contaminated equipment can spread the pathogen."
    ],
    riskFactors: [
        "Infested soil",
        "Poor drainage",
        "Infected planting material"
    ],
    similarProblems: [
        "Fusarium wilt",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use disease-free transplants.",
            "Practice crop rotation.",
            "Improve drainage.",
            "Remove severely affected plants."
        ],
        biological: [],
        chemical: []
    },
    prevention: [
        "Prevent movement of contaminated soil and water."
    ],
    fieldNotes: [
        "Bacterial wilt is difficult to manage after a field becomes heavily infested."
    ],
    references: [
        "ICAR vegetable disease management resources"
    ]
},

{
    id: "tomato-disease-leaf-curl",
    crop: "Tomato",
    category: "Disease",
    name: "Tomato Leaf Curl",
    scientificName: "Tomato yellow leaf curl virus",
    aliases: ["TYLCV", "Tomato Leaf Curl Virus"],
    affectedParts: ["Young leaves", "Shoots", "Whole plant"],
    symptoms: [
        "Young leaves curl upward or downward.",
        "Leaves become smaller and may show yellowing.",
        "Plants become severely stunted.",
        "Flowering and fruit set can decline."
    ],
    fieldIdentification: [
        "Severe curling and stunting of young plants with whitefly presence suggests a viral disease."
    ],
    favourableConditions: [
        "Warm weather",
        "High whitefly activity"
    ],
    spread: [
        "Primarily transmitted by whiteflies."
    ],
    riskFactors: [
        "High whitefly population",
        "Nearby infected plants"
    ],
    similarProblems: [
        "Herbicide injury",
        "Nutrient disorder"
    ],
    management: {
        cultural: [
            "Remove severely infected plants.",
            "Control alternate hosts.",
            "Use resistant varieties where available."
        ],
        biological: [
            "Conserve natural enemies of whiteflies."
        ],
        chemical: [
            "Manage vector populations using locally registered products when necessary."
        ]
    },
    prevention: [
        "Use healthy seedlings.",
        "Manage whitefly populations."
    ],
    fieldNotes: [
        "Viral diseases generally cannot be cured after infection."
    ],
    references: [
        "ICAR vegetable virology resources"
    ]
},

{
    id: "tomato-disease-septoria",
    crop: "Tomato",
    category: "Disease",
    name: "Septoria Leaf Spot",
    scientificName: "Septoria lycopersici",
    aliases: ["Septoria"],
    affectedParts: ["Leaves", "Stems"],
    symptoms: [
        "Small circular spots develop on older leaves.",
        "Spots have dark margins and pale centres.",
        "Tiny dark fruiting bodies may appear inside lesions.",
        "Severe infection causes defoliation."
    ],
    fieldIdentification: [
        "Small numerous spots with dark margins are characteristic."
    ],
    favourableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Leaf wetness"
    ],
    spread: [
        "Spores spread through rain splash and contaminated debris."
    ],
    riskFactors: [
        "Dense foliage",
        "Infected residues",
        "Frequent overhead irrigation"
    ],
    similarProblems: [
        "Early blight",
        "Bacterial leaf spot"
    ],
    management: {
        cultural: [
            "Remove infected residues.",
            "Use crop rotation.",
            "Improve air circulation."
        ],
        biological: [],
        chemical: [
            "Use registered fungicides when recommended."
        ]
    },
    prevention: [
        "Avoid prolonged leaf wetness.",
        "Use clean planting material."
    ],
    fieldNotes: [
        "Disease usually begins on lower leaves."
    ],
    references: [
        "ICAR vegetable pathology resources"
    ]
},


/* TOMATO PESTS */

{
    id: "tomato-pest-fruit-borer",
    crop: "Tomato",
    category: "Pest",
    name: "Tomato Fruit Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Gram Pod Borer", "Fruit Caterpillar"],
    affectedParts: ["Leaves", "Flowers", "Fruits"],
    symptoms: [
        "Larvae feed on leaves and flowers.",
        "Circular holes develop in fruits.",
        "Larvae may remain partly outside while feeding inside fruit.",
        "Damaged fruits often develop secondary rotting."
    ],
    fieldIdentification: [
        "Look for caterpillars and circular entry holes in green fruits."
    ],
    favourableConditions: [
        "Warm weather",
        "Continuous host availability"
    ],
    spread: [
        "Adult moths migrate and lay eggs on crop foliage."
    ],
    riskFactors: [
        "High moth activity",
        "Flowering and fruiting crop"
    ],
    similarProblems: [
        "Fruit fly",
        "Leaf miner"
    ],
    management: {
        cultural: [
            "Scout flowers and fruits regularly.",
            "Remove damaged fruits.",
            "Use pheromone monitoring where appropriate."
        ],
        biological: [
            "Conserve parasitoids and predators.",
            "Use biological control agents where locally recommended."
        ],
        chemical: [
            "Use registered insecticides and rotate modes of action when treatment is required."
        ]
    },
    prevention: [
        "Early detection during flowering can reduce fruit damage."
    ],
    fieldNotes: [
        "Integrated pest management is preferred over routine calendar spraying."
    ],
    references: [
        "ICAR tomato pest management resources"
    ]
},

{
    id: "tomato-pest-whitefly",
    crop: "Tomato",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["Silverleaf Whitefly"],
    affectedParts: ["Leaves", "Young shoots"],
    symptoms: [
        "Small white adults fly from foliage when disturbed.",
        "Nymphs occur on leaf undersides.",
        "Honeydew may produce sooty mould.",
        "Whiteflies can transmit viruses."
    ],
    fieldIdentification: [
        "Inspect undersides of leaves for adults, nymphs and honeydew."
    ],
    favourableConditions: [
        "Warm weather",
        "Dry conditions"
    ],
    spread: [
        "Adults disperse between host plants."
    ],
    riskFactors: [
        "Warm dry weather",
        "High weed pressure"
    ],
    similarProblems: [
        "Aphids",
        "Thrips"
    ],
    management: {
        cultural: [
            "Control alternate host weeds.",
            "Remove severely infested plant material where appropriate."
        ],
        biological: [
            "Conserve parasitoids and predators."
        ],
        chemical: [
            "Use registered insecticides only when needed and rotate modes of action."
        ]
    },
    prevention: [
        "Monitor young crops from transplanting onward."
    ],
    fieldNotes: [
        "Whitefly management is especially important because of virus transmission."
    ],
    references: [
        "ICAR vegetable pest resources"
    ]
},

{
    id: "tomato-pest-thrips",
    crop: "Tomato",
    category: "Pest",
    name: "Thrips",
    scientificName: "Thrips spp.",
    aliases: ["Flower Thrips"],
    affectedParts: ["Leaves", "Flowers", "Young fruits"],
    symptoms: [
        "Leaves develop silvery streaks.",
        "Flowers may become damaged.",
        "Young fruit can become scarred or distorted.",
        "Some thrips species can transmit viruses."
    ],
    fieldIdentification: [
        "Tiny slender insects can be found in flowers and young foliage."
    ],
    favourableConditions: [
        "Warm dry weather"
    ],
    spread: [
        "Adults move between plants and fields."
    ],
    riskFactors: [
        "High thrips population",
        "Dry conditions"
    ],
    similarProblems: [
        "Mite damage",
        "Whitefly injury"
    ],
    management: {
        cultural: [
            "Remove alternate hosts and weeds.",
            "Use reflective mulch where locally appropriate."
        ],
        biological: [
            "Conserve predatory mites and beneficial insects."
        ],
        chemical: [
            "Use registered products only when necessary."
        ]
    },
    prevention: [
        "Monitor flowers and young foliage."
    ],
    fieldNotes: [
        "Correct species identification is important because vector capacity varies."
    ],
    references: [
        "ICAR vegetable pest management resources"
    ]
},

{
    id: "tomato-pest-leafminer",
    crop: "Tomato",
    category: "Pest",
    name: "Tomato Leaf Miner",
    scientificName: "Liriomyza spp.",
    aliases: ["Leaf Miner"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Serpentine mines develop inside leaves.",
        "Leaves may dry under heavy infestation.",
        "Photosynthetic area is reduced."
    ],
    fieldIdentification: [
        "Visible winding tunnels inside leaves are characteristic."
    ],
    favourableConditions: [
        "Warm weather",
        "Continuous vegetable cultivation"
    ],
    spread: [
        "Adults disperse between host plants."
    ],
    riskFactors: [
        "High pest population",
        "Poor weed management"
    ],
    similarProblems: [
        "Fungal leaf spots",
        "Mechanical injury"
    ],
    management: {
        cultural: [
            "Remove severely mined leaves where practical.",
            "Control alternate host weeds."
        ],
        biological: [
            "Conserve parasitoids that attack leaf miner larvae."
        ],
        chemical: [
            "Use registered insecticides only when recommended."
        ]
    },
    prevention: [
        "Regular scouting of young leaves."
    ],
    fieldNotes: [
        "Widespread insecticide use can kill natural enemies and worsen leaf miner problems."
    ],
    references: [
        "ICAR vegetable pest management resources"
    ]
},

{
    id: "tomato-pest-red-spider-mite",
    crop: "Tomato",
    category: "Pest",
    name: "Red Spider Mite",
    scientificName: "Tetranychus spp.",
    aliases: ["Spider Mite"],
    affectedParts: ["Leaves"],
    symptoms: [
        "Fine yellow stippling develops on leaves.",
        "Leaves may become bronze or dry.",
        "Fine webbing can occur during heavy infestation."
    ],
    fieldIdentification: [
        "Inspect leaf undersides with a hand lens for mites and webbing."
    ],
    favourableConditions: [
        "Hot weather",
        "Dry conditions"
    ],
    spread: [
        "Mites disperse through plant contact, wind and movement of infested material."
    ],
    riskFactors: [
        "Hot dry weather",
        "Dusty conditions",
        "Excessive broad-spectrum insecticide use"
    ],
    similarProblems: [
        "Thrips damage",
        "Nutrient deficiency"
    ],
    management: {
        cultural: [
            "Reduce plant stress.",
            "Avoid unnecessary broad-spectrum insecticides."
        ],
        biological: [
            "Conserve predatory mites and other natural enemies."
        ],
        chemical: [
            "Use registered miticides only when necessary."
        ]
    },
    prevention: [
        "Monitor leaf undersides during hot dry periods."
    ],
    fieldNotes: [
        "Broad-spectrum insecticide misuse can trigger mite outbreaks."
    ],
    references: [
        "ICAR vegetable pest management resources"
    ]
},


/* TOMATO DISORDERS */

{
    id: "tomato-disorder-nitrogen",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "Nitrogen deficiency",
    aliases: ["N Deficiency"],
    affectedParts: ["Older leaves", "Whole plant"],
    symptoms: [
        "Older leaves become pale green to yellow.",
        "Plants remain small.",
        "Leaf area and growth rate decline."
    ],
    fieldIdentification: [
        "Symptoms begin mainly on older leaves."
    ],
    favourableConditions: [
        "Low soil nitrogen",
        "Leaching",
        "Low organic matter"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low nitrogen availability"
    ],
    similarProblems: [
        "Sulfur deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use soil-test-based fertilizer planning."
        ],
        biological: [],
        chemical: [
            "Apply nitrogen according to local tomato recommendations."
        ]
    },
    prevention: [
        "Maintain balanced nutrition throughout crop growth."
    ],
    fieldNotes: [
        "Excess nitrogen can produce excessive vegetative growth and reduce fruit quality."
    ],
    references: [
        "ICAR vegetable nutrient management resources"
    ]
},

{
    id: "tomato-disorder-phosphorus",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "Phosphorus deficiency",
    aliases: ["P Deficiency"],
    affectedParts: ["Leaves", "Roots", "Whole plant"],
    symptoms: [
        "Plants become stunted.",
        "Older leaves may develop dark green to purplish coloration.",
        "Root growth and flowering can be affected."
    ],
    fieldIdentification: [
        "Purple coloration combined with poor growth can suggest phosphorus deficiency."
    ],
    favourableConditions: [
        "Low available phosphorus",
        "Cold soil",
        "Unsuitable soil pH"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low phosphorus availability",
        "Cold root-zone conditions"
    ],
    similarProblems: [
        "Cold stress",
        "Phosphorus toxicity-related imbalance"
    ],
    management: {
        cultural: [
            "Use soil-test-based phosphorus management."
        ],
        biological: [],
        chemical: [
            "Apply phosphorus fertilizer according to soil test recommendations."
        ]
    },
    prevention: [
        "Maintain adequate phosphorus availability before planting."
    ],
    fieldNotes: [
        "Cold soil can temporarily restrict phosphorus uptake."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},

{
    id: "tomato-disorder-potassium",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "Potassium deficiency",
    aliases: ["K Deficiency"],
    affectedParts: ["Older leaves", "Fruit"],
    symptoms: [
        "Older leaves develop marginal yellowing and scorching.",
        "Plants may have weaker growth.",
        "Fruit quality and colour development can be affected."
    ],
    fieldIdentification: [
        "Marginal scorching of older leaves is an important clue."
    ],
    favourableConditions: [
        "Low soil potassium",
        "High crop demand"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Low potassium soil",
        "Heavy fruit load"
    ],
    similarProblems: [
        "Magnesium deficiency",
        "Water stress"
    ],
    management: {
        cultural: [
            "Use balanced fertilizer management."
        ],
        biological: [],
        chemical: [
            "Apply potassium according to soil test and local recommendations."
        ]
    },
    prevention: [
        "Monitor soil potassium before and during fruit production."
    ],
    fieldNotes: [
        "Potassium is particularly important during fruit development."
    ],
    references: [
        "ICAR vegetable nutrient management resources"
    ]
},

{
    id: "tomato-disorder-calcium",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Calcium Deficiency / Blossom-End Rot",
    scientificName: "Calcium-related physiological disorder",
    aliases: ["Blossom-End Rot", "BER"],
    affectedParts: ["Fruit"],
    symptoms: [
        "Dark water-soaked tissue develops at the blossom end of fruit.",
        "Affected tissue becomes brown, leathery and sunken.",
        "The disorder is associated with inadequate calcium delivery to rapidly growing fruit."
    ],
    fieldIdentification: [
        "Dark sunken lesion at the blossom end is characteristic."
    ],
    favourableConditions: [
        "Irregular soil moisture",
        "Rapid fruit growth",
        "High salinity",
        "Root stress"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Water stress",
        "Root damage",
        "High soluble salts"
    ],
    similarProblems: [
        "Fruit rot",
        "Mechanical injury"
    ],
    management: {
        cultural: [
            "Maintain uniform soil moisture.",
            "Avoid severe root-zone stress.",
            "Maintain balanced nutrition."
        ],
        biological: [],
        chemical: [
            "Correct underlying calcium and soil-water management issues according to soil testing."
        ]
    },
    prevention: [
        "Maintain consistent irrigation.",
        "Avoid large swings between drought and excess irrigation."
    ],
    fieldNotes: [
        "Blossom-end rot is a physiological disorder and is not itself an infectious disease."
    ],
    references: [
        "ICAR horticultural nutrient management resources"
    ]
},

{
    id: "tomato-disorder-magnesium",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "Magnesium deficiency",
    aliases: ["Mg Deficiency"],
    affectedParts: ["Older leaves"],
    symptoms: [
        "Interveinal yellowing develops on older leaves.",
        "Veins remain relatively green.",
        "Severe deficiency may progress to necrosis."
    ],
    fieldIdentification: [
        "Interveinal chlorosis on older leaves is a useful clue."
    ],
    favourableConditions: [
        "Low soil magnesium",
        "Acidic soil",
        "High potassium levels"
    ],
    spread: [
        "Not infectious."
    ],
    riskFactors: [
        "Imbalanced fertilization",
        "Low exchangeable magnesium"
    ],
    similarProblems: [
        "Potassium deficiency",
        "Iron deficiency"
    ],
    management: {
        cultural: [
            "Use balanced nutrient management."
        ],
        biological: [],
        chemical: [
            "Apply magnesium-containing fertilizers according to soil testing and local recommendations."
        ]
    },
    prevention: [
        "Monitor soil nutrient balance."
    ],
    fieldNotes: [
        "Confirm suspected deficiency through soil or tissue testing when possible."
    ],
    references: [
        "ICAR soil fertility resources"
    ]
},

{
    id: "wheat-rust",
    crop: "Wheat",
    category: "Disease",
    name: "Wheat Rust",
    scientificName: "Puccinia spp.",

    aliases: [
        "Rust disease",
        "Wheat rust"
    ],

    symptoms: [
        "Orange, yellow, brown or black pustules may appear on leaves and stems.",
        "Leaves may develop numerous small rust-colored spots.",
        "Severe infection can reduce photosynthetic activity.",
        "Plants may mature prematurely.",
        "Grain filling can be reduced under severe infection."
    ],

    favorableConditions: [
        "Moderate temperatures",
        "High humidity",
        "Leaf wetness",
        "Dense crop canopy"
    ],

    management: [
        "Use resistant or tolerant varieties.",
        "Maintain balanced crop nutrition.",
        "Monitor the crop regularly.",
        "Remove volunteer wheat where practical.",
        "Use registered fungicides when economically justified."
    ],

    prevention: [
        "Use certified seed.",
        "Choose locally recommended resistant varieties.",
        "Avoid excessive nitrogen application.",
        "Maintain good field sanitation.",
        "Follow integrated disease management."
    ],

    fieldNotes: [
        "Rust diseases can spread rapidly when environmental conditions are favorable.",
        "Early detection is important for effective management."
    ],

    references: [
        "Wheat disease management literature",
        "Agricultural extension recommendations",
        "Integrated disease management references"
    ]
},

{
    id: "wheat-aphid",
    crop: "Wheat",
    category: "Pest",
    name: "Wheat Aphid",
    scientificName: "Aphididae",

    aliases: [
        "Wheat aphid",
        "Grain aphid"
    ],

    symptoms: [
        "Small insects occur in colonies on leaves and stems.",
        "Leaves may show yellowing or reduced vigor.",
        "Heavy infestation can cause curling or weakening of leaves.",
        "Honeydew may be deposited on plant surfaces.",
        "Severe infestation can reduce plant growth."
    ],

    favorableConditions: [
        "Mild temperatures",
        "Dense crop growth",
        "Excessive nitrogen",
        "Limited natural-enemy activity"
    ],

    management: [
        "Monitor colonies regularly.",
        "Encourage natural enemies such as ladybird beetles and parasitoids.",
        "Avoid unnecessary broad-spectrum insecticide use.",
        "Use registered insecticides only when economic thresholds justify treatment.",
        "Maintain balanced crop nutrition."
    ],

    prevention: [
        "Use healthy seed.",
        "Maintain balanced fertilization.",
        "Regularly inspect crop margins.",
        "Conserve beneficial insects.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Aphid populations can increase quickly under favorable conditions.",
        "Natural enemies may suppress populations without chemical intervention."
    ],

    references: [
        "Wheat insect pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "wheat-nitrogen-deficiency",
    crop: "Wheat",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "N deficiency",
        "Nitrogen starvation"
    ],

    symptoms: [
        "Older leaves become pale green or yellow.",
        "Plants may remain short and weak.",
        "Tillering may be reduced.",
        "Overall crop growth becomes slow.",
        "Grain yield potential may decline."
    ],

    favorableConditions: [
        "Low soil nitrogen",
        "Low organic matter",
        "Heavy rainfall or leaching",
        "High-yielding crops without adequate nitrogen supply"
    ],

    management: [
        "Apply nitrogen according to soil-test and crop requirements.",
        "Split nitrogen applications where appropriate.",
        "Maintain adequate soil organic matter.",
        "Avoid excessive nitrogen application.",
        "Monitor crop color and growth."
    ],

    prevention: [
        "Conduct soil testing.",
        "Use balanced fertilization.",
        "Include organic matter where suitable.",
        "Apply nitrogen at appropriate crop stages.",
        "Avoid unnecessary nutrient losses."
    ],

    fieldNotes: [
        "Nitrogen deficiency generally appears first on older leaves because nitrogen is mobile within the plant.",
        "Field symptoms should ideally be confirmed with soil or plant analysis."
    ],

    references: [
        "Wheat nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},

// =========================================================
// MAIZE
// =========================================================

{
    id: "maize-fall-armyworm",
    crop: "Maize",
    category: "Pest",
    name: "Fall Armyworm",
    scientificName: "Spodoptera frugiperda",

    aliases: [
        "FAW",
        "Fall armyworm"
    ],

    symptoms: [
        "Irregular feeding holes appear on young leaves.",
        "Window-pane damage may be visible on leaves.",
        "Larval feeding can damage the whorl.",
        "Frass may be present inside the whorl.",
        "Severe infestation can reduce plant growth."
    ],

    favorableConditions: [
        "Warm weather",
        "Dense crop canopy",
        "Continuous maize cultivation",
        "Presence of alternate host plants"
    ],

    management: [
        "Monitor plants regularly, especially the whorl.",
        "Remove and destroy heavily infested plants where practical.",
        "Encourage natural enemies.",
        "Use biological control options where suitable.",
        "Use registered insecticides only when economically justified."
    ],

    prevention: [
        "Practice crop rotation.",
        "Avoid continuous maize cultivation.",
        "Maintain field sanitation.",
        "Monitor the crop from early growth.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Larvae may hide deep inside the whorl.",
        "Early detection greatly improves management."
    ],

    references: [
        "Maize pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "maize-leaf-blight",
    crop: "Maize",
    category: "Disease",
    name: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",

    aliases: [
        "Northern leaf blight",
        "NCLB"
    ],

    symptoms: [
        "Long grey-green to tan lesions appear on leaves.",
        "Lesions may become cigar-shaped.",
        "Severe infection can cause extensive leaf blighting.",
        "Lower leaves are often affected first.",
        "Premature drying of leaves may occur."
    ],

    favorableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Leaf wetness",
        "Moderate temperatures"
    ],

    management: [
        "Use resistant or tolerant varieties.",
        "Maintain field sanitation.",
        "Rotate crops where appropriate.",
        "Avoid excessive crop canopy humidity.",
        "Use registered fungicides when recommended."
    ],

    prevention: [
        "Use healthy seed.",
        "Choose resistant varieties.",
        "Practice crop rotation.",
        "Manage crop residues.",
        "Monitor fields regularly."
    ],

    fieldNotes: [
        "Disease development is favored by prolonged leaf wetness.",
        "Early symptoms may resemble other foliar diseases."
    ],

    references: [
        "Maize disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "maize-nitrogen-deficiency",
    crop: "Maize",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "N deficiency",
        "Nitrogen starvation"
    ],

    symptoms: [
        "Older leaves develop yellowing.",
        "Yellowing may form a V-shaped pattern from the leaf tip toward the midrib.",
        "Plants may become pale and stunted.",
        "Leaf area and biomass may decrease.",
        "Yield potential may decline."
    ],

    favorableConditions: [
        "Low soil nitrogen",
        "Nitrogen leaching",
        "Low organic matter",
        "High crop demand"
    ],

    management: [
        "Use soil-test-based nitrogen management.",
        "Apply nitrogen at appropriate crop stages.",
        "Split nitrogen applications where appropriate.",
        "Improve soil organic matter.",
        "Avoid excessive nitrogen application."
    ],

    prevention: [
        "Test soil before planting.",
        "Use balanced fertilization.",
        "Apply nitrogen according to crop demand.",
        "Reduce nutrient losses.",
        "Monitor crop growth."
    ],

    fieldNotes: [
        "Nitrogen is mobile within the plant, so older leaves usually show symptoms first.",
        "Symptoms can be confused with other causes of general yellowing."
    ],

    references: [
        "Maize nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// POTATO
// =========================================================

{
    id: "potato-late-blight",
    crop: "Potato",
    category: "Disease",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",

    aliases: [
        "Potato late blight",
        "Late blight"
    ],

    symptoms: [
        "Dark water-soaked lesions develop on leaves.",
        "Lesions expand rapidly under favorable conditions.",
        "White fungal growth may appear around lesions under humid conditions.",
        "Leaves may rapidly become necrotic.",
        "Tubers can develop brown to reddish-brown internal lesions."
    ],

    favorableConditions: [
        "Cool temperatures",
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness"
    ],

    management: [
        "Use resistant or tolerant varieties where available.",
        "Remove infected plant material where practical.",
        "Maintain good field sanitation.",
        "Use disease forecasting where available.",
        "Apply registered fungicides according to recommendations."
    ],

    prevention: [
        "Use healthy seed tubers.",
        "Avoid planting infected material.",
        "Provide adequate field drainage.",
        "Monitor weather conditions.",
        "Follow integrated disease management."
    ],

    fieldNotes: [
        "Late blight can progress extremely quickly during favorable weather.",
        "Regular scouting is important during cool and wet periods."
    ],

    references: [
        "Potato disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "potato-potato-tuber-moth",
    crop: "Potato",
    category: "Pest",
    name: "Potato Tuber Moth",
    scientificName: "Phthorimaea operculella",

    aliases: [
        "Potato tuber moth",
        "PTM"
    ],

    symptoms: [
        "Larvae tunnel into leaves and stems.",
        "Tubers may develop feeding tunnels.",
        "Damaged tubers can show frass near entry points.",
        "Infested tubers may rot secondarily.",
        "Storage losses can become significant."
    ],

    favorableConditions: [
        "Warm dry weather",
        "Poor field sanitation",
        "Exposed tubers",
        "Improper storage conditions"
    ],

    management: [
        "Cover tubers adequately with soil.",
        "Harvest on time.",
        "Remove damaged tubers.",
        "Maintain clean storage facilities.",
        "Use registered control measures when required."
    ],

    prevention: [
        "Use healthy seed tubers.",
        "Avoid leaving tubers exposed.",
        "Maintain field sanitation.",
        "Store potatoes properly.",
        "Monitor stored tubers."
    ],

    fieldNotes: [
        "The pest can cause both field and storage damage.",
        "Good earthing-up can reduce access to tubers."
    ],

    references: [
        "Potato pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "potato-potassium-deficiency",
    crop: "Potato",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",

    aliases: [
        "K deficiency",
        "Potassium starvation"
    ],

    symptoms: [
        "Older leaves may develop marginal chlorosis.",
        "Leaf margins may become brown or scorched.",
        "Plants may show reduced vigor.",
        "Tuber quality may decline.",
        "Severe deficiency can reduce yield."
    ],

    favorableConditions: [
        "Low soil potassium",
        "Light sandy soils",
        "High nutrient removal",
        "Imbalanced fertilization"
    ],

    management: [
        "Use soil-test-based potassium application.",
        "Apply potassium according to crop requirement.",
        "Maintain balanced fertilization.",
        "Improve soil nutrient retention where appropriate.",
        "Avoid excessive application."
    ],

    prevention: [
        "Conduct soil testing.",
        "Maintain balanced nutrition.",
        "Monitor crop development.",
        "Account for nutrient removal by harvested tubers.",
        "Use recommended fertilizer sources."
    ],

    fieldNotes: [
        "Potassium deficiency generally appears first on older leaves.",
        "Symptoms should be confirmed with soil or plant analysis where possible."
    ],

    references: [
        "Potato nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// TOMATO
// =========================================================

{
    id: "tomato-early-blight",
    crop: "Tomato",
    category: "Disease",
    name: "Early Blight",
    scientificName: "Alternaria solani",

    aliases: [
        "Alternaria leaf spot",
        "Early blight"
    ],

    symptoms: [
        "Dark brown spots develop on older leaves.",
        "Concentric rings may form inside lesions.",
        "Leaves may yellow around lesions.",
        "Severe infection causes defoliation.",
        "Fruit may develop dark sunken lesions near the stem."
    ],

    favorableConditions: [
        "Warm temperatures",
        "High humidity",
        "Leaf wetness",
        "Poor field sanitation"
    ],

    management: [
        "Remove severely infected plant material.",
        "Improve air circulation.",
        "Avoid unnecessary overhead irrigation.",
        "Use resistant or tolerant varieties where available.",
        "Apply registered fungicides when required."
    ],

    prevention: [
        "Use healthy planting material.",
        "Practice crop rotation.",
        "Remove crop residues.",
        "Maintain adequate plant spacing.",
        "Monitor plants regularly."
    ],

    fieldNotes: [
        "Older leaves are commonly affected first.",
        "Disease pressure increases when foliage remains wet for long periods."
    ],

    references: [
        "Tomato disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "tomato-fruit-borer",
    crop: "Tomato",
    category: "Pest",
    name: "Tomato Fruit Borer",
    scientificName: "Helicoverpa armigera",

    aliases: [
        "Fruit borer",
        "Gram pod borer"
    ],

    symptoms: [
        "Circular holes appear in fruits.",
        "Larvae may partially enter the fruit.",
        "Frass can be visible near feeding holes.",
        "Damaged fruits may develop secondary rots.",
        "Flower and young fruit feeding can reduce yield."
    ],

    favorableConditions: [
        "Warm weather",
        "Continuous host availability",
        "Dense crop growth",
        "Low natural-enemy activity"
    ],

    management: [
        "Scout flowers and fruits regularly.",
        "Use pheromone traps for monitoring.",
        "Encourage parasitoids and predators.",
        "Remove heavily infested fruits.",
        "Use registered insecticides based on economic need."
    ],

    prevention: [
        "Practice crop rotation.",
        "Use pheromone-based monitoring.",
        "Maintain field sanitation.",
        "Conserve beneficial insects.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "The larva may remain partly outside the fruit while feeding.",
        "Repeated monitoring is important because generations can overlap."
    ],

    references: [
        "Tomato pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "tomato-calcium-disorder",
    crop: "Tomato",
    category: "Nutrient Disorder",
    name: "Calcium-Related Blossom End Rot",
    scientificName: "",

    aliases: [
        "Blossom end rot",
        "Calcium disorder"
    ],

    symptoms: [
        "Dark sunken lesions develop at the blossom end of fruits.",
        "Affected tissue becomes brown or leathery.",
        "Young fruits may be particularly affected.",
        "Damage can increase during rapid fruit growth.",
        "Secondary infections may develop in damaged tissue."
    ],

    favorableConditions: [
        "Irregular soil moisture",
        "Rapid fruit growth",
        "Low calcium availability",
        "Root stress"
    ],

    management: [
        "Maintain uniform soil moisture.",
        "Avoid severe water stress.",
        "Maintain balanced nutrition.",
        "Improve root-zone conditions.",
        "Use soil testing before applying corrective nutrients."
    ],

    prevention: [
        "Maintain consistent irrigation.",
        "Avoid excessive nitrogen.",
        "Maintain healthy roots.",
        "Use balanced fertilization.",
        "Improve soil structure where necessary."
    ],

    fieldNotes: [
        "Blossom end rot is often associated with inadequate calcium delivery to developing fruit rather than simply low total soil calcium.",
        "Water management is critical."
    ],

    references: [
        "Tomato physiological disorder literature",
        "Plant nutrition references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// CHILLI
// =========================================================

{
    id: "chilli-anthracnose",
    crop: "Chilli",
    category: "Disease",
    name: "Chilli Anthracnose",
    scientificName: "Colletotrichum spp.",

    aliases: [
        "Fruit rot",
        "Die-back",
        "Anthracnose"
    ],

    symptoms: [
        "Dark sunken lesions develop on fruits.",
        "Lesions may enlarge with concentric patterns.",
        "Fruit may shrivel and rot.",
        "Twigs may show die-back symptoms.",
        "Severe infection can reduce marketable yield."
    ],

    favorableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Extended leaf or fruit wetness",
        "Poor field sanitation"
    ],

    management: [
        "Remove infected fruits.",
        "Use healthy planting material.",
        "Improve field sanitation.",
        "Avoid excessive canopy humidity.",
        "Use registered fungicides when required."
    ],

    prevention: [
        "Use disease-free seed.",
        "Practice crop rotation.",
        "Remove infected crop debris.",
        "Provide adequate plant spacing.",
        "Monitor fruits regularly."
    ],

    fieldNotes: [
        "Infected fruits can act as important sources of secondary spread.",
        "Disease pressure can increase rapidly during wet weather."
    ],

    references: [
        "Chilli disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "chilli-thrips",
    crop: "Chilli",
    category: "Pest",
    name: "Chilli Thrips",
    scientificName: "Thrips spp.",

    aliases: [
        "Thrips",
        "Chilli thrips"
    ],

    symptoms: [
        "Leaves become distorted or curled.",
        "Silvery or bronzed patches may develop.",
        "Young leaves may become narrow.",
        "Flower damage can reduce fruit set.",
        "Severe infestation can stunt plants."
    ],

    favorableConditions: [
        "Warm dry weather",
        "Dense plant growth",
        "Low rainfall",
        "Presence of alternate hosts"
    ],

    management: [
        "Inspect young leaves and flowers regularly.",
        "Use sticky traps for monitoring.",
        "Conserve natural enemies.",
        "Remove heavily infested plant material where practical.",
        "Use registered insecticides only when necessary."
    ],

    prevention: [
        "Maintain field sanitation.",
        "Control alternate host weeds.",
        "Monitor nursery plants.",
        "Avoid unnecessary broad-spectrum insecticides.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Thrips are particularly damaging to tender plant tissues.",
        "Early infestation may be difficult to detect without close inspection."
    ],

    references: [
        "Chilli pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "chilli-nitrogen-deficiency",
    crop: "Chilli",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "N deficiency",
        "Nitrogen starvation"
    ],

    symptoms: [
        "Older leaves become pale green or yellow.",
        "Plant growth becomes weak.",
        "Branching may decrease.",
        "Leaf area may be reduced.",
        "Fruit production can decline."
    ],

    favorableConditions: [
        "Low soil nitrogen",
        "Low organic matter",
        "Nutrient leaching",
        "High crop demand"
    ],

    management: [
        "Apply nitrogen according to soil-test recommendations.",
        "Use split applications where appropriate.",
        "Maintain soil organic matter.",
        "Use balanced fertilization.",
        "Monitor crop response."
    ],

    prevention: [
        "Test soil before planting.",
        "Maintain balanced nutrition.",
        "Apply nitrogen according to crop demand.",
        "Reduce nutrient losses.",
        "Monitor older leaves for early symptoms."
    ],

    fieldNotes: [
        "Nitrogen deficiency usually begins in older leaves because nitrogen is mobile within the plant.",
        "Confirm suspected deficiency through soil or plant analysis."
    ],

    references: [
        "Chilli nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// SOYBEAN
// =========================================================

{
    id: "soybean-rust",
    crop: "Soybean",
    category: "Disease",
    name: "Soybean Rust",
    scientificName: "Phakopsora spp.",

    aliases: [
        "Soybean rust",
        "Asian soybean rust"
    ],

    symptoms: [
        "Small lesions develop on leaves.",
        "Rust-colored pustules may appear on the underside of leaves.",
        "Leaves may yellow and drop prematurely.",
        "Severe infection reduces green leaf area.",
        "Yield can decline when infection occurs early."
    ],

    favorableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Leaf wetness",
        "Moderate temperatures"
    ],

    management: [
        "Monitor fields regularly.",
        "Use tolerant or resistant varieties where available.",
        "Use disease forecasting where available.",
        "Maintain balanced crop nutrition.",
        "Use registered fungicides according to recommendations."
    ],

    prevention: [
        "Use healthy seed.",
        "Monitor regional disease alerts.",
        "Practice appropriate crop rotation.",
        "Control volunteer soybean plants.",
        "Follow integrated disease management."
    ],

    fieldNotes: [
        "Early detection is important because disease can spread rapidly under favorable conditions.",
        "Leaf underside inspection may improve detection."
    ],

    references: [
        "Soybean disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "soybean-stem-fly",
    crop: "Soybean",
    category: "Pest",
    name: "Soybean Stem Fly",
    scientificName: "Melanagromyza sojae",

    aliases: [
        "Stem fly",
        "Soybean stem miner"
    ],

    symptoms: [
        "Larvae tunnel inside stems.",
        "Plants may show wilting or reduced vigor.",
        "Stem tissues may become damaged.",
        "Severe infestation can cause plant lodging.",
        "Growth may be reduced."
    ],

    favorableConditions: [
        "Warm weather",
        "Young crop growth",
        "Presence of alternate hosts",
        "Continuous soybean cultivation"
    ],

    management: [
        "Monitor young plants.",
        "Use healthy seed.",
        "Practice crop rotation.",
        "Remove severely damaged plants where practical.",
        "Use registered control measures when recommended."
    ],

    prevention: [
        "Avoid continuous soybean cultivation.",
        "Maintain field sanitation.",
        "Use locally recommended varieties.",
        "Monitor early crop stages.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Damage can be difficult to detect because larvae develop within stems.",
        "Inspect stems when unexplained wilting occurs."
    ],

    references: [
        "Soybean pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "soybean-nitrogen-deficiency",
    crop: "Soybean",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "N deficiency",
        "Nitrogen starvation"
    ],

    symptoms: [
        "Plants may appear pale green.",
        "Growth and canopy development may be reduced.",
        "Lower leaves may yellow.",
        "Biomass accumulation may decline.",
        "Yield potential can decrease."
    ],

    favorableConditions: [
        "Poor nodulation",
        "Low soil fertility",
        "Root stress",
        "Poor biological nitrogen fixation"
    ],

    management: [
        "Check root nodulation.",
        "Use appropriate inoculation practices where needed.",
        "Improve soil conditions.",
        "Correct other limiting nutrients.",
        "Use soil and plant testing before applying corrective nitrogen."
    ],

    prevention: [
        "Use appropriate rhizobial inoculation.",
        "Maintain healthy roots.",
        "Avoid severe soil compaction.",
        "Maintain suitable soil pH.",
        "Monitor nodulation."
    ],

    fieldNotes: [
        "Soybean obtains much of its nitrogen through biological nitrogen fixation.",
        "Poor nodulation can mimic nitrogen deficiency."
    ],

    references: [
        "Soybean nutrition literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// GROUNDNUT
// =========================================================

{
    id: "groundnut-tikka-disease",
    crop: "Groundnut",
    category: "Disease",
    name: "Tikka Leaf Spot",
    scientificName: "Cercospora spp.",

    aliases: [
        "Groundnut leaf spot",
        "Tikka disease"
    ],

    symptoms: [
        "Dark spots develop on leaflets.",
        "Spots may enlarge with age.",
        "Yellowing can occur around lesions.",
        "Premature leaf fall may develop.",
        "Severe infection reduces photosynthetic area."
    ],

    favorableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Extended leaf wetness",
        "Dense canopy"
    ],

    management: [
        "Use tolerant varieties where available.",
        "Maintain crop sanitation.",
        "Practice crop rotation.",
        "Monitor crop regularly.",
        "Use registered fungicides when necessary."
    ],

    prevention: [
        "Use healthy seed.",
        "Remove infected crop residues.",
        "Practice rotation.",
        "Maintain balanced nutrition.",
        "Monitor disease development."
    ],

    fieldNotes: [
        "Early disease development can be difficult to notice from a distance.",
        "Frequent scouting is important during humid weather."
    ],

    references: [
        "Groundnut disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "groundnut-aphid",
    crop: "Groundnut",
    category: "Pest",
    name: "Groundnut Aphid",
    scientificName: "Aphis craccivora",

    aliases: [
        "Groundnut aphid",
        "Cowpea aphid"
    ],

    symptoms: [
        "Aphid colonies develop on tender plant parts.",
        "Leaves may curl or become distorted.",
        "Plant growth may be reduced.",
        "Honeydew may accumulate on plant surfaces.",
        "Heavy infestation can weaken plants."
    ],

    favorableConditions: [
        "Warm weather",
        "Dry conditions",
        "Dense plant growth",
        "Low natural-enemy activity"
    ],

    management: [
        "Monitor tender shoots regularly.",
        "Conserve ladybird beetles and parasitoids.",
        "Remove heavily infested parts where practical.",
        "Avoid unnecessary insecticide use.",
        "Use registered insecticides when economically justified."
    ],

    prevention: [
        "Maintain field sanitation.",
        "Control alternate host weeds.",
        "Encourage beneficial insects.",
        "Use healthy seed.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Aphids may also contribute to virus transmission.",
        "Natural enemies can provide substantial control under favorable conditions."
    ],

    references: [
        "Groundnut pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "groundnut-calcium-deficiency",
    crop: "Groundnut",
    category: "Nutrient Disorder",
    name: "Calcium Deficiency",
    scientificName: "",

    aliases: [
        "Ca deficiency",
        "Calcium deficiency"
    ],

    symptoms: [
        "Poor pod development may occur.",
        "Seeds may be poorly filled.",
        "Young tissues can show growth abnormalities.",
        "Pods may contain empty or poorly developed seeds.",
        "Root growth may be affected."
    ],

    favorableConditions: [
        "Low soil calcium",
        "Acidic soils",
        "Poor soil fertility",
        "Imbalanced fertilization"
    ],

    management: [
        "Test soil before corrective application.",
        "Apply calcium according to soil requirements.",
        "Maintain suitable soil pH.",
        "Use appropriate calcium sources.",
        "Avoid excessive fertilizer application."
    ],

    prevention: [
        "Conduct soil testing.",
        "Maintain suitable soil pH.",
        "Use balanced fertilization.",
        "Monitor pod development.",
        "Maintain good soil structure."
    ],

    fieldNotes: [
        "Calcium is particularly important for successful pod and seed development in groundnut.",
        "Symptoms should be confirmed through soil analysis where possible."
    ],

    references: [
        "Groundnut nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},


// =========================================================
// MUSTARD
// =========================================================

{
    id: "mustard-alternaria-blight",
    crop: "Mustard",
    category: "Disease",
    name: "Alternaria Blight",
    scientificName: "Alternaria brassicae",

    aliases: [
        "Mustard blight",
        "Alternaria leaf spot"
    ],

    symptoms: [
        "Dark circular spots develop on leaves.",
        "Concentric rings may develop within lesions.",
        "Spots can occur on stems and pods.",
        "Severe infection can cause premature leaf fall.",
        "Pod infection may reduce seed quality."
    ],

    favorableConditions: [
        "Cool humid weather",
        "Frequent rainfall",
        "Leaf wetness",
        "Dense crop canopy"
    ],

    management: [
        "Use tolerant varieties where available.",
        "Maintain field sanitation.",
        "Practice crop rotation.",
        "Monitor crops regularly.",
        "Use registered fungicides when required."
    ],

    prevention: [
        "Use healthy seed.",
        "Use disease-free planting material.",
        "Remove infected crop residues.",
        "Avoid excessive canopy humidity.",
        "Follow integrated disease management."
    ],

    fieldNotes: [
        "Disease can affect leaves, stems and pods.",
        "Pod infection can have a direct effect on seed quality."
    ],

    references: [
        "Mustard disease management literature",
        "Plant pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "mustard-aphid",
    crop: "Mustard",
    category: "Pest",
    name: "Mustard Aphid",
    scientificName: "Lipaphis erysimi",

    aliases: [
        "Mustard aphid",
        "Cabbage aphid"
    ],

    symptoms: [
        "Aphid colonies cluster on shoots and inflorescences.",
        "Flowers may become distorted.",
        "Plant growth may be reduced.",
        "Honeydew may accumulate on plant surfaces.",
        "Severe infestation can reduce seed production."
    ],

    favorableConditions: [
        "Cool conditions",
        "Dense crop growth",
        "High aphid reproduction",
        "Low natural-enemy activity"
    ],

    management: [
        "Monitor flowering shoots regularly.",
        "Conserve ladybird beetles and parasitoids.",
        "Use mechanical removal where practical for small areas.",
        "Avoid unnecessary broad-spectrum insecticides.",
        "Use registered insecticides when economic thresholds justify treatment."
    ],

    prevention: [
        "Regularly inspect crop margins.",
        "Conserve beneficial insects.",
        "Maintain balanced nutrition.",
        "Control alternate host weeds.",
        "Follow integrated pest management."
    ],

    fieldNotes: [
        "Aphids can concentrate heavily on flowering shoots.",
        "Natural enemies may significantly suppress populations."
    ],

    references: [
        "Mustard pest management literature",
        "Integrated pest management references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "mustard-sulfur-deficiency",
    crop: "Mustard",
    category: "Nutrient Disorder",
    name: "Sulfur Deficiency",
    scientificName: "",

    aliases: [
        "S deficiency",
        "Sulfur starvation"
    ],

    symptoms: [
        "Young leaves become pale green or yellow.",
        "Plant growth may become weak.",
        "Branching can be reduced.",
        "Flowering may be affected.",
        "Seed and oil production can decline."
    ],

    favorableConditions: [
        "Low soil sulfur",
        "Low organic matter",
        "Sandy soils",
        "Use of sulfur-free fertilizers"
    ],

    management: [
        "Use soil testing to confirm deficiency.",
        "Apply an appropriate sulfur source.",
        "Maintain balanced fertilization.",
        "Consider sulfur-containing fertilizers where suitable.",
        "Monitor new growth after correction."
    ],

    prevention: [
        "Include sulfur in soil testing.",
        "Use balanced fertilizer programs.",
        "Maintain soil organic matter.",
        "Monitor young leaves.",
        "Account for crop nutrient removal."
    ],

    fieldNotes: [
        "Unlike nitrogen deficiency, sulfur deficiency tends to appear more strongly in younger leaves because sulfur is relatively immobile in the plant.",
        "Soil testing is useful for confirmation."
    ],

    references: [
        "Mustard nutrient management literature",
        "Soil fertility references",
        "Agricultural extension recommendations"
    ]
},

// =========================================================
// NEW CROPS — SORGHUM
// =========================================================

{
    id: "sorghum-anthracnose",
    crop: "Sorghum",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum sublineola",
    aliases: ["Sorghum anthracnose"],
    symptoms: [
        "Small reddish or purple leaf spots develop.",
        "Lesions enlarge and may develop dark centers.",
        "Severe infection causes premature leaf drying.",
        "Stem and panicle infection may occur.",
        "Yield can decline under severe disease pressure."
    ],
    favorableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Extended leaf wetness"
    ],
    management: [
        "Use tolerant varieties.",
        "Remove heavily infected residues.",
        "Practice crop rotation.",
        "Maintain balanced nutrition.",
        "Use registered fungicides where recommended."
    ],
    prevention: [
        "Use healthy seed.",
        "Avoid continuous sorghum cultivation.",
        "Maintain field sanitation.",
        "Monitor the crop regularly."
    ],
    fieldNotes: [
        "Disease development is favored by warm and humid conditions."
    ],
    references: [
        "Sorghum disease management literature",
        "Agricultural extension recommendations"
    ]
},

{
    id: "sorghum-downy-mildew",
    crop: "Sorghum",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronosclerospora sorghi",
    aliases: ["Sorghum downy mildew"],
    symptoms: [
        "Leaves develop pale green or yellow areas.",
        "White fungal growth may appear on leaf surfaces.",
        "Leaves may show longitudinal striping.",
        "Severely affected plants may remain stunted.",
        "Panicle development can be poor."
    ],
    favorableConditions: [
        "Cool humid conditions",
        "High soil moisture",
        "Frequent rainfall"
    ],
    management: [
        "Use resistant varieties.",
        "Remove severely infected plants.",
        "Use healthy seed.",
        "Improve field sanitation.",
        "Follow local fungicide recommendations."
    ],
    prevention: [
        "Use resistant cultivars.",
        "Avoid infected planting material.",
        "Maintain proper drainage.",
        "Practice crop rotation."
    ],
    fieldNotes: [
        "Systemic infection can affect overall plant development."
    ],
    references: [
        "Sorghum pathology references",
        "Agricultural extension recommendations"
    ]
},

{
    id: "sorghum-grain-mold",
    crop: "Sorghum",
    category: "Disease",
    name: "Grain Mold",
    scientificName: "Multiple fungal species",
    aliases: ["Grain mold complex"],
    symptoms: [
        "Grains develop discoloration.",
        "Panicles may show mold growth.",
        "Seeds can become shriveled.",
        "Grain quality may decline.",
        "Severe infection can reduce germination."
    ],
    favorableConditions: [
        "High humidity during grain maturity",
        "Rainfall near harvest",
        "Delayed harvesting"
    ],
    management: [
        "Use tolerant varieties.",
        "Harvest at appropriate maturity.",
        "Dry grain rapidly after harvest.",
        "Maintain storage hygiene.",
        "Avoid prolonged field exposure."
    ],
    prevention: [
        "Use healthy seed.",
        "Select suitable varieties.",
        "Harvest promptly.",
        "Maintain proper grain moisture during storage."
    ],
    fieldNotes: [
        "Grain mold is often associated with wet conditions around maturity."
    ],
    references: [
        "Sorghum grain quality literature",
        "Post-harvest management references"
    ]
},

{
    id: "sorghum-rust",
    crop: "Sorghum",
    category: "Disease",
    name: "Rust",
    scientificName: "Puccinia purpurea",
    aliases: ["Sorghum rust"],
    symptoms: [
        "Rust-colored pustules develop on leaves.",
        "Leaves may develop yellowing around lesions.",
        "Severe infection reduces green leaf area.",
        "Premature leaf drying may occur.",
        "Yield may decline under severe infection."
    ],
    favorableConditions: [
        "Moderate temperatures",
        "High humidity",
        "Leaf wetness"
    ],
    management: [
        "Use tolerant varieties.",
        "Monitor fields regularly.",
        "Maintain balanced nutrition.",
        "Manage crop residues.",
        "Use fungicides where locally recommended."
    ],
    prevention: [
        "Use healthy seed.",
        "Choose tolerant varieties.",
        "Maintain field sanitation."
    ],
    fieldNotes: [
        "Rust is easier to identify by examining leaf pustules."
    ],
    references: [
        "Sorghum disease references",
        "Plant pathology literature"
    ]
},

{
    id: "sorghum-leaf-blight",
    crop: "Sorghum",
    category: "Disease",
    name: "Leaf Blight",
    scientificName: "Exserohilum turcicum",
    aliases: ["Sorghum leaf blight"],
    symptoms: [
        "Long brown lesions appear on leaves.",
        "Lesions may expand rapidly.",
        "Severe infection causes leaf blighting.",
        "Photosynthetic area is reduced.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Warm humid weather",
        "Frequent rainfall",
        "Leaf wetness"
    ],
    management: [
        "Use tolerant cultivars.",
        "Practice crop rotation.",
        "Remove infected residues.",
        "Maintain balanced nutrition.",
        "Use registered fungicides when justified."
    ],
    prevention: [
        "Use healthy seed.",
        "Maintain field sanitation.",
        "Avoid continuous cropping."
    ],
    fieldNotes: [
        "Long cigar-shaped lesions may help distinguish severe infections."
    ],
    references: [
        "Sorghum pathology literature",
        "Agricultural extension recommendations"
    ]
},

{
    id: "sorghum-shoot-fly",
    crop: "Sorghum",
    category: "Pest",
    name: "Shoot Fly",
    scientificName: "Atherigona soccata",
    aliases: ["Sorghum shoot fly"],
    symptoms: [
        "Central shoot leaves wilt.",
        "Dead hearts develop in young plants.",
        "Larvae damage the growing point.",
        "Plant growth becomes stunted.",
        "Severe attack reduces plant stand."
    ],
    favorableConditions: [
        "Warm weather",
        "Late sowing",
        "Young crop stages"
    ],
    management: [
        "Use timely sowing.",
        "Use tolerant varieties.",
        "Maintain proper plant population.",
        "Remove severely damaged seedlings.",
        "Use registered insecticides when required."
    ],
    prevention: [
        "Sow at the recommended time.",
        "Use healthy seed.",
        "Maintain field sanitation.",
        "Monitor seedlings closely."
    ],
    fieldNotes: [
        "Dead heart is a characteristic symptom of early attack."
    ],
    references: [
        "Sorghum insect pest management literature",
        "IPM recommendations"
    ]
},

{
    id: "sorghum-stem-borer",
    crop: "Sorghum",
    category: "Pest",
    name: "Stem Borer",
    scientificName: "Chilo partellus",
    aliases: ["Sorghum stem borer"],
    symptoms: [
        "Dead hearts may develop.",
        "Larvae tunnel inside stems.",
        "Stem weakening can cause lodging.",
        "Leaves may show feeding damage.",
        "Panicle development can be affected."
    ],
    favorableConditions: [
        "Warm weather",
        "Continuous cereal cultivation",
        "Crop residue presence"
    ],
    management: [
        "Practice crop rotation.",
        "Destroy infested residues.",
        "Use tolerant varieties.",
        "Monitor plants regularly.",
        "Use registered insecticides where necessary."
    ],
    prevention: [
        "Remove crop residues.",
        "Avoid continuous sorghum.",
        "Maintain timely sowing."
    ],
    fieldNotes: [
        "Larvae remain protected inside stems."
    ],
    references: [
        "Sorghum pest management literature"
    ]
},

{
    id: "sorghum-aphid",
    crop: "Sorghum",
    category: "Pest",
    name: "Sorghum Aphid",
    scientificName: "Melanaphis sacchari",
    aliases: ["Sugarcane aphid"],
    symptoms: [
        "Aphid colonies develop on leaves.",
        "Leaves may yellow.",
        "Honeydew accumulates on leaf surfaces.",
        "Sooty mold may develop.",
        "Severe infestations reduce plant vigor."
    ],
    favorableConditions: [
        "Warm weather",
        "Dry conditions",
        "Low natural-enemy activity"
    ],
    management: [
        "Monitor lower leaf surfaces.",
        "Conserve natural enemies.",
        "Control alternate hosts.",
        "Avoid unnecessary insecticide use.",
        "Use registered products when economically justified."
    ],
    prevention: [
        "Regular scouting",
        "Field sanitation",
        "Natural-enemy conservation"
    ],
    fieldNotes: [
        "Natural predators can substantially reduce aphid populations."
    ],
    references: [
        "Sorghum aphid management literature"
    ]
},

{
    id: "sorghum-midge",
    crop: "Sorghum",
    category: "Pest",
    name: "Sorghum Midge",
    scientificName: "Stenodiplosis sorghicola",
    aliases: ["Sorghum grain midge"],
    symptoms: [
        "Poor grain set occurs.",
        "Spikelets may remain empty.",
        "Panicles may appear partially sterile.",
        "Seed production declines.",
        "Severe infestation reduces yield."
    ],
    favorableConditions: [
        "Warm weather during flowering",
        "Staggered flowering",
        "Continuous sorghum cultivation"
    ],
    management: [
        "Use uniform crop establishment.",
        "Avoid prolonged flowering periods where possible.",
        "Monitor flowering panicles.",
        "Use tolerant varieties.",
        "Apply registered control measures when justified."
    ],
    prevention: [
        "Synchronous sowing",
        "Timely harvesting",
        "Field sanitation"
    ],
    fieldNotes: [
        "Flowering stage is particularly vulnerable."
    ],
    references: [
        "Sorghum pest management references"
    ]
},

{
    id: "sorghum-nitrogen-deficiency",
    crop: "Sorghum",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: [
        "Older leaves become pale green.",
        "Yellowing progresses from older leaves.",
        "Plants remain short.",
        "Tillering may decrease.",
        "Yield potential declines."
    ],
    favorableConditions: [
        "Low soil nitrogen",
        "Leaching",
        "Low organic matter"
    ],
    management: [
        "Use soil-test-based nitrogen management.",
        "Apply nitrogen at suitable crop stages.",
        "Improve soil organic matter.",
        "Use split applications where appropriate."
    ],
    prevention: [
        "Soil testing",
        "Balanced fertilization",
        "Proper nitrogen timing"
    ],
    fieldNotes: [
        "Older leaves usually show deficiency first."
    ],
    references: [
        "Sorghum nutrient management literature"
    ]
},

{
    id: "sorghum-phosphorus-deficiency",
    crop: "Sorghum",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: [
        "Plants become stunted.",
        "Leaves may develop dark green or purplish coloration.",
        "Root development may be poor.",
        "Maturity may be delayed.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Low available phosphorus",
        "Cold soil",
        "High soil fixation"
    ],
    management: [
        "Use soil testing.",
        "Apply phosphorus according to recommendations.",
        "Maintain suitable soil pH.",
        "Improve root-zone conditions."
    ],
    prevention: [
        "Balanced fertilization",
        "Soil testing",
        "Proper fertilizer placement"
    ],
    fieldNotes: [
        "Purpling can also occur due to environmental stress, so confirmation is useful."
    ],
    references: [
        "Sorghum soil fertility references"
    ]
},

{
    id: "sorghum-potassium-deficiency",
    crop: "Sorghum",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: [
        "Older leaf margins become yellow.",
        "Leaf margins may turn brown.",
        "Plants may have weak stems.",
        "Drought tolerance can decrease.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Low soil potassium",
        "Sandy soils",
        "High nutrient removal"
    ],
    management: [
        "Test soil.",
        "Apply potassium according to crop requirement.",
        "Maintain balanced nutrition."
    ],
    prevention: [
        "Regular soil testing",
        "Balanced fertilization",
        "Maintain soil organic matter"
    ],
    fieldNotes: [
        "Symptoms commonly begin on older leaves."
    ],
    references: [
        "Sorghum nutrient management literature"
    ]
},

{
    id: "sorghum-zinc-deficiency",
    crop: "Sorghum",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: [
        "Young leaves may develop pale bands.",
        "Interveinal chlorosis may occur.",
        "Plants may become stunted.",
        "Internodes can remain short.",
        "Yield can decline."
    ],
    favorableConditions: [
        "High soil pH",
        "Low soil zinc",
        "High phosphorus availability"
    ],
    management: [
        "Confirm deficiency through soil or plant analysis.",
        "Apply zinc according to recommendation.",
        "Maintain balanced fertilization."
    ],
    prevention: [
        "Soil testing",
        "Balanced nutrient management",
        "Use suitable zinc sources"
    ],
    fieldNotes: [
        "Zinc deficiency is often more pronounced in young tissues."
    ],
    references: [
        "Sorghum micronutrient management literature"
    ]
},

{
    id: "sorghum-iron-deficiency",
    crop: "Sorghum",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: [
        "Young leaves develop interveinal chlorosis.",
        "Leaves can become pale yellow.",
        "Severe deficiency reduces photosynthesis.",
        "Plants may become weak.",
        "Growth may be restricted."
    ],
    favorableConditions: [
        "High soil pH",
        "Poor iron availability",
        "Waterlogged root zones"
    ],
    management: [
        "Confirm deficiency before treatment.",
        "Correct soil conditions.",
        "Use suitable iron sources where recommended."
    ],
    prevention: [
        "Maintain suitable soil conditions.",
        "Avoid prolonged waterlogging.",
        "Monitor young leaves."
    ],
    fieldNotes: [
        "Young leaves are affected first because iron is poorly mobile in plants."
    ],
    references: [
        "Sorghum micronutrient references"
    ]
},


// =========================================================
// PEARL MILLET
// =========================================================

{
    id: "pearl-millet-downy-mildew",
    crop: "Pearl Millet",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Sclerospora graminicola",
    aliases: ["Green ear disease"],
    symptoms: [
        "Leaves develop chlorotic streaks.",
        "White fungal growth may appear.",
        "Panicles can become malformed.",
        "Green ear symptoms may develop.",
        "Plants may remain stunted."
    ],
    favorableConditions: [
        "High humidity",
        "Warm humid weather",
        "Repeated millet cultivation"
    ],
    management: [
        "Use resistant varieties.",
        "Remove infected plants.",
        "Practice crop rotation.",
        "Use healthy seed.",
        "Follow local seed-treatment recommendations."
    ],
    prevention: [
        "Use resistant cultivars.",
        "Use disease-free seed.",
        "Maintain field sanitation."
    ],
    fieldNotes: [
        "Green ear formation is a characteristic symptom."
    ],
    references: [
        "Pearl millet pathology literature"
    ]
},

{
    id: "pearl-millet-blast",
    crop: "Pearl Millet",
    category: "Disease",
    name: "Blast",
    scientificName: "Pyricularia spp.",
    aliases: ["Millet blast"],
    symptoms: [
        "Spindle-shaped leaf lesions develop.",
        "Lesions may have grey centers.",
        "Leaves can become necrotic.",
        "Severe infection reduces green leaf area.",
        "Panicle infection can reduce grain formation."
    ],
    favorableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Leaf wetness"
    ],
    management: [
        "Use tolerant varieties.",
        "Maintain field sanitation.",
        "Avoid excessive nitrogen.",
        "Monitor crop regularly.",
        "Use registered fungicides where recommended."
    ],
    prevention: [
        "Use healthy seed.",
        "Maintain proper spacing.",
        "Practice crop rotation."
    ],
    fieldNotes: [
        "Panicle infection can be particularly damaging."
    ],
    references: [
        "Millet disease management literature"
    ]
},

{
    id: "pearl-millet-rust",
    crop: "Pearl Millet",
    category: "Disease",
    name: "Rust",
    scientificName: "Puccinia substriata",
    aliases: ["Pearl millet rust"],
    symptoms: [
        "Rust-colored pustules develop on leaves.",
        "Leaf yellowing may occur.",
        "Severe infection causes premature drying.",
        "Photosynthetic area decreases.",
        "Yield can be affected."
    ],
    favorableConditions: [
        "Moderate temperatures",
        "High humidity",
        "Leaf wetness"
    ],
    management: [
        "Use tolerant varieties.",
        "Monitor fields.",
        "Maintain balanced nutrition.",
        "Use fungicides when locally recommended."
    ],
    prevention: [
        "Healthy seed",
        "Field sanitation",
        "Resistant cultivars"
    ],
    fieldNotes: [
        "Inspect both leaf surfaces for pustules."
    ],
    references: [
        "Pearl millet pathology references"
    ]
},

{
    id: "pearl-millet-smut",
    crop: "Pearl Millet",
    category: "Disease",
    name: "Smut",
    scientificName: "Moesziomyces penicillariae",
    aliases: ["Pearl millet smut"],
    symptoms: [
        "Individual grains may be replaced by dark spore masses.",
        "Affected florets become abnormal.",
        "Panicle appearance becomes uneven.",
        "Seed quality is reduced.",
        "Severe infection lowers yield."
    ],
    favorableConditions: [
        "Infected seed",
        "Favorable humidity",
        "Repeated cultivation"
    ],
    management: [
        "Use clean seed.",
        "Remove affected panicles.",
        "Practice crop rotation.",
        "Use recommended seed treatments."
    ],
    prevention: [
        "Certified seed",
        "Seed treatment",
        "Field sanitation"
    ],
    fieldNotes: [
        "Smut is primarily important around panicle and grain development."
    ],
    references: [
        "Pearl millet disease references"
    ]
},

{
    id: "pearl-millet-ergot",
    crop: "Pearl Millet",
    category: "Disease",
    name: "Ergot",
    scientificName: "Claviceps fusiformis",
    aliases: ["Pearl millet ergot"],
    symptoms: [
        "Sticky honeydew may appear during flowering.",
        "Affected florets fail to form normal grain.",
        "Dark fungal structures may develop later.",
        "Seed quality is reduced.",
        "Panicles may show uneven grain formation."
    ],
    favorableConditions: [
        "Wet weather during flowering",
        "High humidity",
        "Extended flowering"
    ],
    management: [
        "Use healthy seed.",
        "Remove infected panicles.",
        "Practice timely sowing.",
        "Use tolerant varieties where available."
    ],
    prevention: [
        "Use clean seed.",
        "Synchronize flowering where practical.",
        "Maintain field sanitation."
    ],
    fieldNotes: [
        "Flowering-stage weather strongly influences disease development."
    ],
    references: [
        "Pearl millet pathology literature"
    ]
},

{
    id: "pearl-millet-shoot-fly",
    crop: "Pearl Millet",
    category: "Pest",
    name: "Shoot Fly",
    scientificName: "Atherigona spp.",
    aliases: ["Millet shoot fly"],
    symptoms: [
        "Central shoots wilt.",
        "Dead hearts develop.",
        "Young plants may stop growing.",
        "Plant stand can decrease.",
        "Yield potential may decline."
    ],
    favorableConditions: [
        "Warm weather",
        "Late sowing",
        "Young crop"
    ],
    management: [
        "Sow at the recommended time.",
        "Use tolerant varieties.",
        "Monitor young plants.",
        "Maintain proper plant population."
    ],
    prevention: [
        "Timely sowing",
        "Healthy seed",
        "Field sanitation"
    ],
    fieldNotes: [
        "Dead heart is a common early symptom."
    ],
    references: [
        "Pearl millet pest management references"
    ]
},

{
    id: "pearl-millet-stem-borer",
    crop: "Pearl Millet",
    category: "Pest",
    name: "Stem Borer",
    scientificName: "Coniesta spp.",
    aliases: ["Millet stem borer"],
    symptoms: [
        "Larvae tunnel inside stems.",
        "Dead hearts may occur.",
        "Stem weakening can cause lodging.",
        "Panicle development may be affected.",
        "Plants may become weak."
    ],
    favorableConditions: [
        "Warm conditions",
        "Continuous cereal cultivation",
        "Crop residue presence"
    ],
    management: [
        "Destroy infested residues.",
        "Use tolerant varieties.",
        "Practice crop rotation.",
        "Monitor stems."
    ],
    prevention: [
        "Field sanitation",
        "Crop rotation",
        "Timely sowing"
    ],
    fieldNotes: [
        "Larvae are protected inside the stem."
    ],
    references: [
        "Millet insect pest literature"
    ]
},

{
    id: "pearl-millet-earhead-bug",
    crop: "Pearl Millet",
    category: "Pest",
    name: "Earhead Bug",
    scientificName: "Calocoris spp.",
    aliases: ["Millet earhead bug"],
    symptoms: [
        "Bugs feed on developing grains.",
        "Grain filling may be poor.",
        "Panicles can show damaged grains.",
        "Seed quality may decline.",
        "Severe attack reduces yield."
    ],
    favorableConditions: [
        "Warm weather",
        "Flowering and grain filling"
    ],
    management: [
        "Monitor panicles.",
        "Maintain field sanitation.",
        "Use registered insecticides when necessary."
    ],
    prevention: [
        "Regular scouting",
        "Timely harvest",
        "Field sanitation"
    ],
    fieldNotes: [
        "Panicle inspection is important during grain development."
    ],
    references: [
        "Millet pest management literature"
    ]
},

{
    id: "pearl-millet-aphid",
    crop: "Pearl Millet",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphididae",
    aliases: ["Millet aphid"],
    symptoms: [
        "Aphid colonies develop on tender plant parts.",
        "Leaves may curl.",
        "Honeydew can accumulate.",
        "Plants may become weak.",
        "Severe attack reduces growth."
    ],
    favorableConditions: [
        "Warm weather",
        "Dry conditions",
        "Low predator activity"
    ],
    management: [
        "Monitor colonies.",
        "Conserve natural enemies.",
        "Control alternate hosts.",
        "Use insecticides only when justified."
    ],
    prevention: [
        "Field sanitation",
        "Natural-enemy conservation",
        "Regular scouting"
    ],
    fieldNotes: [
        "Natural predators can suppress aphids."
    ],
    references: [
        "Millet aphid management literature"
    ]
},

{
    id: "pearl-millet-armyworm",
    crop: "Pearl Millet",
    category: "Pest",
    name: "Armyworm",
    scientificName: "Mythimna spp.",
    aliases: ["Armyworm"],
    symptoms: [
        "Leaves show irregular feeding damage.",
        "Leaf margins may be consumed.",
        "Severe attack can defoliate young plants.",
        "Plant growth may slow.",
        "Crop stand can be affected."
    ],
    favorableConditions: [
        "Warm weather",
        "Dense vegetation",
        "High larval survival"
    ],
    management: [
        "Scout fields regularly.",
        "Remove egg masses where practical.",
        "Encourage natural enemies.",
        "Use registered insecticides when required."
    ],
    prevention: [
        "Field sanitation",
        "Regular monitoring",
        "Integrated pest management"
    ],
    fieldNotes: [
        "Larvae may feed actively at night."
    ],
    references: [
        "Millet pest management references"
    ]
},

{
    id: "pearl-millet-nitrogen-deficiency",
    crop: "Pearl Millet",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: [
        "Older leaves become yellow.",
        "Plants remain short.",
        "Tillering decreases.",
        "Leaf area becomes smaller.",
        "Yield declines."
    ],
    favorableConditions: [
        "Low soil nitrogen",
        "Low organic matter",
        "Nutrient leaching"
    ],
    management: [
        "Use soil-test-based nitrogen.",
        "Apply nitrogen at appropriate stages.",
        "Maintain soil organic matter."
    ],
    prevention: [
        "Soil testing",
        "Balanced fertilization",
        "Proper nitrogen timing"
    ],
    fieldNotes: [
        "Older leaves are generally affected first."
    ],
    references: [
        "Pearl millet nutrient management references"
    ]
},

{
    id: "pearl-millet-phosphorus-deficiency",
    crop: "Pearl Millet",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: [
        "Plants become stunted.",
        "Leaves may become dark green.",
        "Purplish coloration can occur.",
        "Root growth may be restricted.",
        "Maturity may be delayed."
    ],
    favorableConditions: [
        "Low available phosphorus",
        "Cold soil",
        "High phosphorus fixation"
    ],
    management: [
        "Use soil testing.",
        "Apply phosphorus according to recommendation.",
        "Maintain suitable soil pH."
    ],
    prevention: [
        "Balanced fertilization",
        "Soil testing",
        "Proper fertilizer placement"
    ],
    fieldNotes: [
        "Environmental stress can sometimes mimic phosphorus deficiency."
    ],
    references: [
        "Millet soil fertility literature"
    ]
},

{
    id: "pearl-millet-potassium-deficiency",
    crop: "Pearl Millet",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: [
        "Leaf margins turn yellow.",
        "Margins may become scorched.",
        "Plants may become weak.",
        "Drought tolerance may decline.",
        "Yield can decrease."
    ],
    favorableConditions: [
        "Low soil potassium",
        "Sandy soils",
        "High nutrient removal"
    ],
    management: [
        "Conduct soil testing.",
        "Apply potassium according to crop need.",
        "Maintain balanced fertilization."
    ],
    prevention: [
        "Soil testing",
        "Balanced nutrition",
        "Organic matter management"
    ],
    fieldNotes: [
        "Symptoms usually begin on older leaves."
    ],
    references: [
        "Pearl millet nutrient management literature"
    ]
},

{
    id: "pearl-millet-zinc-deficiency",
    crop: "Pearl Millet",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: [
        "Young leaves show pale areas.",
        "Interveinal chlorosis may occur.",
        "Plants become stunted.",
        "Internodes may shorten.",
        "Yield can decline."
    ],
    favorableConditions: [
        "High soil pH",
        "Low available zinc",
        "High phosphorus levels"
    ],
    management: [
        "Confirm deficiency.",
        "Apply zinc according to soil-test recommendations.",
        "Maintain balanced nutrition."
    ],
    prevention: [
        "Soil testing",
        "Balanced fertilizer use",
        "Suitable zinc sources"
    ],
    fieldNotes: [
        "Young tissues usually show symptoms first."
    ],
    references: [
        "Millet micronutrient management literature"
    ]
},

{
    id: "pearl-millet-iron-deficiency",
    crop: "Pearl Millet",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: [
        "Young leaves become yellow.",
        "Interveinal chlorosis develops.",
        "Severe deficiency reduces photosynthesis.",
        "Growth becomes weak.",
        "Plants may remain stunted."
    ],
    favorableConditions: [
        "High soil pH",
        "Poor iron availability",
        "Root-zone stress"
    ],
    management: [
        "Confirm deficiency.",
        "Correct soil conditions.",
        "Use appropriate iron sources where recommended."
    ],
    prevention: [
        "Maintain suitable soil conditions.",
        "Avoid prolonged waterlogging.",
        "Monitor young leaves."
    ],
    fieldNotes: [
        "Iron is relatively immobile within plants."
    ],
    references: [
        "Millet micronutrient references"
    ]
},

// ============================================================
// CHICKPEA
// ============================================================

{
    id: "chickpea-fusarium-wilt",
    crop: "Chickpea",
    category: "Disease",
    name: "Fusarium Wilt",
    scientificName: "Fusarium oxysporum f. sp. ciceris",
    aliases: ["Chickpea wilt"],
    symptoms: [
        "Leaves lose their green color and begin to droop.",
        "Plants may wilt from the lower leaves upward.",
        "Vascular tissues may become discolored.",
        "Severely affected plants may die before maturity.",
        "Yield can be greatly reduced."
    ],
    favorableConditions: [
        "Warm soil",
        "Poor field sanitation",
        "Continuous chickpea cultivation",
        "Infected soil or seed"
    ],
    management: [
        "Use resistant varieties where available.",
        "Use healthy seed.",
        "Practice crop rotation.",
        "Remove severely affected plants.",
        "Use recommended seed treatments."
    ],
    prevention: [
        "Use disease-free seed.",
        "Maintain field sanitation.",
        "Avoid continuous chickpea cultivation.",
        "Improve soil drainage."
    ],
    fieldNotes: [
        "Wilt often appears in patches within the field."
    ],
    references: [
        "Chickpea disease management literature",
        "Agricultural extension recommendations"
    ]
},

{
    id: "chickpea-ascochyta-blight",
    crop: "Chickpea",
    category: "Disease",
    name: "Ascochyta Blight",
    scientificName: "Ascochyta rabiei",
    aliases: ["Chickpea blight"],
    symptoms: [
        "Circular brown lesions develop on leaves.",
        "Dark pycnidia may appear inside lesions.",
        "Stems may develop elongated lesions.",
        "Branches can break at infected points.",
        "Severe infection causes defoliation."
    ],
    favorableConditions: [
        "Cool humid weather",
        "Frequent rainfall",
        "Extended leaf wetness"
    ],
    management: [
        "Use resistant varieties.",
        "Use clean seed.",
        "Remove infected residues.",
        "Practice crop rotation.",
        "Use recommended fungicides when necessary."
    ],
    prevention: [
        "Use certified seed.",
        "Maintain adequate spacing.",
        "Avoid working in wet fields.",
        "Monitor the crop regularly."
    ],
    fieldNotes: [
        "Dark pycnidia within lesions are useful diagnostic features."
    ],
    references: [
        "Chickpea pathology literature"
    ]
},

{
    id: "chickpea-botrytis-gray-mold",
    crop: "Chickpea",
    category: "Disease",
    name: "Botrytis Gray Mold",
    scientificName: "Botrytis cinerea",
    aliases: ["Gray mold"],
    symptoms: [
        "Flowers and young pods may become infected.",
        "Brown lesions develop on plant tissues.",
        "Gray fungal growth may appear.",
        "Pods can rot before maturity.",
        "Severe infection may cause flower and pod loss."
    ],
    favorableConditions: [
        "Cool humid weather",
        "Dense crop canopy",
        "Frequent rainfall"
    ],
    management: [
        "Maintain proper crop spacing.",
        "Avoid excessive nitrogen.",
        "Improve air circulation.",
        "Remove infected residues.",
        "Use recommended fungicides when justified."
    ],
    prevention: [
        "Use suitable planting density.",
        "Maintain field sanitation.",
        "Avoid prolonged canopy wetness."
    ],
    fieldNotes: [
        "Disease risk increases strongly during flowering under humid conditions."
    ],
    references: [
        "Chickpea disease management references"
    ]
},

{
    id: "chickpea-collar-rot",
    crop: "Chickpea",
    category: "Disease",
    name: "Collar Rot",
    scientificName: "Sclerotium rolfsii",
    aliases: ["Seedling collar rot"],
    symptoms: [
        "Seedlings wilt suddenly.",
        "The stem near the soil line becomes brown.",
        "White fungal growth may appear around the collar.",
        "Small fungal structures may develop in the soil.",
        "Affected seedlings may die."
    ],
    favorableConditions: [
        "Warm soil",
        "High soil moisture",
        "Poor drainage"
    ],
    management: [
        "Improve drainage.",
        "Use healthy seed.",
        "Remove severely affected seedlings.",
        "Practice crop rotation.",
        "Use recommended seed treatments."
    ],
    prevention: [
        "Avoid waterlogging.",
        "Maintain soil health.",
        "Use treated seed."
    ],
    fieldNotes: [
        "The collar region should be examined closely."
    ],
    references: [
        "Chickpea disease literature"
    ]
},

{
    id: "chickpea-dry-root-rot",
    crop: "Chickpea",
    category: "Disease",
    name: "Dry Root Rot",
    scientificName: "Macrophomina phaseolina",
    aliases: ["Chickpea dry root rot"],
    symptoms: [
        "Plants wilt during hot weather.",
        "Roots become dry and brittle.",
        "Fine black structures may occur on roots.",
        "Plants may die prematurely.",
        "Affected patches may appear in the field."
    ],
    favorableConditions: [
        "High temperature",
        "Moisture stress",
        "Poor soil conditions"
    ],
    management: [
        "Reduce moisture stress.",
        "Use tolerant varieties.",
        "Practice crop rotation.",
        "Maintain soil organic matter.",
        "Remove severely affected plants."
    ],
    prevention: [
        "Avoid severe drought stress.",
        "Maintain soil moisture.",
        "Use healthy planting material."
    ],
    fieldNotes: [
        "Disease is often more severe under hot and dry conditions."
    ],
    references: [
        "Chickpea pathology references"
    ]
},

// CHICKPEA PESTS

{
    id: "chickpea-pod-borer",
    crop: "Chickpea",
    category: "Pest",
    name: "Gram Pod Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Chickpea pod borer"],
    symptoms: [
        "Larvae feed on leaves and flowers.",
        "Pods develop circular holes.",
        "Larvae may feed directly on developing seeds.",
        "Damaged pods may contain frass.",
        "Severe infestation can cause major yield loss."
    ],
    favorableConditions: [
        "Warm weather",
        "Flowering and pod formation",
        "Continuous host availability"
    ],
    management: [
        "Scout plants regularly.",
        "Use pheromone traps.",
        "Conserve natural enemies.",
        "Use biological control where appropriate.",
        "Apply registered insecticides only when justified."
    ],
    prevention: [
        "Regular monitoring",
        "Integrated pest management",
        "Removal of heavily infested material"
    ],
    fieldNotes: [
        "Inspect flowers and pods for larval feeding."
    ],
    references: [
        "Chickpea IPM literature"
    ]
},

{
    id: "chickpea-aphid",
    crop: "Chickpea",
    category: "Pest",
    name: "Chickpea Aphid",
    scientificName: "Aphis craccivora",
    aliases: ["Aphid"],
    symptoms: [
        "Aphid colonies develop on tender shoots.",
        "Leaves may curl.",
        "Plants may become weak.",
        "Honeydew may accumulate.",
        "Sooty mold can develop."
    ],
    favorableConditions: [
        "Dry weather",
        "Moderate temperatures",
        "Low predator activity"
    ],
    management: [
        "Monitor colonies.",
        "Conserve beneficial insects.",
        "Remove alternate hosts.",
        "Use insecticides only when required."
    ],
    prevention: [
        "Regular scouting",
        "Field sanitation",
        "Natural-enemy conservation"
    ],
    fieldNotes: [
        "Ladybird beetles and other predators can suppress aphid populations."
    ],
    references: [
        "Pulse pest management literature"
    ]
},

{
    id: "chickpea-cutworm",
    crop: "Chickpea",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cut worm"],
    symptoms: [
        "Young plants are cut near the soil surface.",
        "Seedlings may disappear overnight.",
        "Irregular gaps develop in plant stands.",
        "Larvae may hide in soil during daytime.",
        "Severe attack reduces plant population."
    ],
    favorableConditions: [
        "Weedy fields",
        "High soil organic debris",
        "Young crop stage"
    ],
    management: [
        "Remove weeds.",
        "Monitor seedlings.",
        "Use field sanitation.",
        "Use recommended control measures when necessary."
    ],
    prevention: [
        "Early weed management",
        "Regular scouting",
        "Field sanitation"
    ],
    fieldNotes: [
        "Check soil around damaged seedlings for larvae."
    ],
    references: [
        "Pulse pest management references"
    ]
},

{
    id: "chickpea-termite",
    crop: "Chickpea",
    category: "Pest",
    name: "Termite",
    scientificName: "Odontotermes spp.",
    aliases: ["Termite damage"],
    symptoms: [
        "Roots may be damaged.",
        "Seedlings wilt suddenly.",
        "Plants become weak and dry.",
        "Underground portions may be hollowed.",
        "Plant stand can decline."
    ],
    favorableConditions: [
        "Dry soil",
        "Low soil moisture",
        "High termite activity"
    ],
    management: [
        "Maintain suitable soil moisture.",
        "Remove termite-infested residues.",
        "Use recommended seed treatment.",
        "Apply registered control measures where justified."
    ],
    prevention: [
        "Field sanitation",
        "Healthy seed",
        "Proper soil management"
    ],
    fieldNotes: [
        "Examine roots and soil around wilted plants."
    ],
    references: [
        "Pulse pest management literature"
    ]
},

{
    id: "chickpea-leaf-miner",
    crop: "Chickpea",
    category: "Pest",
    name: "Leaf Miner",
    scientificName: "Liriomyza spp.",
    aliases: ["Leaf mining fly"],
    symptoms: [
        "Serpentine mines appear inside leaves.",
        "Leaf photosynthetic area decreases.",
        "Severe attack causes premature leaf drying.",
        "Young plants may lose vigor.",
        "Heavy infestation can reduce yield."
    ],
    favorableConditions: [
        "Warm weather",
        "Dense vegetation",
        "Low natural-enemy activity"
    ],
    management: [
        "Monitor leaves.",
        "Conserve parasitoids.",
        "Remove severely damaged leaves where practical.",
        "Avoid unnecessary broad-spectrum insecticides."
    ],
    prevention: [
        "Regular scouting",
        "Natural-enemy conservation",
        "Field sanitation"
    ],
    fieldNotes: [
        "The larva remains protected inside the leaf."
    ],
    references: [
        "Pulse pest management references"
    ]
},

// CHICKPEA DISORDERS

{
    id: "chickpea-nitrogen-deficiency",
    crop: "Chickpea",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: [
        "Older leaves become pale.",
        "Plant growth becomes slow.",
        "Leaves may yellow.",
        "Biomass production decreases.",
        "Yield potential is reduced."
    ],
    favorableConditions: [
        "Low soil nitrogen",
        "Poor organic matter",
        "Weak root development"
    ],
    management: [
        "Use soil testing.",
        "Maintain effective biological nitrogen fixation.",
        "Correct nutrient imbalance.",
        "Apply nutrients according to soil-test recommendations."
    ],
    prevention: [
        "Soil testing",
        "Healthy root nodulation",
        "Balanced nutrition"
    ],
    fieldNotes: [
        "Chickpea normally obtains substantial nitrogen through biological fixation."
    ],
    references: [
        "Pulse nutrient management literature"
    ]
},

{
    id: "chickpea-phosphorus-deficiency",
    crop: "Chickpea",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: [
        "Plants remain stunted.",
        "Root development may be poor.",
        "Leaves may become dark green.",
        "Maturity can be delayed.",
        "Yield can decline."
    ],
    favorableConditions: [
        "Low available phosphorus",
        "High phosphorus fixation",
        "Cold soil"
    ],
    management: [
        "Conduct soil testing.",
        "Apply phosphorus according to recommendation.",
        "Maintain suitable soil pH."
    ],
    prevention: [
        "Balanced fertilization",
        "Soil testing",
        "Proper fertilizer placement"
    ],
    fieldNotes: [
        "Root development is particularly sensitive to phosphorus availability."
    ],
    references: [
        "Chickpea nutrient management references"
    ]
},

{
    id: "chickpea-potassium-deficiency",
    crop: "Chickpea",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: [
        "Older leaves may show marginal yellowing.",
        "Leaf margins can become scorched.",
        "Plants may become weak.",
        "Water-stress tolerance can decrease.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Low soil potassium",
        "Sandy soils",
        "High nutrient removal"
    ],
    management: [
        "Use soil testing.",
        "Apply potassium according to crop requirement.",
        "Maintain balanced fertilization."
    ],
    prevention: [
        "Regular soil testing",
        "Balanced fertilizer management"
    ],
    fieldNotes: [
        "Symptoms commonly begin on older foliage."
    ],
    references: [
        "Pulse nutrient management literature"
    ]
},

{
    id: "chickpea-iron-deficiency",
    crop: "Chickpea",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: [
        "Young leaves develop interveinal chlorosis.",
        "Leaves may become pale yellow.",
        "Severe deficiency reduces photosynthesis.",
        "Growth becomes weak.",
        "Plants may remain stunted."
    ],
    favorableConditions: [
        "High soil pH",
        "Low available iron",
        "Poor root-zone conditions"
    ],
    management: [
        "Confirm deficiency through soil or plant analysis.",
        "Correct soil conditions.",
        "Use suitable iron sources where recommended."
    ],
    prevention: [
        "Maintain suitable soil pH.",
        "Avoid prolonged root-zone stress.",
        "Monitor young leaves."
    ],
    fieldNotes: [
        "Iron is relatively immobile in plants, so young leaves are affected first."
    ],
    references: [
        "Micronutrient management literature"
    ]
},

{
    id: "chickpea-zinc-deficiency",
    crop: "Chickpea",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: [
        "Young leaves may become pale.",
        "Interveinal chlorosis may occur.",
        "Plant growth can become restricted.",
        "Internodes may shorten.",
        "Yield can decline."
    ],
    favorableConditions: [
        "High soil pH",
        "Low available zinc",
        "High phosphorus availability"
    ],
    management: [
        "Confirm deficiency.",
        "Apply zinc according to soil-test recommendations.",
        "Maintain balanced nutrition."
    ],
    prevention: [
        "Soil testing",
        "Balanced fertilization",
        "Use suitable zinc sources"
    ],
    fieldNotes: [
        "Zinc deficiency should be distinguished from iron deficiency and viral symptoms."
    ],
    references: [
        "Pulse micronutrient management literature"
    ]
},


// ============================================================
// PIGEON PEA
// ============================================================

{
    id: "pigeonpea-fusarium-wilt",
    crop: "Pigeon Pea",
    category: "Disease",
    name: "Fusarium Wilt",
    scientificName: "Fusarium udum",
    aliases: ["Pigeon pea wilt"],
    symptoms: [
        "Leaves wilt gradually.",
        "Plants may show one-sided wilting.",
        "Vascular discoloration may occur.",
        "Affected plants become stunted.",
        "Severe infection causes plant death."
    ],
    favorableConditions: [
        "Warm soil",
        "Infected soil",
        "Continuous pigeon pea cultivation"
    ],
    management: [
        "Use wilt-resistant varieties.",
        "Practice crop rotation.",
        "Use healthy seed.",
        "Remove infected plants.",
        "Use recommended seed treatments."
    ],
    prevention: [
        "Resistant varieties",
        "Healthy seed",
        "Field sanitation"
    ],
    fieldNotes: [
        "Disease often occurs in recognizable field patches."
    ],
    references: [
        "Pigeon pea disease management literature"
    ]
},

{
    id: "pigeonpea-sterility-mosaic",
    crop: "Pigeon Pea",
    category: "Disease",
    name: "Sterility Mosaic Disease",
    scientificName: "Pigeonpea sterility mosaic virus complex",
    aliases: ["Pigeon pea mosaic"],
    symptoms: [
        "Leaves show mosaic patterns.",
        "Plants may produce excessive branches.",
        "Flowering may be severely reduced.",
        "Affected plants remain bushy and sterile.",
        "Yield can be nearly eliminated in severely affected plants."
    ],
    favorableConditions: [
        "Presence of vector mites",
        "Susceptible varieties",
        "Continuous host availability"
    ],
    management: [
        "Use resistant varieties.",
        "Remove infected plants early.",
        "Control vector populations where recommended.",
        "Maintain field sanitation."
    ],
    prevention: [
        "Use resistant varieties.",
        "Monitor fields early.",
        "Remove infected plants."
    ],
    fieldNotes: [
        "Sterility and excessive branching are important diagnostic features."
    ],
    references: [
        "Pigeon pea disease literature"
    ]
},

{
    id: "pigeonpea-phytophthora-blight",
    crop: "Pigeon Pea",
    category: "Disease",
    name: "Phytophthora Blight",
    scientificName: "Phytophthora cajani",
    aliases: ["Pigeon pea blight"],
    symptoms: [
        "Water-soaked lesions develop on stems.",
        "Leaves wilt rapidly.",
        "Stem tissue becomes dark.",
        "Branches may die.",
        "Severe infection can kill young plants."
    ],
    favorableConditions: [
        "Heavy rainfall",
        "Waterlogging",
        "Poor drainage"
    ],
    management: [
        "Improve drainage.",
        "Use tolerant varieties.",
        "Avoid excessive irrigation.",
        "Remove severely infected plants."
    ],
    prevention: [
        "Good drainage",
        "Healthy seed",
        "Suitable field selection"
    ],
    fieldNotes: [
        "Disease is strongly associated with excess moisture."
    ],
    references: [
        "Pulse disease management literature"
    ]
},

{
    id: "pigeonpea-alternaria-blight",
    crop: "Pigeon Pea",
    category: "Disease",
    name: "Alternaria Blight",
    scientificName: "Alternaria spp.",
    aliases: ["Alternaria leaf blight"],
    symptoms: [
        "Brown leaf spots develop.",
        "Spots may enlarge into blighted areas.",
        "Leaves can become yellow.",
        "Premature leaf drop may occur.",
        "Severe infection reduces photosynthesis."
    ],
    favorableConditions: [
        "Warm humid conditions",
        "Leaf wetness",
        "Dense canopy"
    ],
    management: [
        "Maintain field sanitation.",
        "Use tolerant varieties.",
        "Avoid excessive canopy humidity.",
        "Use registered fungicides when necessary."
    ],
    prevention: [
        "Crop rotation",
        "Healthy seed",
        "Field sanitation"
    ],
    fieldNotes: [
        "Inspect older and middle leaves for expanding lesions."
    ],
    references: [
        "Pigeon pea pathology references"
    ]
},

{
    id: "pigeonpea-cercospora",
    crop: "Pigeon Pea",
    category: "Disease",
    name: "Cercospora Leaf Spot",
    scientificName: "Cercospora spp.",
    aliases: ["Cercospora spot"],
    symptoms: [
        "Small circular spots appear on leaves.",
        "Spots may have pale centers.",
        "Lesions enlarge under humid conditions.",
        "Leaves may yellow.",
        "Severe infection reduces leaf area."
    ],
    favorableConditions: [
        "High humidity",
        "Leaf wetness",
        "Warm weather"
    ],
    management: [
        "Use tolerant varieties.",
        "Maintain sanitation.",
        "Improve canopy ventilation.",
        "Use fungicides when recommended."
    ],
    prevention: [
        "Healthy seed",
        "Crop rotation",
        "Regular scouting"
    ],
    fieldNotes: [
        "Leaf spots should be distinguished from nutrient deficiency symptoms."
    ],
    references: [
        "Pulse pathology literature"
    ]
},

// PIGEON PEA PESTS

{
    id: "pigeonpea-pod-borer",
    crop: "Pigeon Pea",
    category: "Pest",
    name: "Pod Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Gram pod borer"],
    symptoms: [
        "Larvae feed on flowers and pods.",
        "Circular holes develop in pods.",
        "Seeds may be eaten.",
        "Frass may be visible around feeding holes.",
        "Severe attack causes major yield loss."
    ],
    favorableConditions: [
        "Warm weather",
        "Flowering stage",
        "Continuous host availability"
    ],
    management: [
        "Scout flowers and pods.",
        "Use pheromone traps.",
        "Conserve natural enemies.",
        "Use biological control.",
        "Apply registered insecticides when justified."
    ],
    prevention: [
        "Integrated pest management",
        "Regular scouting",
        "Timely control"
    ],
    fieldNotes: [
        "Larvae often remain partly outside the pod while feeding."
    ],
    references: [
        "Pigeon pea pest management literature"
    ]
},

{
    id: "pigeonpea-pod-fly",
    crop: "Pigeon Pea",
    category: "Pest",
    name: "Pod Fly",
    scientificName: "Melanagromyza obtusa",
    aliases: ["Pigeon pea pod fly"],
    symptoms: [
        "Larvae develop inside pods.",
        "Seeds may be damaged internally.",
        "Pods may appear externally normal.",
        "Damaged seeds become shriveled.",
        "Seed quality declines."
    ],
    favorableConditions: [
        "Flowering and pod formation",
        "Warm weather",
        "Continuous pigeon pea cultivation"
    ],
    management: [
        "Monitor developing pods.",
        "Harvest on time.",
        "Use tolerant varieties.",
        "Follow recommended pest management practices."
    ],
    prevention: [
        "Field sanitation",
        "Timely harvesting",
        "Crop rotation"
    ],
    fieldNotes: [
        "Internal seed damage may be present even when pod damage is not obvious."
    ],
    references: [
        "Pulse pest management references"
    ]
},

{
    id: "pigeonpea-plume-moth",
    crop: "Pigeon Pea",
    category: "Pest",
    name: "Plume Moth",
    scientificName: "Exelastis atomosa",
    aliases: ["Pigeon pea plume moth"],
    symptoms: [
        "Larvae damage flowers and pods.",
        "Young pods may be bored.",
        "Developing seeds may be damaged.",
        "Flowers may drop.",
        "Yield can decline."
    ],
    favorableConditions: [
        "Flowering stage",
        "Warm weather",
        "Dense crop canopy"
    ],
    management: [
        "Monitor flowering plants.",
        "Remove severely damaged material.",
        "Conserve natural enemies.",
        "Use registered insecticides when necessary."
    ],
    prevention: [
        "Regular scouting",
        "Field sanitation",
        "Integrated pest management"
    ],
    fieldNotes: [
        "Inspect flowers and young pods carefully."
    ],
    references: [
        "Pulse pest management literature"
    ]
},

{
    id: "pigeonpea-aphid",
    crop: "Pigeon Pea",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphis craccivora",
    aliases: ["Cowpea aphid"],
    symptoms: [
        "Colonies develop on tender shoots.",
        "Leaves may curl.",
        "Honeydew may accumulate.",
        "Plants become weak.",
        "Sooty mold may develop."
    ],
    favorableConditions: [
        "Dry weather",
        "Moderate temperature",
        "Low predator activity"
    ],
    management: [
        "Monitor colonies.",
        "Conserve natural enemies.",
        "Control alternate hosts.",
        "Use insecticides only when necessary."
    ],
    prevention: [
        "Regular scouting",
        "Field sanitation",
        "Natural-enemy conservation"
    ],
    fieldNotes: [
        "Inspect growing points and young leaves."
    ],
    references: [
        "Pulse pest management literature"
    ]
},

{
    id: "pigeonpea-pod-bug",
    crop: "Pigeon Pea",
    category: "Pest",
    name: "Pod Bug",
    scientificName: "Clavigralla spp.",
    aliases: ["Pod sucking bug"],
    symptoms: [
        "Bugs suck sap from developing pods.",
        "Seeds may become shriveled.",
        "Pods may develop discoloration.",
        "Seed quality decreases.",
        "Severe attack reduces yield."
    ],
    favorableConditions: [
        "Warm weather",
        "Pod formation",
        "Dense crop canopy"
    ],
    management: [
        "Scout pods regularly.",
        "Remove alternate hosts.",
        "Maintain field sanitation.",
        "Use registered insecticides when justified."
    ],
    prevention: [
        "Regular scouting",
        "Timely harvest",
        "Integrated pest management"
    ],
    fieldNotes: [
        "Pod inspection is important during seed filling."
    ],
    references: [
        "Pulse insect pest literature"
    ]
},

// PIGEON PEA DISORDERS

{
    id: "pigeonpea-nitrogen-deficiency",
    crop: "Pigeon Pea",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: [
        "Older leaves become pale.",
        "Plant growth slows.",
        "Leaf area decreases.",
        "Branches may remain weak.",
        "Yield potential declines."
    ],
    favorableConditions: [
        "Poor nodulation",
        "Low soil nitrogen",
        "Root-zone stress"
    ],
    management: [
        "Check root nodulation.",
        "Conduct soil testing.",
        "Correct nutrient imbalance.",
        "Maintain healthy soil biological activity."
    ],
    prevention: [
        "Healthy seed",
        "Effective nodulation",
        "Balanced nutrition"
    ],
    fieldNotes: [
        "Poor biological nitrogen fixation can contribute to nitrogen deficiency."
    ],
    references: [
        "Pulse nutrient management literature"
    ]
},

{
    id: "pigeonpea-phosphorus-deficiency",
    crop: "Pigeon Pea",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: [
        "Plants become stunted.",
        "Root growth may be restricted.",
        "Leaves may become dark green.",
        "Flowering may be delayed.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Low available phosphorus",
        "High phosphorus fixation",
        "Cold soil"
    ],
    management: [
        "Conduct soil testing.",
        "Apply phosphorus according to recommendation.",
        "Maintain suitable soil pH."
    ],
    prevention: [
        "Balanced fertilizer management",
        "Soil testing",
        "Proper fertilizer placement"
    ],
    fieldNotes: [
        "Phosphorus is particularly important for root development."
    ],
    references: [
        "Pulse soil fertility literature"
    ]
},

{
    id: "pigeonpea-potassium-deficiency",
    crop: "Pigeon Pea",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: [
        "Older leaf margins become yellow.",
        "Margins may become brown.",
        "Plants may become weak.",
        "Drought tolerance may decrease.",
        "Yield may decline."
    ],
    favorableConditions: [
        "Low soil potassium",
        "Sandy soils",
        "High nutrient removal"
    ],
    management: [
        "Use soil testing.",
        "Apply potassium according to crop requirements.",
        "Maintain balanced fertilization."
    ],
    prevention: [
        "Soil testing",
        "Balanced nutrition"
    ],
    fieldNotes: [
        "Symptoms usually begin on older leaves."
    ],
    references: [
        "Pulse nutrient management literature"
    ]
},

{
    id: "pigeonpea-iron-deficiency",
    crop: "Pigeon Pea",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: [
        "Young leaves develop interveinal chlorosis.",
        "Leaves become pale.",
        "Photosynthesis decreases.",
        "Growth may become restricted.",
        "Severe deficiency causes stunting."
    ],
    favorableConditions: [
        "High soil pH",
        "Low available iron",
        "Poor root-zone conditions"
    ],
    management: [
        "Confirm deficiency.",
        "Correct soil conditions.",
        "Apply suitable iron sources when recommended."
    ],
    prevention: [
        "Maintain suitable soil conditions.",
        "Monitor young foliage."
    ],
    fieldNotes: [
        "Young leaves are usually affected first."
    ],
    references: [
        "Micronutrient management literature"
    ]
},

{
    id: "pigeonpea-zinc-deficiency",
    crop: "Pigeon Pea",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: [
        "Young leaves become pale.",
        "Interveinal chlorosis may develop.",
        "Internodes may shorten.",
        "Plants become stunted.",
        "Yield can decrease."
    ],
    favorableConditions: [
        "High soil pH",
        "Low available zinc",
        "High phosphorus availability"
    ],
    management: [
        "Confirm deficiency.",
        "Apply zinc according to soil-test recommendations.",
        "Maintain balanced fertilization."
    ],
    prevention: [
        "Soil testing",
        "Balanced nutrition",
        "Suitable zinc application"
    ],
    fieldNotes: [
        "Zinc deficiency can resemble other micronutrient problems."
    ],
    references: [
        "Pulse micronutrient references"
    ]
}

// ============================================================
// GREEN GRAM
// ============================================================

,{
    id: "green-gram-yellow-mosaic",
    crop: "Green Gram",
    category: "Disease",
    name: "Yellow Mosaic Disease",
    scientificName: "Mungbean yellow mosaic virus",
    aliases: ["Yellow mosaic"],
    symptoms: ["Yellow and green mosaic patterns appear on leaves.", "Plants may become stunted.", "Leaves may become distorted.", "Flowering and pod formation may be reduced.", "Severe infection causes major yield loss."],
    favorableConditions: ["Warm weather", "High whitefly activity", "Continuous host availability"],
    management: ["Use resistant varieties.", "Control the vector when economically justified.", "Remove severely infected plants.", "Maintain field sanitation."],
    prevention: ["Use healthy seed.", "Monitor whiteflies.", "Remove alternate hosts."],
    fieldNotes: ["Whitefly management is an important component of disease management."],
    references: ["Pulse disease management literature", "Agricultural extension recommendations"]
},

{
    id: "green-gram-cercospora-leaf-spot",
    crop: "Green Gram",
    category: "Disease",
    name: "Cercospora Leaf Spot",
    scientificName: "Cercospora canescens",
    aliases: ["Cercospora spot"],
    symptoms: ["Small brown leaf spots appear.", "Spots enlarge under humid conditions.", "Leaves may yellow.", "Premature leaf drop may occur.", "Severe infection reduces photosynthetic area."],
    favorableConditions: ["High humidity", "Leaf wetness", "Dense crop canopy"],
    management: ["Maintain field sanitation.", "Use tolerant varieties.", "Improve canopy ventilation.", "Use recommended fungicides when necessary."],
    prevention: ["Healthy seed", "Crop rotation", "Regular scouting"],
    fieldNotes: ["Inspect lower and middle leaves regularly."],
    references: ["Pulse pathology references"]
},

{
    id: "green-gram-powdery-mildew",
    crop: "Green Gram",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Erysiphe polygoni",
    aliases: ["Powdery mildew"],
    symptoms: ["White powdery growth appears on leaves.", "Affected leaves may yellow.", "Photosynthesis decreases.", "Leaves may dry prematurely.", "Severe infection reduces yield."],
    favorableConditions: ["Moderate temperature", "Dry weather with humid nights", "Dense foliage"],
    management: ["Improve air circulation.", "Monitor early symptoms.", "Use tolerant varieties.", "Apply registered fungicides when recommended."],
    prevention: ["Avoid excessive canopy density.", "Maintain field sanitation.", "Regular scouting."],
    fieldNotes: ["White powder-like growth is a characteristic symptom."],
    references: ["Pulse disease management literature"]
},

{
    id: "green-gram-anthracnose",
    crop: "Green Gram",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum spp.",
    aliases: ["Anthracnose leaf spot"],
    symptoms: ["Dark lesions appear on leaves.", "Stem lesions may develop.", "Pods may develop sunken spots.", "Affected tissues may dry.", "Severe infection reduces yield."],
    favorableConditions: ["Warm humid weather", "Frequent rainfall", "Leaf wetness"],
    management: ["Use healthy seed.", "Remove infected residues.", "Practice crop rotation.", "Use recommended fungicides when required."],
    prevention: ["Clean seed", "Field sanitation", "Regular monitoring"],
    fieldNotes: ["Pod lesions should be inspected during reproductive stages."],
    references: ["Pulse pathology references"]
},

{
    id: "green-gram-root-rot",
    crop: "Green Gram",
    category: "Disease",
    name: "Root Rot",
    scientificName: "Rhizoctonia spp.",
    aliases: ["Root disease"],
    symptoms: ["Roots become brown or damaged.", "Plants wilt.", "Growth becomes stunted.", "Leaves may yellow.", "Severe infection can kill plants."],
    favorableConditions: ["Poor drainage", "Soil moisture imbalance", "Warm soil"],
    management: ["Improve drainage.", "Use healthy seed.", "Practice crop rotation.", "Use recommended seed treatment."],
    prevention: ["Avoid waterlogging.", "Maintain soil health.", "Use treated seed."],
    fieldNotes: ["Examine roots of wilted plants."],
    references: ["Pulse disease management literature"]
},

// GREEN GRAM PESTS

{
    id: "green-gram-whitefly",
    crop: "Green Gram",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["White fly"],
    symptoms: ["Adults and nymphs suck plant sap.", "Leaves may yellow.", "Honeydew may accumulate.", "Sooty mold can develop.", "Whiteflies can transmit viral diseases."],
    favorableConditions: ["Warm weather", "Dry conditions", "Dense foliage"],
    management: ["Monitor populations.", "Use yellow sticky traps.", "Conserve natural enemies.", "Use registered insecticides only when justified."],
    prevention: ["Regular scouting", "Weed management", "Natural-enemy conservation"],
    fieldNotes: ["Check the lower leaf surface for nymphs."],
    references: ["Pulse IPM literature"]
},

{
    id: "green-gram-aphid",
    crop: "Green Gram",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphis craccivora",
    aliases: ["Bean aphid"],
    symptoms: ["Colonies form on tender shoots.", "Leaves curl.", "Plant growth becomes weak.", "Honeydew accumulates.", "Sooty mold may appear."],
    favorableConditions: ["Dry weather", "Moderate temperature", "Low predator activity"],
    management: ["Monitor colonies.", "Conserve ladybird beetles.", "Remove alternate hosts.", "Use insecticides only when necessary."],
    prevention: ["Regular scouting", "Field sanitation", "Natural-enemy conservation"],
    fieldNotes: ["Inspect growing points and young leaves."],
    references: ["Pulse pest management references"]
},

{
    id: "green-gram-pod-borer",
    crop: "Green Gram",
    category: "Pest",
    name: "Pod Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Gram pod borer"],
    symptoms: ["Larvae feed on flowers.", "Pods develop holes.", "Seeds may be eaten.", "Frass may occur around feeding holes.", "Severe attack reduces yield."],
    favorableConditions: ["Warm weather", "Flowering stage", "Pod formation"],
    management: ["Use pheromone traps.", "Scout flowers and pods.", "Conserve natural enemies.", "Use biological control.", "Apply registered insecticides when justified."],
    prevention: ["Integrated pest management", "Regular monitoring"],
    fieldNotes: ["Inspect flowers and young pods carefully."],
    references: ["Pulse IPM literature"]
},

{
    id: "green-gram-thrips",
    crop: "Green Gram",
    category: "Pest",
    name: "Thrips",
    scientificName: "Thrips spp.",
    aliases: ["Flower thrips"],
    symptoms: ["Leaves may show silvery patches.", "Flowers can be damaged.", "Young leaves may distort.", "Plant growth may be reduced.", "Severe infestation can reduce pod formation."],
    favorableConditions: ["Hot dry weather", "Flowering stage", "Low humidity"],
    management: ["Monitor flowers.", "Use blue sticky traps.", "Conserve natural enemies.", "Use registered insecticides when necessary."],
    prevention: ["Regular scouting", "Weed management"],
    fieldNotes: ["Flowers should be checked for small fast-moving insects."],
    references: ["Pulse pest management literature"]
},

{
    id: "green-gram-bean-fly",
    crop: "Green Gram",
    category: "Pest",
    name: "Bean Fly",
    scientificName: "Ophiomyia phaseoli",
    aliases: ["Stem fly"],
    symptoms: ["Larvae tunnel into stems.", "Seedlings may wilt.", "Stems become weak.", "Plants may become stunted.", "Severe infestation causes plant death."],
    favorableConditions: ["Young crop", "Warm weather", "Continuous pulse cultivation"],
    management: ["Use healthy seed.", "Remove severely damaged plants.", "Maintain field sanitation.", "Use recommended seed treatment."],
    prevention: ["Crop rotation", "Healthy seed", "Regular scouting"],
    fieldNotes: ["Inspect the stem base of young plants."],
    references: ["Pulse pest management references"]
},

// GREEN GRAM DISORDERS

{
    id: "green-gram-nitrogen-deficiency",
    crop: "Green Gram",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plant growth slows.", "Leaf area decreases.", "Plants become weak.", "Yield potential declines."],
    favorableConditions: ["Low soil nitrogen", "Poor nodulation", "Root-zone stress"],
    management: ["Test the soil.", "Check root nodulation.", "Maintain balanced nutrition.", "Correct confirmed deficiency."],
    prevention: ["Healthy seed", "Effective nodulation", "Balanced fertilization"],
    fieldNotes: ["Legumes depend heavily on biological nitrogen fixation."],
    references: ["Pulse nutrient management literature"]
},

{
    id: "green-gram-phosphorus-deficiency",
    crop: "Green Gram",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants become stunted.", "Root development is restricted.", "Leaves may become dark green.", "Flowering may be delayed.", "Yield may decline."],
    favorableConditions: ["Low available phosphorus", "High phosphorus fixation"],
    management: ["Conduct soil testing.", "Apply phosphorus according to recommendation.", "Maintain suitable soil pH."],
    prevention: ["Balanced fertilizer management", "Soil testing"],
    fieldNotes: ["Phosphorus is important for root and reproductive development."],
    references: ["Pulse nutrient management references"]
},

{
    id: "green-gram-potassium-deficiency",
    crop: "Green Gram",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves show marginal yellowing.", "Leaf margins may scorch.", "Plants become weak.", "Stress tolerance decreases.", "Yield may decline."],
    favorableConditions: ["Low soil potassium", "Sandy soils"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation.", "Maintain balanced nutrition."],
    prevention: ["Regular soil testing", "Balanced fertilization"],
    fieldNotes: ["Symptoms usually begin on older leaves."],
    references: ["Crop nutrient management literature"]
},

{
    id: "green-gram-iron-deficiency",
    crop: "Green Gram",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves develop interveinal chlorosis.", "Leaves become pale.", "Photosynthesis decreases.", "Growth becomes restricted.", "Severe deficiency causes stunting."],
    favorableConditions: ["High soil pH", "Low available iron", "Poor root-zone conditions"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Use suitable iron sources when recommended."],
    prevention: ["Maintain suitable soil conditions", "Monitor young foliage"],
    fieldNotes: ["Young leaves are affected first because iron is relatively immobile."],
    references: ["Micronutrient management literature"]
},

{
    id: "green-gram-zinc-deficiency",
    crop: "Green Gram",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis may occur.", "Internodes may shorten.", "Plants become stunted.", "Yield may decrease."],
    favorableConditions: ["High soil pH", "Low available zinc", "Nutrient imbalance"],
    management: ["Confirm deficiency.", "Apply zinc according to soil-test recommendations.", "Maintain balanced fertilization."],
    prevention: ["Soil testing", "Balanced nutrition"],
    fieldNotes: ["Distinguish from iron deficiency and viral symptoms."],
    references: ["Micronutrient management literature"]
},


// ============================================================
// BLACK GRAM
// ============================================================

{
    id: "black-gram-yellow-mosaic",
    crop: "Black Gram",
    category: "Disease",
    name: "Yellow Mosaic Disease",
    scientificName: "Mungbean yellow mosaic virus",
    aliases: ["Yellow mosaic"],
    symptoms: ["Yellow and green mosaic appears on leaves.", "Plants become stunted.", "Leaves may distort.", "Flowering may decrease.", "Pod production is reduced."],
    favorableConditions: ["Warm weather", "High whitefly population", "Continuous host availability"],
    management: ["Use resistant varieties.", "Monitor whiteflies.", "Remove severely infected plants.", "Maintain field sanitation."],
    prevention: ["Healthy seed", "Vector monitoring", "Weed control"],
    fieldNotes: ["Whitefly is an important vector."],
    references: ["Pulse disease management literature"]
},

{
    id: "black-gram-cercospora",
    crop: "Black Gram",
    category: "Disease",
    name: "Cercospora Leaf Spot",
    scientificName: "Cercospora canescens",
    aliases: ["Cercospora spot"],
    symptoms: ["Brown leaf spots appear.", "Spots enlarge under humidity.", "Leaves may yellow.", "Premature defoliation may occur.", "Photosynthetic area decreases."],
    favorableConditions: ["High humidity", "Leaf wetness", "Dense canopy"],
    management: ["Maintain sanitation.", "Use tolerant varieties.", "Improve air circulation.", "Use registered fungicides when required."],
    prevention: ["Healthy seed", "Crop rotation", "Regular scouting"],
    fieldNotes: ["Monitor older foliage first."],
    references: ["Pulse pathology references"]
},

{
    id: "black-gram-powdery-mildew",
    crop: "Black Gram",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Erysiphe polygoni",
    aliases: ["Powdery mildew"],
    symptoms: ["White powdery growth develops on leaves.", "Leaves become yellow.", "Photosynthesis decreases.", "Leaves may dry.", "Yield may decline."],
    favorableConditions: ["Moderate temperatures", "Humid nights", "Dense foliage"],
    management: ["Improve air circulation.", "Use tolerant varieties.", "Monitor early symptoms.", "Use recommended fungicides."],
    prevention: ["Avoid excessive canopy density", "Regular scouting"],
    fieldNotes: ["White powdery growth is characteristic."],
    references: ["Pulse disease literature"]
},

{
    id: "black-gram-anthracnose",
    crop: "Black Gram",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum spp.",
    aliases: ["Anthracnose"],
    symptoms: ["Dark lesions occur on leaves.", "Stem lesions may develop.", "Pods may show sunken spots.", "Affected tissue dries.", "Yield may decrease."],
    favorableConditions: ["Warm humid weather", "Frequent rainfall", "Leaf wetness"],
    management: ["Use healthy seed.", "Remove infected residues.", "Practice crop rotation.", "Use recommended fungicides."],
    prevention: ["Clean seed", "Sanitation", "Regular scouting"],
    fieldNotes: ["Inspect pods during reproductive growth."],
    references: ["Pulse pathology literature"]
},

{
    id: "black-gram-root-rot",
    crop: "Black Gram",
    category: "Disease",
    name: "Root Rot",
    scientificName: "Rhizoctonia spp.",
    aliases: ["Root disease"],
    symptoms: ["Roots become brown.", "Plants wilt.", "Growth is stunted.", "Leaves may yellow.", "Severe infection causes plant death."],
    favorableConditions: ["Poor drainage", "Soil moisture imbalance", "Warm soil"],
    management: ["Improve drainage.", "Use healthy seed.", "Practice crop rotation.", "Use recommended seed treatment."],
    prevention: ["Avoid waterlogging", "Maintain soil health"],
    fieldNotes: ["Inspect roots of wilted plants."],
    references: ["Pulse disease management references"]
},

// BLACK GRAM PESTS

{
    id: "black-gram-whitefly",
    crop: "Black Gram",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["White fly"],
    symptoms: ["Sap sucking causes yellowing.", "Leaves may curl.", "Honeydew accumulates.", "Sooty mold may develop.", "Viral diseases can be transmitted."],
    favorableConditions: ["Warm weather", "Dry conditions", "Dense foliage"],
    management: ["Use sticky traps.", "Monitor populations.", "Conserve natural enemies.", "Use registered insecticides when justified."],
    prevention: ["Regular scouting", "Weed management"],
    fieldNotes: ["Inspect the underside of leaves."],
    references: ["Pulse IPM literature"]
},

{
    id: "black-gram-aphid",
    crop: "Black Gram",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphis craccivora",
    aliases: ["Bean aphid"],
    symptoms: ["Colonies occur on shoots.", "Leaves curl.", "Plants weaken.", "Honeydew develops.", "Sooty mold may occur."],
    favorableConditions: ["Dry weather", "Moderate temperatures"],
    management: ["Monitor colonies.", "Conserve predators.", "Remove alternate hosts.", "Use insecticides only when needed."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Check young shoots and leaves."],
    references: ["Pulse pest management literature"]
},

{
    id: "black-gram-pod-borer",
    crop: "Black Gram",
    category: "Pest",
    name: "Pod Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Gram pod borer"],
    symptoms: ["Larvae damage flowers.", "Pods develop holes.", "Seeds are eaten.", "Frass occurs near feeding holes.", "Yield declines."],
    favorableConditions: ["Warm weather", "Flowering", "Pod formation"],
    management: ["Use pheromone traps.", "Scout regularly.", "Conserve natural enemies.", "Use biological control."],
    prevention: ["Integrated pest management", "Regular scouting"],
    fieldNotes: ["Inspect flowers and pods."],
    references: ["Pulse IPM references"]
},

{
    id: "black-gram-thrips",
    crop: "Black Gram",
    category: "Pest",
    name: "Thrips",
    scientificName: "Thrips spp.",
    aliases: ["Flower thrips"],
    symptoms: ["Silvery patches develop.", "Flowers are damaged.", "Young leaves distort.", "Growth is reduced.", "Pod formation may decline."],
    favorableConditions: ["Hot dry weather", "Flowering", "Low humidity"],
    management: ["Monitor flowers.", "Use sticky traps.", "Conserve beneficial insects.", "Use registered insecticides when justified."],
    prevention: ["Regular monitoring", "Weed management"],
    fieldNotes: ["Inspect flowers closely."],
    references: ["Pulse pest literature"]
},

{
    id: "black-gram-bean-fly",
    crop: "Black Gram",
    category: "Pest",
    name: "Bean Fly",
    scientificName: "Ophiomyia phaseoli",
    aliases: ["Stem fly"],
    symptoms: ["Larvae tunnel into stems.", "Seedlings wilt.", "Stems weaken.", "Plants become stunted.", "Severe infestation causes death."],
    favorableConditions: ["Young crop", "Warm weather"],
    management: ["Use healthy seed.", "Remove damaged plants.", "Maintain sanitation.", "Use recommended seed treatment."],
    prevention: ["Crop rotation", "Healthy seed"],
    fieldNotes: ["Check the stem base."],
    references: ["Pulse pest management references"]
},

// BLACK GRAM DISORDERS

{
    id: "black-gram-nitrogen-deficiency",
    crop: "Black Gram",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Growth slows.", "Leaf area decreases.", "Plants become weak.", "Yield declines."],
    favorableConditions: ["Low nitrogen", "Poor nodulation", "Root stress"],
    management: ["Conduct soil testing.", "Check nodulation.", "Correct confirmed deficiency.", "Maintain balanced nutrition."],
    prevention: ["Healthy seed", "Good nodulation", "Balanced fertilization"],
    fieldNotes: ["Check root nodules before assuming nitrogen deficiency."],
    references: ["Pulse nutrient management literature"]
},

{
    id: "black-gram-phosphorus-deficiency",
    crop: "Black Gram",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants are stunted.", "Root development is poor.", "Leaves may become dark green.", "Flowering may be delayed.", "Yield decreases."],
    favorableConditions: ["Low available phosphorus", "High phosphorus fixation"],
    management: ["Test soil.", "Apply phosphorus according to recommendation.", "Maintain suitable soil conditions."],
    prevention: ["Balanced nutrition", "Soil testing"],
    fieldNotes: ["Phosphorus is important during early root development."],
    references: ["Pulse nutrient management literature"]
},

{
    id: "black-gram-potassium-deficiency",
    crop: "Black Gram",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaf margins yellow.", "Margins may scorch.", "Plants become weak.", "Stress tolerance decreases.", "Yield declines."],
    favorableConditions: ["Low potassium", "Sandy soils"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Symptoms generally begin on older leaves."],
    references: ["Crop nutrient management literature"]
},

{
    id: "black-gram-iron-deficiency",
    crop: "Black Gram",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves show interveinal chlorosis.", "Leaves become pale.", "Photosynthesis decreases.", "Growth is restricted.", "Severe deficiency causes stunting."],
    favorableConditions: ["High soil pH", "Low available iron"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Apply suitable iron sources when recommended."],
    prevention: ["Suitable soil pH", "Monitor young leaves"],
    fieldNotes: ["Young foliage is affected first."],
    references: ["Micronutrient management literature"]
},

{
    id: "black-gram-zinc-deficiency",
    crop: "Black Gram",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis may occur.", "Internodes shorten.", "Plants become stunted.", "Yield declines."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Do not confuse with viral yellow mosaic."],
    references: ["Micronutrient management literature"]
},


// ============================================================
// FINGER MILLET
// ============================================================

{
    id: "finger-millet-blast",
    crop: "Finger Millet",
    category: "Disease",
    name: "Blast",
    scientificName: "Magnaporthe grisea",
    aliases: ["Ragi blast"],
    symptoms: ["Spindle-shaped leaf lesions develop.", "Neck infection may occur.", "Finger heads may become damaged.", "Panicles may dry.", "Severe infection reduces grain yield."],
    favorableConditions: ["High humidity", "Leaf wetness", "Excess nitrogen"],
    management: ["Use resistant varieties.", "Avoid excessive nitrogen.", "Maintain field sanitation.", "Use recommended fungicides when necessary."],
    prevention: ["Balanced nutrition", "Healthy seed", "Regular scouting"],
    fieldNotes: ["Neck blast is particularly important near heading."],
    references: ["Millet disease management literature"]
},

{
    id: "finger-millet-leaf-spot",
    crop: "Finger Millet",
    category: "Disease",
    name: "Leaf Spot",
    scientificName: "Bipolaris spp.",
    aliases: ["Leaf blight"],
    symptoms: ["Brown lesions develop on leaves.", "Lesions enlarge under humid conditions.", "Leaves may dry prematurely.", "Photosynthesis decreases.", "Yield may decline."],
    favorableConditions: ["Warm humid weather", "Leaf wetness"],
    management: ["Use clean seed.", "Remove residues.", "Maintain spacing.", "Use fungicides when recommended."],
    prevention: ["Crop rotation", "Healthy seed", "Field sanitation"],
    fieldNotes: ["Inspect lower leaves for expanding lesions."],
    references: ["Millet pathology references"]
},

{
    id: "finger-millet-smut",
    crop: "Finger Millet",
    category: "Disease",
    name: "Finger Millet Smut",
    scientificName: "Ustilago eleusinis",
    aliases: ["Smut"],
    symptoms: ["Smut sori develop in finger heads.", "Normal grain development is disrupted.", "Infected fingers become abnormal.", "Grain yield decreases.", "Disease may spread through infected seed."],
    favorableConditions: ["Infected seed", "Suitable humidity"],
    management: ["Use healthy seed.", "Remove infected heads.", "Use recommended seed treatment."],
    prevention: ["Clean seed", "Field sanitation"],
    fieldNotes: ["Inspect finger heads during flowering and grain formation."],
    references: ["Millet disease literature"]
},

{
    id: "finger-millet-foot-rot",
    crop: "Finger Millet",
    category: "Disease",
    name: "Foot Rot",
    scientificName: "Fusarium spp.",
    aliases: ["Foot rot"],
    symptoms: ["Stem base becomes discolored.", "Plants wilt.", "Roots may deteriorate.", "Affected plants become weak.", "Severe infection causes lodging or death."],
    favorableConditions: ["Poor drainage", "Warm soil", "High moisture"],
    management: ["Improve drainage.", "Use healthy seed.", "Practice crop rotation.", "Use seed treatment."],
    prevention: ["Good drainage", "Healthy seed", "Field sanitation"],
    fieldNotes: ["Inspect the plant base and roots."],
    references: ["Millet pathology references"]
},

{
    id: "finger-millet-seedling-blight",
    crop: "Finger Millet",
    category: "Disease",
    name: "Seedling Blight",
    scientificName: "Fusarium spp.",
    aliases: ["Seedling disease"],
    symptoms: ["Seedlings become weak.", "Roots may rot.", "Leaves yellow.", "Seedlings may collapse.", "Poor plant establishment occurs."],
    favorableConditions: ["Excess soil moisture", "Poor seed quality", "Dense nursery"],
    management: ["Use healthy seed.", "Improve drainage.", "Avoid excessive irrigation.", "Use recommended seed treatment."],
    prevention: ["Healthy seed", "Good nursery management"],
    fieldNotes: ["Early diagnosis is important because young plants can die quickly."],
    references: ["Millet crop management literature"]
},

// FINGER MILLET PESTS

{
    id: "finger-millet-shoot-fly",
    crop: "Finger Millet",
    category: "Pest",
    name: "Shoot Fly",
    scientificName: "Atherigona spp.",
    aliases: ["Shoot fly"],
    symptoms: ["Central shoot dries.", "Dead-heart symptoms appear.", "Young plants become stunted.", "Tillering may increase abnormally.", "Plant stand may decline."],
    favorableConditions: ["Young crop", "Warm weather", "Delayed sowing"],
    management: ["Timely sowing.", "Remove dead hearts.", "Maintain field sanitation.", "Use recommended seed treatment."],
    prevention: ["Timely planting", "Healthy seed"],
    fieldNotes: ["Dead-heart symptoms are common in young plants."],
    references: ["Millet pest management literature"]
},

{
    id: "finger-millet-stem-borer",
    crop: "Finger Millet",
    category: "Pest",
    name: "Stem Borer",
    scientificName: "Coniesta spp.",
    aliases: ["Stem borer"],
    symptoms: ["Larvae bore into stems.", "Central shoots may wilt.", "Stems become weak.", "Panicles may dry.", "Yield can decline."],
    favorableConditions: ["Warm weather", "Dense crop"],
    management: ["Scout regularly.", "Remove affected shoots.", "Maintain sanitation.", "Use registered insecticides when justified."],
    prevention: ["Field sanitation", "Regular scouting"],
    fieldNotes: ["Inspect stems for bore holes and frass."],
    references: ["Millet pest management references"]
},

{
    id: "finger-millet-aphid",
    crop: "Finger Millet",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphididae",
    aliases: ["Millet aphid"],
    symptoms: ["Aphids cluster on young tissues.", "Leaves curl.", "Plant growth weakens.", "Honeydew accumulates.", "Sooty mold may develop."],
    favorableConditions: ["Dry weather", "Moderate temperatures"],
    management: ["Monitor colonies.", "Conserve predators.", "Use insecticides only when necessary."],
    prevention: ["Regular scouting", "Natural-enemy conservation"],
    fieldNotes: ["Inspect growing points."],
    references: ["Millet IPM references"]
},

{
    id: "finger-millet-armyworm",
    crop: "Finger Millet",
    category: "Pest",
    name: "Armyworm",
    scientificName: "Mythimna spp.",
    aliases: ["Army worm"],
    symptoms: ["Larvae feed on leaves.", "Leaf margins become irregular.", "Severe attack can defoliate plants.", "Young plants may be severely damaged.", "Yield may decrease."],
    favorableConditions: ["Warm humid conditions", "Dense vegetation"],
    management: ["Scout leaves.", "Remove larvae where practical.", "Use biological control.", "Use registered insecticides when justified."],
    prevention: ["Field sanitation", "Regular monitoring"],
    fieldNotes: ["Armyworms may feed rapidly when populations increase."],
    references: ["Millet pest management literature"]
},

{
    id: "finger-millet-cutworm",
    crop: "Finger Millet",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cut worm"],
    symptoms: ["Seedlings are cut near soil level.", "Gaps develop in plant stand.", "Plants may disappear overnight.", "Larvae hide in soil.", "Severe attack reduces establishment."],
    favorableConditions: ["Young crop", "Weedy fields", "Soil debris"],
    management: ["Control weeds.", "Scout seedlings.", "Check soil around damaged plants.", "Use recommended control measures."],
    prevention: ["Field sanitation", "Early weed management"],
    fieldNotes: ["Inspect soil near cut seedlings."],
    references: ["Millet pest management references"]
},

// FINGER MILLET DISORDERS

{
    id: "finger-millet-nitrogen-deficiency",
    crop: "Finger Millet",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plants remain small.", "Tillering decreases.", "Leaf area is reduced.", "Yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Conduct soil testing.", "Apply nitrogen according to crop need.", "Use split applications where appropriate."],
    prevention: ["Balanced fertilization", "Organic matter management"],
    fieldNotes: ["Nitrogen demand increases during active vegetative growth."],
    references: ["Millet nutrient management literature"]
},

{
    id: "finger-millet-phosphorus-deficiency",
    crop: "Finger Millet",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants become stunted.", "Root development is reduced.", "Leaves may become dark green.", "Tillering may decrease.", "Maturity may be delayed."],
    favorableConditions: ["Low available phosphorus", "High phosphorus fixation"],
    management: ["Test soil.", "Apply phosphorus according to recommendation.", "Maintain suitable soil conditions."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Early phosphorus availability supports root establishment."],
    references: ["Millet nutrient management references"]
},

{
    id: "finger-millet-potassium-deficiency",
    crop: "Finger Millet",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaf margins yellow.", "Margins may scorch.", "Plants become weak.", "Drought tolerance decreases.", "Yield may decline."],
    favorableConditions: ["Low soil potassium", "Light soils"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation."],
    prevention: ["Balanced nutrition", "Soil testing"],
    fieldNotes: ["Symptoms generally start on older leaves."],
    references: ["Millet nutrient literature"]
},

{
    id: "finger-millet-iron-deficiency",
    crop: "Finger Millet",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis develops.", "Photosynthesis decreases.", "Growth becomes restricted.", "Severe cases cause stunting."],
    favorableConditions: ["High soil pH", "Low available iron"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Use suitable iron sources where recommended."],
    prevention: ["Suitable soil pH", "Soil testing"],
    fieldNotes: ["Young leaves show symptoms first."],
    references: ["Micronutrient management literature"]
},

{
    id: "finger-millet-zinc-deficiency",
    crop: "Finger Millet",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Growth is restricted.", "Internodes may shorten.", "Plants become stunted.", "Yield declines."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Distinguish nutrient symptoms from disease lesions."],
    references: ["Micronutrient management literature"]
},


// ============================================================
// SUNFLOWER
// ============================================================

{
    id: "sunflower-downy-mildew",
    crop: "Sunflower",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Plasmopara halstedii",
    aliases: ["Sunflower downy mildew"],
    symptoms: ["Young plants become stunted.", "Leaves may show pale areas.", "White fungal growth may appear underneath leaves.", "Plants may remain dwarfed.", "Severe infection reduces seed yield."],
    favorableConditions: ["High soil moisture", "Cool humid weather", "Poor drainage"],
    management: ["Use resistant varieties.", "Use treated seed.", "Improve drainage.", "Practice crop rotation."],
    prevention: ["Healthy seed", "Good drainage", "Resistant varieties"],
    fieldNotes: ["Early infection can cause severe stunting."],
    references: ["Sunflower disease management literature"]
},

{
    id: "sunflower-alternaria-blight",
    crop: "Sunflower",
    category: "Disease",
    name: "Alternaria Blight",
    scientificName: "Alternaria helianthi",
    aliases: ["Alternaria leaf blight"],
    symptoms: ["Brown spots develop on leaves.", "Spots enlarge and merge.", "Leaves may dry.", "Stem lesions may occur.", "Severe disease reduces photosynthesis."],
    favorableConditions: ["Warm humid weather", "Leaf wetness"],
    management: ["Use tolerant varieties.", "Remove infected residues.", "Maintain spacing.", "Use recommended fungicides."],
    prevention: ["Crop rotation", "Field sanitation", "Healthy seed"],
    fieldNotes: ["Monitor lower leaves during humid periods."],
    references: ["Sunflower pathology references"]
},

{
    id: "sunflower-rust",
    crop: "Sunflower",
    category: "Disease",
    name: "Rust",
    scientificName: "Puccinia helianthi",
    aliases: ["Sunflower rust"],
    symptoms: ["Rust-colored pustules develop on leaves.", "Leaves may yellow.", "Severe infection causes premature drying.", "Photosynthetic area decreases.", "Seed yield may decline."],
    favorableConditions: ["Moderate temperatures", "High humidity"],
    management: ["Use resistant varieties.", "Maintain field sanitation.", "Monitor disease development.", "Use registered fungicides when recommended."],
    prevention: ["Resistant varieties", "Crop rotation", "Regular scouting"],
    fieldNotes: ["Rust pustules are useful diagnostic features."],
    references: ["Sunflower disease literature"]
},

{
    id: "sunflower-sclerotinia-head-rot",
    crop: "Sunflower",
    category: "Disease",
    name: "Sclerotinia Head Rot",
    scientificName: "Sclerotinia sclerotiorum",
    aliases: ["Head rot"],
    symptoms: ["Head tissue becomes soft.", "Brown rot develops.", "White fungal growth may occur.", "Seeds become damaged.", "Severe infection causes head collapse."],
    favorableConditions: ["Cool wet weather", "High humidity", "Frequent rainfall"],
    management: ["Use tolerant varieties.", "Practice crop rotation.", "Improve field drainage.", "Remove infected heads."],
    prevention: ["Crop rotation", "Good drainage", "Field sanitation"],
    fieldNotes: ["Inspect heads during flowering and seed filling."],
    references: ["Sunflower pathology references"]
},

{
    id: "sunflower-charcoal-rot",
    crop: "Sunflower",
    category: "Disease",
    name: "Charcoal Rot",
    scientificName: "Macrophomina phaseolina",
    aliases: ["Charcoal rot"],
    symptoms: ["Plants wilt under moisture stress.", "Stem tissues become dry.", "Roots deteriorate.", "Black microsclerotia may occur.", "Premature plant death may occur."],
    favorableConditions: ["High temperature", "Drought stress", "Low soil moisture"],
    management: ["Reduce moisture stress.", "Practice crop rotation.", "Maintain soil organic matter.", "Use tolerant varieties."],
    prevention: ["Adequate soil moisture", "Healthy soil", "Crop rotation"],
    fieldNotes: ["Disease is commonly associated with heat and moisture stress."],
    references: ["Oilseed disease literature"]
},

// SUNFLOWER PESTS

{
    id: "sunflower-head-borer",
    crop: "Sunflower",
    category: "Pest",
    name: "Head Borer",
    scientificName: "Helicoverpa armigera",
    aliases: ["Sunflower head borer"],
    symptoms: ["Larvae feed on developing heads.", "Seeds are damaged.", "Head tissues show feeding holes.", "Frass may be present.", "Yield declines."],
    favorableConditions: ["Warm weather", "Flowering stage"],
    management: ["Monitor heads.", "Use pheromone traps.", "Conserve natural enemies.", "Use registered insecticides when justified."],
    prevention: ["Integrated pest management", "Regular monitoring"],
    fieldNotes: ["Inspect heads during flowering."],
    references: ["Sunflower pest management literature"]
},

{
    id: "sunflower-aphid",
    crop: "Sunflower",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphis spp.",
    aliases: ["Sunflower aphid"],
    symptoms: ["Aphids cluster on shoots.", "Leaves may curl.", "Honeydew accumulates.", "Sooty mold may develop.", "Plant vigor may decline."],
    favorableConditions: ["Moderate temperatures", "Dry weather"],
    management: ["Monitor colonies.", "Conserve predators.", "Use registered insecticides only when necessary."],
    prevention: ["Regular scouting", "Natural-enemy conservation"],
    fieldNotes: ["Beneficial insects can naturally suppress populations."],
    references: ["Oilseed IPM references"]
},

{
    id: "sunflower-whitefly",
    crop: "Sunflower",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["White fly"],
    symptoms: ["Sap sucking causes leaf yellowing.", "Honeydew develops.", "Sooty mold may appear.", "Plant vigor decreases.", "Virus transmission may occur in some systems."],
    favorableConditions: ["Warm weather", "Dry conditions"],
    management: ["Monitor leaf undersides.", "Use sticky traps.", "Conserve natural enemies.", "Use insecticides only when justified."],
    prevention: ["Regular scouting", "Weed management"],
    fieldNotes: ["Inspect lower leaf surfaces."],
    references: ["Oilseed pest management literature"]
},

{
    id: "sunflower-cutworm",
    crop: "Sunflower",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cut worm"],
    symptoms: ["Seedlings are cut near soil level.", "Plant stand becomes irregular.", "Plants may disappear overnight.", "Larvae hide in soil.", "Severe attack reduces establishment."],
    favorableConditions: ["Young crop", "Weedy fields"],
    management: ["Control weeds.", "Scout seedlings.", "Check soil for larvae.", "Use recommended control measures."],
    prevention: ["Field sanitation", "Early weed control"],
    fieldNotes: ["Inspect soil around damaged plants."],
    references: ["Sunflower IPM literature"]
},

{
    id: "sunflower-termite",
    crop: "Sunflower",
    category: "Pest",
    name: "Termite",
    scientificName: "Odontotermes spp.",
    aliases: ["Termite damage"],
    symptoms: ["Roots are damaged.", "Plants wilt.", "Stems may weaken.", "Plant stand declines.", "Young plants may die."],
    favorableConditions: ["Dry soil", "Low soil moisture"],
    management: ["Maintain suitable soil moisture.", "Use healthy seed.", "Follow recommended seed treatment."],
    prevention: ["Field sanitation", "Good soil management"],
    fieldNotes: ["Inspect roots of wilted plants."],
    references: ["Oilseed pest management literature"]
},

// SUNFLOWER DISORDERS

{
    id: "sunflower-nitrogen-deficiency",
    crop: "Sunflower",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plants become stunted.", "Leaf area decreases.", "Heads may remain small.", "Seed yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Conduct soil testing.", "Apply nitrogen according to crop demand.", "Avoid excessive application."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Excess nitrogen can also increase disease and lodging risk."],
    references: ["Sunflower nutrient management literature"]
},

{
    id: "sunflower-phosphorus-deficiency",
    crop: "Sunflower",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants become stunted.", "Root growth decreases.", "Leaves may become dark green.", "Flowering may be delayed.", "Seed yield decreases."],
    favorableConditions: ["Low available phosphorus", "High phosphorus fixation"],
    management: ["Test soil.", "Apply phosphorus according to recommendation.", "Maintain suitable soil conditions."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Early phosphorus availability supports root development."],
    references: ["Oilseed nutrient references"]
},

{
    id: "sunflower-potassium-deficiency",
    crop: "Sunflower",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves develop marginal yellowing.", "Margins may scorch.", "Plants become weak.", "Stress tolerance decreases.", "Seed yield may decline."],
    favorableConditions: ["Low soil potassium", "Light soils"],
    management: ["Conduct soil testing.", "Apply potassium according to crop requirement."],
    prevention: ["Balanced nutrition", "Soil testing"],
    fieldNotes: ["Sunflower has relatively high potassium demand."],
    references: ["Oilseed nutrient management literature"]
},

{
    id: "sunflower-boron-deficiency",
    crop: "Sunflower",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",
    aliases: ["B deficiency"],
    symptoms: ["Growing points may become damaged.", "Young leaves may deform.", "Flower development can be affected.", "Seed set may decrease.", "Stems may become brittle."],
    favorableConditions: ["Low available boron", "Dry soil", "Sandy soils"],
    management: ["Confirm deficiency.", "Apply boron carefully according to soil and crop recommendations."],
    prevention: ["Soil testing", "Balanced micronutrient management"],
    fieldNotes: ["Boron has a narrow range between deficiency and toxicity."],
    references: ["Micronutrient management literature"]
},

{
    id: "sunflower-iron-deficiency",
    crop: "Sunflower",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis develops.", "Photosynthesis decreases.", "Growth becomes restricted.", "Severe deficiency causes stunting."],
    favorableConditions: ["High soil pH", "Low available iron"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Use suitable iron sources when recommended."],
    prevention: ["Soil testing", "Suitable soil pH"],
    fieldNotes: ["Young leaves are affected first."],
    references: ["Micronutrient management references"]
},


// ============================================================
// SESAME
// ============================================================

{
    id: "sesame-phyllody",
    crop: "Sesame",
    category: "Disease",
    name: "Phyllody",
    scientificName: "Phytoplasma",
    aliases: ["Sesame phyllody"],
    symptoms: ["Flowers transform into leafy structures.", "Normal flower development is disrupted.", "Plants may become bushy.", "Capsule formation decreases.", "Seed production may be severely reduced."],
    favorableConditions: ["Presence of insect vectors", "Warm weather", "Alternate hosts"],
    management: ["Remove infected plants.", "Control vector populations where recommended.", "Maintain field sanitation.", "Use tolerant varieties where available."],
    prevention: ["Early scouting", "Vector management", "Weed control"],
    fieldNotes: ["Leafy flowers are a characteristic diagnostic symptom."],
    references: ["Sesame disease management literature"]
},

{
    id: "sesame-alternaria-leaf-spot",
    crop: "Sesame",
    category: "Disease",
    name: "Alternaria Leaf Spot",
    scientificName: "Alternaria sesami",
    aliases: ["Alternaria spot"],
    symptoms: ["Brown leaf spots develop.", "Spots may enlarge.", "Leaves may yellow.", "Premature defoliation can occur.", "Severe disease reduces photosynthesis."],
    favorableConditions: ["Warm humid weather", "Leaf wetness"],
    management: ["Use healthy seed.", "Remove residues.", "Maintain spacing.", "Use recommended fungicides."],
    prevention: ["Crop rotation", "Field sanitation"],
    fieldNotes: ["Monitor older foliage during humid weather."],
    references: ["Sesame pathology references"]
},

{
    id: "sesame-cercospora",
    crop: "Sesame",
    category: "Disease",
    name: "Cercospora Leaf Spot",
    scientificName: "Cercospora sesami",
    aliases: ["Cercospora spot"],
    symptoms: ["Small spots appear on leaves.", "Spots enlarge under humidity.", "Leaves may yellow.", "Defoliation can occur.", "Yield may decline."],
    favorableConditions: ["High humidity", "Leaf wetness"],
    management: ["Maintain sanitation.", "Use healthy seed.", "Improve air circulation.", "Use recommended fungicides."],
    prevention: ["Crop rotation", "Regular scouting"],
    fieldNotes: ["Leaf spots can be confused with other foliar diseases."],
    references: ["Sesame disease literature"]
},

{
    id: "sesame-powdery-mildew",
    crop: "Sesame",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Erysiphe spp.",
    aliases: ["Powdery mildew"],
    symptoms: ["White powdery growth develops.", "Leaves become pale.", "Photosynthesis decreases.", "Leaves may dry prematurely.", "Yield can decline."],
    favorableConditions: ["Moderate temperature", "Humid nights"],
    management: ["Improve air circulation.", "Use tolerant varieties.", "Apply recommended fungicides when needed."],
    prevention: ["Regular scouting", "Balanced crop density"],
    fieldNotes: ["White fungal growth is characteristic."],
    references: ["Sesame pathology literature"]
},

{
    id: "sesame-root-rot",
    crop: "Sesame",
    category: "Disease",
    name: "Root Rot",
    scientificName: "Macrophomina phaseolina",
    aliases: ["Sesame root rot"],
    symptoms: ["Roots become dark and damaged.", "Plants wilt.", "Growth becomes weak.", "Leaves may dry.", "Severe infection causes plant death."],
    favorableConditions: ["High temperature", "Moisture stress", "Poor soil conditions"],
    management: ["Reduce moisture stress.", "Practice crop rotation.", "Improve soil health.", "Use healthy seed."],
    prevention: ["Healthy soil", "Crop rotation", "Adequate moisture"],
    fieldNotes: ["Root examination is important for diagnosis."],
    references: ["Oilseed pathology literature"]
},

// SESAME PESTS

{
    id: "sesame-gall-fly",
    crop: "Sesame",
    category: "Pest",
    name: "Sesame Gall Fly",
    scientificName: "Asphondylia sesami",
    aliases: ["Gall fly"],
    symptoms: ["Galls develop on plant tissues.", "Flower development may be affected.", "Capsule formation may decrease.", "Plant growth can be distorted.", "Seed yield may decline."],
    favorableConditions: ["Warm weather", "Suitable host availability"],
    management: ["Scout plants regularly.", "Remove severely affected plant parts.", "Maintain field sanitation.", "Use recommended control measures."],
    prevention: ["Regular monitoring", "Field sanitation"],
    fieldNotes: ["Inspect growing points and reproductive structures."],
    references: ["Sesame pest management literature"]
},

{
    id: "sesame-leaf-roller",
    crop: "Sesame",
    category: "Pest",
    name: "Leaf Roller",
    scientificName: "Antigastra catalaunalis",
    aliases: ["Sesame leaf roller"],
    symptoms: ["Leaves become folded or rolled.", "Larvae feed inside folded leaves.", "Young shoots may be damaged.", "Flowers may be affected.", "Yield may decline."],
    favorableConditions: ["Warm weather", "Dense foliage"],
    management: ["Monitor young leaves.", "Remove heavily infested shoots.", "Use biological control.", "Use registered insecticides when justified."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Larvae are often protected inside rolled leaves."],
    references: ["Sesame IPM references"]
},

{
    id: "sesame-capsule-borer",
    crop: "Sesame",
    category: "Pest",
    name: "Capsule Borer",
    scientificName: "Antigastra catalaunalis",
    aliases: ["Capsule borer"],
    symptoms: ["Capsules develop feeding holes.", "Seeds are damaged.", "Frass may occur inside capsules.", "Capsules may dry prematurely.", "Seed yield decreases."],
    favorableConditions: ["Capsule formation", "Warm weather"],
    management: ["Scout capsules.", "Remove infested material.", "Use biological control.", "Use registered insecticides when justified."],
    prevention: ["Regular monitoring", "Field sanitation"],
    fieldNotes: ["Check developing capsules carefully."],
    references: ["Sesame pest management literature"]
},

{
    id: "sesame-aphid",
    crop: "Sesame",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphis gossypii",
    aliases: ["Cotton aphid"],
    symptoms: ["Colonies form on young shoots.", "Leaves curl.", "Honeydew develops.", "Sooty mold may occur.", "Plant growth is weakened."],
    favorableConditions: ["Dry weather", "Moderate temperature"],
    management: ["Monitor colonies.", "Conserve predators.", "Use insecticides only when necessary."],
    prevention: ["Regular scouting", "Natural-enemy conservation"],
    fieldNotes: ["Inspect young shoots and leaf undersides."],
    references: ["Oilseed IPM literature"]
},

{
    id: "sesame-whitefly",
    crop: "Sesame",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["White fly"],
    symptoms: ["Sap sucking causes yellowing.", "Honeydew accumulates.", "Sooty mold develops.", "Plants lose vigor.", "Virus transmission may occur."],
    favorableConditions: ["Warm weather", "Dry conditions"],
    management: ["Use sticky traps.", "Conserve natural enemies.", "Monitor populations.", "Use registered insecticides when justified."],
    prevention: ["Weed management", "Regular scouting"],
    fieldNotes: ["Check the lower leaf surface."],
    references: ["Oilseed pest management references"]
},

// SESAME DISORDERS

{
    id: "sesame-nitrogen-deficiency",
    crop: "Sesame",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plants remain small.", "Leaf area decreases.", "Growth slows.", "Seed yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Conduct soil testing.", "Apply nitrogen according to recommendation.", "Avoid excessive nitrogen."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Excess nitrogen can increase vegetative growth at the expense of reproductive development."],
    references: ["Sesame nutrient management literature"]
},

{
    id: "sesame-phosphorus-deficiency",
    crop: "Sesame",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants become stunted.", "Root development decreases.", "Leaves may become dark green.", "Flowering may be delayed.", "Seed yield declines."],
    favorableConditions: ["Low available phosphorus", "High fixation"],
    management: ["Test soil.", "Apply phosphorus according to recommendation.", "Maintain suitable soil conditions."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Early phosphorus supply supports root development."],
    references: ["Oilseed nutrient references"]
},

{
    id: "sesame-potassium-deficiency",
    crop: "Sesame",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves show marginal yellowing.", "Margins may scorch.", "Plants become weak.", "Stress tolerance decreases.", "Yield declines."],
    favorableConditions: ["Low soil potassium", "Light soils"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Symptoms start on older leaves."],
    references: ["Oilseed nutrient literature"]
},

{
    id: "sesame-iron-deficiency",
    crop: "Sesame",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis occurs.", "Photosynthesis decreases.", "Growth becomes restricted.", "Severe cases cause stunting."],
    favorableConditions: ["High soil pH", "Low available iron"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Use suitable iron sources when recommended."],
    prevention: ["Soil testing", "Suitable soil pH"],
    fieldNotes: ["Young leaves show symptoms first."],
    references: ["Micronutrient management literature"]
},

{
    id: "sesame-zinc-deficiency",
    crop: "Sesame",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Growth is restricted.", "Internodes may shorten.", "Plants become stunted.", "Seed yield may decrease."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Confirm with soil or plant analysis."],
    references: ["Micronutrient management literature"]
},


// ============================================================
// COTTON
// ============================================================

{
    id: "cotton-bacterial-blight",
    crop: "Cotton",
    category: "Disease",
    name: "Bacterial Blight",
    scientificName: "Xanthomonas citri pv. malvacearum",
    aliases: ["Angular leaf spot"],
    symptoms: ["Water-soaked leaf spots develop.", "Lesions may become angular.", "Boll infection can occur.", "Leaves may drop.", "Severe infection reduces yield."],
    favorableConditions: ["Warm humid weather", "Rainfall", "Infected seed"],
    management: ["Use resistant varieties.", "Use healthy seed.", "Maintain sanitation.", "Avoid unnecessary overhead irrigation."],
    prevention: ["Clean seed", "Resistant varieties", "Crop sanitation"],
    fieldNotes: ["Angular leaf lesions are characteristic."],
    references: ["Cotton disease management literature"]
},

{
    id: "cotton-fusarium-wilt",
    crop: "Cotton",
    category: "Disease",
    name: "Fusarium Wilt",
    scientificName: "Fusarium oxysporum f. sp. vasinfectum",
    aliases: ["Cotton wilt"],
    symptoms: ["Leaves yellow.", "Plants wilt.", "Vascular tissues become discolored.", "Plants may become stunted.", "Severe plants die prematurely."],
    favorableConditions: ["Warm soil", "Infested soil", "Continuous cotton"],
    management: ["Use resistant varieties.", "Practice crop rotation.", "Use healthy seed.", "Maintain soil health."],
    prevention: ["Resistant varieties", "Healthy seed", "Crop rotation"],
    fieldNotes: ["Vascular discoloration helps distinguish wilt."],
    references: ["Cotton pathology literature"]
},

{
    id: "cotton-verticillium-wilt",
    crop: "Cotton",
    category: "Disease",
    name: "Verticillium Wilt",
    scientificName: "Verticillium dahliae",
    aliases: ["Verticillium wilt"],
    symptoms: ["Leaves show interveinal yellowing.", "Leaf margins may dry.", "Plants become stunted.", "Vascular discoloration may occur.", "Premature defoliation can develop."],
    favorableConditions: ["Cool to moderate temperatures", "Infested soil"],
    management: ["Use tolerant varieties.", "Practice crop rotation.", "Maintain soil health.", "Avoid movement of contaminated soil."],
    prevention: ["Healthy planting material", "Crop rotation", "Field sanitation"],
    fieldNotes: ["Symptoms can resemble Fusarium wilt."],
    references: ["Cotton disease management literature"]
},

{
    id: "cotton-alternaria-leaf-spot",
    crop: "Cotton",
    category: "Disease",
    name: "Alternaria Leaf Spot",
    scientificName: "Alternaria macrospora",
    aliases: ["Alternaria spot"],
    symptoms: ["Brown circular spots develop.", "Spots may have concentric rings.", "Leaves may yellow.", "Defoliation can occur.", "Severe disease reduces photosynthesis."],
    favorableConditions: ["Warm humid weather", "Nutrient stress"],
    management: ["Maintain balanced nutrition.", "Use tolerant varieties.", "Remove residues.", "Use fungicides when recommended."],
    prevention: ["Balanced nutrition", "Field sanitation"],
    fieldNotes: ["Concentric rings can be useful for diagnosis."],
    references: ["Cotton pathology references"]
},

{
    id: "cotton-grey-mildew",
    crop: "Cotton",
    category: "Disease",
    name: "Grey Mildew",
    scientificName: "Ramularia areola",
    aliases: ["Ramularia leaf spot"],
    symptoms: ["Pale spots appear on leaves.", "Grey fungal growth may develop.", "Leaves may yellow.", "Defoliation can occur.", "Severe infection reduces yield."],
    favorableConditions: ["High humidity", "Leaf wetness"],
    management: ["Improve canopy ventilation.", "Maintain balanced nutrition.", "Use recommended fungicides."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Often develops under humid conditions."],
    references: ["Cotton disease management literature"]
},

// COTTON PESTS

{
    id: "cotton-american-bollworm",
    crop: "Cotton",
    category: "Pest",
    name: "American Bollworm",
    scientificName: "Helicoverpa armigera",
    aliases: ["Bollworm"],
    symptoms: ["Larvae feed on squares and bolls.", "Boll holes develop.", "Seeds and lint are damaged.", "Frass may be visible.", "Severe attack causes major yield loss."],
    favorableConditions: ["Warm weather", "Flowering and boll formation"],
    management: ["Scout regularly.", "Use pheromone traps.", "Conserve natural enemies.", "Use biological control.", "Use registered insecticides when justified."],
    prevention: ["Integrated pest management", "Regular scouting"],
    fieldNotes: ["Inspect squares and bolls."],
    references: ["Cotton IPM literature"]
},

{
    id: "cotton-pink-bollworm",
    crop: "Cotton",
    category: "Pest",
    name: "Pink Bollworm",
    scientificName: "Pectinophora gossypiella",
    aliases: ["Pink bollworm"],
    symptoms: ["Larvae enter bolls.", "Seeds are damaged.", "Lint quality decreases.", "Bolls may open abnormally.", "Severe infestation reduces yield."],
    favorableConditions: ["Boll formation", "Continuous cotton cultivation"],
    management: ["Use pheromone monitoring.", "Destroy crop residues.", "Follow refuge and resistance-management requirements where applicable.", "Use registered controls when justified."],
    prevention: ["Timely crop destruction", "Crop rotation", "Pest monitoring"],
    fieldNotes: ["Internal damage may not be obvious externally."],
    references: ["Cotton pest management literature"]
},

{
    id: "cotton-spotted-bollworm",
    crop: "Cotton",
    category: "Pest",
    name: "Spotted Bollworm",
    scientificName: "Earias vittella",
    aliases: ["Spotted bollworm"],
    symptoms: ["Larvae bore into shoots.", "Squares may drop.", "Bolls develop holes.", "Larvae feed inside reproductive structures.", "Yield decreases."],
    favorableConditions: ["Warm weather", "Vegetative and reproductive growth"],
    management: ["Scout shoots and squares.", "Remove damaged material.", "Conserve natural enemies.", "Use registered insecticides when justified."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Inspect young shoots and squares."],
    references: ["Cotton IPM references"]
},

{
    id: "cotton-whitefly",
    crop: "Cotton",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Bemisia tabaci",
    aliases: ["Cotton whitefly"],
    symptoms: ["Sap sucking causes leaf yellowing.", "Honeydew accumulates.", "Sooty mold develops.", "Leaves may drop.", "Severe infestation reduces plant vigor."],
    favorableConditions: ["Warm dry weather", "Dense canopy", "Excessive insecticide disruption of natural enemies"],
    management: ["Monitor adults and nymphs.", "Conserve natural enemies.", "Avoid unnecessary insecticide sprays.", "Use registered insecticides according to resistance-management guidance."],
    prevention: ["Regular scouting", "Balanced pest management"],
    fieldNotes: ["Check lower leaf surfaces."],
    references: ["Cotton IPM literature"]
},

{
    id: "cotton-aphid",
    crop: "Cotton",
    category: "Pest",
    name: "Cotton Aphid",
    scientificName: "Aphis gossypii",
    aliases: ["Aphid"],
    symptoms: ["Colonies develop on shoots.", "Leaves curl.", "Honeydew accumulates.", "Sooty mold may appear.", "Plant growth may weaken."],
    favorableConditions: ["Moderate temperature", "Dry conditions"],
    management: ["Monitor colonies.", "Conserve ladybird beetles.", "Avoid unnecessary insecticides.", "Use registered controls when justified."],
    prevention: ["Regular scouting", "Natural-enemy conservation"],
    fieldNotes: ["Natural enemies can suppress moderate infestations."],
    references: ["Cotton pest management literature"]
},

// COTTON DISORDERS

{
    id: "cotton-nitrogen-deficiency",
    crop: "Cotton",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plants remain small.", "Leaf area decreases.", "Boll production may decrease.", "Yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Conduct soil testing.", "Apply nitrogen in appropriate splits.", "Avoid excessive nitrogen."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Excess nitrogen can increase vegetative growth and pest pressure."],
    references: ["Cotton nutrient management literature"]
},

{
    id: "cotton-potassium-deficiency",
    crop: "Cotton",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves develop yellow margins.", "Margins may scorch.", "Leaves may develop interveinal chlorosis.", "Boll development can suffer.", "Yield and fiber quality may decline."],
    favorableConditions: ["Low soil potassium", "High crop demand"],
    management: ["Conduct soil testing.", "Apply potassium according to crop requirement.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Cotton has significant potassium demand during boll development."],
    references: ["Cotton nutrient management literature"]
},

{
    id: "cotton-magnesium-deficiency",
    crop: "Cotton",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "",
    aliases: ["Mg deficiency"],
    symptoms: ["Older leaves show interveinal chlorosis.", "Leaf tissue becomes yellow.", "Severe deficiency causes premature leaf drop.", "Photosynthesis decreases.", "Plant vigor declines."],
    favorableConditions: ["Low soil magnesium", "Acidic soils", "High potassium imbalance"],
    management: ["Confirm deficiency.", "Apply magnesium according to soil-test recommendations.", "Correct nutrient imbalance."],
    prevention: ["Soil testing", "Balanced nutrition"],
    fieldNotes: ["Symptoms begin on older leaves because magnesium is mobile."],
    references: ["Cotton nutrient references"]
},

{
    id: "cotton-boron-deficiency",
    crop: "Cotton",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",
    aliases: ["B deficiency"],
    symptoms: ["Growing points may become damaged.", "Young leaves may deform.", "Squares may abort.", "Bolls may develop poorly.", "Fiber production can decline."],
    favorableConditions: ["Low available boron", "Dry soil", "Sandy soil"],
    management: ["Confirm deficiency.", "Apply boron carefully according to recommendations."],
    prevention: ["Soil testing", "Balanced micronutrient management"],
    fieldNotes: ["Boron toxicity can occur if overapplied."],
    references: ["Cotton micronutrient management literature"]
},

{
    id: "cotton-zinc-deficiency",
    crop: "Cotton",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis may occur.", "Internodes shorten.", "Plants become stunted.", "Boll production may decline."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced fertilization."],
    prevention: ["Soil testing", "Balanced nutrition"],
    fieldNotes: ["Distinguish from iron deficiency and viral symptoms."],
    references: ["Cotton micronutrient literature"]
},


// ============================================================
// SUGARCANE
// ============================================================

{
    id: "sugarcane-red-rot",
    crop: "Sugarcane",
    category: "Disease",
    name: "Red Rot",
    scientificName: "Colletotrichum falcatum",
    aliases: ["Red rot of sugarcane"],
    symptoms: ["Leaves may wilt.", "Internal stalk tissue develops red discoloration.", "White patches may appear across red tissue.", "Stalks become weak.", "Sugar content may decline."],
    favorableConditions: ["Warm humid weather", "Infected setts", "Poor drainage"],
    management: ["Use resistant varieties.", "Use healthy planting material.", "Remove infected clumps.", "Maintain field sanitation.", "Use recommended sett treatment."],
    prevention: ["Healthy setts", "Resistant varieties", "Field sanitation"],
    fieldNotes: ["Splitting the stalk helps reveal characteristic internal discoloration."],
    references: ["Sugarcane disease management literature"]
},

{
    id: "sugarcane-smut",
    crop: "Sugarcane",
    category: "Disease",
    name: "Smut",
    scientificName: "Sporisorium scitamineum",
    aliases: ["Whip smut"],
    symptoms: ["A long black whip-like structure develops.", "Plants become thin.", "Tillering may increase.", "Cane yield decreases.", "Severe infection affects entire stools."],
    favorableConditions: ["Infected planting material", "Warm conditions"],
    management: ["Use resistant varieties.", "Use healthy setts.", "Remove infected stools.", "Treat planting material according to recommendations."],
    prevention: ["Healthy setts", "Resistant varieties", "Field sanitation"],
    fieldNotes: ["The black whip is a characteristic symptom."],
    references: ["Sugarcane pathology references"]
},

{
    id: "sugarcane-wilt",
    crop: "Sugarcane",
    category: "Disease",
    name: "Wilt",
    scientificName: "Fusarium spp.",
    aliases: ["Sugarcane wilt"],
    symptoms: ["Leaves wilt.", "Stalks become weak.", "Internal tissues may discolor.", "Plants become stunted.", "Yield and cane quality decline."],
    favorableConditions: ["Soil stress", "Poor drainage", "Infected planting material"],
    management: ["Use healthy setts.", "Improve soil conditions.", "Remove infected plants.", "Practice crop rotation where appropriate."],
    prevention: ["Healthy planting material", "Field sanitation"],
    fieldNotes: ["Check stalk interiors when wilt is suspected."],
    references: ["Sugarcane disease management literature"]
},

{
    id: "sugarcane-sett-rot",
    crop: "Sugarcane",
    category: "Disease",
    name: "Sett Rot",
    scientificName: "Fusarium spp.",
    aliases: ["Sett rot"],
    symptoms: ["Planting setts fail to germinate.", "Bud tissues become brown.", "Setts may decay.", "Plant stand becomes irregular.", "Early growth is poor."],
    favorableConditions: ["Excess moisture", "Poor-quality setts", "Warm soil"],
    management: ["Use healthy setts.", "Treat setts appropriately.", "Avoid excessive soil moisture.", "Maintain field drainage."],
    prevention: ["Healthy planting material", "Good drainage"],
    fieldNotes: ["Check failed setts for internal rotting."],
    references: ["Sugarcane crop protection literature"]
},

{
    id: "sugarcane-leaf-scald",
    crop: "Sugarcane",
    category: "Disease",
    name: "Leaf Scald",
    scientificName: "Xanthomonas albilineans",
    aliases: ["Leaf scald"],
    symptoms: ["Long white streaks develop on leaves.", "Leaves may dry.", "Stalks may become weak.", "Plants may show rapid decline.", "Severe infection causes yield loss."],
    favorableConditions: ["Infected planting material", "Warm humid conditions"],
    management: ["Use healthy planting material.", "Remove infected stools.", "Disinfect cutting tools.", "Use resistant varieties."],
    prevention: ["Clean planting material", "Tool sanitation"],
    fieldNotes: ["Long white leaf streaks are characteristic."],
    references: ["Sugarcane disease literature"]
},

// SUGARCANE PESTS

{
    id: "sugarcane-early-shoot-borer",
    crop: "Sugarcane",
    category: "Pest",
    name: "Early Shoot Borer",
    scientificName: "Chilo infuscatellus",
    aliases: ["Early shoot borer"],
    symptoms: ["Central shoots dry.", "Dead-heart symptoms develop.", "Larvae bore into shoots.", "Plant growth is reduced.", "Young crop stands may be affected severely."],
    favorableConditions: ["Young crop", "Warm weather", "Moisture stress"],
    management: ["Scout young cane.", "Remove dead hearts.", "Use biological control.", "Apply registered insecticides when justified."],
    prevention: ["Healthy planting material", "Regular scouting"],
    fieldNotes: ["Dead-heart symptoms are important during early growth."],
    references: ["Sugarcane IPM literature"]
},

{
    id: "sugarcane-top-borer",
    crop: "Sugarcane",
    category: "Pest",
    name: "Top Borer",
    scientificName: "Scirpophaga excerptalis",
    aliases: ["Top shoot borer"],
    symptoms: ["Central leaves become damaged.", "Dead hearts may develop.", "Borer holes occur in shoots.", "Cane growth is reduced.", "Internodal damage may occur."],
    favorableConditions: ["Warm weather", "Dense crop"],
    management: ["Monitor shoots.", "Remove affected shoots where practical.", "Use biological control.", "Use registered insecticides when justified."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Inspect the top portion of the cane."],
    references: ["Sugarcane pest management literature"]
},

{
    id: "sugarcane-internode-borer",
    crop: "Sugarcane",
    category: "Pest",
    name: "Internode Borer",
    scientificName: "Chilo sacchariphagus indicus",
    aliases: ["Internode borer"],
    symptoms: ["Larvae tunnel into internodes.", "Bore holes occur on stalks.", "Frass may be visible.", "Stalk strength decreases.", "Cane quality declines."],
    favorableConditions: ["Warm weather", "Mature cane"],
    management: ["Monitor stalks.", "Remove affected material.", "Conserve natural enemies.", "Use registered insecticides when justified."],
    prevention: ["Field sanitation", "Regular scouting"],
    fieldNotes: ["Inspect internodes for bore holes."],
    references: ["Sugarcane IPM references"]
},

{
    id: "sugarcane-whitefly",
    crop: "Sugarcane",
    category: "Pest",
    name: "Whitefly",
    scientificName: "Aleurolobus barodensis",
    aliases: ["Sugarcane whitefly"],
    symptoms: ["Nymphs suck leaf sap.", "Leaves become yellow.", "Honeydew accumulates.", "Sooty mold develops.", "Photosynthesis decreases."],
    favorableConditions: ["Warm humid weather", "Dense foliage"],
    management: ["Monitor leaf surfaces.", "Conserve natural enemies.", "Avoid unnecessary insecticides.", "Use registered controls when required."],
    prevention: ["Regular scouting", "Natural-enemy conservation"],
    fieldNotes: ["Inspect the underside of leaves."],
    references: ["Sugarcane pest management literature"]
},

{
    id: "sugarcane-white-grub",
    crop: "Sugarcane",
    category: "Pest",
    name: "White Grub",
    scientificName: "Holotrichia spp.",
    aliases: ["White grub"],
    symptoms: ["Roots are eaten.", "Plants wilt.", "Cane clumps become weak.", "Affected plants may be pulled easily.", "Yield declines."],
    favorableConditions: ["Light soils", "Adult beetle activity", "Dry soil"],
    management: ["Monitor adult beetles.", "Use field sanitation.", "Apply recommended soil treatments where justified.", "Maintain soil health."],
    prevention: ["Field sanitation", "Regular monitoring"],
    fieldNotes: ["Check roots and soil around wilted stools."],
    references: ["Sugarcane pest management literature"]
},

// SUGARCANE DISORDERS

{
    id: "sugarcane-nitrogen-deficiency",
    crop: "Sugarcane",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Tillering decreases.", "Cane growth slows.", "Stalks remain thin.", "Yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Use soil testing.", "Apply nitrogen in recommended splits.", "Avoid excessive nitrogen."],
    prevention: ["Balanced fertilization", "Organic matter management"],
    fieldNotes: ["Nitrogen demand is high during active vegetative growth."],
    references: ["Sugarcane nutrient management literature"]
},

{
    id: "sugarcane-phosphorus-deficiency",
    crop: "Sugarcane",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Root development decreases.", "Plants become stunted.", "Tillering may decrease.", "Leaves may become dark green.", "Cane yield declines."],
    favorableConditions: ["Low available phosphorus", "High fixation"],
    management: ["Conduct soil testing.", "Apply phosphorus according to recommendation."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Phosphorus is particularly important during establishment."],
    references: ["Sugarcane nutrient literature"]
},

{
    id: "sugarcane-potassium-deficiency",
    crop: "Sugarcane",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves show marginal yellowing.", "Leaf margins may scorch.", "Stalks may remain weak.", "Water-use efficiency decreases.", "Cane quality may decline."],
    favorableConditions: ["Low soil potassium", "High crop removal"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Potassium is important for cane quality and stress tolerance."],
    references: ["Sugarcane nutrient management literature"]
},

{
    id: "sugarcane-iron-deficiency",
    crop: "Sugarcane",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",
    aliases: ["Fe deficiency"],
    symptoms: ["Young leaves become pale.", "Interveinal chlorosis develops.", "Photosynthesis decreases.", "Growth becomes restricted.", "Severe deficiency causes stunting."],
    favorableConditions: ["High soil pH", "Low available iron"],
    management: ["Confirm deficiency.", "Correct soil conditions.", "Use suitable iron sources where recommended."],
    prevention: ["Soil testing", "Suitable soil pH"],
    fieldNotes: ["Young leaves are affected first."],
    references: ["Sugarcane micronutrient literature"]
},

{
    id: "sugarcane-zinc-deficiency",
    crop: "Sugarcane",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Growth is restricted.", "Short internodes may occur.", "Plants become stunted.", "Yield declines."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Young leaves and growing points should be monitored."],
    references: ["Sugarcane micronutrient references"]
},


// ============================================================
// ONION
// ============================================================

{
    id: "onion-purple-blotch",
    crop: "Onion",
    category: "Disease",
    name: "Purple Blotch",
    scientificName: "Alternaria porri",
    aliases: ["Purple blotch"],
    symptoms: ["Small water-soaked lesions develop.", "Lesions become purple-brown.", "Concentric rings may develop.", "Leaves may dry from the tip.", "Bulb yield decreases."],
    favorableConditions: ["Warm humid weather", "Leaf wetness", "Dense crop"],
    management: ["Improve air circulation.", "Avoid prolonged leaf wetness.", "Remove infected residues.", "Use recommended fungicides."],
    prevention: ["Field sanitation", "Crop rotation", "Regular scouting"],
    fieldNotes: ["Purple lesions with concentric rings are characteristic."],
    references: ["Onion disease management literature"]
},

{
    id: "onion-downy-mildew",
    crop: "Onion",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronospora destructor",
    aliases: ["Onion downy mildew"],
    symptoms: ["Leaves develop pale patches.", "Gray-purple fungal growth may appear.", "Leaves bend or collapse.", "Bulb development decreases.", "Severe disease causes major yield loss."],
    favorableConditions: ["Cool humid weather", "Extended leaf wetness"],
    management: ["Improve ventilation.", "Avoid overhead irrigation.", "Use tolerant varieties.", "Apply recommended fungicides when justified."],
    prevention: ["Good spacing", "Field sanitation", "Regular monitoring"],
    fieldNotes: ["Disease can spread rapidly under prolonged humidity."],
    references: ["Onion pathology references"]
},

{
    id: "onion-basal-rot",
    crop: "Onion",
    category: "Disease",
    name: "Basal Rot",
    scientificName: "Fusarium oxysporum f. sp. cepae",
    aliases: ["Fusarium basal rot"],
    symptoms: ["Root decay occurs.", "Bulb base becomes brown.", "Leaves yellow and wilt.", "Bulbs may rot during storage.", "Plant stand may decline."],
    favorableConditions: ["Warm soil", "Poor drainage", "Infested soil"],
    management: ["Use healthy planting material.", "Practice crop rotation.", "Improve drainage.", "Remove infected plants."],
    prevention: ["Healthy seed or sets", "Crop rotation", "Good drainage"],
    fieldNotes: ["Inspect the basal plate of affected bulbs."],
    references: ["Onion disease management literature"]
},

{
    id: "onion-stemphylium-blight",
    crop: "Onion",
    category: "Disease",
    name: "Stemphylium Blight",
    scientificName: "Stemphylium vesicarium",
    aliases: ["Stemphylium leaf blight"],
    symptoms: ["Small yellow lesions develop.", "Lesions become brown.", "Leaves may dry.", "Severe infection causes defoliation.", "Bulb yield decreases."],
    favorableConditions: ["Warm humid weather", "Leaf wetness"],
    management: ["Maintain sanitation.", "Improve air circulation.", "Avoid excessive leaf wetness.", "Use recommended fungicides."],
    prevention: ["Crop rotation", "Field sanitation", "Regular scouting"],
    fieldNotes: ["Monitor leaves during humid periods."],
    references: ["Onion pathology literature"]
},

{
    id: "onion-botrytis-neck-rot",
    crop: "Onion",
    category: "Disease",
    name: "Botrytis Neck Rot",
    scientificName: "Botrytis allii",
    aliases: ["Neck rot"],
    symptoms: ["Neck tissue becomes soft.", "Gray fungal growth may develop.", "Bulbs rot during storage.", "Scales become watery.", "Storage losses can be significant."],
    favorableConditions: ["High humidity", "Poor curing", "Cool storage conditions"],
    management: ["Cure bulbs properly.", "Avoid injury during harvest.", "Store bulbs under suitable conditions.", "Remove infected bulbs."],
    prevention: ["Proper curing", "Careful harvesting", "Good storage hygiene"],
    fieldNotes: ["Neck tissue should be checked before storage."],
    references: ["Onion storage disease literature"]
},

// ONION PESTS

{
    id: "onion-thrips",
    crop: "Onion",
    category: "Pest",
    name: "Onion Thrips",
    scientificName: "Thrips tabaci",
    aliases: ["Onion thrips"],
    symptoms: ["Leaves develop silvery streaks.", "Leaf tips dry.", "Plants become weak.", "Bulb development decreases.", "Severe infestation causes yield loss."],
    favorableConditions: ["Hot dry weather", "Dense crop"],
    management: ["Monitor plants.", "Use sticky traps.", "Conserve natural enemies.", "Use registered insecticides according to resistance-management guidance."],
    prevention: ["Regular scouting", "Weed management", "Natural-enemy conservation"],
    fieldNotes: ["Inspect the inner leaves where thrips shelter."],
    references: ["Onion IPM literature"]
},

{
    id: "onion-maggot",
    crop: "Onion",
    category: "Pest",
    name: "Onion Maggot",
    scientificName: "Delia antiqua",
    aliases: ["Onion fly"],
    symptoms: ["Larvae damage roots and bulbs.", "Seedlings wilt.", "Bulbs become soft.", "Plants may die.", "Secondary rotting organisms may invade."],
    favorableConditions: ["Cool to moderate weather", "Organic residues", "Continuous onion production"],
    management: ["Remove infested plants.", "Maintain sanitation.", "Use crop rotation.", "Use recommended control measures."],
    prevention: ["Field sanitation", "Crop rotation", "Healthy planting material"],
    fieldNotes: ["Inspect roots and bulb base."],
    references: ["Onion pest management literature"]
},

{
    id: "onion-cutworm",
    crop: "Onion",
    category: "Pest",
    name: "Cutworm",
    scientificName: "Agrotis spp.",
    aliases: ["Cut worm"],
    symptoms: ["Seedlings are cut near soil level.", "Plant stand becomes irregular.", "Plants may disappear overnight.", "Larvae hide in soil.", "Severe infestation reduces establishment."],
    favorableConditions: ["Young crop", "Weedy fields"],
    management: ["Control weeds.", "Scout seedlings.", "Check soil for larvae.", "Use recommended controls when justified."],
    prevention: ["Field sanitation", "Early weed control"],
    fieldNotes: ["Inspect soil around damaged seedlings."],
    references: ["Vegetable IPM literature"]
},

{
    id: "onion-aphid",
    crop: "Onion",
    category: "Pest",
    name: "Aphid",
    scientificName: "Aphididae",
    aliases: ["Onion aphid"],
    symptoms: ["Aphid colonies develop on young tissues.", "Leaves may curl.", "Honeydew accumulates.", "Sooty mold may develop.", "Plant growth may weaken."],
    favorableConditions: ["Moderate temperature", "Dry conditions"],
    management: ["Monitor colonies.", "Conserve natural enemies.", "Remove alternate hosts.", "Use registered insecticides only when justified."],
    prevention: ["Regular scouting", "Field sanitation"],
    fieldNotes: ["Inspect inner leaves and growing points."],
    references: ["Vegetable pest management literature"]
},

{
    id: "onion-mite",
    crop: "Onion",
    category: "Pest",
    name: "Mite",
    scientificName: "Aceria tulipae",
    aliases: ["Bulb mite"],
    symptoms: ["Leaves become distorted.", "Plants become stunted.", "Bulbs may develop poorly.", "Storage damage may occur.", "Severe infestation reduces plant vigor."],
    favorableConditions: ["Warm conditions", "Infested planting material"],
    management: ["Use clean planting material.", "Remove infested bulbs.", "Maintain storage hygiene.", "Use registered controls where justified."],
    prevention: ["Clean planting material", "Storage sanitation"],
    fieldNotes: ["Infested bulbs can spread mites to subsequent crops."],
    references: ["Onion pest management literature"]
},

// ONION DISORDERS

{
    id: "onion-nitrogen-deficiency",
    crop: "Onion",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",
    aliases: ["N deficiency"],
    symptoms: ["Older leaves become pale.", "Plants remain small.", "Leaf growth decreases.", "Bulbs remain small.", "Yield declines."],
    favorableConditions: ["Low soil nitrogen", "Low organic matter"],
    management: ["Conduct soil testing.", "Apply nitrogen according to crop demand.", "Avoid excessive nitrogen late in the crop."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Excess late nitrogen can delay bulb maturity and reduce storage quality."],
    references: ["Onion nutrient management literature"]
},

{
    id: "onion-phosphorus-deficiency",
    crop: "Onion",
    category: "Nutrient Disorder",
    name: "Phosphorus Deficiency",
    scientificName: "",
    aliases: ["P deficiency"],
    symptoms: ["Plants become stunted.", "Root development decreases.", "Leaves may become dark green.", "Bulb development is delayed.", "Yield declines."],
    favorableConditions: ["Low available phosphorus", "High phosphorus fixation"],
    management: ["Conduct soil testing.", "Apply phosphorus according to recommendation.", "Maintain suitable soil conditions."],
    prevention: ["Balanced fertilization", "Soil testing"],
    fieldNotes: ["Phosphorus is important during early root establishment."],
    references: ["Vegetable nutrient management literature"]
},

{
    id: "onion-potassium-deficiency",
    crop: "Onion",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",
    aliases: ["K deficiency"],
    symptoms: ["Older leaves show yellowing.", "Leaf tips may scorch.", "Plants become weak.", "Bulb development may decrease.", "Storage quality can decline."],
    favorableConditions: ["Low soil potassium", "High nutrient removal"],
    management: ["Conduct soil testing.", "Apply potassium according to recommendation.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced fertilization"],
    fieldNotes: ["Potassium contributes to plant stress tolerance and bulb quality."],
    references: ["Onion nutrient management literature"]
},

{
    id: "onion-sulfur-deficiency",
    crop: "Onion",
    category: "Nutrient Disorder",
    name: "Sulfur Deficiency",
    scientificName: "",
    aliases: ["S deficiency"],
    symptoms: ["Young leaves become pale.", "Plants become thin.", "Growth is slow.", "Bulb development decreases.", "Yield may decline."],
    favorableConditions: ["Low soil sulfur", "Sandy soils", "Low organic matter"],
    management: ["Confirm deficiency.", "Apply sulfur according to soil-test recommendations.", "Maintain balanced fertilization."],
    prevention: ["Soil testing", "Organic matter management"],
    fieldNotes: ["Onion is relatively responsive to sulfur nutrition."],
    references: ["Onion nutrient management literature"]
},

{
    id: "onion-zinc-deficiency",
    crop: "Onion",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",
    aliases: ["Zn deficiency"],
    symptoms: ["Young leaves become pale.", "Growth becomes restricted.", "Leaves may become narrow.", "Bulb development may decline.", "Yield can decrease."],
    favorableConditions: ["High soil pH", "Low available zinc"],
    management: ["Confirm deficiency.", "Apply zinc according to soil testing.", "Maintain balanced nutrition."],
    prevention: ["Soil testing", "Balanced micronutrient management"],
    fieldNotes: ["Confirm suspected deficiency before foliar or soil application."],
    references: ["Vegetable micronutrient management literature"]
}

];

export default libraryData;