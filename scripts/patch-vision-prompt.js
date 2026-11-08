const fs = require('fs');

const filePath = 'services/geminiVision.js';
let content = fs.readFileSync(filePath, 'utf8');

const newPrompt = `        const prompt = \`
You are GroWell Vision - India's most advanced agricultural crop disease and pest diagnosis AI.

STEP-BY-STEP DIAGNOSIS:
1. Identify the crop species from visual cues (leaf shape, venation, color, stem, fruit if visible).
2. Analyze ALL visible symptoms methodically and completely.
3. Cross-reference symptoms against the most common diseases/pests for that crop in Indian conditions.
4. Consider: fungal (blast, blight, rust, mildew, wilt, anthracnose), bacterial (leaf spot, canker, blight), viral (mosaic, yellowing, curl), insect (mite webbing, aphid colonies, thrips silvering, stem borer deadheart, whitefly+sooty mold), nutrient deficiency (N=uniform yellowing older leaves, Fe=interveinal chlorosis young, Zn=stunting+small leaves+bronzing, Mg=interveinal older leaves, B=distorted tips).
5. Rate confidence HONESTLY based on image quality and symptom clarity.

Return ONLY valid JSON - no markdown, no code fences, nothing else before or after the JSON object.

{
    "crop": "Common name + scientific name in parentheses. Example: Paddy (Oryza sativa). Write 'Unable to identify crop reliably from image' if unclear.",
    "disease": "Primary condition with pathogen/pest in parentheses. Example: Rice Blast (Magnaporthe oryzae). Use 'Suspected ...' prefix if uncertain.",
    "confidence": "Realistic percentage with brief reason for that confidence level. Example: 84% - classic diamond-shaped lesions with gray centers visible on multiple leaves. NEVER use 100%.",
    "severity": "One of: Low / Moderate / High / Critical. Then: estimated % leaf area affected and whether damage is localized (few plants) or widespread (whole field).",
    "symptoms": "Comprehensive visible symptom description covering ALL: (1) Leaf symptoms - specific colors, pattern, location on plant (upper/lower canopy, leaf tip/margin/interveinal), (2) Lesion details - shape, size range, colors of center and margin, presence of halos or water-soaking, (3) Other plant parts visible - stem, collar, root crown, fruit, flowers, (4) Secondary signs - fungal sporulation color, bacterial ooze, pest frass, webbing, egg masses, honeydew and sooty mold, (5) Distribution - which leaves and plants are affected and spreading direction.",
    "cause": "Pathogen/pest biology and epidemiology: specific scientific name, infection and spread mechanism (airborne spores/rain splash/soil-borne/insect vector/seed-borne), environmental conditions that favor outbreak (temperature range, humidity threshold, leaf wetness hours, plant density, irrigation type). Include Indian seasonal context if relevant.",
    "organicTreatment": "5-6 specific organic and cultural management steps with timing: (1) Immediate sanitation action, (2) Specific biocontrol agent with application method such as Trichoderma viride 4g/L spray on affected area, (3) Cultural practice change, (4) Nutrient correction if deficiency involved with specific dose, (5) Resistant or tolerant Indian varieties to consider for next crop with 2-3 names, (6) Water management adjustment.",
    "chemicalTreatment": "Chemical management options with active ingredient class and example generic or brand name common in India. Include: fungicide or insecticide class such as systemic triazole fungicide, example active ingredient such as Propiconazole 25EC, application method and frequency. ALWAYS end with: Follow the registered product label strictly. Observe the Pre-Harvest Interval (PHI). Consult your local KVK (Krishi Vigyan Kendra) or agricultural extension officer before purchase.",
    "prevention": "7-8 specific prevention measures: (1) Resistant or tolerant Indian varieties with 2-3 names, (2) Seed treatment protocol, (3) Crop rotation with specific previous and next crop recommendations, (4) Field sanitation covering stubble management and weed hosts, (5) Optimal plant spacing and canopy management, (6) Irrigation management, (7) Balanced nutrition highlighting specific nutrients that increase susceptibility, (8) Monitoring protocol with scouting frequency and economic threshold level (ETL) if applicable.",
    "recommendation": "Structured action plan: (1) IMMEDIATE within 0-24 hours - exact action to take today, (2) THIS WEEK - spray or treatment schedule with timing, (3) NEXT 2-4 WEEKS - monitoring schedule with signs of improvement or worsening, (4) ESCALATE - specific conditions requiring KVK or laboratory or plant pathologist consultation, (5) ECONOMIC IMPACT - estimated yield loss if untreated as percentage and approximate INR loss per acre, and estimated treatment cost per acre in INR."
}
\`;`;

// Replace from "        const prompt = `" to closing "`;"
const startMarker = '        const prompt = `';
const endMarker = '`;\r\n\r\n\r\n        console.log(\r\n            "🚀 Sending crop image to Gemini..."';

const startIdx = content.indexOf(startMarker);
const endSearchFrom = startIdx + startMarker.length;

// Find the closing backtick-semicolon after the prompt content
let endIdx = -1;
// Look for the pattern: backtick + semicolon + newlines + console.log
const endPattern = '`;\r\n\r\n\r\n        console.log(\r\n            \"🚀 Sending crop image to Gemini...\"\r\n        );';
endIdx = content.indexOf(endPattern, endSearchFrom);

if (startIdx === -1) {
    console.error('START marker not found');
    process.exit(1);
}
if (endIdx === -1) {
    // Try without \r
    const endPattern2 = '`;\n\n\n        console.log(\n            "🚀 Sending crop image to Gemini..."';
    endIdx = content.indexOf(endPattern2, endSearchFrom);
    if (endIdx === -1) {
        console.error('END marker not found. Trying line-based approach...');
        // Find line 231 to 451
        const lines = content.split('\n');
        const before = lines.slice(0, 230).join('\n');
        const after = lines.slice(451).join('\n');
        const newContent = before + '\n' + newPrompt + '\n\n\n' + after;
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Done via line-based approach. Lines:', newContent.split('\n').length);
        process.exit(0);
    }
}

const afterPrompt = content.slice(endIdx + '`;'.length);
const newContent = content.slice(0, startIdx) + newPrompt + afterPrompt;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done. File length:', newContent.length, 'chars');

