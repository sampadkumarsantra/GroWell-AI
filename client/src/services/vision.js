const Groq = require("groq-sdk");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function analyzeCropImage(file) {

    const base64 = file.buffer.toString("base64");

    const completion = await client.chat.completions.create({

        model: "meta-llama/llama-4-scout-17b-16e-instruct",

        messages: [

            {
                role: "system",
                content:
`You are GroWell Vision.

You are an expert agricultural scientist.

Analyze the uploaded crop image.

Return ONLY this JSON:

{
"crop":"",
"disease":"",
"confidence":"",
"symptoms":[],
"recommendation":[]
}`
            },

            {
                role: "user",
                content: [

                    {
                        type: "text",
                        text: "Analyze this crop."
                    },

                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${file.mimetype};base64,${base64}`
                        }
                    }

                ]
            }

        ]

    });

    return completion.choices[0].message.content;
}

module.exports = analyzeCropImage;