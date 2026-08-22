const express = require("express");
const router = express.Router();

const { generateResponse } = require("../services/ai");


router.post("/", async (req, res) => {

    try {

        const { message, settings } = req.body;


        /*
         * =========================================
         * VALIDATE MESSAGE
         * =========================================
         */

        if (!message || !message.trim()) {

            return res.status(400).json({
                reply: "Please enter a message."
            });

        }


        /*
         * =========================================
         * USER SETTINGS
         * =========================================
         */

        const userSettings = settings || {};


        /*
         * =========================================
         * GENERATE AI RESPONSE
         * =========================================
         */

        const reply = await generateResponse(
            message,
            userSettings
        );


        /*
         * =========================================
         * SEND RESPONSE
         * =========================================
         */

        res.json({
            reply
        });


    } catch (error) {

        console.error(
            "CHAT ROUTE ERROR:",
            error
        );


        res.status(500).json({

            reply:
                "❌ GroWell AI could not generate a response. Please check that the backend and Groq API are running."

        });

    }

});


module.exports = router;