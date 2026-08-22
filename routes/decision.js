const express = require("express");

const {
    generateDecision
} = require("../services/growellDecision");

const router = express.Router();


router.post("/", async (req, res) => {

    try {

        console.log(
            "🧠 GroWell Decision Request"
        );

        const decision =
            await generateDecision(req.body);


        res.json({

            success: true,

            decision

        });

    } catch (error) {

        console.error(
            "❌ Decision Route Error:"
        );

        console.error(error);


        const status =
            error.statusCode || 500;


        res.status(status).json({

            success: false,

            message:
                error.message ||
                "Unable to generate GroWell decision."

        });

    }

});


module.exports = router;