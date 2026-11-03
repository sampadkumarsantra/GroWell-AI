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
,

// =========================================================
// BARLEY
// =========================================================

{
    id: "barley-stripe",
    crop: "Barley",
    category: "Disease",
    name: "Barley Stripe",
    scientificName: "Pyrenophora graminea",

    aliases: [
        "Barley stripe disease",
        "Stripe"
    ],

    affectedParts: [
        "Leaves",
        "Leaf sheaths",
        "Spikes"
    ],

    symptoms: [
        "Long, narrow yellow stripes develop along the leaves, running parallel to the veins.",
        "Stripes later dry out and become brown or pale.",
        "Affected tissue may split or shred in dry conditions.",
        "Severely infected plants tiller poorly and produce short, light spikes.",
        "Infection is systemic and may be visible from the seedling stage."
    ],

    fieldIdentification: [
        "Look for leaves with long, straight yellow stripes along the veins.",
        "Compare suspect plants with healthy neighbours for tiller and spike size.",
        "Check seedling leaves before symptoms fully develop, as infection is systemic."
    ],

    favourableConditions: [
        "Cool, humid conditions during emergence",
        "Infected seed lots",
        "Continuous barley or wheat cultivation in the same field",
        "Dense, lush canopy",
        "Prolonged leaf wetness"
    ],

    spread: [
        "The fungus survives inside infected seed and on crop residue.",
        "Wind and splashing rain can spread spores between plants.",
        "Contaminated seed is the main route of introduction into clean fields."
    ],

    riskFactors: [
        "Untreated or poorly cleaned seed",
        "Susceptible varieties",
        "Continuous cereal cropping",
        "Dense sowing",
        "High nitrogen with dense canopy"
    ],

    similarProblems: [
        "Net blotch",
        "Barley yellow dwarf virus",
        "Leaf rust",
        "Nitrogen or manganese deficiency"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-host crops.",
            "Avoid dense sowing and excessive nitrogen.",
            "Remove and destroy voluntarily emerging barley seedlings."
        ],

        biological: [
            "Use locally recommended biological seed treatments where their effectiveness is established.",
            "Maintain overall soil and crop health to reduce disease pressure."
        ],

        chemical: [
            "Use only locally registered seed-treatment fungicides when chemical control is justified.",
            "Follow the product label for dose, timing and safety precautions.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Use resistant or tolerant varieties where suitable.",
        "Sow certified seed of known health status.",
        "Rotate cereals with legumes or oilseed crops.",
        "Inspect seedling fields early and act before symptoms spread."
    ],

    fieldNotes: [
        "Stripe infection is systemic, so seed treatment is more effective than foliar sprays later in the season.",
        "Severity varies strongly with variety and seed quality."
    ],

    references: [
        "Barley pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "barley-bird-cherry-aphid",
    crop: "Barley",
    category: "Pest",
    name: "Bird-cherry Aphid",
    scientificName: "Rhopalosiphum padi",

    aliases: [
        "Bird cherry oat aphid",
        "Oat aphid",
        "Cereal aphid"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Spikes"
    ],

    symptoms: [
        "Small green to olive-green aphids colonise leaves and stems.",
        "Affected leaves may yellow, curl or show sticky honeydew deposits.",
        "Plants may be stunted and produce smaller spikes and grains.",
        "Symptoms of barley yellow dwarf virus (leaf yellowing, reddening) may appear where aphids carry the virus."
    ],

    fieldIdentification: [
        "Inspect leaf undersides and stem bases for colonies.",
        "Look for ants farming aphids on honeydew.",
        "Check for scattered patches of yellowing or reddening leaves where virus is suspected."
    ],

    favourableConditions: [
        "Mild temperatures",
        "Dry, settled weather",
        "Lush, nitrogen-rich growth",
        "Mild winters with reduced overwinter mortality",
        "Presence of grassy field margins"
    ],

    spread: [
        "Aphids move short distances by walking and longer distances on wind currents.",
        "Winged forms spread the barley yellow dwarf virus between plants and fields.",
        "Volunteer cereals and wild grasses act as green bridges between seasons."
    ],

    riskFactors: [
        "Early sown, lush crops",
        "High nitrogen fertilization",
        "Mild winters",
        "Presence of wild grasses and volunteers",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Cereal leaf beetle",
        "Iron or manganese deficiency",
        "Barley yellow dwarf virus without visible aphids",
        "Wheat aphid"
    ],

    management: {
        cultural: [
            "Remove volunteer cereals and manage grassy weed hosts around fields.",
            "Avoid excessive nitrogen that produces lush, attractive growth.",
            "Maintain recommended plant spacing for good airflow.",
            "Use timely sowing to avoid peak aphid flight periods where practical."
        ],

        biological: [
            "Conserve ladybird beetles, lacewings and parasitoid wasps.",
            "Avoid unnecessary broad-spectrum insecticides that eliminate natural enemies."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches rather than whole fields where practical."
        ]
    },

    prevention: [
        "Use virus-tolerant varieties where available.",
        "Sow at the locally recommended time to escape peak aphid pressure.",
        "Keep field margins and bunds free of volunteer cereals and dense grasses.",
        "Monitor regularly and act before populations build up."
    ],

    fieldNotes: [
        "Aphids damage both directly (sap feeding, honeydew) and indirectly (virus transmission).",
        "Virus-free seedlings and early monitoring are the cheapest insurance."
    ],

    references: [
        "Cereal aphid management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "barley-manganese-deficiency",
    crop: "Barley",
    category: "Nutrient Disorder",
    name: "Manganese Deficiency",
    scientificName: "",

    aliases: [
        "Grey speck",
        "Manganese deficiency grey speck",
        "Mn deficiency"
    ],

    affectedParts: [
        "Leaves",
        "Tillers"
    ],

    symptoms: [
        "Pale, olive or grey-green streaks and specks develop on young leaves.",
        "Grey specks may coalesce into pale stripes.",
        "Affected tissue may break away, leaving a ragged leaf appearance.",
        "Growth becomes restricted and tillering is reduced.",
        "In severe cases grain set and yield decline."
    ],

    fieldIdentification: [
        "Look on young leaves for pale streaks and grey-white specks parallel to the veins.",
        "Check high-pH or recently limed fields first, as manganese becomes unavailable there.",
        "Confirm with a soil test before applying any micronutrient."
    ],

    favourableConditions: [
        "High soil pH",
        "Recent heavy liming",
        "Sandy, low-organic-matter soils",
        "Cold, wet spring conditions",
        "Excess phosphorus availability"
    ],

    spread: [
        "Not infectious — a nutritional disorder, not a pathogen.",
        "Symptoms often appear patchily across fields following soil type or pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "Sandy soils",
        "High phosphorus fertilization",
        "Low organic matter"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Zinc deficiency",
        "Barley stripe",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; correct pH gradually toward the recommended range.",
            "Maintain organic matter through rotations and residues.",
            "Use soil tests to guide balanced fertilization."
        ],

        biological: [
            "Not directly applicable — this is a nutrient availability issue, not a pest or pathogen.",
            "Healthy, biologically active soils improve micronutrient availability."
        ],

        chemical: [
            "Apply manganese sulphate or chelated manganese only after confirming deficiency by test.",
            "Follow label directions for foliar or soil application rates.",
            "Stop further liming until pH is back within range."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before cereal cropping.",
        "Avoid excessive phosphorus and over-liming.",
        "Maintain organic matter and balanced nutrition.",
        "Monitor young crops on sandy or high-pH soils."
    ],

    fieldNotes: [
        "Grey speck is most reliably diagnosed by soil and tissue testing together.",
        "Foliar manganese often gives a quick response where deficiency is confirmed."
    ],

    references: [
        "Cereal micronutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// LENTIL
// =========================================================

{
    id: "lentil-rust",
    crop: "Lentil",
    category: "Disease",
    name: "Lentil Rust",
    scientificName: "Uromyces viciae-fabae",

    aliases: [
        "Rust of lentil",
        "Broad bean rust (on lentil)"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Pods"
    ],

    symptoms: [
        "Small, round, pale or yellow spots appear on leaves and stems.",
        "Spots enlarge into pustules that release orange-brown spores.",
        "Severe infection causes premature leaf drop and weakens stems.",
        "Pod set and seed filling may be reduced in heavily infected crops.",
        "A late-season telia stage may appear as dark pustules."
    ],

    fieldIdentification: [
        "Rub a suspect leaf — orange-brown spore dust indicates rust.",
        "Inspect the undersides of leaves for pustules.",
        "Check stems and pods in humid canopies where disease develops first."
    ],

    favourableConditions: [
        "High humidity",
        "Leaf wetness from dew or rain",
        "Mild temperatures",
        "Dense crop canopy",
        "Continuous legume cultivation"
    ],

    spread: [
        "Windborne uredospores spread the disease within and between fields.",
        "Splashing rain spreads spores locally.",
        "Volunteer and alternate legume hosts carry the fungus between seasons."
    ],

    riskFactors: [
        "Dense sowing",
        "High nitrogen encouraging lush growth",
        "Continuous legume cropping",
        "Humid, cloudy weather",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Ascochyta blight",
        "Anthracnose",
        "Powdery mildew",
        "Cercospora leaf spot"
    ],

    management: {
        cultural: [
            "Use resistant or tolerant varieties where suitable.",
            "Maintain wide spacing and good airflow in the canopy.",
            "Rotate with non-legume crops for at least two seasons.",
            "Remove volunteer legumes and destroy heavily infected residues."
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
        "Use certified, disease-free seed.",
        "Sow recommended varieties at recommended density.",
        "Avoid excessive nitrogen; apply balanced fertilization.",
        "Monitor fields regularly from flowering onwards."
    ],

    fieldNotes: [
        "Rust often appears first in the densest, most humid parts of the field.",
        "Early detection and fast, targeted action give the best result."
    ],

    references: [
        "Lentil pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "lentil-aphid",
    crop: "Lentil",
    category: "Pest",
    name: "Lentil Aphid",
    scientificName: "Aphis craccivora",

    aliases: [
        "Cowpea aphid",
        "Legume aphid",
        "Dark legume aphid"
    ],

    affectedParts: [
        "Leaves",
        "Shoot tips",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Small dark brown to black aphids cluster on tender shoots and pods.",
        "Leaves curl and yellow under heavy feeding.",
        "Honeydew and sooty mould may coat leaves and pods.",
        "Flowers and young pods may drop or fail to fill.",
        "Growth is stunted in severe outbreaks."
    ],

    fieldIdentification: [
        "Inspect shoot tips and the undersides of young leaves for clusters.",
        "Look for ants attending colonies and for shiny honeydew deposits.",
        "Check flowering and podding stages when damage is most costly."
    ],

    favourableConditions: [
        "Mild, dry weather",
        "Lush vegetative growth",
        "High nitrogen availability",
        "Low natural-enemy activity",
        "Dry spells that concentrate aphids on tender tissue"
    ],

    spread: [
        "Aphids spread by walking and on wind currents as winged adults.",
        "Ants may carry aphids between plants.",
        "Alternate hosts such as weeds and other legumes maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen fertilization",
        "Dense sowing",
        "Mild, dry spells",
        "Absence of natural enemies",
        "Volunteer legumes and grassy weeds nearby"
    ],

    similarProblems: [
        "Leaf miner",
        "Thrips",
        "Viral mosaics without visible aphids",
        "Molybdenum or iron deficiency"
    ],

    management: {
        cultural: [
            "Maintain wide spacing for good airflow.",
            "Remove weed and volunteer legume hosts from field margins.",
            "Avoid excessive nitrogen; use balanced fertilization.",
            "Use timely weeding to reduce reservoir populations."
        ],

        biological: [
            "Conserve ladybird beetles, lacewings and parasitoid wasps.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches rather than treating whole fields unnecessarily."
        ]
    },

    prevention: [
        "Monitor fields weekly from early vegetative growth.",
        "Keep the crop free of dense flush growth by avoiding excess nitrogen.",
        "Conserve natural enemies through selective use of pesticides.",
        "Act early on small colonies before they multiply."
    ],

    fieldNotes: [
        "Aphids are often worse at the podding stage — check then closely.",
        "Ants attending aphids are a clear warning sign of an established colony."
    ],

    references: [
        "Legume aphid management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "lentil-boron-deficiency",
    crop: "Lentil",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Brown heart (in seed crops)"
    ],

    affectedParts: [
        "Growing points",
        "Young leaves",
        "Flowers",
        "Pods",
        "Seed"
    ],

    symptoms: [
        "Growing points die back and young leaves become thickened and brittle.",
        "Leaves may show internal breakdown or cracking.",
        "Flowering and pod set are reduced.",
        "Pods may be deformed and seed filling poor.",
        "Root tips may be damaged, weakening the whole plant."
    ],

    fieldIdentification: [
        "Look for dead or blackened growing points and distorted young leaves.",
        "Check flowering and early pod stages where poor set is visible.",
        "Confirm with a soil or tissue test before applying boron."
    ],

    favourableConditions: [
        "Sandy or highly leached soils",
        "High soil pH",
        "Drought followed by sudden rewetting",
        "Low organic matter",
        "Over-liming"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation across the field."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy, low-organic-matter soils",
        "Over-liming",
        "Drought stress",
        "Continuous cropping without replenishment"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Molybdenum deficiency",
        "Root-knot nematode injury",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Maintain organic matter to improve nutrient retention.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Healthy, biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess — do not over-apply.",
            "Foliar application is often used when soil boron is unavailable."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before sowing.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor flowering and pod set for early warning signs."
    ],

    fieldNotes: [
        "Boron has a narrow range between deficiency and toxicity — always confirm before applying.",
        "Symptoms in legumes often show first at the flowering and podding stage."
    ],

    references: [
        "Legume micronutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// FRENCH BEAN
// =========================================================

{
    id: "french-bean-angular-leaf-spot",
    crop: "French Bean",
    category: "Disease",
    name: "Angular Leaf Spot",
    scientificName: "Phaeoisariopsis griseola",

    aliases: [
        "Angular leaf spot of bean",
        "Angular leaf spot",
        "ALS of bean"
    ],

    affectedParts: [
        "Leaves",
        "Pods"
    ],

    symptoms: [
        "Angular, water-soaked or brown spots develop on leaves, bounded by the veins.",
        "Lesions may show a grey centre with a darker margin.",
        "Spots may coalesce, causing blighting of large leaf areas.",
        "Pods may show small, dark, slightly sunken spots.",
        "Severe defoliation reduces yield and seed quality."
    ],

    fieldIdentification: [
        "Look for sharply angular lesions defined by leaf veins.",
        "Check pods for small dark spots when plants are heavily defoliated.",
        "Compare with bacterial halo blight, which has yellow halos around lesions."
    ],

    favourableConditions: [
        "High humidity",
        "Long periods of leaf wetness",
        "Frequent rainfall or overhead irrigation",
        "Dense crop canopy",
        "Mild temperatures"
    ],

    spread: [
        "Spores spread by splashing rain and wind-driven rain.",
        "Infected crop debris and volunteer plants carry the fungus between seasons.",
        "Contaminated seed can introduce the disease to clean fields."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Continuous bean cultivation",
        "Humid, wet weather",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Bacterial halo blight",
        "Cercospora leaf spot",
        "Common bean rust",
        "Anthracnose"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-host crops.",
            "Avoid overhead irrigation; water at the base of plants.",
            "Remove crop residues and volunteer bean plants."
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
        "Use resistant varieties where suitable.",
        "Sow healthy seed at recommended spacing.",
        "Avoid overhead watering.",
        "Monitor fields regularly and act early."
    ],

    fieldNotes: [
        "Grey specks on angular lesions are a reliable field sign.",
        "Disease often establishes first in the densest, wettest parts of the field."
    ],

    references: [
        "Bean pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "french-bean-bean-fly",
    crop: "French Bean",
    category: "Pest",
    name: "Bean Fly",
    scientificName: "Ophiomyia phaseoli",

    aliases: [
        "Bean stem fly",
        "Bean pod fly",
        "Legume miner fly"
    ],

    affectedParts: [
        "Seedlings",
        "Stems",
        "Roots",
        "Leaves"
    ],

    symptoms: [
        "Seedlings may wilt, yellow or collapse after emergence.",
        "Mines and tunnels are visible in stems and sometimes leaf stalks.",
        "Stems may show cracks or corky areas at the base.",
        "Root growth may be poor in infested seedlings.",
        "In podding crops, larvae may develop inside pods."
    ],

    fieldIdentification: [
        "Pull up a wilting seedling and split the stem — look for mines and larvae.",
        "Look for small black flies hovering near seedlings.",
        "Check stem bases for cracks and corky tissue."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry conditions favour adult activity",
        "Stress-weakened seedlings",
        "Continuous bean cropping",
        "Late or resown crops"
    ],

    spread: [
        "Adult flies fly between fields and from weed hosts.",
        "Larvae develop inside the plant, protecting them from many sprays.",
        "Alternate legume and weed hosts maintain the pest between seasons."
    ],

    riskFactors: [
        "Stressed seedlings",
        "Late or uneven germination",
        "Continuous bean cropping",
        "Dry weather",
        "Weed hosts near fields"
    ],

    similarProblems: [
        "Damping-off",
        "Cutworms",
        "Stem borers",
        "Nitrogen deficiency"
    ],

    management: {
        cultural: [
            "Use healthy seed and ensure rapid, even emergence.",
            "Practice crop rotation with non-legume crops.",
            "Remove weed hosts and volunteer bean plants.",
            "Maintain good seed-to-soil contact and avoid stress at germination."
        ],

        biological: [
            "Conserve parasitoid wasps that attack fly larvae and pupae.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young plants before larvae enter the stem."
        ]
    },

    prevention: [
        "Sow healthy seed at the recommended time.",
        "Keep seedlings vigorous with balanced nutrition and watering.",
        "Rotate crops and control weed hosts.",
        "Monitor emerging seedlings closely in high-risk periods."
    ],

    fieldNotes: [
        "Damage is worst in seedlings — protect the crop from emergence.",
        "Wilting that does not respond to extra watering often indicates stem mining."
    ],

    references: [
        "Bean pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "french-bean-molybdenum-deficiency",
    crop: "French Bean",
    category: "Nutrient Disorder",
    name: "Molybdenum Deficiency",
    scientificName: "",

    aliases: [
        "Molybdenum deficiency",
        "Mo deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points",
        "Fixing nodules"
    ],

    symptoms: [
        "Young leaves become pale, distorted and may show interveinal chlorosis.",
        "Leaf edges may scorch and blades may cup or roll.",
        "Growth is stunted and plants flower and pod poorly.",
        "Nitrogen-fixing nodules function poorly, and nitrogen hunger symptoms may appear.",
        "In severe cases leaves develop whiptail-like distortion."
    ],

    fieldIdentification: [
        "Look for pale, distorted young leaves on plants growing in acid soils.",
        "Check nodules on roots — poor nodulation with pale leaves suggests Mo deficiency.",
        "Confirm with a soil or tissue test before applying molybdenum."
    ],

    favourableConditions: [
        "Acid soils",
        "Highly weathered or leached soils",
        "High iron and aluminium availability",
        "Low soil molybdenum content",
        "Heavy nitrogen without Mo replenishment"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often appears patchily following soil pH and texture variation."
    ],

    riskFactors: [
        "Acid soils",
        "Overly weathered soils",
        "Excess iron or aluminium",
        "Absence of liming history",
        "High cropping intensity without micronutrient replenishment"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Iron deficiency",
        "Manganese deficiency",
        "Viral mosaic"
    ],

    management: {
        cultural: [
            "Correct soil acidity with liming to the recommended range.",
            "Maintain balanced fertilization based on soil tests.",
            "Use organic matter to improve nutrient balance."
        ],

        biological: [
            "Support molybdenum-dependent nitrogen fixation with healthy rhizobia.",
            "Inoculate seed with appropriate rhizobium where suitable."
        ],

        chemical: [
            "Apply sodium or ammonium molybdate only after confirming deficiency by test.",
            "Follow label directions; very small amounts are sufficient.",
            "Seed treatment with Mo is a common corrective route."
        ]
    },

    prevention: [
        "Test acid soils for molybdenum and pH before cropping.",
        "Lime acid soils to the recommended range.",
        "Use balanced fertilization and rhizobium inoculation.",
        "Monitor young plants in high-risk fields."
    ],

    fieldNotes: [
        "Molybdenum deficiency is most likely on acid, weathered soils.",
        "Tiny corrective doses are usually all that is needed — do not over-apply."
    ],

    references: [
        "Legume micronutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// COWPEA
// =========================================================

{
    id: "cowpea-mosaic-virus",
    crop: "Cowpea",
    category: "Disease",
    name: "Cowpea Mosaic Virus",
    scientificName: "Cowpea mosaic virus",

    aliases: [
        "Cowpea mosaic",
        "Severe mosaic of cowpea"
    ],

    affectedParts: [
        "Leaves",
        "Shoots",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Leaves show a mottled light and dark green pattern (mosaic).",
        "Leaves may be distorted, puckered or reduced in size.",
        "Plants are stunted and produce fewer shoots.",
        "Flowering and pod set are reduced.",
        "Seeds may be mottled, small or deformed."
    ],

    fieldIdentification: [
        "Look for mottled, distorted leaves and stunted plants scattered across the field.",
        "Check for aphids on nearby plants — they are the main carriers.",
        "Compare with nutrient deficiency, which usually appears uniformly rather than as patches."
    ],

    favourableConditions: [
        "Presence of aphid vectors",
        "High aphid populations in dry weather",
        "Infected seed used for sowing",
        "Alternate weed and legume hosts nearby",
        "Warm temperatures favourable for aphid multiplication"
    ],

    spread: [
        "Transmitted mainly by aphids feeding on infected then healthy plants.",
        "Can be seed-borne in some cowpea lines.",
        "Spread is rapid when aphid populations build up."
    ],

    riskFactors: [
        "Aphid outbreaks",
        "Infected seed lots",
        "High aphid reproduction in dry weather",
        "Weedy margins hosting aphids",
        "Lack of resistant varieties"
    ],

    similarProblems: [
        "Other mosaic viruses of cowpea",
        "Nutrient deficiencies",
        "Aphid feeding injury",
        "Root rot stunting"
    ],

    management: {
        cultural: [
            "Use certified, virus-free seed.",
            "Remove weed hosts from field margins and bunds.",
            "Rogue out visibly infected plants early where practical.",
            "Use recommended plant spacing and timely sowing."
        ],

        biological: [
            "Conserve natural enemies of aphids (ladybirds, lacewings, parasitoids).",
            "Avoid broad-spectrum insecticides that destroy natural enemies."
        ],

        chemical: [
            "Use only locally registered insecticides to manage aphid vectors when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "There is no curative chemical for the virus itself — protect new plants from vectors."
        ]
    },

    prevention: [
        "Use resistant or tolerant varieties where suitable.",
        "Sow virus-free, certified seed.",
        "Control aphids early in the crop cycle.",
        "Keep the crop and its surroundings free of reservoir hosts."
    ],

    fieldNotes: [
        "Virus spread is unpredictable — protect the stand from day one.",
        "Look for aphids, not just symptoms, when scouting."
    ],

    references: [
        "Cowpea virology literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cowpea-aphid",
    crop: "Cowpea",
    category: "Pest",
    name: "Cowpea Aphid",
    scientificName: "Aphis craccivora",

    aliases: [
        "Dark legume aphid",
        "Legume aphid"
    ],

    affectedParts: [
        "Leaves",
        "Shoot tips",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Black or dark-brown aphids cluster on tender shoots, flowers and pods.",
        "Leaves curl, yellow and may drop prematurely.",
        "Honeydew and sooty mould may coat plant surfaces.",
        "Flowers and pods may drop or fail to develop.",
        "Heavy infestations stunt plants and reduce yield."
    ],

    fieldIdentification: [
        "Inspect shoot tips, undersides of young leaves and pods.",
        "Look for ants and shiny honeydew deposits.",
        "Check dense canopies and field margins first."
    ],

    favourableConditions: [
        "Mild, dry weather",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense plant spacing",
        "Regular dry spells concentrating aphids on tender tissue"
    ],

    spread: [
        "Aphids spread short distances by walking and long distances on air currents.",
        "Winged forms spread viruses to new fields.",
        "Weeds and volunteer legumes act as reservoirs between seasons."
    ],

    riskFactors: [
        "High nitrogen fertilization",
        "Dense canopy",
        "Mild, dry spells",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Thrips",
        "Other aphid species",
        "Virus mosaics without visible aphids",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing for airflow.",
            "Remove weeds and volunteer legumes from margins.",
            "Avoid excessive nitrogen; apply balanced fertilization.",
            "Use timely, clean weeding to reduce reservoirs."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Avoid broad-spectrum insecticides that eliminate natural enemies."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches rather than whole fields where practical."
        ]
    },

    prevention: [
        "Monitor weekly from early growth to podding.",
        "Avoid excess nitrogen and dense sowing.",
        "Keep bunds and margins free of refuges.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Aphid numbers can explode after rain stops and soils dry.",
        "Ants farming aphids signal an established colony."
    ],

    references: [
        "Legume aphid management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cowpea-iron-deficiency",
    crop: "Cowpea",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",

    aliases: [
        "Iron chlorosis",
        "Lime-induced chlorosis",
        "Fe deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Shoot tips"
    ],

    symptoms: [
        "Young leaves turn yellow while veins remain green (interveinal chlorosis).",
        "In severe cases leaves become almost white.",
        "Growth slows and plants flower poorly.",
        "Symptoms often appear on new flush after dry spells or heavy liming."
    ],

    fieldIdentification: [
        "Look for interveinal yellowing on the youngest leaves.",
        "Check high-pH and recently limed fields first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Calcareous or over-limed soils",
        "Wet, cold soils",
        "High phosphorus or manganese availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "Calcareous parent material",
        "High phosphorus fertilization",
        "Poor drainage"
    ],

    similarProblems: [
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Magnesium deficiency",
        "Viral mosaic"
    ],

    management: {
        cultural: [
            "Improve drainage and avoid over-liming.",
            "Maintain organic matter to buffer pH and improve iron availability.",
            "Use soil tests to guide lime and phosphorus decisions."
        ],

        biological: [
            "Healthy, biologically active soils improve micronutrient uptake.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply iron sulphate or chelated iron only after confirming deficiency.",
            "Follow label directions for soil or foliar application.",
            "Correct pH gradually rather than with a single heavy lime dose."
        ]
    },

    prevention: [
        "Test pH and iron availability on calcareous soils.",
        "Avoid excessive phosphorus and liming.",
        "Maintain organic matter and balanced nutrition.",
        "Monitor young growth on high-risk soils."
    ],

    fieldNotes: [
        "Chlorosis often clears quickly with chelated iron where confirmed.",
        "Long-term correction means fixing pH and soil health, not repeated sprays."
    ],

    references: [
        "Legume micronutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// FIELD PEA
// =========================================================

{
    id: "field-pea-downy-mildew",
    crop: "Field Pea",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronospora viciae",

    aliases: [
        "Pea downy mildew",
        "Downy mildew of peas"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Tendrils",
        "Pods"
    ],

    symptoms: [
        "Pale, yellow or chlorotic blotches appear on upper leaf surfaces.",
        "Greyish-purple fuzzy growth develops on the undersides of leaves in humid conditions.",
        "Affected tissue may distort, curl or collapse.",
        "Stems and tendrils may thicken and become distorted.",
        "Pod set and seed filling may be poor in heavily infected crops."
    ],

    fieldIdentification: [
        "Look for grey-purple fuzz on the undersides of spotted leaves in the early morning.",
        "Compare with powdery mildew, which sits on the surface as white powder.",
        "Check dense, humid canopies and low-lying areas first."
    ],

    favourableConditions: [
        "Cool, humid weather",
        "Long periods of leaf wetness",
        "Frequent rainfall or overhead irrigation",
        "Dense canopy",
        "Mild temperatures"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected seed and crop debris carry the fungus between seasons.",
        "Volunteer pea plants and related legumes act as reservoirs."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense sowing",
        "Humid, cool weather",
        "Continuous pea cropping",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Powdery mildew",
        "Ascochyta blight",
        "Botrytis grey mould",
        "Virus mosaic"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-legume crops.",
            "Avoid overhead irrigation; water at the base.",
            "Remove volunteer peas and crop residues."
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
        "Use resistant varieties where suitable.",
        "Sow certified seed at recommended spacing.",
        "Avoid overhead watering.",
        "Monitor fields regularly in cool, wet weather."
    ],

    fieldNotes: [
        "Downy mildew is favoured by cool, wet weather — watch the forecast, not just the crop.",
        "Destroying volunteers between seasons breaks the cycle."
    ],

    references: [
        "Pea pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "field-pea-pea-aphid",
    crop: "Field Pea",
    category: "Pest",
    name: "Pea Aphid",
    scientificName: "Acyrthosiphon pisum",

    aliases: [
        "Green pea aphid",
        "Pea plant louse"
    ],

    affectedParts: [
        "Leaves",
        "Shoot tips",
        "Stems",
        "Pods"
    ],

    symptoms: [
        "Green or pinkish aphids cluster on shoot tips and pods.",
        "Leaves curl and yellow under heavy feeding.",
        "Sooty mould may develop on honeydew deposits.",
        "Flowers and young pods may abort or fail to fill.",
        "Severe infestations reduce yield and seed quality."
    ],

    fieldIdentification: [
        "Inspect shoot tips and pods for clusters of soft-bodied aphids.",
        "Look for shiny honeydew and ants attending colonies.",
        "Check dense canopies in mild weather."
    ],

    favourableConditions: [
        "Mild temperatures",
        "Dry, settled weather",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense plant spacing"
    ],

    spread: [
        "Aphids spread by walking and on wind as winged adults.",
        "Ants transport aphids between plants.",
        "Alternate legume hosts carry populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopy",
        "Mild winters",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Other aphid species",
        "Virus mosaics without aphids",
        "Leaf miner",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer legume hosts.",
            "Avoid excessive nitrogen.",
            "Use timely sowing to escape peak aphid periods where practical."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches rather than the whole field."
        ]
    },

    prevention: [
        "Monitor weekly from early growth through podding.",
        "Keep the crop free of dense flush growth.",
        "Conserve natural enemies.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Pods are the most valuable tissue — scout them hardest at pod set.",
        "Mild winters favour heavy spring aphid pressure."
    ],

    references: [
        "Legume aphid management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "field-pea-sulfur-deficiency",
    crop: "Field Pea",
    category: "Nutrient Disorder",
    name: "Sulfur Deficiency",
    scientificName: "",

    aliases: [
        "Sulphur deficiency",
        "S deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves turn uniformly pale yellow while older leaves stay green.",
        "Growth becomes slow and plants remain spindly.",
        "Flowering and pod set are reduced.",
        "Protein content of seed may decline.",
        "Symptoms differ from nitrogen deficiency, which shows on older leaves first."
    ],

    fieldIdentification: [
        "Compare young and old leaves — S deficiency yellows the young ones first.",
        "Check sandy, low-organic-matter soils and fields with no recent manure.",
        "Confirm with a soil test before applying sulfur."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "Low rainfall or irrigation leaching sulfate",
        "No recent manure or sulfate fertilizer history",
        "High calcium content reducing sulfur availability",
        "Acidic or leached soils"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil texture and organic matter variation."
    ],

    riskFactors: [
        "Sandy soils",
        "Low organic matter",
        "High rainfall leaching",
        "No sulfate fertilizer history",
        "Continuous cereal-fallow sequences"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Iron deficiency",
        "Magnesium deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost to build soil sulfur reserves.",
            "Use soil tests to guide sulfur application.",
            "Include sulfur-containing fertilizers where tests indicate deficiency."
        ],

        biological: [
            "Healthy organic matter turnover releases sulfate slowly.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply sulfate of potash, gypsum or single superphosphate only after confirming deficiency.",
            "Follow label directions and local recommendations.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Soil-test low-organic-matter fields.",
        "Maintain organic matter with manures and residues.",
        "Use balanced fertilization including sulfur where required.",
        "Monitor young plants for early paling."
    ],

    fieldNotes: [
        "S deficiency is increasingly common where sulfate fertilizers are no longer routine.",
        "Young-leaf paling with normal older leaves is the key field clue."
    ],

    references: [
        "Legume sulfur nutrition literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CLUSTER BEAN (GUAR)
// =========================================================

{
    id: "cluster-bean-anthracnose",
    crop: "Cluster Bean",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum capsici",

    aliases: [
        "Cluster bean anthracnose",
        "Guar anthracnose",
        "Anthracnose of guar"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Pods",
        "Seeds"
    ],

    symptoms: [
        "Small, dark, sunken lesions develop on stems, leaves and pods.",
        "Lesions may enlarge into irregular brown spots with concentric rings.",
        "Pods develop dark sunken spots and may rot.",
        "Severely infected seedlings may wilt and die.",
        "Seeds from infected pods may be discoloured and shrivelled."
    ],

    fieldIdentification: [
        "Look for dark, sunken lesions on stems and pods.",
        "Check leaves for round to irregular brown spots with dark borders.",
        "Inspect seedlings after rain for collapses."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Warm temperatures",
        "Dense canopy"
    ],

    spread: [
        "Spores spread by splashing rain and wind-driven rain.",
        "Infected seed introduces the disease to new fields.",
        "Crop debris carries the fungus between seasons."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense sowing",
        "Continuous guar cropping",
        "Infected seed",
        "Humid weather at pod filling"
    ],

    similarProblems: [
        "Leaf spot caused by other fungi",
        "Alternaria blight",
        "Bacterial rot",
        "Cercospora leaf spot"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with cereals or other non-hosts.",
            "Avoid overhead irrigation and excessive plant density.",
            "Remove and destroy infected crop residues."
        ],

        biological: [
            "Use locally recommended biological control products where their effectiveness is established.",
            "Maintain soil and crop health to reduce disease pressure."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Treat seed before sowing where seed-borne infection is suspected."
        ]
    },

    prevention: [
        "Use resistant varieties where suitable.",
        "Sow healthy seed at recommended density.",
        "Avoid overhead watering.",
        "Monitor fields during humid periods and act early."
    ],

    fieldNotes: [
        "Anthracnose is most damaging when it strikes pods near maturity.",
        "Clean seed and rotation are the cheapest and most reliable defences."
    ],

    references: [
        "Guar pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "cluster-bean-guar-midge",
    crop: "Cluster Bean",
    category: "Pest",
    name: "Guar Midge",
    scientificName: "Asphondylia brunnicornis",

    aliases: [
        "Cluster bean midge",
        "Cyamopsis midge",
        "Guar pod midge"
    ],

    affectedParts: [
        "Flower buds",
        "Tender shoots",
        "Pods"
    ],

    symptoms: [
        "Flower buds may fail to open and drop prematurely.",
        "Tender shoot tips may gall or distort.",
        "Small maggots develop inside buds and pods.",
        "Pods may be deformed and poorly filled.",
        "In severe infestations flowering and pod set are heavily reduced."
    ],

    fieldIdentification: [
        "Inspect flower buds and shoot tips for galls and small white maggots.",
        "Look for premature bud and flower drop.",
        "Check pods for distortion and internal larvae."
    ],

    favourableConditions: [
        "Warm, dry weather",
        "Dense guar canopies",
        "Continuous guar cropping",
        "Presence of wild or volunteer guar hosts",
        "Mild winters favouring survival"
    ],

    spread: [
        "Adult midges fly short distances between plants.",
        "Larvae develop inside buds and pods, protected from sprays.",
        "Volunteer and alternate guar hosts maintain the pest between seasons."
    ],

    riskFactors: [
        "Monoculture of guar",
        "Dense sowing",
        "Dry weather at flowering",
        "Weedy margins with guar relatives",
        "Late-sown crops"
    ],

    similarProblems: [
        "Pod borer",
        "Thrips",
        "Rust-induced galling",
        "Leafhopper damage"
    ],

    management: {
        cultural: [
            "Practice crop rotation with non-guar crops.",
            "Remove volunteer guar and weed hosts.",
            "Avoid dense sowing; maintain recommended spacing.",
            "Use timely sowing to escape peak midge periods where practical."
        ],

        biological: [
            "Conserve parasitoid wasps and predatory insects.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Time any application to adult activity, before larvae enter buds and pods."
        ]
    },

    prevention: [
        "Monitor flowering stages closely.",
        "Rotate crops and control volunteer hosts.",
        "Avoid dense canopies.",
        "Act early when adults are first noticed."
    ],

    fieldNotes: [
        "The midge hides inside buds and pods — sprays work only on adults.",
        "Synchronised flowering flushes often escape the worst damage."
    ],

    references: [
        "Guar pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cluster-bean-boron-deficiency",
    crop: "Cluster Bean",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency"
    ],

    affectedParts: [
        "Growing points",
        "Young leaves",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Growing points die back and young leaves thicken and become brittle.",
        "Leaves may distort and show internal cracking.",
        "Flowering and pod set are reduced.",
        "Pods may be deformed with poor seed development.",
        "Root tips may be damaged, weakening plants."
    ],

    fieldIdentification: [
        "Look for blackened growing points and distorted young leaves.",
        "Check flowering and early podding for poor set.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Molybdenum deficiency",
        "Guar midge damage",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Build organic matter to retain boron.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application is common when soil boron is locked up."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before sowing.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor flowering and podding stages."
    ],

    fieldNotes: [
        "Boron has a narrow safety margin — confirm by test before applying.",
        "Guar is often grown on light soils where boron leaches easily."
    ],

    references: [
        "Guar nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// LINSEED (FLAX)
// =========================================================

{
    id: "linseed-alternaria-blight",
    crop: "Linseed",
    category: "Disease",
    name: "Alternaria Blight",
    scientificName: "Alternaria linicola",

    aliases: [
        "Alternaria leaf spot of flax",
        "Linseed blight",
        "Alternaria blight of linseed"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Capsules",
        "Seeds"
    ],

    symptoms: [
        "Small, dark, round to irregular spots develop on leaves.",
        "Spots may develop concentric rings giving a target-like appearance.",
        "Severe spotting causes premature leaf drop.",
        "Stems and capsules may show darkened patches.",
        "Infected seeds may be discoloured and small."
    ],

    fieldIdentification: [
        "Look for dark round spots with concentric rings on leaves.",
        "Check capsules and stems for dark lesions when foliage is badly spotted.",
        "Compare with powdery mildew, which produces white powder rather than dark spots."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Dense crop canopy",
        "Mild temperatures"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected seed and crop debris carry the fungus between seasons.",
        "Alternate hosts and volunteer plants may maintain inoculum."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense sowing",
        "Continuous linseed cropping",
        "Humid weather",
        "Infected seed"
    ],

    similarProblems: [
        "Powdery mildew",
        "Linseed rust",
        "Pasmo disease",
        "Nutrient deficiency spotting"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-host crops.",
            "Avoid overhead irrigation and excessive density.",
            "Destroy infected crop residues."
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
        "Use resistant varieties where suitable.",
        "Sow healthy seed at recommended density.",
        "Avoid overhead watering.",
        "Monitor fields regularly in humid weather."
    ],

    fieldNotes: [
        "Concentric rings in lesions are the most helpful field sign.",
        "Capsule infection directly reduces oilseed yield."
    ],

    references: [
        "Linseed pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "linseed-budfly",
    crop: "Linseed",
    category: "Pest",
    name: "Linseed Budfly",
    scientificName: "Dasineura lini",

    aliases: [
        "Linseed capsule fly",
        "Flax capsuleworm",
        "Linseed gall midge"
    ],

    affectedParts: [
        "Flower buds",
        "Capsules",
        "Seeds"
    ],

    symptoms: [
        "Flower buds may fail to open or fall prematurely.",
        "Capsules may be deformed, swollen or gall-like.",
        "Small white maggots develop inside buds and capsules.",
        "Seed filling is poor in damaged capsules.",
        "In severe infestations pod set and seed yield fall sharply."
    ],

    fieldIdentification: [
        "Inspect flower buds and young capsules for maggots and galls.",
        "Look for premature bud and flower drop.",
        "Check for small dark flies hovering around buds."
    ],

    favourableConditions: [
        "Warm, dry weather",
        "Dry spells during flowering",
        "Dense linseed stands",
        "Presence of volunteer linseed plants",
        "Mild winters favouring survival"
    ],

    spread: [
        "Adult midges fly short distances between plants.",
        "Larvae are protected inside buds and capsules.",
        "Volunteer linseed carries the pest between seasons."
    ],

    riskFactors: [
        "Monoculture of linseed",
        "Late-sown crops",
        "Dense sowing",
        "Dry weather at flowering",
        "Volunteer plants nearby"
    ],

    similarProblems: [
        "Pod borer",
        "Thrips",
        "Alternaria damage",
        "Nutrient stress causing bud drop"
    ],

    management: {
        cultural: [
            "Practice crop rotation with non-linseed crops.",
            "Remove volunteer linseed and weed hosts.",
            "Sow at the recommended time to escape peak midge periods.",
            "Maintain recommended plant spacing."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Time any application to adult activity, before larvae enter buds."
        ]
    },

    prevention: [
        "Monitor flowering stages closely.",
        "Rotate crops and remove volunteers.",
        "Sow on time and avoid dense stands.",
        "Act early when adults appear."
    ],

    fieldNotes: [
        "Midge larvae are hidden inside buds — sprays only affect adults.",
        "Timely sowing is the single most effective avoidance strategy."
    ],

    references: [
        "Linseed pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "linseed-manganese-deficiency",
    crop: "Linseed",
    category: "Nutrient Disorder",
    name: "Manganese Deficiency",
    scientificName: "",

    aliases: [
        "Grey speck",
        "Mn deficiency"
    ],

    affectedParts: [
        "Leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves develop pale, olive or grey-green specks and streaks.",
        "Specks may merge into pale stripes.",
        "Tissue may become necrotic and the leaf may tear.",
        "Growth is restricted and branching is reduced.",
        "In severe cases capsule set and yield decline."
    ],

    fieldIdentification: [
        "Look for pale specks and streaks on young leaves.",
        "Check limed, high-pH fields first.",
        "Confirm with a soil or tissue test before applying manganese."
    ],

    favourableConditions: [
        "High soil pH",
        "Recent heavy liming",
        "Sandy soils",
        "Cold, wet soil conditions",
        "High phosphorus availability"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "Sandy, low-organic-matter soils",
        "High phosphorus fertilization",
        "Low organic matter"
    ],

    similarProblems: [
        "Zinc deficiency",
        "Nitrogen deficiency",
        "Alternaria blight",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; correct pH gradually.",
            "Maintain organic matter.",
            "Use soil tests to guide fertilization."
        ],

        biological: [
            "Healthy soils improve micronutrient availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply manganese sulphate or chelated manganese only after confirming deficiency.",
            "Follow label directions for soil or foliar application.",
            "Stop further liming until pH is within range."
        ]
    },

    prevention: [
        "Soil-test high-risk fields.",
        "Avoid excessive phosphorus and liming.",
        "Maintain organic matter.",
        "Monitor young plants on sandy soils."
    ],

    fieldNotes: [
        "Confirm deficiency by test — foliar sprays are common but so are misdiagnoses.",
        "Response to corrected pH is usually visible within weeks."
    ],

    references: [
        "Linseed nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// SAFFLOWER
// =========================================================

{
    id: "safflower-rust",
    crop: "Safflower",
    category: "Disease",
    name: "Safflower Rust",
    scientificName: "Puccinia carthami",

    aliases: [
        "Rust of safflower"
    ],

    affectedParts: [
        "Leaves",
        "Leaf stalks",
        "Stems",
        "Bracts"
    ],

    symptoms: [
        "Small, round, brown or red-brown pustules develop on leaves.",
        "Pustules burst to release powdery spores.",
        "Leaves may yellow and drop prematurely.",
        "Stems and bracts may show pustules in heavy infections.",
        "Seed filling is reduced in severely affected crops."
    ],

    fieldIdentification: [
        "Rub a pustule — rust-coloured spore dust confirms rust.",
        "Inspect leaf undersides and stems in humid pockets.",
        "Sample several plants, as disease often starts in patches."
    ],

    favourableConditions: [
        "High humidity",
        "Mild temperatures",
        "Dew or rain wetting leaves",
        "Dense canopy",
        "Continuous safflower cropping"
    ],

    spread: [
        "Spores spread within and between fields by wind.",
        "Splashing rain spreads spores locally.",
        "Infected crop debris carries inoculum between seasons."
    ],

    riskFactors: [
        "Dense sowing",
        "Humid weather",
        "Continuous safflower cropping",
        "Volunteer plants",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Alternaria leaf spot",
        "Cercospora leaf spot",
        "Powdery mildew",
        "Nutrient deficiency speckling"
    ],

    management: {
        cultural: [
            "Use resistant varieties where suitable.",
            "Maintain wide spacing and good airflow.",
            "Rotate with non-host crops.",
            "Remove volunteer safflower plants."
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
        "Sow recommended varieties at recommended spacing.",
        "Rotate crops and control volunteers.",
        "Avoid dense sowing; promote airflow.",
        "Monitor fields regularly from bud stage."
    ],

    fieldNotes: [
        "Rust spreads fastest when foliage stays wet overnight.",
        "Early action before pustules erupt gives the best control."
    ],

    references: [
        "Safflower pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "safflower-aphid",
    crop: "Safflower",
    category: "Pest",
    name: "Safflower Aphid",
    scientificName: "Uroleucon compositae",

    aliases: [
        "Safflower thistle aphid",
        "Thistle aphid"
    ],

    affectedParts: [
        "Leaves",
        "Shoot tips",
        "Bracts",
        "Flower heads"
    ],

    symptoms: [
        "Small purple-brown aphids cluster on shoot tips and flower heads.",
        "Leaves may curl and yellow.",
        "Honeydew and sooty mould may appear on plant surfaces.",
        "Flowering and seed set may be reduced.",
        "Severe infestations stunt plants and reduce oil content."
    ],

    fieldIdentification: [
        "Inspect shoot tips and bracts for dense colonies.",
        "Look for shiny honeydew and ants.",
        "Check flower heads at bud and bloom stage."
    ],

    favourableConditions: [
        "Mild weather",
        "Dry spells",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense stands"
    ],

    spread: [
        "Aphids spread by walking short distances and on wind as winged adults.",
        "Ants carry aphids between plants.",
        "Weeds and volunteer safflower maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopy",
        "Mild winters",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Aphids of other species",
        "Rust pustules (confused at first glance)",
        "Nutrient deficiency yellowing",
        "Virus mosaic without visible aphids"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer hosts from margins.",
            "Avoid excessive nitrogen.",
            "Sow at recommended time to escape peak pressure."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biological control products where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches where practical."
        ]
    },

    prevention: [
        "Monitor weekly from seedling to bloom stage.",
        "Keep bunds and margins clean.",
        "Avoid dense, flush growth.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Safflower aphids often colonise flower heads first — check heads closely.",
        "Dry winters followed by mild springs favour heavy build-ups."
    ],

    references: [
        "Safflower pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "safflower-boron-deficiency",
    crop: "Safflower",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Heart rot of safflower (severe cases)"
    ],

    affectedParts: [
        "Growing points",
        "Leaves",
        "Capitula",
        "Seeds"
    ],

    symptoms: [
        "Growing points die back and young leaves thicken and become brittle.",
        "Leaves may distort, crack and show internal browning.",
        "Capitula may be deformed and produce few or no seeds.",
        "Root tips may die, weakening plants.",
        "In severe cases the growing point rots (heart rot)."
    ],

    fieldIdentification: [
        "Look for blackened growing points and distorted young leaves.",
        "Check capitula for poor seed set.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Safflower rust",
        "Aphid damage",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH within range.",
            "Build organic matter to retain boron.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application often corrects confirmed deficiency quickly."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before sowing.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor growing points and capitula."
    ],

    fieldNotes: [
        "Boron deficiency in safflower is strongly linked to poor seed set — check capitula.",
        "Confirm by test; excess boron damages the crop as much as deficiency does."
    ],

    references: [
        "Safflower nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CASTOR
// =========================================================

{
    id: "castor-fusarium-wilt",
    crop: "Castor",
    category: "Disease",
    name: "Castor Wilt",
    scientificName: "Fusarium oxysporum f. sp. ricini",

    aliases: [
        "Fusarium wilt of castor",
        "Wilt of castor"
    ],

    affectedParts: [
        "Roots",
        "Stems",
        "Whole plant"
    ],

    symptoms: [
        "Plants wilt suddenly, often on one side first.",
        "Leaves yellow, roll and dry up while still attached.",
        "Cut stems may show brown discoloration of the vascular tissue.",
        "Stunting and reduced branching occur in surviving plants.",
        "In established crops, scattered plants may die in patches."
    ],

    fieldIdentification: [
        "Cut the main stem of a wilted plant — brown vascular streaking indicates wilt.",
        "Check roots for rotting or reduced branching.",
        "Compare with root knot nematode symptoms, which show galls."
    ],

    favourableConditions: [
        "Warm soils",
        "Dry conditions",
        "Stress-weakened plants",
        "Continuous castor cropping",
        "Poorly drained, compacted soils"
    ],

    spread: [
        "The fungus survives in soil and crop debris for years.",
        "It enters through roots and water-conducting tissue.",
        "Infected seed and contaminated soil tools spread it between fields."
    ],

    riskFactors: [
        "Continuous castor cropping",
        "Drought stress",
        "Poor drainage",
        "High soil pH favoring the fungus",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Root rot (Rhizoctonia, Macrophomina)",
        "Root knot nematode",
        "Dry drought wilt (recovers with water)",
        "Nitrogen deficiency"
    ],

    management: {
        cultural: [
            "Use resistant varieties where suitable.",
            "Practice crop rotation with non-host crops for several years.",
            "Improve drainage and avoid compaction.",
            "Remove and destroy wilted plants."
        ],

        biological: [
            "Use locally recommended biofungicides for seed and soil treatment.",
            "Maintain soil health with organic matter and balanced nutrition."
        ],

        chemical: [
            "Use only locally registered fungicides for seed treatment when chemical control is justified.",
            "Follow the product label for dose and application method.",
            "Fungicides are rarely curative once wilt is established — prioritize prevention."
        ]
    },

    prevention: [
        "Use resistant varieties and certified seed.",
        "Rotate with non-host crops.",
        "Maintain soil health and avoid stress.",
        "Remove wilted plants promptly."
    ],

    fieldNotes: [
        "Wilt is soil-borne and long-lived — prevention beats cure.",
        "Vascular browning on cut stems is the definitive field check."
    ],

    references: [
        "Castor pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "castor-semi-looper",
    crop: "Castor",
    category: "Pest",
    name: "Castor Semi-looper",
    scientificName: "Achaea janata",

    aliases: [
        "Castor slug",
        "Castor looper",
        "Black moth of castor"
    ],

    affectedParts: [
        "Leaves",
        "Young shoots"
    ],

    symptoms: [
        "Caterpillars skeletonise or defoliate leaves, leaving veins intact.",
        "Irregular holes and margin feeding appear on foliage.",
        "Severe defoliation exposes plants to sun scorch and slows growth.",
        "Young shoots may be stripped in heavy outbreaks.",
        "Frass (droppings) accumulates under feeding sites."
    ],

    fieldIdentification: [
        "Look for pale-green to brown caterpillars with humps, feeding on leaf undersides.",
        "Check for semi-looper movement (looping gait).",
        "Inspect plants in the evening when caterpillars feed actively."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Lush, well-fertilized crops",
        "Low natural-enemy activity",
        "Monoculture of castor"
    ],

    spread: [
        "Moths fly in from surrounding vegetation.",
        "Larvae are mobile and spread within the field.",
        "Alternate host plants sustain populations between seasons."
    ],

    riskFactors: [
        "Lack of natural enemies",
        "Dense, lush canopies",
        "Dry weather",
        "Nearby wild hosts",
        "Continuous castor cropping"
    ],

    similarProblems: [
        "Castor semilooper vs. tobacco caterpillar",
        "Armyworm",
        "Loopers of other species",
        "Other defoliators"
    ],

    management: {
        cultural: [
            "Maintain field hygiene and remove weed hosts.",
            "Avoid excessive nitrogen producing lush growth.",
            "Practice mixed or intercropping where suitable.",
            "Destroy old stalks and crop residues."
        ],

        biological: [
            "Conserve parasitoid wasps (Trichogramma, Apanteles) and predatory bugs.",
            "Spray Bacillus thuringiensis products where suitable for caterpillar control."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young caterpillars, which are more susceptible."
        ]
    },

    prevention: [
        "Monitor weekly from early growth.",
        "Conserve natural enemies through selective spraying.",
        "Keep margins free of host weeds.",
        "Act early on small caterpillars."
    ],

    fieldNotes: [
        "Semi-loopers hide under leaves during the day — check leaf undersides.",
        "Natural enemies often keep populations below threshold if not sprayed away."
    ],

    references: [
        "Castor pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "castor-nitrogen-deficiency",
    crop: "Castor",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "Nitrogen deficiency",
        "N deficiency",
        "Hunger"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves turn pale green to yellow, starting at the tip.",
        "Yellowing progresses along the midrib toward the base.",
        "Plants are stunted with fewer and smaller leaves.",
        "Stems may become thin and woody.",
        "In severe cases leaves drop prematurely."
    ],

    fieldIdentification: [
        "Check the oldest leaves first — N deficiency shows there first.",
        "Look for uniform paling rather than interveinal yellowing (iron or magnesium).",
        "Confirm with a soil or tissue test if uncertain."
    ],

    favourableConditions: [
        "Low soil organic matter",
        "Sandy or leached soils",
        "Continuous cropping without manure",
        "Heavy rainfall leaching nitrate",
        "Low biological nitrogen fixation"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often uniform across a field where soil is uniformly poor."
    ],

    riskFactors: [
        "Low organic matter",
        "No manure history",
        "Sandy soils",
        "Continuous monoculture",
        "Heavy rainfall"
    ],

    similarProblems: [
        "Magnesium deficiency",
        "Sulfur deficiency",
        "Iron chlorosis",
        "Moisture stress yellowing"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost before sowing.",
            "Use soil tests to guide nitrogen application.",
            "Include leguminous rotations to fix nitrogen naturally."
        ],

        biological: [
            "Grow legume intercrops or green manures where suitable.",
            "Maintain healthy soil biology."
        ],

        chemical: [
            "Apply nitrogen fertilizer (urea or ammonium sulphate) in split doses as per soil test.",
            "Follow label directions and local recommendations.",
            "Avoid excessive single doses that promote lush, pest-prone growth."
        ]
    },

    prevention: [
        "Build organic matter regularly.",
        "Use soil tests and balanced fertilization.",
        "Rotate with legumes.",
        "Monitor older leaves for early paling."
    ],

    fieldNotes: [
        "Castor responds strongly to nitrogen but lush growth invites pests — keep it balanced.",
        "Split applications outperform single heavy doses."
    ],

    references: [
        "Castor nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// JUTE
// =========================================================

{
    id: "jute-root-rot",
    crop: "Jute",
    category: "Disease",
    name: "Root Rot",
    scientificName: "Macrophomina phaseolina",

    aliases: [
        "Jute root rot",
        "Dry root rot of jute",
        "Ashy stem blight (root phase)"
    ],

    affectedParts: [
        "Roots",
        "Root collar",
        "Basal stem"
    ],

    symptoms: [
        "Plants wilt suddenly, often in patches, especially in dry spells.",
        "Roots become brown, brittle and may rot away.",
        "The stem base may show grey or ashy discoloration.",
        "Small dark fruiting bodies may be visible on dead tissue.",
        "Affected plants die and may be pulled up easily."
    ],

    fieldIdentification: [
        "Pull a wilted plant — if roots are brittle and brown, rot is likely.",
        "Scrape the stem base to check for grey-black discoloration.",
        "Check low, poorly drained patches first."
    ],

    favourableConditions: [
        "Warm soils",
        "Drought followed by rewetting",
        "Poorly drained fields",
        "Continuous jute cropping",
        "Stress-weakened plants"
    ],

    spread: [
        "The fungus survives in soil and crop residues for years.",
        "It attacks through roots and the stem base.",
        "Contaminated soil on tools and footwear spreads it between fields."
    ],

    riskFactors: [
        "Continuous jute cropping",
        "Drought stress",
        "Poor drainage",
        "High temperatures",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Rhizoctonia root rot",
        "Nematode damage",
        "Drought wilt without rot",
        "Cutworm damage at the base"
    ],

    management: {
        cultural: [
            "Practice crop rotation with non-host crops.",
            "Improve drainage and break compaction.",
            "Remove and destroy wilted plants.",
            "Avoid water stress with timely irrigation."
        ],

        biological: [
            "Use locally recommended biofungicides for seed and soil treatment.",
            "Build soil organic matter to suppress root diseases."
        ],

        chemical: [
            "Use only locally registered fungicides for seed treatment when chemical control is justified.",
            "Follow the product label for dose and application method.",
            "Curative sprays are ineffective once roots are rotted — focus on prevention."
        ]
    },

    prevention: [
        "Rotate with cereals or legumes.",
        "Maintain soil health and avoid stress.",
        "Use clean seed and treated seedlings.",
        "Remove infected plants promptly."
    ],

    fieldNotes: [
        "Root rot often follows drought — irrigate to prevent stress where possible.",
        "Ashy discoloration on the stem base is a strong confirmation sign."
    ],

    references: [
        "Jute pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "jute-hairy-caterpillar",
    crop: "Jute",
    category: "Pest",
    name: "Jute Hairy Caterpillar",
    scientificName: "Spilosoma obliqua",

    aliases: [
        "Jute hairy caterpillar",
        "Jute salt-and-pepper caterpillar",
        "Bihar hairy caterpillar"
    ],

    affectedParts: [
        "Leaves",
        "Young shoots"
    ],

    symptoms: [
        "Caterpillars skeletonise or completely defoliate leaves.",
        "Large holes and margin feeding appear on foliage.",
        "Severe defoliation exposes stems and retards growth.",
        "Frass accumulates under feeding areas.",
        "In outbreaks, whole fields may be stripped bare."
    ],

    fieldIdentification: [
        "Look for black caterpillars densely covered in dark and light hairs.",
        "Check leaf undersides and stems in the evening.",
        "Look for egg masses on leaf undersides."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Dense, lush jute stands",
        "Low natural-enemy activity",
        "Nearby wild hosts"
    ],

    spread: [
        "Moths fly in from surrounding vegetation.",
        "Young caterpillars disperse by ballooning on silk threads.",
        "Alternate hosts maintain the pest between seasons."
    ],

    riskFactors: [
        "Nearby wild host vegetation",
        "Lack of natural enemies",
        "Dense canopies",
        "Dry weather",
        "Continuous jute cropping"
    ],

    similarProblems: [
        "Bihar hairy caterpillar on other crops",
        "Armyworm",
        "Other leaf-eating caterpillars",
        "Grasshopper damage"
    ],

    management: {
        cultural: [
            "Keep field margins and bunds free of alternate host weeds.",
            "Maintain field hygiene and remove crop residues.",
            "Avoid dense sowing where practical.",
            "Practice mixed cropping or intercropping where suitable."
        ],

        biological: [
            "Conserve parasitoid wasps and predators (birds, bugs, beetles).",
            "Spray Bacillus thuringiensis products where suitable for caterpillars."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young caterpillars; older ones are harder to kill."
        ]
    },

    prevention: [
        "Monitor weekly from early growth.",
        "Keep bunds and margins free of hosts.",
        "Conserve natural enemies.",
        "Act early when egg masses or young caterpillars are seen."
    ],

    fieldNotes: [
        "Hairy caterpillars should not be handled bare-handed — skin irritation and eye injury can occur.",
        "Outbreaks often follow moth influx after the first monsoon showers."
    ],

    references: [
        "Jute pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "jute-nitrogen-deficiency",
    crop: "Jute",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "Nitrogen deficiency",
        "N deficiency"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves turn pale green to yellow, starting at the leaf tips.",
        "Yellowing progresses along the midrib toward the base.",
        "Plants are stunted and produce thin stems.",
        "Stem length and fibre quality decline.",
        "Severe cases lead to premature leaf drop."
    ],

    fieldIdentification: [
        "Check oldest leaves first — nitrogen shows there first.",
        "Look for uniform pale yellowing rather than spotting.",
        "Confirm with a soil or tissue test if uncertain."
    ],

    favourableConditions: [
        "Low organic matter soils",
        "Sandy or leached soils",
        "Continuous cropping without manure",
        "Heavy rainfall leaching nitrate",
        "No legume in the rotation"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often fairly uniform across a uniformly poor field."
    ],

    riskFactors: [
        "Sandy or low-organic-matter soils",
        "Continuous monoculture",
        "No manure history",
        "Heavy rainfall",
        "Low legume rotation"
    ],

    similarProblems: [
        "Magnesium deficiency",
        "Sulfur deficiency",
        "Moisture stress yellowing",
        "Iron chlorosis"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost before sowing.",
            "Use soil tests to guide nitrogen application.",
            "Include legumes in the rotation to fix nitrogen naturally."
        ],

        biological: [
            "Grow leguminous green manures or intercrops where suitable.",
            "Maintain healthy, biologically active soil."
        ],

        chemical: [
            "Apply nitrogen (urea or ammonium sulphate) in split doses per soil test.",
            "Follow label directions and local recommendations.",
            "Avoid heavy single doses that cause lush, weak growth."
        ]
    },

    prevention: [
        "Build organic matter regularly.",
        "Use soil tests and balanced fertilization.",
        "Rotate with legumes.",
        "Monitor older leaves for early paling."
    ],

    fieldNotes: [
        "Jute's fibre yield depends on vegetative vigour — nitrogen is its key nutrient.",
        "Split applications keep growth steady without excessive lushness."
    ],

    references: [
        "Jute nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// TURMERIC
// =========================================================

{
    id: "turmeric-leaf-blotch",
    crop: "Turmeric",
    category: "Disease",
    name: "Leaf Blotch",
    scientificName: "Taphrina maculans",

    aliases: [
        "Turmeric leaf blotch",
        "Turmeric blotch",
        "Taphrina leaf blotch"
    ],

    affectedParts: [
        "Leaves",
        "Leaf sheaths"
    ],

    symptoms: [
        "Small, round or irregular pale spots appear on leaves.",
        "Spots enlarge into large grey-brown blotches with yellow halos.",
        "Blotches may merge, covering much of the leaf surface.",
        "Severely affected leaves dry up and wither from the tips.",
        "Yield and rhizome size decline in heavily infected crops."
    ],

    fieldIdentification: [
        "Look for large grey-brown blotches with yellow borders on leaves.",
        "Check lower, older leaves first, where the disease often starts.",
        "Compare with leaf spot caused by Colletotrichum (smaller, darker spots)."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Dense canopy",
        "Warm, overcast weather"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected crop debris carries the fungus between seasons.",
        "Contaminated seed rhizomes may introduce the disease."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Continuous turmeric cropping",
        "Humid, wet weather",
        "Infected seed rhizomes"
    ],

    similarProblems: [
        "Turmeric leaf spot (Colletotrichum)",
        "Phyllosticta leaf spot",
        "Bacterial leaf spot",
        "Nutrient deficiency spotting"
    ],

    management: {
        cultural: [
            "Use disease-free seed rhizomes.",
            "Practice crop rotation with non-hosts.",
            "Avoid overhead irrigation; water at the base.",
            "Remove and destroy infected leaves and residues."
        ],

        biological: [
            "Use locally recommended biofungicides for seed and soil treatment.",
            "Maintain soil health with organic matter."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Use certified, disease-free seed rhizomes.",
        "Sow at recommended spacing for airflow.",
        "Avoid overhead watering.",
        "Monitor fields regularly in humid weather."
    ],

    fieldNotes: [
        "Leaf blotch is worst in dense, humid canopies — thinning helps immediately.",
        "Healthy seed rhizomes are the foundation of a disease-free crop."
    ],

    references: [
        "Turmeric pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "turmeric-shoot-borer",
    crop: "Turmeric",
    category: "Pest",
    name: "Shoot Borer",
    scientificName: "Conogethes punctiferalis",

    aliases: [
        "Turmeric shoot borer",
        "Capsule borer",
        "Cardamom shoot borer (same species)"
    ],

    affectedParts: [
        "Shoots",
        "Leaf sheaths",
        "Rhizomes"
    ],

    symptoms: [
        "Young central shoots wilt and dry from the growing point.",
        "Bore holes with frass are visible on shoots and leaf sheaths.",
        "Infested shoots are weak and may not emerge strongly.",
        "Tunnels may extend into rhizomes.",
        "In severe cases most fresh shoots fail to develop."
    ],

    fieldIdentification: [
        "Pull a wilted central shoot — if it comes out easily with frass, suspect shoot borer.",
        "Look for small entry holes with excrement on the sheath.",
        "Check at the whorl (emerging shoots) closely."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Dense canopy providing shelter",
        "Presence of ginger and cardamom nearby (same species)",
        "Continuous cropping of host plants"
    ],

    spread: [
        "Moths fly in from surrounding vegetation.",
        "Larvae bore into shoots and are protected inside the plant.",
        "Alternate ginger and cardamom hosts maintain the pest between seasons."
    ],

    riskFactors: [
        "Nearby ginger or cardamom",
        "Dense canopies",
        "Dry weather",
        "Lack of natural enemies",
        "Continuous cropping"
    ],

    similarProblems: [
        "Rhizome rot wilting",
        "Nematode stunting",
        "Nutrient deficiency",
        "Cutworm feeding"
    ],

    management: {
        cultural: [
            "Maintain field hygiene and remove affected shoots.",
            "Avoid dense planting.",
            "Use light traps to monitor adult moths where suitable.",
            "Rotate with non-host crops."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young larvae before they bore into shoots."
        ]
    },

    prevention: [
        "Monitor weekly from early growth.",
        "Keep margins free of alternate hosts.",
        "Maintain recommended spacing.",
        "Act early when moths or fresh damage are seen."
    ],

    fieldNotes: [
        "Wilted central shoots that pull out easily are the classic sign.",
        "Remove infested shoots promptly to protect the rest of the plant."
    ],

    references: [
        "Turmeric pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "turmeric-zinc-deficiency",
    crop: "Turmeric",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",

    aliases: [
        "Zinc deficiency",
        "Zn deficiency",
        "Little leaf of turmeric"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves become narrow, small and pale (little leaf).",
        "Internodes shorten and plants look stunted and bushy.",
        "Leaves may show interveinal yellowing in severe cases.",
        "Growth is slow and rhizome size is reduced.",
        "In extreme cases the growing point dies back."
    ],

    fieldIdentification: [
        "Look for narrow, pale young leaves and shortened internodes.",
        "Check high-pH or over-limed fields first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Over-liming",
        "Sandy or highly weathered soils",
        "High phosphorus availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "High phosphorus application",
        "Soils low in available zinc",
        "Continuous cropping without replenishment"
    ],

    similarProblems: [
        "Iron deficiency",
        "Nitrogen deficiency",
        "Herbicide injury",
        "Mosaic virus"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Apply farmyard manure to improve zinc availability.",
            "Use soil tests to guide correction."
        ],

        biological: [
            "Organic-matter-rich soils supply zinc and improve uptake.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply zinc sulphate to soil or as a foliar spray only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Test high-pH soils for zinc.",
        "Avoid excessive phosphorus and liming.",
        "Maintain organic matter and balanced nutrition.",
        "Monitor young growth on high-risk soils."
    ],

    fieldNotes: [
        "Little leaf and shortened internodes are the giveaway signs.",
        "Zinc-phosphate antagonism is common — balance both."
    ],

    references: [
        "Turmeric nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// GINGER
// =========================================================

{
    id: "ginger-soft-rot",
    crop: "Ginger",
    category: "Disease",
    name: "Soft Rot",
    scientificName: "Pythium aphanidermatum",

    aliases: [
        "Rhizome rot",
        "Soft rot of ginger",
        "Pythium soft rot"
    ],

    affectedParts: [
        "Rhizomes",
        "Roots",
        "Stem bases"
    ],

    symptoms: [
        "Shoots yellow, wilt and collapse from the base.",
        "Rhizomes become soft, watery and brown, emitting a foul smell.",
        "Roots rot away, so plants lift easily.",
        "Infested clumps die in patches, often following waterlogging.",
        "In lighter cases, growth is stunted and leaves yellow."
    ],

    fieldIdentification: [
        "Pull a wilted clump — if roots and rhizomes are soft and rotten, suspect soft rot.",
        "Check low-lying and waterlogged patches first.",
        "Compare with bacterial wilt, which does not produce the watery, foul-smelling rot."
    ],

    favourableConditions: [
        "Waterlogged or poorly drained soil",
        "Warm, humid weather",
        "Frequent overhead irrigation",
        "Dense planting",
        "Infected seed rhizomes"
    ],

    spread: [
        "Spores spread in water and waterlogged soil.",
        "Infected seed rhizomes introduce the disease.",
        "Contaminated tools and footwear carry soil between fields."
    ],

    riskFactors: [
        "Waterlogging",
        "Poor drainage",
        "Continuous ginger cropping",
        "Infected seed rhizomes",
        "Warm, humid weather"
    ],

    similarProblems: [
        "Bacterial wilt",
        "Fusarium yellows",
        "Rhizome scale",
        "Nematode damage"
    ],

    management: {
        cultural: [
            "Use healthy, disease-free seed rhizomes.",
            "Choose well-drained fields; avoid waterlogging.",
            "Practice crop rotation with non-host crops for at least two years.",
            "Remove and destroy infected clumps."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Build soil health with organic matter and drainage."
        ],

        chemical: [
            "Use only locally registered fungicides for seed treatment and drenching when chemical control is justified.",
            "Follow the product label for dose, timing and application method.",
            "There is no cure for established root rot — prevention is essential."
        ]
    },

    prevention: [
        "Use certified, disease-free seed rhizomes.",
        "Ensure drainage; avoid planting in low-lying fields.",
        "Rotate with non-host crops.",
        "Remove wilted plants and improve drainage at first signs."
    ],

    fieldNotes: [
        "Soft rot spreads fast under waterlogging — fix drainage first.",
        "Foul-smelling soft rhizomes are the diagnostic clue."
    ],

    references: [
        "Ginger pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "ginger-shoot-borer",
    crop: "Ginger",
    category: "Pest",
    name: "Shoot Borer",
    scientificName: "Conogethes punctiferalis",

    aliases: [
        "Ginger shoot borer",
        "Capsule borer",
        "Yellow peach moth (of ginger)"
    ],

    affectedParts: [
        "Shoots",
        "Leaf sheaths",
        "Rhizomes"
    ],

    symptoms: [
        "Central shoots wilt and dry from the growing point.",
        "Entry holes with frass are visible on shoots and sheaths.",
        "Boring may extend into rhizomes.",
        "Affected clumps produce few or weak shoots.",
        "Tunnelled rhizomes may rot later."
    ],

    fieldIdentification: [
        "Pull a wilted central shoot — frass and easy separation indicate borer.",
        "Look for small entry holes on emerging shoots.",
        "Check whorls of the youngest plants closely."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Dense canopies",
        "Nearby turmeric or cardamom (same species)",
        "Continuous host cropping"
    ],

    spread: [
        "Moths fly in from surrounding hosts.",
        "Larvae bore into shoots and are protected inside.",
        "Alternate hosts carry populations between seasons."
    ],

    riskFactors: [
        "Nearby turmeric or cardamom",
        "Dense planting",
        "Dry weather",
        "Lack of natural enemies",
        "Continuous cropping"
    ],

    similarProblems: [
        "Soft rot wilting",
        "Nematode stunting",
        "Nutrient deficiency",
        "Cutworm damage"
    ],

    management: {
        cultural: [
            "Maintain field hygiene; remove affected shoots.",
            "Avoid dense planting.",
            "Use light traps to monitor moths where suitable.",
            "Rotate with non-host crops."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young larvae before they enter shoots."
        ]
    },

    prevention: [
        "Monitor weekly from early growth.",
        "Keep margins free of alternate hosts.",
        "Maintain recommended spacing.",
        "Act early when moths or fresh damage appear."
    ],

    fieldNotes: [
        "Wilted shoots that pull away easily with frass are the key sign.",
        "Same species as turmeric and cardamom shoot borer — manage the whole area."
    ],

    references: [
        "Ginger pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "ginger-iron-deficiency",
    crop: "Ginger",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",

    aliases: [
        "Iron chlorosis",
        "Lime-induced chlorosis",
        "Fe deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves yellow while veins remain green (interveinal chlorosis).",
        "Leaves may become pale or nearly white in severe cases.",
        "Growth slows and plants flower poorly.",
        "Symptoms often follow dry spells or heavy liming.",
        "Root development declines in extreme cases."
    ],

    fieldIdentification: [
        "Look for interveinal paling of the youngest leaves.",
        "Check high-pH and over-limed fields first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Calcareous or over-limed soils",
        "Wet, cold soils",
        "High phosphorus or manganese availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "Calcareous soils",
        "High phosphorus fertilization",
        "Poor drainage"
    ],

    similarProblems: [
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Zinc deficiency",
        "Virus mosaic"
    ],

    management: {
        cultural: [
            "Improve drainage and avoid over-liming.",
            "Maintain organic matter to buffer pH.",
            "Use soil tests to guide lime and phosphorus decisions."
        ],

        biological: [
            "Healthy soils improve micronutrient availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply iron sulphate or chelated iron only after confirming deficiency.",
            "Follow label directions for soil or foliar application.",
            "Correct pH gradually rather than with a single heavy dose."
        ]
    },

    prevention: [
        "Test pH and iron availability on calcareous soils.",
        "Avoid excessive phosphorus and liming.",
        "Maintain organic matter and balanced nutrition.",
        "Monitor young growth on high-risk soils."
    ],

    fieldNotes: [
        "Chlorosis often responds quickly to chelated iron where confirmed.",
        "Long-term correction means fixing pH and soil health."
    ],

    references: [
        "Ginger nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// GARLIC
// =========================================================

{
    id: "garlic-purple-blotch",
    crop: "Garlic",
    category: "Disease",
    name: "Purple Blotch",
    scientificName: "Alternaria porri",

    aliases: [
        "Purple blotch of onion and garlic",
        "Alternaria purple blotch"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Scapes"
    ],

    symptoms: [
        "Small, white or tan spots appear on leaves.",
        "Spots enlarge into large purplish or brown lesions with concentric rings.",
        "Lesions may girdle the leaf, causing it to collapse.",
        "In severe cases foliage blights and dies back from the tip.",
        "Bulbs may be reduced in size and quality."
    ],

    fieldIdentification: [
        "Look for purplish lesions with concentric rings on leaves.",
        "Check oldest leaves first, where blight often starts.",
        "Compare with downy mildew, which produces grey fuzz on leaf undersides."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Overcast weather",
        "Dense canopies"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected crop debris carries the fungus between seasons.",
        "Contaminated sets or seed may introduce the disease."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Continuous allium cropping",
        "Humid weather",
        "Over-fertilized, lush crops"
    ],

    similarProblems: [
        "Downy mildew",
        "White rot",
        "Stemphylium leaf blight",
        "Nitrogen deficiency"
    ],

    management: {
        cultural: [
            "Use healthy seed bulbs or cloves.",
            "Practice crop rotation with non-allium crops.",
            "Avoid overhead irrigation; water at the base.",
            "Remove and destroy infected leaves and residues."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Sow healthy cloves at recommended spacing.",
        "Avoid overhead watering.",
        "Rotate with non-allium crops.",
        "Monitor fields in humid weather and act early."
    ],

    fieldNotes: [
        "Purple rings in lesions are the most reliable field sign.",
        "Older leaves are the early-warning zone — inspect them first."
    ],

    references: [
        "Garlic pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "garlic-thrips",
    crop: "Garlic",
    category: "Pest",
    name: "Thrips",
    scientificName: "Thrips tabaci",

    aliases: [
        "Onion thrips",
        "Garlic thrips",
        "Tobacco thrips"
    ],

    affectedParts: [
        "Leaves",
        "Leaf axils",
        "Bulbs (in storage)"
    ],

    symptoms: [
        "Silvery or bronze streaks and rasped patches appear on leaves.",
        "Leaves may curl, twist or develop brown edges.",
        "Severe feeding reduces photosynthesis and bulb size.",
        "Plants may show stunted, silvery foliage.",
        "Thrips can also spread viral diseases."
    ],

    fieldIdentification: [
        "Tap a leaf over white paper — tiny, dark, slender insects will drop off.",
        "Look for silvery feeding streaks parallel to veins.",
        "Check leaf axils where thrips hide."
    ],

    favourableConditions: [
        "Hot, dry weather",
        "Dry spells with dust",
        "Dense canopies sheltering thrips",
        "Low natural-enemy activity",
        "Continuous allium cropping"
    ],

    spread: [
        "Thrips walk short distances and drift long distances on wind.",
        "They hide in leaf axils and are easily spread on equipment.",
        "Alternate host plants maintain populations between seasons."
    ],

    riskFactors: [
        "Dry, dusty weather",
        "Dense planting",
        "Weedy margins",
        "Continuous alliums",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Mite damage",
        "Zinc deficiency",
        "Fungal leaf blight",
        "Spray injury"
    ],

    management: {
        cultural: [
            "Maintain field hygiene and remove weed hosts.",
            "Avoid dust on leaves; irrigate to reduce dust where practical.",
            "Avoid dense planting; promote airflow.",
            "Rotate with non-allium crops."
        ],

        biological: [
            "Conserve minute pirate bugs and lacewings.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate insecticide groups to reduce resistance risk."
        ]
    },

    prevention: [
        "Monitor weekly by tapping leaves over white paper.",
        "Keep margins weed-free.",
        "Irrigate to limit dusty conditions.",
        "Act early when silvery streaks appear."
    ],

    fieldNotes: [
        "Thrips hide inside leaf axils — open sheaths to find them.",
        "Dry, dusty conditions favour explosive thrips build-up."
    ],

    references: [
        "Garlic pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "garlic-sulfur-deficiency",
    crop: "Garlic",
    category: "Nutrient Disorder",
    name: "Sulfur Deficiency",
    scientificName: "",

    aliases: [
        "Sulphur deficiency",
        "S deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves turn pale yellow while older leaves stay green.",
        "Plants become spindly with slow growth.",
        "Bulb development and clove size decline.",
        "Flavour and aroma compounds may be reduced.",
        "Overall vigour and yield drop."
    ],

    fieldIdentification: [
        "Look for pale young leaves with normal older leaves.",
        "Check sandy, low-organic-matter soils.",
        "Confirm with a soil test before applying sulfur."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "No recent manure or sulfate history",
        "High rainfall leaching sulfate",
        "High calcium content reducing sulfur uptake",
        "Low soil organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil texture and organic matter variation."
    ],

    riskFactors: [
        "Sandy soils",
        "Low organic matter",
        "No sulfate fertilizer history",
        "High rainfall",
        "Continuous intensive cropping"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Iron deficiency",
        "Magnesium deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost.",
            "Use soil tests to guide sulfur application.",
            "Include sulfur-containing fertilizers where indicated."
        ],

        biological: [
            "Organic matter turnover supplies sulfate slowly.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply gypsum or sulfate of potash only after confirming deficiency.",
            "Follow label directions and local recommendations.",
            "Garlic is highly responsive to sulfur — do not overdo it."
        ]
    },

    prevention: [
        "Soil-test low-organic-matter fields.",
        "Maintain organic matter steadily.",
        "Use balanced fertilization including sulfur.",
        "Monitor young leaves for paling."
    ],

    fieldNotes: [
        "Garlic is one of the most sulfur-responsive crops grown.",
        "Sulfur also underpins garlic's pungency and flavour."
    ],

    references: [
        "Garlic nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CORIANDER
// =========================================================

{
    id: "coriander-powdery-mildew",
    crop: "Coriander",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Erysiphe heraclei",

    aliases: [
        "Coriander powdery mildew",
        "Powdery mildew of coriander"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Umbels",
        "Seeds"
    ],

    symptoms: [
        "White, powdery or dusty growth appears on upper leaf surfaces.",
        "Affected leaves yellow, curl and may dry up.",
        "Stems and umbels may show white mildew coating.",
        "Seed sets are reduced and seeds may be shrivelled.",
        "In severe cases the crop loses leaf quality for market."
    ],

    fieldIdentification: [
        "White powder that wipes off with a finger is almost certainly powdery mildew.",
        "Check upper leaf surfaces first.",
        "Compare with downy mildew (grey fuzz beneath leaves)."
    ],

    favourableConditions: [
        "Dry weather with high humidity",
        "Moderate temperatures",
        "Dense canopies",
        "Shaded or poorly ventilated areas",
        "High nitrogen producing soft growth"
    ],

    spread: [
        "Spores spread by wind over short and long distances.",
        "The fungus spreads rapidly in dense canopies.",
        "No overwintering in soil required — it arrives on wind."
    ],

    riskFactors: [
        "Dense sowing",
        "High nitrogen",
        "Dry conditions favouring sporulation",
        "Shaded plots",
        "Continuous cropping"
    ],

    similarProblems: [
        "Downy mildew",
        "Leaf spot",
        "White rust",
        "Dusty soil deposits"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing for airflow.",
            "Avoid excessive nitrogen.",
            "Sow at recommended time to avoid peak pressure.",
            "Remove volunteer plants and weeds."
        ],

        biological: [
            "Use locally recommended biofungicides where their effectiveness is established.",
            "Maintain crop health to reduce disease impact."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Sow recommended varieties at recommended spacing.",
        "Avoid dense, soft growth.",
        "Monitor fields regularly from early growth.",
        "Act early when white powder first appears."
    ],

    fieldNotes: [
        "Powdery mildew often starts as faint white dust on a few plants — scout early.",
        "Unlike most mildews it thrives in dry rather than wet weather."
    ],

    references: [
        "Coriander pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "coriander-aphid",
    crop: "Coriander",
    category: "Pest",
    name: "Coriander Aphid",
    scientificName: "Hyadaphis coriandri",

    aliases: [
        "Carrot-parsley aphid (of coriander)",
        "Coriander aphid"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Umbels"
    ],

    symptoms: [
        "Small green aphids cluster on tender shoots and umbels.",
        "Leaves may curl and yellow.",
        "Honeydew and sooty mould may coat foliage.",
        "Umbels may be distorted and seed set reduced.",
        "Severe infestations stunt plants and reduce seed yield."
    ],

    fieldIdentification: [
        "Inspect shoot tips and umbels for dense colonies.",
        "Look for shiny honeydew and ants.",
        "Check dense canopies in mild weather."
    ],

    favourableConditions: [
        "Mild weather",
        "Dry spells",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense stands"
    ],

    spread: [
        "Aphids walk short distances and fly between plants as winged adults.",
        "Ants carry aphids between plants.",
        "Alternate host plants maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopies",
        "Mild winters",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Other aphid species",
        "Thrips",
        "Virus mosaic without visible aphids",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer hosts.",
            "Avoid excessive nitrogen.",
            "Use timely weeding to reduce reservoirs."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches where practical."
        ]
    },

    prevention: [
        "Monitor weekly from seedling to umbel stage.",
        "Keep margins weed-free.",
        "Avoid dense, flush growth.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Umbels are the high-value tissue — scout them hardest.",
        "Ants attending colonies signal an established infestation."
    ],

    references: [
        "Coriander pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "coriander-nitrogen-deficiency",
    crop: "Coriander",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "Nitrogen deficiency",
        "N deficiency"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves turn pale yellow starting at the tips.",
        "Yellowing progresses along the midrib toward the base.",
        "Plants are stunted with thin, spindly stems.",
        "Foliage yield is reduced.",
        "In severe cases older leaves drop prematurely."
    ],

    fieldIdentification: [
        "Check oldest leaves first — N deficiency shows there first.",
        "Look for uniform pale yellowing rather than spotting.",
        "Compare with sulfur deficiency (yellowing of young leaves first)."
    ],

    favourableConditions: [
        "Low organic matter soils",
        "Sandy or leached soils",
        "Continuous cropping without manure",
        "Heavy rainfall leaching nitrate",
        "No legume in the rotation"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often fairly uniform where soil is uniformly poor."
    ],

    riskFactors: [
        "Sandy soils",
        "Continuous monoculture",
        "No manure history",
        "Heavy rainfall",
        "Low legume rotation"
    ],

    similarProblems: [
        "Sulfur deficiency",
        "Magnesium deficiency",
        "Iron chlorosis",
        "Moisture stress yellowing"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost before sowing.",
            "Use soil tests to guide nitrogen application.",
            "Include legumes in the rotation to fix nitrogen naturally."
        ],

        biological: [
            "Grow leguminous green manures where suitable.",
            "Maintain healthy, biologically active soil."
        ],

        chemical: [
            "Apply urea or ammonium sulphate in split doses per soil test.",
            "Follow label directions and local recommendations.",
            "Avoid heavy single doses that cause lush, pest-prone growth."
        ]
    },

    prevention: [
        "Build organic matter regularly.",
        "Use soil tests and balanced fertilization.",
        "Rotate with legumes.",
        "Monitor older leaves for early paling."
    ],

    fieldNotes: [
        "Coriander is a light feeder but still responds well to moderate nitrogen.",
        "Split applications keep growth steady without excess."
    ],

    references: [
        "Coriander nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CUMIN
// =========================================================

{
    id: "cumin-wilt",
    crop: "Cumin",
    category: "Disease",
    name: "Cumin Wilt",
    scientificName: "Fusarium oxysporum f. sp. cumini",

    aliases: [
        "Wilt of cumin",
        "Fusarium wilt of cumin"
    ],

    affectedParts: [
        "Roots",
        "Stem base",
        "Whole plant"
    ],

    symptoms: [
        "Plants wilt suddenly, often starting from scattered patches.",
        "Leaves yellow, roll and dry up while attached.",
        "Cut stems may show brown discoloration of vascular tissue.",
        "In severe cases the crop fails in wide patches.",
        "Surviving plants remain stunted and produce few umbels."
    ],

    fieldIdentification: [
        "Cut a wilted stem — brown vascular streaking confirms wilt.",
        "Check roots for rotting or reduced branching.",
        "Compare with drought wilt (recovers with irrigation)."
    ],

    favourableConditions: [
        "Warm soils",
        "Dry conditions",
        "Stress-weakened plants",
        "Continuous cumin cropping",
        "Poorly drained fields"
    ],

    spread: [
        "The fungus survives in soil and crop debris for years.",
        "It enters through roots and water-conducting tissue.",
        "Contaminated seed and soil on tools spread it between fields."
    ],

    riskFactors: [
        "Continuous cumin cropping",
        "Drought stress",
        "Poor drainage",
        "High temperatures",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Damping-off",
        "Root rot",
        "Drought wilt",
        "Nematode damage"
    ],

    management: {
        cultural: [
            "Use resistant varieties where suitable.",
            "Practice crop rotation with non-host crops for at least two years.",
            "Improve drainage and avoid compaction.",
            "Remove and destroy wilted plants."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain soil health with organic matter and drainage."
        ],

        chemical: [
            "Use only locally registered fungicides for seed treatment when chemical control is justified.",
            "Follow the product label for dose and application method.",
            "Wilt cannot be cured once established — prevention is essential."
        ]
    },

    prevention: [
        "Use resistant varieties and certified seed.",
        "Rotate with non-host crops.",
        "Maintain soil health and avoid stress.",
        "Remove wilted plants promptly."
    ],

    fieldNotes: [
        "Wilt is soil-borne and long-lived — prevention beats cure.",
        "Vascular browning on cut stems is the definitive field check."
    ],

    references: [
        "Cumin pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "cumin-aphid",
    crop: "Cumin",
    category: "Pest",
    name: "Cumin Aphid",
    scientificName: "Hyadaphis coriandri",

    aliases: [
        "Coriander aphid (also on cumin)",
        "Carrot-parsley aphid"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Umbels"
    ],

    symptoms: [
        "Small green aphids cluster on leaves and umbels.",
        "Leaves may curl and yellow.",
        "Honeydew and sooty mould may coat foliage.",
        "Umbels may be distorted and seed set reduced.",
        "Severe infestations stunt plants and cut seed yield."
    ],

    fieldIdentification: [
        "Inspect shoot tips and umbels for dense colonies.",
        "Look for shiny honeydew and ants.",
        "Check dense canopies in mild weather."
    ],

    favourableConditions: [
        "Mild weather",
        "Dry spells",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense stands"
    ],

    spread: [
        "Aphids walk short distances and fly between plants as winged adults.",
        "Ants carry aphids between plants.",
        "Alternate host plants maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopies",
        "Mild winters",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Thrips",
        "Other aphid species",
        "Virus mosaic without visible aphids",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer hosts.",
            "Avoid excessive nitrogen.",
            "Use timely weeding to reduce reservoirs."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches where practical."
        ]
    },

    prevention: [
        "Monitor weekly from seedling to umbel stage.",
        "Keep margins weed-free.",
        "Avoid dense, flush growth.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Umbels are the high-value tissue — scout them hardest.",
        "Mild, dry winters favour heavy spring build-ups."
    ],

    references: [
        "Cumin pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cumin-iron-deficiency",
    crop: "Cumin",
    category: "Nutrient Disorder",
    name: "Iron Deficiency",
    scientificName: "",

    aliases: [
        "Iron chlorosis",
        "Lime-induced chlorosis",
        "Fe deficiency"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points"
    ],

    symptoms: [
        "Young leaves yellow while veins stay green (interveinal chlorosis).",
        "In severe cases leaves turn nearly white.",
        "Growth slows and plants flower poorly.",
        "Symptoms often follow dry spells or heavy liming."
    ],

    fieldIdentification: [
        "Look for interveinal paling of the youngest leaves.",
        "Check high-pH and over-limed fields first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Calcareous or over-limed soils",
        "Wet, cold soils",
        "High phosphorus or manganese availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "Calcareous soils",
        "High phosphorus fertilization",
        "Poor drainage"
    ],

    similarProblems: [
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Magnesium deficiency",
        "Virus mosaic"
    ],

    management: {
        cultural: [
            "Improve drainage and avoid over-liming.",
            "Maintain organic matter to buffer pH.",
            "Use soil tests to guide lime and phosphorus decisions."
        ],

        biological: [
            "Healthy soils improve micronutrient availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply iron sulphate or chelated iron only after confirming deficiency.",
            "Follow label directions for soil or foliar application.",
            "Correct pH gradually rather than with a single heavy dose."
        ]
    },

    prevention: [
        "Test pH and iron availability on calcareous soils.",
        "Avoid excessive phosphorus and liming.",
        "Maintain organic matter and balanced nutrition.",
        "Monitor young growth on high-risk soils."
    ],

    fieldNotes: [
        "Chlorosis often clears quickly with chelated iron where confirmed.",
        "Long-term correction means fixing pH and soil health."
    ],

    references: [
        "Cumin nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// FENUGREEK (METHI)
// =========================================================

{
    id: "fenugreek-powdery-mildew",
    crop: "Fenugreek",
    category: "Disease",
    name: "Powdery Mildew",
    scientificName: "Erysiphe polygoni",

    aliases: [
        "Powdery mildew of fenugreek",
        "Powdery mildew"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Pods"
    ],

    symptoms: [
        "White, powdery growth appears on upper leaf surfaces.",
        "Leaves yellow, curl and dry up.",
        "Stems and pods may show white mildew coating.",
        "Pod set is reduced and seeds may be shrivelled.",
        "In severe cases most foliage is covered."
    ],

    fieldIdentification: [
        "White powder that wipes off with a finger is almost certainly powdery mildew.",
        "Check upper leaf surfaces first.",
        "Compare with downy mildew (grey fuzz beneath leaves)."
    ],

    favourableConditions: [
        "Dry weather with high humidity",
        "Moderate temperatures",
        "Dense canopies",
        "Shaded or poorly ventilated areas",
        "High nitrogen producing soft growth"
    ],

    spread: [
        "Spores spread by wind over short and long distances.",
        "The fungus spreads rapidly in dense canopies.",
        "No overwintering required — it arrives on wind."
    ],

    riskFactors: [
        "Dense sowing",
        "High nitrogen",
        "Dry conditions favouring sporulation",
        "Shaded plots",
        "Continuous cropping"
    ],

    similarProblems: [
        "Downy mildew",
        "Leaf spot",
        "White rust",
        "Dusty soil deposits"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing for airflow.",
            "Avoid excessive nitrogen.",
            "Sow at recommended time to avoid peak pressure.",
            "Remove volunteer plants and weeds."
        ],

        biological: [
            "Use locally recommended biofungicides where their effectiveness is established.",
            "Maintain crop health to reduce disease impact."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Sow recommended varieties at recommended spacing.",
        "Avoid dense, soft growth.",
        "Monitor fields regularly from early growth.",
        "Act early when white powder first appears."
    ],

    fieldNotes: [
        "Powdery mildew often starts as faint white dust on a few plants.",
        "Unlike most mildews it thrives in dry rather than wet weather."
    ],

    references: [
        "Fenugreek pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "fenugreek-aphid",
    crop: "Fenugreek",
    category: "Pest",
    name: "Fenugreek Aphid",
    scientificName: "Aphis craccivora",

    aliases: [
        "Cowpea aphid (on fenugreek)",
        "Dark legume aphid"
    ],

    affectedParts: [
        "Leaves",
        "Shoot tips",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Small dark aphids cluster on tender shoots, flowers and pods.",
        "Leaves curl and yellow under heavy feeding.",
        "Honeydew and sooty mould may coat foliage.",
        "Flowers may drop and pod set reduced.",
        "Severe infestations stunt plants and reduce seed yield."
    ],

    fieldIdentification: [
        "Inspect shoot tips, young leaves and pods for colonies.",
        "Look for shiny honeydew and ants.",
        "Check dense canopies in mild weather."
    ],

    favourableConditions: [
        "Mild, dry weather",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense plant spacing",
        "Dry spells concentrating aphids on tender tissue"
    ],

    spread: [
        "Aphids walk short distances and fly between plants as winged adults.",
        "Ants carry aphids between plants.",
        "Alternate host plants maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopy",
        "Mild, dry spells",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Thrips",
        "Other aphid species",
        "Virus mosaic without visible aphids",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer hosts.",
            "Avoid excessive nitrogen.",
            "Use timely weeding to reduce reservoirs."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches where practical."
        ]
    },

    prevention: [
        "Monitor weekly from seedling to podding.",
        "Keep margins weed-free.",
        "Avoid dense, flush growth.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Ants attending colonies are a clear sign of heavy infestation.",
        "Mild, dry spells are when fenugreek aphids explode."
    ],

    references: [
        "Fenugreek pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "fenugreek-nitrogen-deficiency",
    crop: "Fenugreek",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "Nitrogen deficiency",
        "N deficiency"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves turn pale green to yellow starting at the tips.",
        "Yellowing progresses along the midrib toward the base.",
        "Plants are stunted with thin stems.",
        "Foliage and seed yield are reduced.",
        "Severe cases lead to premature leaf drop."
    ],

    fieldIdentification: [
        "Check oldest leaves first — N deficiency shows there first.",
        "Look for uniform pale yellowing rather than spotting.",
        "Compare with sulfur deficiency (affects young leaves first)."
    ],

    favourableConditions: [
        "Low organic matter soils",
        "Sandy or leached soils",
        "Continuous cropping without manure",
        "Heavy rainfall leaching nitrate",
        "No legume in the rotation"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often fairly uniform where soil is uniformly poor."
    ],

    riskFactors: [
        "Sandy soils",
        "Continuous monoculture",
        "No manure history",
        "Heavy rainfall",
        "Low legume rotation"
    ],

    similarProblems: [
        "Sulfur deficiency",
        "Magnesium deficiency",
        "Iron chlorosis",
        "Moisture stress yellowing"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost before sowing.",
            "Use soil tests to guide nitrogen application.",
            "Include legumes in the rotation to fix nitrogen naturally."
        ],

        biological: [
            "Grow leguminous green manures where suitable.",
            "Maintain healthy, biologically active soil."
        ],

        chemical: [
            "Apply urea or ammonium sulphate in split doses per soil test.",
            "Follow label directions and local recommendations.",
            "Avoid heavy single doses that cause lush, pest-prone growth."
        ]
    },

    prevention: [
        "Build organic matter regularly.",
        "Use soil tests and balanced fertilization.",
        "Rotate with legumes.",
        "Monitor older leaves for early paling."
    ],

    fieldNotes: [
        "Fenugreek fixes nitrogen well if nodulated — but only strongly after establishment.",
        "Split applications keep growth steady without excess."
    ],

    references: [
        "Fenugreek nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// BRINJAL (EGGPLANT)
// =========================================================

{
    id: "brinjal-bacterial-wilt",
    crop: "Brinjal",
    category: "Disease",
    name: "Bacterial Wilt",
    scientificName: "Ralstonia solanacearum",

    aliases: [
        "Bacterial wilt of eggplant",
        "Brown rot of solanaceous crops",
        "Southern wilt"
    ],

    affectedParts: [
        "Roots",
        "Stem base",
        "Whole plant"
    ],

    symptoms: [
        "Plants wilt suddenly, often on one side first.",
        "Leaves yellow and collapse while still attached.",
        "Cut stems show brown vascular discoloration.",
        "Cut ends may ooze milky bacterial streaming when placed in water.",
        "Severely affected plants die, often in patches."
    ],

    fieldIdentification: [
        "Cut a wilted stem — brown vascular streaking indicates wilt.",
        "Suspend a cut stem in clear water — white milky streams confirm bacterial wilt.",
        "Check low, warm, humid patches first."
    ],

    favourableConditions: [
        "Warm, wet soil",
        "Poorly drained fields",
        "Continuous solanaceous cropping",
        "Soil pH above 7 in some strains",
        "High soil temperature"
    ],

    spread: [
        "The bacterium survives in soil and crop debris for years.",
        "It enters through roots and wounds.",
        "Contaminated tools, footwear and water spread it between fields."
    ],

    riskFactors: [
        "Continuous brinjal, tomato or potato cropping",
        "Warm, wet soils",
        "Poor drainage",
        "Infected seedlings",
        "High soil temperature"
    ],

    similarProblems: [
        "Fusarium wilt",
        "Root rot",
        "Nematode damage",
        "Drought wilt"
    ],

    management: {
        cultural: [
            "Use resistant varieties and healthy seedlings.",
            "Practice crop rotation with non-solanaceous crops for at least two years.",
            "Improve drainage and avoid waterlogging.",
            "Remove and destroy wilted plants."
        ],

        biological: [
            "Use locally recommended biofungicides and bioagents for soil treatment.",
            "Build soil organic matter and microbial balance."
        ],

        chemical: [
            "There is no curative chemical for bacterial wilt — sanitation is the control.",
            "Use only locally registered soil drenches when chemical control is justified.",
            "Follow the product label for dose and application method."
        ]
    },

    prevention: [
        "Use resistant varieties and certified seedlings.",
        "Rotate with non-solanaceous crops.",
        "Improve drainage; avoid low-lying fields.",
        "Remove and bag wilted plants promptly."
    ],

    fieldNotes: [
        "Bacterial streaming in water is the definitive field test.",
        "Seedlings are the usual introduction point — source them carefully."
    ],

    references: [
        "Solanaceous wilt pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "brinjal-shoot-and-fruit-borer",
    crop: "Brinjal",
    category: "Pest",
    name: "Shoot and Fruit Borer",
    scientificName: "Leucinodes orbonalis",

    aliases: [
        "Brinjal shoot and fruit borer",
        "Brinjal fruit borer",
        "Eggplant borer"
    ],

    affectedParts: [
        "Shoots",
        "Fruits"
    ],

    symptoms: [
        "Young shoot tips wilt and dry (dead hearts).",
        "Bore holes with frass are visible on shoots and fruits.",
        "Larvae tunnel inside fruits, ruining them.",
        "Fruits may drop prematurely or be unmarketable.",
        "Infested fruits rot from inside."
    ],

    fieldIdentification: [
        "Pull a wilted shoot tip — if it comes out with frass and a larva, it is borer.",
        "Look for entry holes on young fruits.",
        "Check shoot tips and small fruits closely at every visit."
    ],

    favourableConditions: [
        "Warm, humid weather",
        "Continuous cropping",
        "Unpruned, dense canopies",
        "Lack of natural enemies",
        "All-season host availability"
    ],

    spread: [
        "Adult moths fly in from surrounding vegetation.",
        "Larvae bore into shoots and fruits and are protected inside.",
        "Alternate host plants sustain the pest between crops."
    ],

    riskFactors: [
        "Continuous brinjal cropping",
        "Dense, unpruned canopy",
        "Warm, humid conditions",
        "Lack of natural enemies",
        "Residual field debris"
    ],

    similarProblems: [
        "Aphids causing shoot curling",
        "Damping-off",
        "Fruit rot (fungal)",
        "Nutrient deficiency wilting"
    ],

    management: {
        cultural: [
            "Remove and destroy infested shoots and fruits promptly.",
            "Use light traps to monitor moth populations.",
            "Maintain field hygiene; remove old crop residues.",
            "Avoid dense planting; prune where suitable."
        ],

        biological: [
            "Conserve parasitoid wasps (Trichogramma, Bracon, Eriborus).",
            "Release Trichogramma cards where locally recommended."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young larvae before they bore into shoots and fruits."
        ]
    },

    prevention: [
        "Monitor weekly; remove borer shoots and fruits.",
        "Use light traps for early warning.",
        "Keep the crop and margins clean of hosts.",
        "Act early on young larvae."
    ],

    fieldNotes: [
        "Damage inside fruits is invisible until it is too late — remove affected fruits without fail.",
        "Dead hearts pulled out easily with frass are the classic sign."
    ],

    references: [
        "Brinjal pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "brinjal-calcium-deficiency",
    crop: "Brinjal",
    category: "Nutrient Disorder",
    name: "Calcium Deficiency",
    scientificName: "",

    aliases: [
        "Calcium deficiency",
        "Ca deficiency",
        "Blossom-end rot (in fruit crops)"
    ],

    affectedParts: [
        "Growing points",
        "Young leaves",
        "Fruits"
    ],

    symptoms: [
        "Young leaves become distorted, cupped or hooked at the tips.",
        "Growing points may blacken and die.",
        "Leaf edges may scorch in dry conditions.",
        "Fruits may show sunken, dark lesions at the blossom end.",
        "Growth becomes restricted in severe cases."
    ],

    fieldIdentification: [
        "Look for deformed, hooked young leaves and dead growing tips.",
        "Check fruits for blossom-end darkening.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Acid soils",
        "Over-liming with potassium or ammonium excess",
        "Uneven watering with drought followed by flooding",
        "Low organic matter",
        "High humidity restricting transpiration"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and watering variation."
    ],

    riskFactors: [
        "Acid soils",
        "Irregular watering",
        "High potassium or ammonium fertilization",
        "Low organic matter",
        "High humidity at fruit set"
    ],

    similarProblems: [
        "Blossom-end rot (physiological)",
        "Boron deficiency",
        "Magnesium deficiency",
        "Fungal fruit rot"
    ],

    management: {
        cultural: [
            "Maintain even, regular watering; avoid drought-flood cycles.",
            "Apply farmyard manure to buffer calcium supply.",
            "Use soil tests to guide liming and fertilization."
        ],

        biological: [
            "Healthy soils improve nutrient balance.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply gypsum or foliar calcium only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Avoid excess ammonium or potassium, which compete with calcium."
        ]
    },

    prevention: [
        "Test acid soils for calcium and pH.",
        "Maintain regular irrigation.",
        "Use balanced fertilization.",
        "Monitor young growth and fruit set."
    ],

    fieldNotes: [
        "Fruit calcium moves with transpiration — even watering is as important as feeding.",
        "Blossom-end symptoms can look exactly like a fungal rot — test before spraying."
    ],

    references: [
        "Brinjal nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// OKRA (BHINDI)
// =========================================================

{
    id: "okra-yellow-vein-mosaic-virus",
    crop: "Okra",
    category: "Disease",
    name: "Yellow Vein Mosaic Virus",
    scientificName: "Okra yellow vein mosaic virus (Begomovirus)",

    aliases: [
        "YVMV of okra",
        "Yellow vein mosaic of okra",
        "Okra YVMV"
    ],

    affectedParts: [
        "Leaves",
        "Shoots",
        "Flowers",
        "Pods"
    ],

    symptoms: [
        "Veins turn bright yellow while the rest of the leaf stays green.",
        "Yellow veins may spread to enclose the whole leaf in yellow.",
        "Leaves may become small, thick and brittle.",
        "Plants are stunted and produce few pods.",
        "Pods may be small, deformed and unmarketable."
    ],

    fieldIdentification: [
        "Bright yellow veins are unmistakable — check new growth.",
        "Look for whiteflies on the undersides of leaves.",
        "Compare with iron chlorosis (uniform interveinal yellowing)."
    ],

    favourableConditions: [
        "High whitefly populations",
        "Warm, dry weather",
        "Continuous okra cropping",
        "Weedy margins harbouring whiteflies",
        "Susceptible varieties"
    ],

    spread: [
        "Transmitted by whiteflies (Bemisia tabaci).",
        "Spread is rapid during whitefly build-ups.",
        "Alternate host weeds maintain both virus and vector between seasons."
    ],

    riskFactors: [
        "Whitefly outbreaks",
        "Susceptible varieties",
        "Continuous okra cropping",
        "Warm, dry conditions",
        "Weedy margins"
    ],

    similarProblems: [
        "Iron deficiency",
        "Nitrogen deficiency",
        "Herbicide injury",
        "Other mosaic viruses"
    ],

    management: {
        cultural: [
            "Use resistant varieties where suitable.",
            "Remove weed hosts from field margins.",
            "Rogue out infected plants early.",
            "Use timely sowing to escape peak whitefly pressure."
        ],

        biological: [
            "Conserve whitefly parasitoids and predators.",
            "Use locally recommended biopesticides for whitefly management."
        ],

        chemical: [
            "Use only locally registered insecticides for whitefly control when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "There is no curative chemical for the virus itself — control the vector."
        ]
    },

    prevention: [
        "Use resistant varieties and certified seed.",
        "Control whiteflies from seedling stage.",
        "Keep margins free of host weeds.",
        "Remove infected plants promptly."
    ],

    fieldNotes: [
        "YVMV is the devastating disease of okra — resistances exist; use them.",
        "Whitefly control is the whole battle — scout the undersides of leaves."
    ],

    references: [
        "Okra virology literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "okra-jassid",
    crop: "Okra",
    category: "Pest",
    name: "Jassid",
    scientificName: "Amrasca biguttula biguttula",

    aliases: [
        "Cotton leafhopper",
        "Bhendi jassid",
        "Okra leafhopper"
    ],

    affectedParts: [
        "Leaves"
    ],

    symptoms: [
        "Leaf margins turn yellow or bronze and curl upward.",
        "Affected leaves become thick, brittle and cupped.",
        "Yellowing begins at the leaf tip and margins and spreads.",
        "Severe infestations cause premature leaf drop.",
        "Growth is stunted and pod yield declines."
    ],

    fieldIdentification: [
        "Inspect the undersides of leaves for wedge-shaped green insects.",
        "Look for yellow/bronze leaf edges and upward curling.",
        "Shake leaves over white paper to dislodge adults."
    ],

    favourableConditions: [
        "Hot, dry weather",
        "Dry spells",
        "Dense canopies",
        "Low natural-enemy activity",
        "Continuous cropping of host plants"
    ],

    spread: [
        "Adults fly between plants and migrate on wind.",
        "Alternate host plants maintain populations between seasons.",
        "Both nymphs and adults feed on the underside of leaves."
    ],

    riskFactors: [
        "Hot, dry conditions",
        "Dense planting",
        "Weedy margins",
        "Lack of natural enemies",
        "Continuous okra cropping"
    ],

    similarProblems: [
        "Magnesium deficiency",
        "Herbicide injury",
        "Whitefly feeding",
        "Nutrient deficiency leaf curl"
    ],

    management: {
        cultural: [
            "Maintain field hygiene and remove weed hosts.",
            "Avoid dense sowing.",
            "Use tolerant varieties where available.",
            "Practice crop rotation."
        ],

        biological: [
            "Conserve ladybirds, lacewings, spiders and parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate insecticide groups to reduce resistance risk."
        ]
    },

    prevention: [
        "Monitor weekly; check leaf undersides.",
        "Keep margins weed-free.",
        "Avoid dense canopies.",
        "Act early when yellowing edges appear."
    ],

    fieldNotes: [
        "Leaf edge yellowing and upward curling are the classic jassid signs.",
        "Dry, hot spells favour explosive jassid build-ups."
    ],

    references: [
        "Okra pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "okra-magnesium-deficiency",
    crop: "Okra",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "",

    aliases: [
        "Magnesium deficiency",
        "Mg deficiency",
        "Interveinal chlorosis (Mg)"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves develop interveinal yellowing while veins stay green.",
        "Yellowing starts at the leaf margin and moves inward.",
        "Leaves may develop reddish or bronze tints.",
        "Severe cases show leaf drop and stunted growth.",
        "Pod yield and size decline."
    ],

    fieldIdentification: [
        "Look for interveinal yellowing on the oldest leaves first.",
        "Check sandy soils and fields with high potassium or ammonium.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "High potassium or ammonium availability",
        "Acid soils",
        "Heavy rainfall leaching magnesium",
        "Low magnesium in the parent material"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often appears patchily, following soil texture variation."
    ],

    riskFactors: [
        "Sandy soils",
        "High potassium fertilization",
        "Acid soils",
        "Low organic matter",
        "Continuous cropping without replenishment"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Nitrogen deficiency",
        "Zinc deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost.",
            "Use soil tests to guide magnesium application.",
            "Balance potassium and magnesium in fertilization."
        ],

        biological: [
            "Healthy soils improve nutrient balance.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply dolomite or magnesium sulphate only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Avoid excess potassium competing with magnesium."
        ]
    },

    prevention: [
        "Soil-test low-organic-matter fields.",
        "Maintain balanced fertilization.",
        "Build organic matter regularly.",
        "Monitor older leaves for early interveinal paling."
    ],

    fieldNotes: [
        "Mg deficiency shows on old leaves; iron shows on young leaves — compare leaf age.",
        "Excess potassium is the commonest trigger — keep K and Mg balanced."
    ],

    references: [
        "Okra nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CABBAGE
// =========================================================

{
    id: "cabbage-black-rot",
    crop: "Cabbage",
    category: "Disease",
    name: "Black Rot",
    scientificName: "Xanthomonas campestris pv. campestris",

    aliases: [
        "Black rot of crucifers",
        "Xanthomonas black rot"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Heads"
    ],

    symptoms: [
        "Yellow, V-shaped lesions develop from the leaf margin inward.",
        "Veins within lesions turn black.",
        "Leaves wilt and die back from the margins.",
        "Stem cut surfaces may show blackened vascular rings.",
        "Severe cases destroy the whole head."
    ],

    fieldIdentification: [
        "V-shaped yellow lesions with black veins are unmistakable.",
        "Cut the stem — black vascular rings strongly indicate black rot.",
        "Compare with Alternaria leaf spot (dark, concentric-ring spots)."
    ],

    favourableConditions: [
        "Warm, wet weather",
        "Long periods of leaf wetness",
        "Overhead irrigation",
        "Dense canopy",
        "Infected seed or seedlings"
    ],

    spread: [
        "The bacterium spreads in splashing rain and irrigation water.",
        "Infected seed and seedlings introduce it to new fields.",
        "Crop debris carries the bacterium between seasons."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Infected seed",
        "Continuous crucifer cropping",
        "High humidity",
        "Dense planting"
    ],

    similarProblems: [
        "Alternaria leaf spot",
        "Downy mildew",
        "European peppermint virus",
        "Nutrient deficiency yellowing"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed and seedlings.",
            "Practice crop rotation with non-crucifers for at least two years.",
            "Avoid overhead irrigation; water at the base.",
            "Remove and destroy infected plants and debris."
        ],

        biological: [
            "Use locally recommended bioagents for seed and soil treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered bactericides or fungicides for seed treatment when chemical control is justified.",
            "Follow the product label for dose, timing and application method.",
            "There is no curative spray once plants are infected — prevent entry."
        ]
    },

    prevention: [
        "Use certified, disease-free seed and seedlings.",
        "Rotate with non-crucifers.",
        "Avoid overhead watering.",
        "Remove infected plants promptly."
    ],

    fieldNotes: [
        "Black veins in V-shaped yellow lesions are the classic sign.",
        "Most black rot arrives on seed and seedlings — source them carefully."
    ],

    references: [
        "Crucifer pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "cabbage-diamondback-moth",
    crop: "Cabbage",
    category: "Pest",
    name: "Diamondback Moth",
    scientificName: "Plutella xylostella",

    aliases: [
        "Cabbage moth",
        "Plutella",
        "Crucifer pest"
    ],

    affectedParts: [
        "Leaves",
        "Heads"
    ],

    symptoms: [
        "Small green caterpillars feed on leaf undersides, skeletonising them.",
        "Window-pane feeding leaves papery patches.",
        "Heads may be perforated and unmarketable.",
        "Frass is fine and scattered on leaves.",
        "Heavy infestations can destroy young plants."
    ],

    fieldIdentification: [
        "Look for small, active green caterpillars wriggling violently when disturbed.",
        "Inspect leaf undersides for feeding and fine frass.",
        "Check for tiny, diamond-marked moths resting on leaves."
    ],

    favourableConditions: [
        "Warm, dry weather",
        "Dry spells",
        "Continuous crucifer cropping",
        "Weedy cruciferous margins",
        "Lack of natural enemies"
    ],

    spread: [
        "Adult moths fly long distances between crops.",
        "Larvae are dispersed by wind as ballooning larvae.",
        "Weed hosts maintain populations between seasons."
    ],

    riskFactors: [
        "Continuous crucifer cropping",
        "Weedy margins",
        "Dry weather",
        "Lack of natural enemies",
        "Over-reliance on one insecticide group"
    ],

    similarProblems: [
        "Cabbage butterfly",
        "Beet webworm",
        "Flea beetles",
        "Other leaf-feeding caterpillars"
    ],

    management: {
        cultural: [
            "Remove weed hosts and volunteer crucifers.",
            "Use crop rotation with non-crucifers.",
            "Maintain field hygiene and remove crop residues.",
            "Use light or pheromone traps to monitor moths where suitable."
        ],

        biological: [
            "Conserve parasitoid wasps (Diadegma, Cotesia) and predators.",
            "Spray Bacillus thuringiensis products where suitable for caterpillars."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate insecticide groups to avoid the rapid resistance this pest develops."
        ]
    },

    prevention: [
        "Monitor weekly from transplanting.",
        "Keep margins weed-free.",
        "Conserve natural enemies.",
        "Act early on young larvae."
    ],

    fieldNotes: [
        "Diamondback moth resists many insecticides — rotate modes of action every generation.",
        "It is the single most damaging crucifer pest worldwide."
    ],

    references: [
        "Crucifer pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cabbage-boron-deficiency",
    crop: "Cabbage",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Brown heart"
    ],

    affectedParts: [
        "Growing points",
        "Heads",
        "Roots"
    ],

    symptoms: [
        "Inner leaves of the head may turn brown (brown heart).",
        "Growing points die back and young leaves distort.",
        "Stems may crack and develop internal browning.",
        "Root tips may die, weakening plants.",
        "Heads may be distorted and unmarketable."
    ],

    fieldIdentification: [
        "Split a head — internal browning of young leaves indicates boron deficiency.",
        "Look for blackened growing points.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Molybdenum deficiency",
        "Black rot",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH within range.",
            "Build organic matter to retain boron.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application often corrects confirmed deficiency quickly."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before transplanting.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor heads and growing points."
    ],

    fieldNotes: [
        "Boron deficiency in cabbage shows inside the head long before outside symptoms.",
        "Confirm by test — excess boron is toxic to the crop."
    ],

    references: [
        "Crucifer nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CAULIFLOWER
// =========================================================

{
    id: "cauliflower-downy-mildew",
    crop: "Cauliflower",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronospora parasitica",

    aliases: [
        "Downy mildew of crucifers",
        "Downy mildew of brassicas"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Curds"
    ],

    symptoms: [
        "Pale or yellow blotches appear on upper leaf surfaces.",
        "Grey-purple fuzzy growth develops on leaf undersides in humid conditions.",
        "Lesions may brown and collapse.",
        "Curds may be discoloured and unmarketable in severe cases.",
        "Seedlings may damp off in nursery beds."
    ],

    fieldIdentification: [
        "Look for grey-purple fuzz on the undersides of spotted leaves in the early morning.",
        "Compare with black rot (V-shaped lesions, black veins).",
        "Check dense, humid canopies and low-lying areas first."
    ],

    favourableConditions: [
        "Cool, humid weather",
        "Long periods of leaf wetness",
        "Frequent rainfall or overhead irrigation",
        "Dense canopy",
        "High soil moisture"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected seed and crop debris carry the fungus between seasons.",
        "Volunteer crucifers act as reservoirs."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Cool, wet weather",
        "Continuous crucifer cropping",
        "Infected nursery plants"
    ],

    similarProblems: [
        "Black rot",
        "Alternaria blight",
        "White rust",
        "Powdery mildew"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed and seedlings.",
            "Practice crop rotation with non-crucifers.",
            "Avoid overhead irrigation; water at the base.",
            "Remove volunteer crucifers and crop debris."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Use certified seed and healthy seedlings.",
        "Sow at recommended spacing for airflow.",
        "Avoid overhead watering.",
        "Monitor fields in cool, wet weather and act early."
    ],

    fieldNotes: [
        "Downy mildew thrives in cool, wet conditions — watch the forecast, not just the crop.",
        "Healthy nursery stock is the best insurance against nursery-borne infection."
    ],

    references: [
        "Crucifer pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "cauliflower-cabbage-butterfly",
    crop: "Cauliflower",
    category: "Pest",
    name: "Cabbage Butterfly",
    scientificName: "Pieris brassicae",

    aliases: [
        "Large white butterfly",
        "Large cabbage white"
    ],

    affectedParts: [
        "Leaves",
        "Curds"
    ],

    symptoms: [
        "Caterpillars eat through leaves, often feeding in groups.",
        "Leaves are riddled with holes; only veins remain in severe cases.",
        "Fine frass accumulates on leaves and curds.",
        "Curds are unmarketable if caterpillars are inside them.",
        "Young plants may be completely defoliated."
    ],

    fieldIdentification: [
        "Look for velvety green caterpillars with dark or yellow markings, often clustered.",
        "Inspect leaf undersides for yellow egg masses on the margins.",
        "Check for white butterflies fluttering over the crop in sunshine."
    ],

    favourableConditions: [
        "Warm, sunny weather",
        "Dry spells",
        "Continuous crucifer cropping",
        "Weedy cruciferous margins",
        "Lack of natural enemies"
    ],

    spread: [
        "Adult butterflies fly long distances between crops.",
        "Eggs are laid in batches on leaf undersides.",
        "Alternate host plants sustain populations between seasons."
    ],

    riskFactors: [
        "Continuous crucifer cropping",
        "Weedy margins",
        "Sunny, dry weather",
        "Lack of natural enemies",
        "Unopposed egg-laying"
    ],

    similarProblems: [
        "Diamondback moth",
        "Cabbage aphid",
        "Other leaf-eating caterpillars",
        "Slug feeding"
    ],

    management: {
        cultural: [
            "Remove weed hosts and volunteer crucifers.",
            "Hand-pick egg masses and caterpillars where practical.",
            "Practice crop rotation with non-crucifers.",
            "Maintain field hygiene."
        ],

        biological: [
            "Conserve parasitoid wasps (Apanteles, Cotesia) and predators.",
            "Spray Bacillus thuringiensis products where suitable for caterpillars."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young caterpillars, which are most susceptible."
        ]
    },

    prevention: [
        "Monitor weekly from transplanting.",
        "Keep margins weed-free.",
        "Conserve natural enemies.",
        "Crush egg masses before larvae hatch."
    ],

    fieldNotes: [
        "Yellow egg masses on leaf undersides are the easiest warning sign — pick them off.",
        "Caterpillars feed in groups when young — kill them before they disperse."
    ],

    references: [
        "Crucifer pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "cauliflower-molybdenum-deficiency",
    crop: "Cauliflower",
    category: "Nutrient Disorder",
    name: "Molybdenum Deficiency",
    scientificName: "",

    aliases: [
        "Molybdenum deficiency",
        "Mo deficiency",
        "Whiptail"
    ],

    affectedParts: [
        "Young leaves",
        "Growing points",
        "Leaves (midrib)"
    ],

    symptoms: [
        "Young leaves become narrow, ribbon-like and deformed (whiptail).",
        "Leaf blades may almost disappear, leaving only the midrib.",
        "Growing points may die in severe cases.",
        "Leaves may show pale blotches or scorch.",
        "Curd development is reduced or fails."
    ],

    fieldIdentification: [
        "Whiptail — narrow, deformed young leaves and midribs standing alone — is unmistakable.",
        "Check acid soils and over-weathered soils first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Acid soils",
        "Highly weathered or leached soils",
        "High iron and aluminium availability",
        "Low soil molybdenum content",
        "Continuous crucifer cropping without replenishment"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH variation."
    ],

    riskFactors: [
        "Acid soils",
        "Over-weathered soils",
        "Excess iron or aluminium",
        "No liming history",
        "High cropping intensity without micronutrient replenishment"
    ],

    similarProblems: [
        "Boron deficiency",
        "Nitrogen deficiency",
        "Viral mosaic",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Correct soil acidity with liming to the recommended range.",
            "Use soil tests to guide micronutrient decisions.",
            "Maintain organic matter."
        ],

        biological: [
            "Healthy, biologically active soils improve nutrient availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply sodium or ammonium molybdate only after confirming deficiency.",
            "Follow label directions; very small amounts suffice.",
            "Seed treatment with molybdenum is a common corrective route."
        ]
    },

    prevention: [
        "Test acid soils for molybdenum and pH before transplanting.",
        "Lime acid soils to the recommended range.",
        "Use balanced fertilization.",
        "Monitor young growth in high-risk fields."
    ],

    fieldNotes: [
        "Whiptail is the classic molybdenum-deficiency symptom in cauliflower.",
        "Tiny corrective doses are usually sufficient — do not over-apply."
    ],

    references: [
        "Crucifer micronutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CARROT
// =========================================================

{
    id: "carrot-alternaria-leaf-blight",
    crop: "Carrot",
    category: "Disease",
    name: "Leaf Blight",
    scientificName: "Alternaria dauci",

    aliases: [
        "Alternaria leaf blight",
        "Early blight of carrot"
    ],

    affectedParts: [
        "Leaves",
        "Leaf stalks"
    ],

    symptoms: [
        "Small dark brown or black spots appear on leaflets.",
        "Spots enlarge into irregular lesions with concentric rings.",
        "Lesions may develop yellow halos.",
        "Severe spotting kills foliage and exposes roots to sun scorch.",
        "Roots may remain small and unmarketable."
    ],

    fieldIdentification: [
        "Look for dark spots with yellow halos and concentric rings.",
        "Check oldest leaves first, where blight often starts.",
        "Compare with Sclerotinia or bacterial leaf spot (water-soaked lesions)."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Dense canopies",
        "Overhead irrigation"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected seed and debris carry the fungus between seasons.",
        "Alternate hosts and volunteer carrots maintain inoculum."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Continuous carrot cropping",
        "Humid weather",
        "Infected seed"
    ],

    similarProblems: [
        "Bacterial leaf spot",
        "Cercospora leaf spot",
        "Sclerotinia rot",
        "Nutrient deficiency spotting"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-host crops.",
            "Avoid overhead irrigation; water at the base.",
            "Destroy infected crop debris."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Sow healthy seed at recommended spacing.",
        "Avoid overhead watering.",
        "Rotate with non-host crops.",
        "Monitor fields in humid weather and act early."
    ],

    fieldNotes: [
        "Concentric rings with yellow halos are the reliable field sign.",
        "Destroying infected debris removes next season's inoculum."
    ],

    references: [
        "Carrot pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "carrot-aphid",
    crop: "Carrot",
    category: "Pest",
    name: "Carrot Aphid",
    scientificName: "Cavariella aegopodii",

    aliases: [
        "Willow-carrot aphid",
        "Willow aphid (on carrot)"
    ],

    affectedParts: [
        "Leaves",
        "Leaf stalks",
        "Umbels"
    ],

    symptoms: [
        "Small green aphids cluster on leaves and umbels.",
        "Leaves may curl and yellow.",
        "Honeydew and sooty mould may appear.",
        "Umbels may be distorted and seed production reduced.",
        "Aphids can also carry virus diseases."
    ],

    fieldIdentification: [
        "Inspect leaves and umbels for green aphid colonies.",
        "Look for shiny honeydew and ants.",
        "Check dense canopies in mild weather."
    ],

    favourableConditions: [
        "Mild weather",
        "Dry spells",
        "Lush growth from high nitrogen",
        "Low natural-enemy activity",
        "Dense stands"
    ],

    spread: [
        "Aphids walk short distances and fly between plants as winged adults.",
        "Ants carry aphids between plants.",
        "Alternate hosts (willows, other umbellifers) maintain populations between seasons."
    ],

    riskFactors: [
        "High nitrogen",
        "Dense canopies",
        "Mild winters",
        "Weedy margins",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Other aphid species",
        "Thrips",
        "Virus mosaic without visible aphids",
        "Nutrient deficiencies"
    ],

    management: {
        cultural: [
            "Maintain recommended spacing and balanced fertilization.",
            "Remove weed and volunteer hosts.",
            "Avoid excessive nitrogen.",
            "Use timely weeding to reduce reservoirs."
        ],

        biological: [
            "Conserve ladybirds, lacewings and parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Spot-treat infested patches where practical."
        ]
    },

    prevention: [
        "Monitor weekly from seedling to umbel stage.",
        "Keep margins weed-free.",
        "Avoid dense, flush growth.",
        "Act early on small colonies."
    ],

    fieldNotes: [
        "Carrot aphids alternate between willow trees and umbellifers — both matter.",
        "Ants attending colonies indicate an established infestation."
    ],

    references: [
        "Carrot pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "carrot-boron-deficiency",
    crop: "Carrot",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Brown heart"
    ],

    affectedParts: [
        "Growing points",
        "Roots",
        "Root crowns"
    ],

    symptoms: [
        "Roots may crack or develop grey-brown internal lesions.",
        "Root tips may die, weakening plants.",
        "Growing points die back and young leaves distort.",
        "Roots may be rough, small and unmarketable.",
        "In severe cases the crown cracks and rots."
    ],

    fieldIdentification: [
        "Split a root — internal grey-brown lesions indicate boron deficiency.",
        "Look for cracked roots and dead growing tips.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Alternaria blight",
        "Cavity spot (Pythium)",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH within range.",
            "Build organic matter to retain boron.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application often corrects confirmed deficiency quickly."
        ]
    },

    prevention: [
        "Soil-test high-risk fields before sowing.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor growing points and roots."
    ],

    fieldNotes: [
        "Carrot cracking can also follow irregular watering — test before blaming boron.",
        "Boron excess is toxic — always confirm by test."
    ],

    references: [
        "Carrot nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// SPINACH
// =========================================================

{
    id: "spinach-downy-mildew",
    crop: "Spinach",
    category: "Disease",
    name: "Downy Mildew",
    scientificName: "Peronospora farinosa",

    aliases: [
        "Blue mold of spinach",
        "Downy mildew of spinach"
    ],

    affectedParts: [
        "Leaves"
    ],

    symptoms: [
        "Pale yellow blotches appear on upper leaf surfaces.",
        "Grey-purple fuzzy growth develops on leaf undersides in humid conditions.",
        "Lesions may brown and collapse.",
        "Whole plants may yellow and die in severe cases.",
        "In nursery beds seedlings may damp off."
    ],

    fieldIdentification: [
        "Look for grey-purple fuzz on the undersides of spotted leaves in the early morning.",
        "Check the youngest leaves first in dense canopies.",
        "Compare with white rust (raised white pustules)."
    ],

    favourableConditions: [
        "Cool, humid weather",
        "Long periods of leaf wetness",
        "Frequent rainfall or overhead irrigation",
        "Dense canopy",
        "High soil moisture"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected seed and crop debris carry the fungus between seasons.",
        "Volunteer spinach and related weeds act as reservoirs."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense sowing",
        "Cool, wet weather",
        "Continuous spinach cropping",
        "Infected nursery plants"
    ],

    similarProblems: [
        "White rust",
        "Cercospora leaf spot",
        "Nutrient deficiency yellowing",
        "Virus mosaic"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-host crops.",
            "Avoid overhead irrigation; water at the base.",
            "Remove volunteer spinach and crop debris."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Use certified seed and healthy seedlings.",
        "Sow at recommended spacing for airflow.",
        "Avoid overhead watering.",
        "Monitor fields in cool, wet weather and act early."
    ],

    fieldNotes: [
        "Downy mildew thrives in cool, wet weather — timing of irrigation matters.",
        "Healthy nursery stock is the best insurance."
    ],

    references: [
        "Spinach pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "spinach-leaf-miner",
    crop: "Spinach",
    category: "Pest",
    name: "Leaf Miner",
    scientificName: "Liriomyza spp.",

    aliases: [
        "Vegetable leaf miner",
        "Serpentine leaf miner"
    ],

    affectedParts: [
        "Leaves"
    ],

    symptoms: [
        "Pale, winding or snake-like mines develop inside leaves.",
        "Mines widen as larvae grow.",
        "Severely mined leaves dry and drop.",
        "Feeding and egg-laying cause stippling and white specks.",
        "Heavy infestations ruin leaf quality for market."
    ],

    fieldIdentification: [
        "Hold leaves up to the light — mines are visible as pale trails.",
        "Look for tiny black flies hovering near foliage.",
        "Check leaf undersides for yellow egg-laying stipple marks."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Continuous cropping of host plants",
        "Dense canopies",
        "Lack of natural enemies"
    ],

    spread: [
        "Adult flies fly between plants.",
        "Larvae develop inside leaves, protected from sprays.",
        "Many weed hosts maintain the pest between crops."
    ],

    riskFactors: [
        "Continuous cropping",
        "Weedy margins",
        "Dry weather",
        "Lack of natural enemies",
        "Over-reliance on one insecticide group"
    ],

    similarProblems: [
        "Thrips damage",
        "Downy mildew spotting",
        "Other leaf-feeding insects",
        "Mechanical damage"
    ],

    management: {
        cultural: [
            "Remove weed hosts from field margins.",
            "Use crop rotation with non-hosts.",
            "Maintain field hygiene and remove crop residues.",
            "Use yellow sticky traps to monitor adult flies where suitable."
        ],

        biological: [
            "Conserve parasitoid wasps (Diglyphus, Chrysocharis) and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate insecticide groups to limit the resistance leaf miners rapidly develop."
        ]
    },

    prevention: [
        "Monitor weekly; check leaf undersides and mines.",
        "Keep margins weed-free.",
        "Conserve natural enemies.",
        "Act early on light infestations."
    ],

    fieldNotes: [
        "Mines are hard to kill inside the leaf — act before larvae mature.",
        "Leaf miner resistance develops fast — rotate with biology, not just chemistry."
    ],

    references: [
        "Spinach pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "spinach-nitrogen-deficiency",
    crop: "Spinach",
    category: "Nutrient Disorder",
    name: "Nitrogen Deficiency",
    scientificName: "",

    aliases: [
        "Nitrogen deficiency",
        "N deficiency"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves turn pale green to yellow starting at the tips.",
        "Yellowing progresses along the midrib toward the base.",
        "Plants are stunted and produce thin stems.",
        "Foliage yield is reduced.",
        "Severe cases lead to premature leaf drop."
    ],

    fieldIdentification: [
        "Check oldest leaves first — N deficiency shows there first.",
        "Look for uniform pale yellowing rather than spotting.",
        "Compare with sulfur deficiency (young leaves affected first)."
    ],

    favourableConditions: [
        "Low organic matter soils",
        "Sandy or leached soils",
        "Continuous cropping without manure",
        "Heavy rainfall leaching nitrate",
        "No legume in the rotation"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often fairly uniform where soil is uniformly poor."
    ],

    riskFactors: [
        "Sandy soils",
        "Continuous monoculture",
        "No manure history",
        "Heavy rainfall",
        "Low legume rotation"
    ],

    similarProblems: [
        "Sulfur deficiency",
        "Magnesium deficiency",
        "Iron chlorosis",
        "Moisture stress yellowing"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost before sowing.",
            "Use soil tests to guide nitrogen application.",
            "Include legumes in the rotation to fix nitrogen naturally."
        ],

        biological: [
            "Grow leguminous green manures where suitable.",
            "Maintain healthy, biologically active soil."
        ],

        chemical: [
            "Apply urea or ammonium sulphate in split doses per soil test.",
            "Follow label directions and local recommendations.",
            "Avoid heavy single doses that cause lush, pest-prone growth."
        ]
    },

    prevention: [
        "Build organic matter regularly.",
        "Use soil tests and balanced fertilization.",
        "Rotate with legumes.",
        "Monitor older leaves for early paling."
    ],

    fieldNotes: [
        "Spinach is a heavy feeder — steady nitrogen keeps leaves lush and marketable.",
        "Split applications outperform single doses."
    ],

    references: [
        "Spinach nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// BANANA
// =========================================================

{
    id: "banana-panama-wilt",
    crop: "Banana",
    category: "Disease",
    name: "Panama Wilt",
    scientificName: "Fusarium oxysporum f. sp. cubense",

    aliases: [
        "Fusarium wilt of banana",
        "Panama disease",
        "Banana wilt"
    ],

    affectedParts: [
        "Roots",
        "Rhizome (corm)",
        "Stem base",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves yellow at the margins and progress inward.",
        "Leaves collapse and hang down around the pseudostem.",
        "Cut pseudostem or corm shows brown or reddish vascular discoloration.",
        "Shoots stop producing new leaves; plants dwindle and die.",
        "Infected stools rarely recover."
    ],

    fieldIdentification: [
        "Cut the pseudostem — brown or red vascular streaking indicates Panama wilt.",
        "Check for yellowing of older leaves progressing toward the centre.",
        "Compare with banana bunchy top (severe stunting with narrow erect leaves)."
    ],

    favourableConditions: [
        "Warm soils",
        "Acidic soil conditions in some strains",
        "Poorly drained or stressed plants",
        "Continuous banana monoculture",
        "Contaminated planting material"
    ],

    spread: [
        "The fungus survives in soil for decades.",
        "It enters through roots and spreads through water-conducting tissue.",
        "Infected suckers and contaminated soil tools spread it between fields."
    ],

    riskFactors: [
        "Continuous banana monoculture",
        "Infected planting material",
        "Poor drainage",
        "Acidic soils in susceptible varieties",
        "Warm temperatures"
    ],

    similarProblems: [
        "Banana bunchy top",
        "Moko disease",
        "Root rot",
        "Nematode damage"
    ],

    management: {
        cultural: [
            "Use certified, disease-free suckers or tissue-culture plants.",
            "Avoid moving soil or tools from infected fields without cleaning.",
            "Use resistant varieties where available (the industry standard).",
            "Improve drainage and reduce plant stress."
        ],

        biological: [
            "Use locally recommended biofungicides for soil treatment.",
            "Build soil health with organic matter."
        ],

        chemical: [
            "There is no curative chemical for Panama wilt — prevention is everything.",
            "Use only locally registered soil treatments when chemical control is justified.",
            "Follow the product label for dose and application method."
        ]
    },

    prevention: [
        "Use resistant varieties and certified planting material.",
        "Never move soil or plants from affected fields.",
        "Keep fields well drained and plants stress-free.",
        "Remove and destroy infected stools."
    ],

    fieldNotes: [
        "Panama wilt destroyed the Gros Michel industry — prevention is the only real option.",
        "Vascular browning on cut pseudostems is the definitive field check."
    ],

    references: [
        "Banana pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "banana-weevil-borer",
    crop: "Banana",
    category: "Pest",
    name: "Banana Weevil Borer",
    scientificName: "Cosmopolites sordidus",

    aliases: [
        "Banana rhizome weevil",
        "Banana borer"
    ],

    affectedParts: [
        "Rhizomes (corms)",
        "Stem base",
        "Suckers"
    ],

    symptoms: [
        "Grubs tunnel inside corms and stem bases.",
        "Small holes and frass appear on the stem base.",
        "Plants become weak, yellow and may topple over.",
        "Suckers fail to develop or die.",
        "Severe infestations devastate ratoon crops."
    ],

    fieldIdentification: [
        "Remove soil from the stem base and look for tunnels and grubs.",
        "Check for small holes with frass at the base.",
        "Split a toppled plant — tunnels confirm weevil borer."
    ],

    favourableConditions: [
        "Warm, humid conditions",
        "Old stools and ratoons",
        "Debris left at the base",
        "Poorly drained fields",
        "Continuous banana monoculture"
    ],

    spread: [
        "Adult weevils walk between plants and fly short distances.",
        "Infested planting material spreads the pest between fields.",
        "Debris at the base shelters weevils between crops."
    ],

    riskFactors: [
        "Continuous monoculture",
        "Infected planting material",
        "Accumulated debris",
        "Poor drainage",
        "No trapping or sanitation"
    ],

    similarProblems: [
        "Nematode damage",
        "Root rot",
        "Moko disease",
        "Other weevil species"
    ],

    management: {
        cultural: [
            "Use clean, certified planting material.",
            "Remove and destroy old stools and debris after harvest.",
            "Use pseudostem traps (split stems) to monitor and kill adults.",
            "Maintain field hygiene and rotate where practical."
        ],

        biological: [
            "Conserve parasitic nematodes and predatory beetles.",
            "Use locally recommended entomopathogenic fungi where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Treat the stem base and surrounding soil, where grubs live."
        ]
    },

    prevention: [
        "Use clean planting material.",
        "Destroy old stools promptly.",
        "Trap adults with split pseudostems.",
        "Keep the field free of debris."
    ],

    fieldNotes: [
        "Weevils hide at the base — treat the base, not the leaves.",
        "Pseudostem traps are cheap and effective monitoring tools."
    ],

    references: [
        "Banana pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "banana-potassium-deficiency",
    crop: "Banana",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",

    aliases: [
        "Potassium deficiency",
        "K deficiency",
        "Yellow leaf margins (K)"
    ],

    affectedParts: [
        "Older leaves",
        "Leaf margins",
        "Bunches"
    ],

    symptoms: [
        "Leaf margins and tips turn yellow then brown.",
        "Older leaves are affected first.",
        "Leaf edges may scorch in dry conditions.",
        "Bunches are small and fingers short.",
        "Severe cases show cracked or weak stems."
    ],

    fieldIdentification: [
        "Check the oldest leaves for yellowing or browning margins first.",
        "Look at bunch size and finger length as a yield check.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "High rainfall leaching potassium",
        "Continuous cropping without replenishment",
        "High magnesium or calcium competing with potassium",
        "No manure history"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often appears patchily, following soil texture variation."
    ],

    riskFactors: [
        "Sandy soils",
        "Heavy rainfall",
        "No manure history",
        "Continuous cropping",
        "High calcium or magnesium soils"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Magnesium deficiency",
        "Water stress scorching",
        "Leaf edge burn from salts"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost regularly.",
            "Use soil tests to guide potassium application.",
            "Balance potassium with nitrogen and other nutrients."
        ],

        biological: [
            "Healthy organic matter releases potassium steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply muriate of potash or sulfate of potash per soil test.",
            "Follow label directions and local recommendations.",
            "Split applications suit banana's continuous demand."
        ]
    },

    prevention: [
        "Test soils before planting; banana is a heavy potassium feeder.",
        "Maintain organic matter and balanced fertilization.",
        "Monitor older leaves for margin yellowing.",
        "Replenish potassium after every crop cycle."
    ],

    fieldNotes: [
        "Banana exports potassium to the bunch — replace it every cycle.",
        "Scorch-like margins on old leaves are the giveaway sign."
    ],

    references: [
        "Banana nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// MANGO
// =========================================================

{
    id: "mango-anthracnose",
    crop: "Mango",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum gloeosporioides",

    aliases: [
        "Anthracnose of mango",
        "Mango anthracnose",
        "Black spot of mango"
    ],

    affectedParts: [
        "Leaves",
        "Flowers",
        "Fruits",
        "Twigs"
    ],

    symptoms: [
        "Dark brown or black spots appear on leaves.",
        "Flowers may blacken and drop (blossom blight).",
        "Fruits develop black, sunken lesions, often starting at the tip.",
        "Lesions may merge, rotting the whole fruit.",
        "In humid weather, salmon-pink spore masses appear on lesions."
    ],

    fieldIdentification: [
        "Look for black sunken lesions on young fruits and flowers.",
        "Salmon-pink spore masses on fruit confirm anthracnose.",
        "Compare with powdery mildew (white powder, not black spots)."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf and flower wetness",
        "Warm temperatures",
        "Dense canopy"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected twigs and fallen fruit carry the fungus between seasons.",
        "Fruits can be infected latently and rot after harvest."
    ],

    riskFactors: [
        "Dense, shaded canopy",
        "High humidity",
        "Monoculture orchards",
        "Unpruned trees",
        "Poor orchard sanitation"
    ],

    similarProblems: [
        "Powdery mildew",
        "Bacterial black spot",
        "Scab",
        "Sooty mould"
    ],

    management: {
        cultural: [
            "Prune trees for airflow and light penetration.",
            "Remove and destroy fallen leaves and fruit.",
            "Avoid overhead irrigation; keep foliage dry.",
            "Maintain orchard hygiene."
        ],

        biological: [
            "Use locally recommended biofungicides for flowering protection.",
            "Maintain tree vigour through balanced nutrition."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Time protection around flowering and fruit set; rotate fungicide groups."
        ]
    },

    prevention: [
        "Prune for airflow; avoid dense canopies.",
        "Maintain orchard sanitation.",
        "Protect flowering and fruit set during humid weather.",
        "Monitor trees regularly and act early."
    ],

    fieldNotes: [
        "Anthracnose often attacks flowers — protection at bloom is critical.",
        "Latent infection means fruit can rot after harvest even if it looked clean."
    ],

    references: [
        "Mango pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "mango-hopper",
    crop: "Mango",
    category: "Pest",
    name: "Mango Hopper",
    scientificName: "Amritodus atkinsoni",

    aliases: [
        "Mango jassid",
        "Mango plant hopper",
        "Amritodus"
    ],

    affectedParts: [
        "Leaves",
        "Flower panicles",
        "Young shoots"
    ],

    symptoms: [
        "Hoppers suck sap from tender shoots and flower panicles.",
        "Leaves and shoots become sticky with honeydew.",
        "Sooty mould may blacken the canopy.",
        "Flower panicles may blacken and drop.",
        "Severe infestations cause flower and fruit drop."
    ],

    fieldIdentification: [
        "Look for wedge-shaped brown hoppers on shoots and panicles.",
        "Check for sticky honeydew and black sooty mould.",
        "Inspect panicles closely during flowering."
    ],

    favourableConditions: [
        "Warm, dry weather",
        "Dense canopies",
        "Continuous flush growth",
        "Lack of natural enemies",
        "High tree density"
    ],

    spread: [
        "Adults fly short distances and drift on wind.",
        "Alternate host plants maintain populations between seasons.",
        "Dense orchards sustain high populations."
    ],

    riskFactors: [
        "Dense canopy",
        "Warm, dry weather",
        "Unpruned trees",
        "Lack of natural enemies",
        "Continuous tender flush"
    ],

    similarProblems: [
        "Aphids",
        "Mealybugs",
        "Scale insects",
        "Other hopper species"
    ],

    management: {
        cultural: [
            "Prune trees for airflow and light.",
            "Maintain orchard hygiene and remove alternate hosts.",
            "Avoid excessive nitrogen producing lush flush.",
            "Use light traps to monitor adults where suitable."
        ],

        biological: [
            "Conserve parasitoid wasps (egg parasitoids) and predators.",
            "Spray locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target flowering panicles before heavy infestation."
        ]
    },

    prevention: [
        "Monitor weekly from flush through fruit set.",
        "Prune dense canopies.",
        "Avoid excess nitrogen.",
        "Act early when hoppers appear on panicles."
    ],

    fieldNotes: [
        "Panicle protection at flowering is the highest priority.",
        "Sticky honeydew and sooty mould are the visible fingerprints of hopper attack."
    ],

    references: [
        "Mango pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "mango-zinc-deficiency",
    crop: "Mango",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",

    aliases: [
        "Zinc deficiency",
        "Zn deficiency",
        "Little leaf",
        "Rosetting"
    ],

    affectedParts: [
        "Young leaves",
        "Shoot tips",
        "Flower panicles"
    ],

    symptoms: [
        "Young leaves become narrow, small and pale (little leaf).",
        "Leaves bunch together (rosetting).",
        "Internodes shorten and shoots lose vigour.",
        "Leaves may show interveinal yellowing or mottling.",
        "Flowering and fruit set decline."
    ],

    fieldIdentification: [
        "Look for narrow, bunched young leaves and shortened internodes.",
        "Check leaf colour for interveinal paling.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Over-liming",
        "Sandy or highly weathered soils",
        "High phosphorus availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "High phosphorus application",
        "Soils low in available zinc",
        "No manure history"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Nitrogen deficiency",
        "Manganese deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Apply farmyard manure regularly.",
            "Use soil tests to guide correction."
        ],

        biological: [
            "Organic-matter-rich soils supply zinc steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply zinc sulphate to soil or foliar spray only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Test high-pH soils for zinc.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive phosphorus and liming.",
        "Monitor new flushes on high-risk soils."
    ],

    fieldNotes: [
        "Little leaf and rosetting are the classic mango zinc-deficiency signs.",
        "Zinc and phosphate antagonism is common — balance both."
    ],

    references: [
        "Mango nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// COCONUT
// =========================================================

{
    id: "coconut-root-wilt",
    crop: "Coconut",
    category: "Disease",
    name: "Root Wilt",
    scientificName: "Coconut root wilt phytoplasma",

    aliases: [
        "Root wilt of coconut",
        "Phytoplasma root wilt",
        "Keralan wilt"
    ],

    affectedParts: [
        "Roots",
        "Leaves",
        "Whole tree"
    ],

    symptoms: [
        "Leaves develop a distinctive yellow-green mottling or banding.",
        "Leaflets droop and bunch together, giving a wilted look.",
        "Root system progressively decays.",
        "Nut production drops sharply.",
        "Chronic decline may kill the tree over years."
    ],

    fieldIdentification: [
        "Look for leaf mottling and drooping leaflets with decaying roots.",
        "Compare with potassium deficiency (marginal scorching) and Ganoderma (trunk rot).",
        "Confirm by professional diagnosis where suspected — laboratory testing is used."
    ],

    favourableConditions: [
        "Presence of insect vectors (plant hoppers)",
        "Continuous coconut monoculture",
        "Poor soil health",
        "Lack of root system vigour",
        "Older orchards"
    ],

    spread: [
        "Transmitted by insect vectors (plant hoppers, notably Proutista spp.).",
        "Spreads slowly between palms in an orchard.",
        "No clean cure exists once trees are infected."
    ],

    riskFactors: [
        "Continuous coconut monoculture",
        "Vector abundance",
        "Poor soil health",
        "Older, stressed palms",
        "No integrated management program"
    ],

    similarProblems: [
        "Potassium deficiency",
        "Ganoderma butt rot",
        "Nematode damage",
        "Other phytoplasma diseases"
    ],

    management: {
        cultural: [
            "Improve soil health with organic matter and balanced nutrition.",
            "Remove and destroy severely affected palms.",
            "Maintain orchard hygiene and vector control.",
            "Support affected palms with balanced fertilization and irrigation."
        ],

        biological: [
            "Conserve natural enemies of insect vectors.",
            "Use locally recommended bioagents for soil health where their effectiveness is established."
        ],

        chemical: [
            "There is no curative chemical treatment for root wilt.",
            "Vector control with locally registered insecticides may slow spread.",
            "Follow the product label for dose, timing, safety interval and application method."
        ]
    },

    prevention: [
        "Use resistant or tolerant varieties where available.",
        "Maintain soil health and nutrition.",
        "Remove and destroy severely affected palms.",
        "Control insect vectors."
    ],

    fieldNotes: [
        "Root wilt is managed, not cured — early detection and removal of severe cases limits spread.",
        "Professional diagnosis is essential; do not rely on guesswork."
    ],

    references: [
        "Coconut pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "coconut-rhinoceros-beetle",
    crop: "Coconut",
    category: "Pest",
    name: "Rhinoceros Beetle",
    scientificName: "Oryctes rhinoceros",

    aliases: [
        "Coconut rhinoceros beetle",
        "Oryctes beetle"
    ],

    affectedParts: [
        "Crown of the palm",
        "Spear leaves",
        "Trunk (feeding tunnels)"
    ],

    symptoms: [
        "Adult beetles bore into the crown and cut V-shaped notches in unfolded spear leaves.",
        "Emerging leaves show characteristic triangular or V-shaped cuts.",
        "Frass and tunnels may be visible at the crown.",
        "Feeding weakens the palm and may kill the growing point.",
        "Severe attacks reduce nut yield drastically."
    ],

    fieldIdentification: [
        "V-shaped cuts in newly emerged spear leaves are unmistakable.",
        "Check the crown for frass and bore holes.",
        "Look for adults at night near lights and compost heaps."
    ],

    favourableConditions: [
        "Presence of breeding sites (compost, rotting logs, manure)",
        "Continuous coconut monoculture",
        "Warm, humid weather",
        "No sanitation of breeding sites",
        "Dense plantations"
    ],

    spread: [
        "Adults fly long distances at night to reach palms.",
        "Breeding sites (compost heaps, manure) release new adults each season.",
        "Movement of infested planting material spreads the beetle."
    ],

    riskFactors: [
        "Unsanitised breeding sites",
        "No pheromone trapping",
        "Continuous coconut monoculture",
        "Lack of natural enemies",
        "Old, weakened palms"
    ],

    similarProblems: [
        "Red palm weevil (tunnels lower trunk)",
        "Rhynchophorus palmarum",
        "Other beetles on coconut",
        "Rat damage to spear leaves"
    ],

    management: {
        cultural: [
            "Remove and destroy breeding sites (compost, rotting logs, manure heaps).",
            "Use pheromone traps for mass trapping of adults.",
            "Remove infested palms where damage is severe.",
            "Keep the plantation clean of debris."
        ],

        biological: [
            "Use locally recommended biological agents (Metarhizium, baculoviruses) for breeding-site treatment.",
            "Conserve natural enemies."
        ],

        chemical: [
            "Use only locally registered insecticides for crown treatment when infestation is heavy.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target the crown and breeding sites."
        ]
    },

    prevention: [
        "Remove breeding sites year-round.",
        "Install pheromone traps.",
        "Keep the plantation clean.",
        "Monitor new spear emergence regularly."
    ],

    fieldNotes: [
        "V-shaped leaf cuts appear after the damage is done — prevention is essential.",
        "Breeding-site elimination breaks the cycle at its cheapest point."
    ],

    references: [
        "Coconut pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "coconut-potassium-deficiency",
    crop: "Coconut",
    category: "Nutrient Disorder",
    name: "Potassium Deficiency",
    scientificName: "",

    aliases: [
        "Potassium deficiency",
        "K deficiency",
        "Yellow leaf syndrome"
    ],

    affectedParts: [
        "Older leaves",
        "Leaflets",
        "Nuts"
    ],

    symptoms: [
        "Leaflets develop yellow-orange translucent spots that dry and scorch.",
        "Older leaves are affected first.",
        "Leaflets may dry from the tips and margins.",
        "Nut size and number decline.",
        "In severe cases fronds die back progressively."
    ],

    fieldIdentification: [
        "Look for yellow-orange translucent spotting and scorching on older fronds.",
        "Check nut size and yield records.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "Heavy rainfall leaching potassium",
        "Continuous cropping without replenishment",
        "High magnesium or calcium competing with potassium",
        "No manure history"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil texture variation."
    ],

    riskFactors: [
        "Sandy soils",
        "Heavy rainfall",
        "No manure history",
        "Continuous cropping",
        "High calcium or magnesium soils"
    ],

    similarProblems: [
        "Nitrogen deficiency",
        "Magnesium deficiency",
        "Water stress scorching",
        "Leaf scorch (physiological)"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost regularly.",
            "Use soil tests to guide potassium application.",
            "Mulch and retain organic matter."
        ],

        biological: [
            "Healthy organic matter steadily releases potassium.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply muriate or sulfate of potash per soil test.",
            "Follow label directions and local recommendations.",
            "Split applications suit coconut's continuous demand."
        ]
    },

    prevention: [
        "Test soils before planting; coconut is a heavy potassium feeder.",
        "Maintain organic matter and balanced fertilization.",
        "Monitor older fronds for scorching.",
        "Replenish potassium after every harvest cycle."
    ],

    fieldNotes: [
        "Coconut removes huge potassium in nuts — replace it every cycle.",
        "Scorched leaflet tips and margins are the giveaway signs."
    ],

    references: [
        "Coconut nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// CITRUS (ORANGE / KINNOW)
// =========================================================

{
    id: "citrus-canker",
    crop: "Citrus",
    category: "Disease",
    name: "Citrus Canker",
    scientificName: "Xanthomonas citri pv. citri",

    aliases: [
        "Asiatic citrus canker",
        "Citrus canker"
    ],

    affectedParts: [
        "Leaves",
        "Twigs",
        "Fruits"
    ],

    symptoms: [
        "Raised, corky, crater-like lesions appear on leaves, twigs and fruits.",
        "Lesions are surrounded by yellow halos.",
        "Severe infection causes leaf fall, twig dieback and fruit drop.",
        "Fruits develop scabby lesions and are unmarketable.",
        "In wet weather lesions may ooze bacterial streaming."
    ],

    fieldIdentification: [
        "Raised corky crater lesions with yellow halos are unmistakable.",
        "Compare with melanose (small dark spots without raised craters).",
        "Check leaf undersides and twigs in humid flushes."
    ],

    favourableConditions: [
        "Warm, wet weather",
        "Long periods of leaf wetness",
        "Overhead irrigation",
        "Dense canopy",
        "Continuous citrus cropping"
    ],

    spread: [
        "Bacteria spread in splashing rain and wind-driven rain.",
        "Contaminated tools, footwear and machinery carry them between trees.",
        "Infected nursery stock introduces canker to new orchards."
    ],

    riskFactors: [
        "Infected nursery stock",
        "Overhead irrigation",
        "Dense canopy",
        "High humidity",
        "Lack of windbreaks (wind drives splash)"
    ],

    similarProblems: [
        "Melanose",
        "Alternaria brown spot",
        "Greasy spot",
        "Nutrient deficiency spotting"
    ],

    management: {
        cultural: [
            "Use certified, disease-free nursery stock.",
            "Practice strict orchard sanitation; prune and destroy infected wood.",
            "Avoid overhead irrigation; keep foliage dry.",
            "Remove alternate host weeds and infected fallen leaves."
        ],

        biological: [
            "There is no established biological control for canker — sanitation is the control.",
            "Maintain tree vigour through balanced nutrition."
        ],

        chemical: [
            "Use only locally registered copper-based bactericides where chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Protect new flushes; there is no cure for established canker."
        ]
    },

    prevention: [
        "Use certified, disease-free nursery stock.",
        "Avoid overhead watering.",
        "Prune for airflow and remove infected wood.",
        "Monitor new flushes and act early."
    ],

    fieldNotes: [
        "Canker is quarantine-relevant in many places — certification matters.",
        "Copper protection of new flushes is the standard preventive programme."
    ],

    references: [
        "Citrus pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "citrus-psylla",
    crop: "Citrus",
    category: "Pest",
    name: "Citrus Psylla",
    scientificName: "Diaphorina citri",

    aliases: [
        "Asian citrus psyllid",
        "Citrus psyllid"
    ],

    affectedParts: [
        "Young shoots",
        "Flush leaves",
        "Young branches"
    ],

    symptoms: [
        "Sap feeding deforms and crinkles new flush leaves.",
        "Leaves may show mottling and yellowing.",
        "Honeydew and sooty mould may appear.",
        "More critically, the psylla transmits Huanglongbing (citrus greening).",
        "Severe infestations weaken young trees."
    ],

    fieldIdentification: [
        "Look for tiny brown, jumping psyllas on new flush with their head tilted up.",
        "Check flush leaves for twisting and white waxy nymphs.",
        "Look for ants tending psylla nymphs on new growth."
    ],

    favourableConditions: [
        "Warm temperatures",
        "Continuous tender flush",
        "Dense canopies",
        "Lack of natural enemies",
        "Huanglongbing presence in the region"
    ],

    spread: [
        "Psyllas fly between trees and on wind currents.",
        "The psylla transmits Huanglongbing (HLB) bacteria between trees.",
        "Alternate citrus and curry-leaf hosts maintain populations."
    ],

    riskFactors: [
        "Continuous tender flush",
        "Lack of natural enemies",
        "HLB presence nearby",
        "Dense orchards",
        "Unchecked nursery movement"
    ],

    similarProblems: [
        "Aphids",
        "Whiteflies",
        "Leaf miners",
        "Mealybugs"
    ],

    management: {
        cultural: [
            "Maintain orchard hygiene and remove alternate hosts.",
            "Use certified, psyllid-free nursery stock.",
            "Prune to open the canopy.",
            "Use yellow sticky traps to monitor adults where suitable."
        ],

        biological: [
            "Conserve Tamarixia radiata and other parasitoid wasps.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young flush before psylla populations explode."
        ]
    },

    prevention: [
        "Use certified nursery stock.",
        "Monitor flush weekly.",
        "Conserve natural enemies.",
        "Remove alternate hosts near orchards."
    ],

    fieldNotes: [
        "The psylla is the vector of Huanglongbing — controlling it is non-negotiable.",
        "Flush protection is the single priority — shoot at the flush, not the tree."
    ],

    references: [
        "Citrus pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "citrus-zinc-deficiency",
    crop: "Citrus",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",

    aliases: [
        "Zinc deficiency",
        "Zn deficiency",
        "Little leaf",
        "Mottle leaf"
    ],

    affectedParts: [
        "Young leaves",
        "Shoot tips",
        "Fruits"
    ],

    symptoms: [
        "Young leaves become narrow, small and mottled (little leaf, mottle leaf).",
        "Interveinal chlorosis appears in intermittent bands.",
        "Leaves bunch together (rosetting).",
        "Internodes shorten and shoots lose vigour.",
        "Fruits may be small and unmarketable."
    ],

    fieldIdentification: [
        "Look for narrow, mottled young leaves with bands of chlorosis.",
        "Check shoot tips for rosetting and shortened internodes.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Over-liming",
        "Sandy or highly weathered soils",
        "High phosphorus availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "High phosphorus application",
        "Soils low in available zinc",
        "No manure history"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Apply farmyard manure regularly.",
            "Use soil tests to guide correction."
        ],

        biological: [
            "Organic-matter-rich soils supply zinc steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply zinc sulphate to soil or foliar spray only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Test high-pH soils for zinc.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive phosphorus and liming.",
        "Monitor new flushes on high-risk soils."
    ],

    fieldNotes: [
        "Mottle leaf with banding chlorosis is the classic citrus zinc-deficiency sign.",
        "Zinc-phosphate antagonism is common — balance both."
    ],

    references: [
        "Citrus nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// APPLE
// =========================================================

{
    id: "apple-scab",
    crop: "Apple",
    category: "Disease",
    name: "Apple Scab",
    scientificName: "Venturia inaequalis",

    aliases: [
        "Scab of apple",
        "Apple scab"
    ],

    affectedParts: [
        "Leaves",
        "Fruits",
        "Young shoots",
        "Flower buds"
    ],

    symptoms: [
        "Olive-green to black velvety spots appear on upper leaf surfaces.",
        "Spots may merge and cause leaf curling or premature leaf drop.",
        "Fruits develop dark, corky, scabby lesions.",
        "Fruits may crack and be unmarketable.",
        "Young shoots may blacken and distort."
    ],

    fieldIdentification: [
        "Velvety olive-black spots on leaves and corky scab lesions on fruit are the key signs.",
        "Check young fruit and new leaves first.",
        "Compare with powdery mildew (white powder, not velvety dark spots)."
    ],

    favourableConditions: [
        "Cool, wet weather",
        "Frequent rainfall or prolonged leaf wetness",
        "Dense canopies",
        "High humidity",
        "Overcast springs"
    ],

    spread: [
        "The fungus overwinters in fallen leaves.",
        "Spring spores spread by wind and rain splash to new leaves.",
        "Secondary spread accelerates in wet summers."
    ],

    riskFactors: [
        "Continuous apple monoculture",
        "Wet springs",
        "Dense canopies",
        "Poor orchard sanitation",
        "Susceptible varieties"
    ],

    similarProblems: [
        "Powdery mildew",
        "Alternaria blotch",
        "Sooty blotch",
        "Fire blight"
    ],

    management: {
        cultural: [
            "Rake and destroy fallen leaves (the overwintering source).",
            "Prune for airflow and light penetration.",
            "Use resistant varieties where suitable.",
            "Avoid overhead irrigation; keep foliage dry."
        ],

        biological: [
            "Use locally recommended biofungicides for protective sprays.",
            "Maintain tree vigour through balanced nutrition."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Protect new growth; rotate fungicide groups to reduce resistance risk."
        ]
    },

    prevention: [
        "Use resistant varieties.",
        "Practice orchard sanitation (remove fallen leaves).",
        "Prune for airflow.",
        "Monitor closely in wet springs and act early."
    ],

    fieldNotes: [
        "Scab is decided in spring — protect tissue from bud break onward.",
        "Destroying fallen leaves removes the next season's inoculum."
    ],

    references: [
        "Apple pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "apple-codling-moth",
    crop: "Apple",
    category: "Pest",
    name: "Codling Moth",
    scientificName: "Cydia pomonella",

    aliases: [
        "Codling moth",
        "Carpocapsa pomonella",
        "Apple worm"
    ],

    affectedParts: [
        "Fruits"
    ],

    symptoms: [
        "Larvae bore into fruits from the calyx or side.",
        "A small round entry hole with frass is visible.",
        "Larvae feed through the flesh toward the core.",
        "Infested fruits drop prematurely.",
        "Frass and tunnels ruin the fruit completely."
    ],

    fieldIdentification: [
        "Look for small round holes with frass on the fruit surface.",
        "Cut a suspect fruit — tunnels and frass confirm codling moth.",
        "Use pheromone traps to monitor adult flights."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Overwintering sites in bark cracks",
        "Dense plantings",
        "Two to three generations per season in warm regions"
    ],

    spread: [
        "Adult moths fly short to moderate distances between trees.",
        "Larvae develop inside fruits, protected from sprays.",
        "Alternate hosts (walnut, quince, pear) maintain populations."
    ],

    riskFactors: [
        "Overwintering bark cracks and debris",
        "Weedy orchard floors",
        "Lack of trapping and monitoring",
        "Susceptible varieties",
        "Dense canopies"
    ],

    similarProblems: [
        "Leafrollers",
        "Fruit borers of other species",
        "Plum curculio",
        "Bird damage"
    ],

    management: {
        cultural: [
            "Scrape off loose bark and remove orchard debris.",
            "Use pheromone traps for monitoring and mating disruption.",
            "Remove and destroy infested fruit.",
            "Use trunk bands to trap larvae moving to pupate."
        ],

        biological: [
            "Conserve parasitoid wasps (Trichogramma) and birds.",
            "Spray Bacillus thuringiensis products where suitable."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Time applications to egg hatch based on trap catches."
        ]
    },

    prevention: [
        "Install pheromone traps before bloom.",
        "Destroy overwintering sites (bark, debris).",
        "Remove infested fruit promptly.",
        "Monitor and act at egg-hatch timing."
    ],

    fieldNotes: [
        "Trap monitoring tells you when to spray — guesswork wastes money and fruit.",
        "Fruit-entry holes close quickly; check young fruitlets early."
    ],

    references: [
        "Apple pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "apple-boron-deficiency",
    crop: "Apple",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Bitter pit"
    ],

    affectedParts: [
        "Growing points",
        "Fruits",
        "Shoot tips"
    ],

    symptoms: [
        "Fruits develop small, dark, sunken spots (bitter pit).",
        "Flesh beneath pits may be brown and bitter.",
        "Growing points die back and young leaves distort.",
        "Internodes shorten and shoots lose vigour.",
        "Flowering and fruit set may decline."
    ],

    fieldIdentification: [
        "Look for dark sunken spots on fruits and distorted young shoots.",
        "Cut the fruit — internal browning confirms bitter pit.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Bitter pit (calcium-related, can co-occur)",
        "Apple scab",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH within range.",
            "Build organic matter to retain boron.",
            "Use soil tests to guide micronutrient decisions."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application often corrects confirmed deficiency quickly."
        ]
    },

    prevention: [
        "Soil-test high-risk orchards before planting.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming.",
        "Monitor fruits and growing points."
    ],

    fieldNotes: [
        "Bitter pit can persist in cold storage even if fruit looked perfect at harvest.",
        "Boron excess is toxic — confirm by test; do not guess."
    ],

    references: [
        "Apple nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// COFFEE
// =========================================================

{
    id: "coffee-leaf-rust",
    crop: "Coffee",
    category: "Disease",
    name: "Coffee Leaf Rust",
    scientificName: "Hemileia vastatrix",

    aliases: [
        "Coffee rust",
        "Yellow rust of coffee",
        "Roya"
    ],

    affectedParts: [
        "Leaves",
        "Young branches"
    ],

    symptoms: [
        "Pale yellow spots appear on upper leaf surfaces.",
        "Bright orange or yellow-brown powdery pustules develop on leaf undersides.",
        "Leaves yellow and drop prematurely.",
        "Severe defoliation weakens trees and reduces cherry production.",
        "Young branches may die back in heavy infections."
    ],

    fieldIdentification: [
        "Look for orange-yellow powdery pustules on leaf undersides.",
        "Check the undersides of shaded, humid canopy leaves first.",
        "Compare with Cercospora (brown eyespot) and Phoma leaf spot."
    ],

    favourableConditions: [
        "High humidity",
        "Long periods of leaf wetness",
        "Mild temperatures",
        "Dense shade",
        "Continuous coffee monoculture"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected leaf litter carries the fungus between seasons.",
        "Dense shade shelters the fungus and prolongs wetness."
    ],

    riskFactors: [
        "Dense shade",
        "Humid climate",
        "Continuous monoculture",
        "Susceptible varieties",
        "Poor nutrition weakening trees"
    ],

    similarProblems: [
        "Cercospora leaf spot",
        "Phoma leaf spot",
        "Nutrient deficiency yellowing",
        "Other rusts"
    ],

    management: {
        cultural: [
            "Use resistant varieties and healthy planting stock.",
            "Prune for airflow and manage shade density.",
            "Remove and destroy infected leaves.",
            "Maintain balanced nutrition and tree vigour."
        ],

        biological: [
            "Use locally recommended biofungicides where their effectiveness is established.",
            "Maintain soil and canopy health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Use resistant varieties.",
        "Manage shade for airflow and light.",
        "Remove infected leaves.",
        "Monitor regularly and act early."
    ],

    fieldNotes: [
        "Rust often explodes after the first rains following a dry spell.",
        "Tree vigour decides how well coffee withstands rust — feed it well."
    ],

    references: [
        "Coffee pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "coffee-berry-borer",
    crop: "Coffee",
    category: "Pest",
    name: "Coffee Berry Borer",
    scientificName: "Hypothenemus hampei",

    aliases: [
        "Coffee berry borer",
        "Berry borer",
        "CBB"
    ],

    affectedParts: [
        "Coffee berries (cherries)"
    ],

    symptoms: [
        "Small holes appear at the blossom end of berries.",
        "Larvae tunnel inside the berry, feeding on the bean.",
        "Infested berries drop prematurely.",
        "Berries may rot from inside.",
        "Severe infestations cut yield and degrade quality."
    ],

    fieldIdentification: [
        "Look for entry holes at the blossom end of berries.",
        "Cut a suspect berry — tunnels and frass confirm borer.",
        "Use alcohol traps to monitor adult populations."
    ],

    favourableConditions: [
        "Warm weather",
        "Dry spells",
        "Overripe or dropped berries left unharvested",
        "Poor harvesting hygiene (strip picking)",
        "Dense shade"
    ],

    spread: [
        "Adult beetles fly between trees and on wind.",
        "Infested berries and dropped fruit carry the pest between seasons.",
        "Strip picking spreads beetles to unharvested cherries."
    ],

    riskFactors: [
        "Unharvested berries on the ground",
        "Poor harvesting hygiene",
        "Warm, dry conditions",
        "Dense shade",
        "No trapping or monitoring"
    ],

    similarProblems: [
        "Coffee leaf miner",
        "Berry disease",
        "Other berry borers",
        "Bird damage to berries"
    ],

    management: {
        cultural: [
            "Pick all berries cleanly; remove and destroy fallen fruit.",
            "Use alcohol traps for monitoring and mass trapping.",
            "Prune for airflow and light.",
            "Maintain orchard hygiene year-round."
        ],

        biological: [
            "Use locally recommended entomopathogenic fungi (Beauveria bassiana) where their effectiveness is established.",
            "Conserve natural enemies."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Treat only where monitoring shows economic damage."
        ]
    },

    prevention: [
        "Harvest completely and cleanly.",
        "Destroy fallen and overripe berries.",
        "Use alcohol traps for early detection.",
        "Maintain orchard sanitation."
    ],

    fieldNotes: [
        "CBB is the single most damaging coffee pest — clean picking is the first defence.",
        "Traps reveal flight timing — apply control at the right moment."
    ],

    references: [
        "Coffee pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "coffee-magnesium-deficiency",
    crop: "Coffee",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "",

    aliases: [
        "Magnesium deficiency",
        "Mg deficiency",
        "Interveinal chlorosis (Mg)"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves develop interveinal yellowing while veins stay green.",
        "Yellowing starts at leaf margins and moves inward.",
        "Leaves may develop bronze or orange tints.",
        "Severe cases show leaf drop and reduced vigour.",
        "Cherry yield and size decline."
    ],

    fieldIdentification: [
        "Look for interveinal yellowing of the oldest leaves first.",
        "Check sandy soils and fields with high potassium or ammonium.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "High potassium or ammonium availability",
        "Acid soils",
        "Heavy rainfall leaching magnesium",
        "Low magnesium in the parent material"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often appears patchily, following soil texture variation."
    ],

    riskFactors: [
        "Sandy soils",
        "High potassium fertilization",
        "Acid soils",
        "Low organic matter",
        "Continuous cropping without replenishment"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Nitrogen deficiency",
        "Zinc deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost to build organic matter.",
            "Use soil tests to guide magnesium application.",
            "Balance potassium and magnesium in fertilization."
        ],

        biological: [
            "Healthy organic matter releases magnesium steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply dolomite or magnesium sulphate only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Avoid excess potassium competing with magnesium."
        ]
    },

    prevention: [
        "Soil-test low-organic-matter fields.",
        "Maintain balanced fertilization.",
        "Build organic matter regularly.",
        "Monitor older leaves for early interveinal paling."
    ],

    fieldNotes: [
        "Mg deficiency shows on old leaves; iron shows on young leaves — compare leaf age.",
        "Excess potassium is the commonest trigger — keep K and Mg balanced."
    ],

    references: [
        "Coffee nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// TEA
// =========================================================

{
    id: "tea-blister-blight",
    crop: "Tea",
    category: "Disease",
    name: "Blister Blight",
    scientificName: "Exobasidium vexans",

    aliases: [
        "Blister blight of tea",
        "Tea blister blight"
    ],

    affectedParts: [
        "Young leaves",
        "Buds",
        "Young shoots"
    ],

    symptoms: [
        "Pale, translucent spots appear on the undersides of young leaves.",
        "Spots gradually swell into raised, blister-like swellings.",
        "Blisters turn pale pink or grey when mature and release spores.",
        "Leaves curl and dry up.",
        "Severe infection stunts young shoots and reduces yield."
    ],

    fieldIdentification: [
        "Look for raised, blister-like swellings on the undersides of young leaves.",
        "Check the youngest shoots in dense, humid shaded sections first.",
        "Compare with grey blight (flat grey lesions, not raised blisters)."
    ],

    favourableConditions: [
        "High humidity",
        "Long periods of leaf wetness",
        "Mild temperatures",
        "Dense shade",
        "Overcast weather"
    ],

    spread: [
        "Spores spread by wind and splashing rain.",
        "Infected leaf litter carries the fungus between seasons.",
        "Dense shade shelters the fungus and prolongs wetness."
    ],

    riskFactors: [
        "Dense shade",
        "Humid climate",
        "Overcast weather",
        "Continuous tea monoculture",
        "Poor plucking hygiene"
    ],

    similarProblems: [
        "Grey blight",
        "Brown blight",
        "Red leaf spot",
        "Mite damage"
    ],

    management: {
        cultural: [
            "Manage shade for light and airflow.",
            "Maintain plucking hygiene and remove infected shoots.",
            "Use resistant varieties where suitable.",
            "Prune for airflow and light penetration."
        ],

        biological: [
            "Use locally recommended biofungicides where their effectiveness is established.",
            "Maintain bush vigour through balanced nutrition."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Manage shade density for light and airflow.",
        "Prune for airflow.",
        "Maintain plucking hygiene.",
        "Monitor young shoots in humid weather and act early."
    ],

    fieldNotes: [
        "Blister blight is decided by shade and humidity — fix the microclimate, not just the spray.",
        "Young shoots are the target tissue — scout them hardest."
    ],

    references: [
        "Tea pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "tea-mosquito-bug",
    crop: "Tea",
    category: "Pest",
    name: "Tea Mosquito Bug",
    scientificName: "Helopeltis theivora",

    aliases: [
        "Tea bug",
        "Tea mosquito",
        "Helopeltis"
    ],

    affectedParts: [
        "Young shoots",
        "Buds",
        "Tender leaves"
    ],

    symptoms: [
        "Tea mosquito bugs pierce and suck sap from tender shoots.",
        "Small, dark, sunken feeding spots appear on leaves.",
        "Buds and young leaves blacken and dry up.",
        "Shoots may die back (black tip).",
        "Severe infestations destroy the plucking table and yield."
    ],

    fieldIdentification: [
        "Look for small reddish-brown bugs with long antennae on young shoots.",
        "Check for black sunken spots and blackened buds.",
        "Inspect shaded, humid sections first."
    ],

    favourableConditions: [
        "Humid weather",
        "Dense shade",
        "Continuous tender flush",
        "Lack of natural enemies",
        "Weedy plantation floors"
    ],

    spread: [
        "Adults fly between bushes and migrate on wind.",
        "Alternate host plants maintain populations between flushes.",
        "Dense shade shelters bugs and prolongs feeding."
    ],

    riskFactors: [
        "Dense shade",
        "Humid climate",
        "Continuous tender flush",
        "Weedy floors",
        "Lack of natural enemies"
    ],

    similarProblems: [
        "Tea thrips",
        "Aphids",
        "Mealybugs",
        "Blister blight (lesion mimic)"
    ],

    management: {
        cultural: [
            "Manage shade for light and airflow.",
            "Maintain plantation hygiene and remove weed hosts.",
            "Prune for airflow and light penetration.",
            "Pluck regularly to remove infested shoots."
        ],

        biological: [
            "Conserve parasitoid wasps, spiders and predatory bugs.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young flushes before populations build up."
        ]
    },

    prevention: [
        "Manage shade density for light and airflow.",
        "Keep the plantation floor weed-free.",
        "Prune for airflow.",
        "Monitor new flushes regularly and act early."
    ],

    fieldNotes: [
        "Black tip on young shoots is the classic mosquito-bug fingerprint.",
        "Shade management is the highest-leverage control — light and air discourage bugs."
    ],

    references: [
        "Tea pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "tea-zinc-deficiency",
    crop: "Tea",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",

    aliases: [
        "Zinc deficiency",
        "Zn deficiency",
        "Little leaf",
        "Die-back"
    ],

    affectedParts: [
        "Young leaves",
        "Shoot tips",
        "Lateral buds"
    ],

    symptoms: [
        "Young leaves become small, narrow and pale (little leaf).",
        "Internodes shorten and shoots lose vigour.",
        "Leaves may show interveinal yellowing or mottling.",
        "Lateral buds may fail to open, causing die-back.",
        "Yield and shoot quality decline."
    ],

    fieldIdentification: [
        "Look for small, pale young leaves and shortened internodes.",
        "Check shoot tips for incomplete flush development.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Over-liming",
        "Sandy or highly weathered soils",
        "High phosphorus availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "High phosphorus application",
        "Soils low in available zinc",
        "No manure history"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Apply farmyard manure regularly.",
            "Use soil tests to guide correction."
        ],

        biological: [
            "Organic-matter-rich soils supply zinc steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply zinc sulphate to soil or foliar spray only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Test high-pH soils for zinc.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive phosphorus and liming.",
        "Monitor new flushes on high-risk soils."
    ],

    fieldNotes: [
        "Little leaf and die-back are the tea zinc-deficiency fingerprint.",
        "Zinc-phosphate antagonism is common — balance both."
    ],

    references: [
        "Tea nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// GUAVA
// =========================================================

{
    id: "guava-wilt",
    crop: "Guava",
    category: "Disease",
    name: "Guava Wilt",
    scientificName: "Fusarium oxysporum f. sp. psidii",

    aliases: [
        "Fusarium wilt of guava",
        "Guava wilt disease"
    ],

    affectedParts: [
        "Roots",
        "Stem base",
        "Whole tree"
    ],

    symptoms: [
        "Leaves yellow, wilt and dry up while still attached.",
        "Branches die back progressively from the top.",
        "Cut stems show brown or reddish vascular discoloration.",
        "Roots rot and decay.",
        "Trees may die within weeks of first symptoms."
    ],

    fieldIdentification: [
        "Cut a wilted branch — brown vascular streaking confirms wilt.",
        "Check roots for rot and reduced branching.",
        "Compare with Ganoderma butt rot (conks at the trunk base) and nematode damage (galls)."
    ],

    favourableConditions: [
        "Warm soils",
        "Poorly drained fields",
        "Continuous guava monoculture",
        "Stressed trees",
        "Acidic soils in some strains"
    ],

    spread: [
        "The fungus survives in soil and crop debris for years.",
        "It enters through roots and spreads through water-conducting tissue.",
        "Contaminated soil on tools and footwear spreads it between trees."
    ],

    riskFactors: [
        "Continuous guava monoculture",
        "Poor drainage",
        "Contaminated tools and soil",
        "Stressed trees",
        "Infected nursery stock"
    ],

    similarProblems: [
        "Ganoderma butt rot",
        "Root knot nematode",
        "Bacterial wilt",
        "Drought wilt"
    ],

    management: {
        cultural: [
            "Use resistant varieties and certified, disease-free nursery stock.",
            "Remove and destroy wilted trees promptly.",
            "Improve drainage; avoid waterlogging.",
            "Disinfect tools and footwear before moving between trees."
        ],

        biological: [
            "Use locally recommended biofungicides for soil treatment.",
            "Build soil organic matter and microbial balance."
        ],

        chemical: [
            "There is no curative chemical for established guava wilt.",
            "Use only locally registered soil treatments when chemical control is justified.",
            "Follow the product label for dose and application method."
        ]
    },

    prevention: [
        "Use resistant varieties and certified stock.",
        "Avoid waterlogging; improve drainage.",
        "Keep tools and footwear clean.",
        "Remove wilted trees promptly."
    ],

    fieldNotes: [
        "Wilt once established is fatal — source clean stock and keep soil healthy.",
        "Vascular browning on cut branches is the definitive field check."
    ],

    references: [
        "Guava pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "guava-fruit-fly",
    crop: "Guava",
    category: "Pest",
    name: "Fruit Fly",
    scientificName: "Bactrocera zonata",

    aliases: [
        "Peach fruit fly",
        "Melon fruit fly (of guava)",
        "Oriental fruit fly"
    ],

    affectedParts: [
        "Fruits"
    ],

    symptoms: [
        "Female flies puncture ripe fruits and lay eggs inside.",
        "Punctures are visible as small dots on the fruit skin.",
        "Larvae (maggots) feed inside the pulp.",
        "Fruits soften, rot and drop prematurely.",
        "Infested fruits are unmarketable."
    ],

    fieldIdentification: [
        "Look for puncture marks and oozing on ripe fruits.",
        "Cut a suspect fruit — maggots inside confirm fruit fly.",
        "Use pheromone traps to monitor adult populations."
    ],

    favourableConditions: [
        "Warm weather",
        "Overripe or dropped fruit left on the ground",
        "Continuous host availability",
        "Dense, unsanitary orchards",
        "Alternate host fruits nearby"
    ],

    spread: [
        "Adult flies fly between trees and long distances.",
        "Infested dropped fruit releases new flies.",
        "Alternate host fruits maintain populations between seasons."
    ],

    riskFactors: [
        "Overripe fruit left unharvested",
        "Dropped fruit on the ground",
        "No trapping programme",
        "Alternate hosts nearby",
        "Dense orchards"
    ],

    similarProblems: [
        "Fruit borers",
        "Other fruit fly species",
        "Fruit rot (fungal)",
        "Bird damage"
    ],

    management: {
        cultural: [
            "Remove and destroy fallen and overripe fruits.",
            "Use pheromone traps for monitoring and mass trapping.",
            "Use fruit fly bait traps where suitable.",
            "Maintain orchard sanitation year-round."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Bait sprays are preferred over cover sprays for fruit flies."
        ]
    },

    prevention: [
        "Install pheromone traps before fruit set.",
        "Destroy fallen fruit promptly.",
        "Maintain orchard hygiene.",
        "Monitor and act at first fly detection."
    ],

    fieldNotes: [
        "Fruit flies destroy the crop's market value — trapping before ripening is essential.",
        "Clean orchards have far fewer flies — sanitation beats spraying."
    ],

    references: [
        "Guava pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "guava-zinc-deficiency",
    crop: "Guava",
    category: "Nutrient Disorder",
    name: "Zinc Deficiency",
    scientificName: "",

    aliases: [
        "Zinc deficiency",
        "Zn deficiency",
        "Little leaf",
        "Mottle leaf"
    ],

    affectedParts: [
        "Young leaves",
        "Shoot tips",
        "Fruits"
    ],

    symptoms: [
        "Young leaves become small, narrow and mottled (little leaf, mottle leaf).",
        "Interveinal chlorosis may appear in intermittent bands.",
        "Internodes shorten and shoots lose vigour.",
        "Leaves may bunch together (rosetting).",
        "Fruits may be small and unmarketable."
    ],

    fieldIdentification: [
        "Look for small, narrow, mottled young leaves with banded chlorosis.",
        "Check high-pH fields first.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "High soil pH",
        "Over-liming",
        "Sandy or highly weathered soils",
        "High phosphorus availability",
        "Low organic matter"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil pH and texture variation."
    ],

    riskFactors: [
        "High pH soils",
        "Over-liming",
        "High phosphorus application",
        "Soils low in available zinc",
        "No manure history"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Manganese deficiency",
        "Nitrogen deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Avoid over-liming; keep pH in the recommended range.",
            "Apply farmyard manure regularly.",
            "Use soil tests to guide correction."
        ],

        biological: [
            "Organic-matter-rich soils supply zinc steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply zinc sulphate to soil or foliar spray only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Do not exceed recommended rates."
        ]
    },

    prevention: [
        "Test high-pH soils for zinc.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive phosphorus and liming.",
        "Monitor new flushes on high-risk soils."
    ],

    fieldNotes: [
        "Little leaf and mottling are the classic guava zinc-deficiency signs.",
        "Zinc-phosphate antagonism is common — balance both."
    ],

    references: [
        "Guava nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// POMEGRANATE
// =========================================================

{
    id: "pomegranate-bacterial-blight",
    crop: "Pomegranate",
    category: "Disease",
    name: "Bacterial Blight",
    scientificName: "Xanthomonas axonopodis pv. punicae",

    aliases: [
        "Bacterial blight of pomegranate",
        "Oily spot of pomegranate"
    ],

    affectedParts: [
        "Leaves",
        "Twigs",
        "Flowers",
        "Fruits"
    ],

    symptoms: [
        "Small, water-soaked, oily spots appear on leaves.",
        "Spots enlarge into dark, angular lesions.",
        "Twigs may blacken and die back.",
        "Flowers blacken and drop.",
        "Fruits develop dark, sunken oily lesions and crack."
    ],

    fieldIdentification: [
        "Look for oily, water-soaked leaf spots and blackened twig tips.",
        "Compare with Alternaria leaf spot (dark dry spots without oily sheen).",
        "Check twigs and fruit in humid canopies first."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Warm temperatures",
        "Dense canopy"
    ],

    spread: [
        "Bacteria spread in splashing rain and wind-driven rain.",
        "Contaminated tools, footwear and machinery carry them between trees.",
        "Infected planting material introduces the disease to new orchards."
    ],

    riskFactors: [
        "Infected nursery stock",
        "Overhead irrigation",
        "Dense canopy",
        "High humidity",
        "Poor orchard sanitation"
    ],

    similarProblems: [
        "Alternaria leaf spot",
        "Fruit rot",
        "Physiological cracking",
        "Sooty mould"
    ],

    management: {
        cultural: [
            "Use certified, disease-free nursery stock.",
            "Prune for airflow and orchard light.",
            "Avoid overhead irrigation; keep foliage dry.",
            "Remove and destroy infected twigs and fallen fruit."
        ],

        biological: [
            "Use locally recommended bioagents for protective sprays where effective.",
            "Maintain tree vigour through balanced nutrition."
        ],

        chemical: [
            "Use only locally registered copper-based bactericides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Protect new flush; there is no cure for established blight."
        ]
    },

    prevention: [
        "Use certified nursery stock.",
        "Prune for airflow.",
        "Avoid overhead watering.",
        "Monitor new flushes and act early."
    ],

    fieldNotes: [
        "Blackened twig tips and oily leaf spots are the giveaway signs.",
        "Orchard sanitation and clean stock decide the battle before spraying starts."
    ],

    references: [
        "Pomegranate pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "pomegranate-fruit-borer",
    crop: "Pomegranate",
    category: "Pest",
    name: "Anar Butterfly (Fruit Borer)",
    scientificName: "Deudorix isocrates",

    aliases: [
        "Pomegranate fruit borer",
        "Anar butterfly",
        "Pomegranate butterfly"
    ],

    affectedParts: [
        "Fruits",
        "Flowers",
        "Buds"
    ],

    symptoms: [
        "Larvae bore into flowers, buds and developing fruits.",
        "A small entry hole with frass is visible on the fruit.",
        "Larvae feed inside the fruit, damaging arils.",
        "Infested fruits rot and drop prematurely.",
        "Damage ruins the market value of the crop."
    ],

    fieldIdentification: [
        "Look for entry holes with frass on young fruits.",
        "Cut a suspect fruit — tunnels and larvae confirm borer.",
        "Watch for the small brownish butterflies fluttering near flowering trees."
    ],

    favourableConditions: [
        "Warm weather",
        "Continuous flowering crop cycles",
        "Dense canopies",
        "Lack of natural enemies",
        "Nearby alternate host trees (litchi, citrus, ber)"
    ],

    spread: [
        "Adult butterflies fly between trees.",
        "Larvae develop inside fruits, protected from sprays.",
        "Alternate hosts maintain populations between seasons."
    ],

    riskFactors: [
        "Dense canopies",
        "Continuous cropping",
        "Nearby alternate hosts",
        "Lack of natural enemies",
        "No fruit-bagging programme"
    ],

    similarProblems: [
        "Fruit flies",
        "Other borers",
        "Fruit rot",
        "Bird damage"
    ],

    management: {
        cultural: [
            "Bag developing fruits where practical.",
            "Remove and destroy infested fruits promptly.",
            "Use light traps to monitor adults where suitable.",
            "Maintain orchard hygiene and remove alternate hosts."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Target young larvae before they bore into fruits."
        ]
    },

    prevention: [
        "Bag fruits or use nets where feasible.",
        "Remove infested fruits promptly.",
        "Keep margins free of alternate hosts.",
        "Monitor weekly and act early."
    ],

    fieldNotes: [
        "Bagging fruits is the most reliable protection — do it at marble stage.",
        "Entry holes close quickly; inspect young fruitlets often."
    ],

    references: [
        "Pomegranate pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "pomegranate-boron-deficiency",
    crop: "Pomegranate",
    category: "Nutrient Disorder",
    name: "Boron Deficiency",
    scientificName: "",

    aliases: [
        "Boron deficiency",
        "B deficiency",
        "Husk cracking"
    ],

    affectedParts: [
        "Growing points",
        "Fruits",
        "Shoot tips"
    ],

    symptoms: [
        "Fruits may crack (husk cracking) and arils become brown.",
        "Growing points die back and young leaves distort.",
        "Leaf tips may curl and scorch.",
        "Flowering and fruit set decline.",
        "Root tips may die, weakening trees."
    ],

    fieldIdentification: [
        "Look for cracked fruits and distorted young shoots.",
        "Check aril browning inside cracked fruits.",
        "Confirm with soil or tissue tests before applying boron."
    ],

    favourableConditions: [
        "Sandy or leached soils",
        "High soil pH",
        "Over-liming",
        "Low organic matter",
        "Drought followed by rewetting"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often patchy, following soil type and pH variation."
    ],

    riskFactors: [
        "High pH soils",
        "Sandy or leached soils",
        "Over-liming",
        "Drought stress",
        "Low organic matter"
    ],

    similarProblems: [
        "Calcium deficiency",
        "Fruit crack due to irregular watering",
        "Bacterial blight",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Maintain even watering; avoid drought-flood cycles.",
            "Avoid over-liming; keep pH within range.",
            "Build organic matter to retain boron."
        ],

        biological: [
            "Biologically active soils improve boron availability.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply boron (borax or boric acid) only after confirming deficiency by test.",
            "Follow label directions; boron is toxic in excess.",
            "Foliar application often corrects confirmed deficiency quickly."
        ]
    },

    prevention: [
        "Soil-test high-risk orchards before planting.",
        "Maintain organic matter and balanced fertilization.",
        "Avoid excessive liming and water stress.",
        "Monitor fruits and growing points."
    ],

    fieldNotes: [
        "Fruit cracking can follow irregular watering too — test before blaming boron.",
        "Boron excess is toxic — confirm by test; do not guess."
    ],

    references: [
        "Pomegranate nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
},

// =========================================================
// WATERMELON
// =========================================================

{
    id: "watermelon-anthracnose",
    crop: "Watermelon",
    category: "Disease",
    name: "Anthracnose",
    scientificName: "Colletotrichum orbiculare",

    aliases: [
        "Anthracnose of cucurbits",
        "Watermelon anthracnose"
    ],

    affectedParts: [
        "Leaves",
        "Stems",
        "Fruits"
    ],

    symptoms: [
        "Small yellow-brown spots develop on leaves.",
        "Spots enlarge into round or angular brown lesions.",
        "Lesions may coalesce, causing leaf blighting.",
        "Stems may show dark sunken lesions.",
        "Fruits develop large, sunken, dark lesions and rot."
    ],

    fieldIdentification: [
        "Look for round-to-angular brown leaf spots and sunken fruit lesions.",
        "Salmon-pink spore masses may appear on fruit in humid weather.",
        "Compare with downy mildew (grey fuzz beneath leaves)."
    ],

    favourableConditions: [
        "High humidity",
        "Frequent rainfall",
        "Long periods of leaf wetness",
        "Warm temperatures",
        "Dense canopy"
    ],

    spread: [
        "Spores spread by splashing rain and wind-driven rain.",
        "Infected crop debris carries the fungus between seasons.",
        "Contaminated seed may introduce the disease."
    ],

    riskFactors: [
        "Overhead irrigation",
        "Dense planting",
        "Continuous cucurbit cropping",
        "Humid weather",
        "Infected seed"
    ],

    similarProblems: [
        "Downy mildew",
        "Alternaria leaf blight",
        "Angular leaf spot",
        "Bacterial fruit blotch"
    ],

    management: {
        cultural: [
            "Use certified, disease-free seed.",
            "Practice crop rotation with non-cucurbits.",
            "Avoid overhead irrigation; water at the base.",
            "Remove and destroy infected crop debris."
        ],

        biological: [
            "Use locally recommended biofungicides for seed treatment.",
            "Maintain balanced nutrition and soil health."
        ],

        chemical: [
            "Use only locally registered fungicides when chemical control is justified.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Rotate fungicide groups where appropriate to reduce resistance risk."
        ]
    },

    prevention: [
        "Sow healthy seed at recommended spacing.",
        "Avoid overhead watering.",
        "Rotate with non-cucurbits.",
        "Monitor fields in humid weather and act early."
    ],

    fieldNotes: [
        "Anthracnose is mostly a warm-wet-season disease.",
        "Destroying infected debris removes the next season's inoculum."
    ],

    references: [
        "Cucurbit pathology literature",
        "National agricultural extension recommendations",
        "Peer-reviewed plant pathology research"
    ]
},

{
    id: "watermelon-fruit-fly",
    crop: "Watermelon",
    category: "Pest",
    name: "Fruit Fly",
    scientificName: "Bactrocera cucurbitae",

    aliases: [
        "Melon fruit fly",
        "Cucurbit fruit fly"
    ],

    affectedParts: [
        "Fruits",
        "Flowers",
        "Fruit stalks"
    ],

    symptoms: [
        "Female flies puncture young fruits and lay eggs inside.",
        "Punctures appear as small dots on the fruit skin.",
        "Larvae feed inside the fruit.",
        "Fruits rot and drop prematurely.",
        "Infested fruits are unmarketable."
    ],

    fieldIdentification: [
        "Look for puncture marks and oozing on young fruits.",
        "Cut a suspect fruit — maggots inside confirm fruit fly.",
        "Use pheromone traps to monitor adult populations."
    ],

    favourableConditions: [
        "Warm weather",
        "Overripe or dropped fruit left on the ground",
        "Continuous host availability",
        "Dense, unsanitary fields",
        "Alternate cucurbit hosts nearby"
    ],

    spread: [
        "Adult flies fly between plants and can travel long distances.",
        "Infested dropped fruit releases new flies.",
        "Alternate cucurbit hosts maintain populations between seasons."
    ],

    riskFactors: [
        "Overripe or dropped fruit",
        "No trapping programme",
        "Alternate host cucurbits nearby",
        "Poor field sanitation",
        "Continuous cropping"
    ],

    similarProblems: [
        "Fruit borers",
        "Other fruit fly species",
        "Fruit rot (fungal)",
        "Bird damage"
    ],

    management: {
        cultural: [
            "Remove and destroy fallen and overripe fruits.",
            "Use pheromone traps for monitoring and mass trapping.",
            "Use bait traps where suitable.",
            "Maintain field sanitation."
        ],

        biological: [
            "Conserve parasitoid wasps and predators.",
            "Use locally recommended biopesticides where their effectiveness is established."
        ],

        chemical: [
            "Use only locally registered insecticides when thresholds are exceeded.",
            "Follow the product label for dose, timing, safety interval and application method.",
            "Bait sprays are preferred over cover sprays for fruit flies."
        ]
    },

    prevention: [
        "Install pheromone traps before fruit set.",
        "Destroy fallen fruit promptly.",
        "Maintain field hygiene.",
        "Monitor and act at first fly detection."
    ],

    fieldNotes: [
        "Fruit flies destroy market value — trapping before fruit ripening is essential.",
        "Clean fields have far fewer flies — sanitation beats spraying."
    ],

    references: [
        "Cucurbit pest management literature",
        "National agricultural extension recommendations",
        "Integrated pest management guidelines"
    ]
},

{
    id: "watermelon-magnesium-deficiency",
    crop: "Watermelon",
    category: "Nutrient Disorder",
    name: "Magnesium Deficiency",
    scientificName: "",

    aliases: [
        "Magnesium deficiency",
        "Mg deficiency",
        "Interveinal chlorosis (Mg)"
    ],

    affectedParts: [
        "Older leaves",
        "Whole plant"
    ],

    symptoms: [
        "Older leaves develop interveinal yellowing while veins stay green.",
        "Yellowing starts at the leaf margin and moves inward.",
        "Leaves may develop reddish or bronze tints.",
        "Severe cases show leaf drop and stunted growth.",
        "Fruit yield and quality decline."
    ],

    fieldIdentification: [
        "Look for interveinal yellowing on the oldest leaves first.",
        "Check sandy soils and fields with high potassium or ammonium.",
        "Confirm with a soil or tissue test before correcting."
    ],

    favourableConditions: [
        "Sandy, low-organic-matter soils",
        "High potassium or ammonium availability",
        "Acid soils",
        "Heavy rainfall leaching magnesium",
        "Low magnesium in the parent material"
    ],

    spread: [
        "Not infectious — a nutrient availability issue, not a pathogen.",
        "Often appears patchily, following soil texture variation."
    ],

    riskFactors: [
        "Sandy soils",
        "High potassium fertilization",
        "Acid soils",
        "Low organic matter",
        "Continuous cropping without replenishment"
    ],

    similarProblems: [
        "Iron chlorosis",
        "Nitrogen deficiency",
        "Zinc deficiency",
        "Herbicide injury"
    ],

    management: {
        cultural: [
            "Apply farmyard manure or compost to build organic matter.",
            "Use soil tests to guide magnesium application.",
            "Balance potassium and magnesium in fertilization."
        ],

        biological: [
            "Healthy organic matter releases magnesium steadily.",
            "Not a pathogen — no biological control applies."
        ],

        chemical: [
            "Apply dolomite or magnesium sulphate only after confirming deficiency.",
            "Follow label directions for rates and timing.",
            "Avoid excess potassium competing with magnesium."
        ]
    },

    prevention: [
        "Soil-test low-organic-matter fields.",
        "Maintain balanced fertilization.",
        "Build organic matter regularly.",
        "Monitor older leaves for early interveinal paling."
    ],

    fieldNotes: [
        "Mg deficiency shows on old leaves; iron shows on young leaves — compare leaf age.",
        "Excess potassium is the commonest trigger — keep K and Mg balanced."
    ],

    references: [
        "Watermelon nutrient management literature",
        "National agricultural extension recommendations",
        "Soil fertility research"
    ]
}
];

export default libraryData;
