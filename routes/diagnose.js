
const express = require("express");
const multer = require("multer");

const { analyzeCropImage } = require("../services/geminiVision");

const router = express.Router();

// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (!file.mimetype.startsWith("image/")) {

            return cb(
                new Error("Only image files are allowed.")
            );

        }

        cb(null, true);

    }
});


// =====================================================
// CROP DIAGNOSIS
// POST /api/diagnose
// =====================================================

router.post(
    "/",
    upload.single("image"),

    async (req, res) => {

        console.log("");
        console.log("======================================");
        console.log("🌿 CROP DIAGNOSIS REQUEST");
        console.log("======================================");


        try {

            // -------------------------------------------------
            // CHECK IMAGE
            // -------------------------------------------------

            if (!req.file) {

                console.log(
                    "❌ No image received."
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Please upload a crop image."

                });

            }


            console.log(
                "📷 Image received:",
                req.file.originalname
            );

            console.log(
                "📦 Image type:",
                req.file.mimetype
            );

            console.log(
                "📏 Image size:",
                req.file.size,
                "bytes"
            );


            // -------------------------------------------------
            // SEND IMAGE TO GEMINI
            // -------------------------------------------------

            console.log(
                "🤖 Sending image to Gemini..."
            );


            const result =
                await analyzeCropImage(req.file);


            console.log(
                "✅ Gemini diagnosis received."
            );

            console.log(
                "🌱 Crop:",
                result?.crop
            );

            console.log(
                "🦠 Disease:",
                result?.disease
            );

            console.log(
                "📊 Confidence:",
                result?.confidence
            );


            // -------------------------------------------------
            // RETURN RESULT
            // -------------------------------------------------

            return res.json({

                success: true,

                crop:
                    result?.crop ||
                    "Unknown",

                disease:
                    result?.disease ||
                    "No disease detected",

                confidence:
                    result?.confidence ??
                    0,

                severity:
                    result?.severity ||
                    "Unknown",

                symptoms:
                    result?.symptoms ||
                    [],

                cause:
                    result?.cause ||
                    "Unknown",

                organicTreatment:
                    result?.organicTreatment ||
                    [],

                chemicalTreatment:
                    result?.chemicalTreatment ||
                    [],

                prevention:
                    result?.prevention ||
                    [],

                recommendation:
                    result?.recommendation ||
                    "Monitor the crop carefully."

            });


        } catch (error) {

            console.error("");
            console.error(
                "❌ CROP DIAGNOSIS ERROR"
            );

            console.error(
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error?.message ||
                    "Failed to analyze crop image."

            });

        }

    }
);


// =====================================================
// MULTER / UPLOAD ERROR HANDLER
// =====================================================

router.use(
    (error, req, res, next) => {

        console.error(
            "❌ IMAGE UPLOAD ERROR:",
            error
        );


        if (
            error instanceof multer.MulterError
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `Image upload error: ${error.message}`

            });

        }


        if (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Unable to upload image."

            });

        }


        next();

    }
);


module.exports = router;
