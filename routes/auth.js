const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const db = require("../database/database");

const router = express.Router();

// =====================================================
// CONFIGURATION
// =====================================================

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "growell-development-secret";

const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID || "";

const googleClient =
    new OAuth2Client();

// =====================================================
// SERVER CONFIG CHECK
// =====================================================

console.log("");
console.log("======================================");
console.log("🔐 GroWell AI Authentication");
console.log("======================================");

if (GOOGLE_CLIENT_ID) {
    console.log("✅ Google Client ID loaded");
} else {
    console.log("❌ Google Client ID NOT loaded");
}

if (process.env.JWT_SECRET) {
    console.log("✅ JWT secret loaded");
} else {
    console.log("⚠️ Using development JWT secret");
}

console.log("======================================");
console.log("");


// =====================================================
// GOOGLE LOGIN
// =====================================================

router.post("/google", async (req, res) => {

    try {

        console.log("");
        console.log("🔐 GOOGLE LOGIN REQUEST");

        const { credential } = req.body;

        // -----------------------------------------
        // CHECK GOOGLE CLIENT ID
        // -----------------------------------------

        if (!GOOGLE_CLIENT_ID) {

            console.error(
                "❌ GOOGLE_CLIENT_ID is missing."
            );

            return res.status(500).json({

                success: false,

                message:
                    "Google authentication is not configured on the server."

            });

        }

        // -----------------------------------------
        // CHECK CREDENTIAL
        // -----------------------------------------

        if (!credential) {

            console.error(
                "❌ Google credential missing."
            );

            return res.status(400).json({

                success: false,

                message:
                    "Google credential is missing."

            });

        }

        console.log(
            "🔎 Google credential received"
        );

        // -----------------------------------------
        // VERIFY GOOGLE TOKEN
        // -----------------------------------------

        const ticket =
            await googleClient.verifyIdToken({

                idToken: credential,

                audience:
                    GOOGLE_CLIENT_ID

            });

        const payload =
            ticket.getPayload();

        if (!payload) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid Google account information."

            });

        }

        // -----------------------------------------
        // GOOGLE USER DATA
        // -----------------------------------------

        const googleId =
            payload.sub;

        const email =
            payload.email
                ?.trim()
                .toLowerCase();

        const name =
            payload.name ||
            "GroWell Farmer";

        const picture =
            payload.picture ||
            "";

        const emailVerified =
            payload.email_verified === true;

        // -----------------------------------------
        // VALIDATE GOOGLE DATA
        // -----------------------------------------

        if (!googleId) {

            return res.status(401).json({

                success: false,

                message:
                    "Google account ID is missing."

            });

        }

        if (!email) {

            return res.status(401).json({

                success: false,

                message:
                    "Google account email is missing."

            });

        }

        if (!emailVerified) {

            return res.status(401).json({

                success: false,

                message:
                    "Your Google email is not verified."

            });

        }

        console.log(
            "✅ GOOGLE ACCOUNT VERIFIED"
        );

        console.log(
            "📧 Email:",
            email
        );

        console.log(
            "👤 Name:",
            name
        );

        // =================================================
        // FIND USER
        // =================================================

        db.get(

            "SELECT * FROM users WHERE email = ?",

            [email],

            async (err, existingUser) => {

                if (err) {

                    console.error(
                        "❌ DATABASE ERROR:",
                        err
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error while checking your account."

                    });

                }

                // =================================================
                // EXISTING USER
                // =================================================

                if (existingUser) {

                    console.log(
                        "🔐 Existing GroWell account found."
                    );

                    console.log(
                        "👤 User ID:",
                        existingUser.id
                    );

                    // -----------------------------------------
                    // CREATE JWT
                    // -----------------------------------------

                    const token =
                        jwt.sign(

                            {

                                id:
                                    existingUser.id,

                                email:
                                    existingUser.email

                            },

                            JWT_SECRET,

                            {

                                expiresIn:
                                    "7d"

                            }

                        );

                    console.log(
                        "✅ JWT CREATED"
                    );

                    // -----------------------------------------
                    // RETURN USER
                    // -----------------------------------------

                    return res.json({

                        success: true,

                        message:
                            "Google login successful.",

                        token,

                        user: {

                            id:
                                existingUser.id,

                            name:
                                existingUser.name,

                            email:
                                existingUser.email,

                            picture

                        }

                    });

                }

                // =================================================
                // NEW GOOGLE USER
                // =================================================

                console.log(
                    "🌱 Creating new GroWell Google account..."
                );

                try {

                    // -----------------------------------------
                    // GOOGLE USERS DON'T NEED A REAL PASSWORD
                    // -----------------------------------------

                    const randomPassword =
                        crypto
                            .randomBytes(32)
                            .toString("hex");

                    const hashedPassword =
                        await bcrypt.hash(

                            randomPassword,

                            12

                        );

                    // -----------------------------------------
                    // INSERT USER
                    // -----------------------------------------

                    db.run(

                        `INSERT INTO users
                        (name, email, password)
                        VALUES (?, ?, ?)`,

                        [

                            name.trim(),

                            email,

                            hashedPassword

                        ],

                        function (insertError) {

                            if (insertError) {

                                console.error(
                                    "❌ GOOGLE USER INSERT ERROR:",
                                    insertError
                                );

                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "Unable to create your GroWell account."

                                });

                            }

                            const userId =
                                this.lastID;

                            console.log(
                                "✅ GOOGLE USER CREATED"
                            );

                            console.log(
                                "👤 User ID:",
                                userId
                            );

                            // -----------------------------------------
                            // CREATE JWT
                            // -----------------------------------------

                            const token =
                                jwt.sign(

                                    {

                                        id:
                                            userId,

                                        email:
                                            email

                                    },

                                    JWT_SECRET,

                                    {

                                        expiresIn:
                                            "7d"

                                    }

                                );

                            console.log(
                                "✅ JWT CREATED"
                            );

                            // -----------------------------------------
                            // RETURN USER
                            // -----------------------------------------

                            return res.status(201).json({

                                success: true,

                                message:
                                    "Google account created successfully.",

                                token,

                                user: {

                                    id:
                                        userId,

                                    name:
                                        name.trim(),

                                    email,

                                    picture

                                }

                            });

                        }

                    );

                }

                catch (error) {

                    console.error(
                        "❌ GOOGLE ACCOUNT CREATION ERROR:",
                        error
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Unable to create your GroWell account."

                    });

                }

            }

        );

    }

    catch (error) {

        console.error("");
        console.error(
            "❌ GOOGLE AUTHENTICATION ERROR"
        );
        console.error(error);
        console.error("");

        return res.status(401).json({

            success: false,

            message:
                "Google account verification failed."

        });

    }

});


// =====================================================
// AUTHENTICATION MIDDLEWARE
// =====================================================

function authenticateToken(
    req,
    res,
    next
) {

    const authHeader =
        req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Authentication required."

        });

    }

    const token =
        authHeader
            .split(" ")[1];

    if (!token) {

        return res.status(401).json({

            success: false,

            message:
                "Authentication token missing."

        });

    }

    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );

        req.user =
            decoded;

        next();

    }

    catch (error) {

        console.error(
            "⚠️ INVALID OR EXPIRED TOKEN"
        );

        return res.status(401).json({

            success: false,

            message:
                "Session expired. Please sign in again."

        });

    }

}


// =====================================================
// NORMAL REGISTER
// =====================================================

router.post(
    "/register",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;

            // -----------------------------------------
            // VALIDATION
            // -----------------------------------------

            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Name, email and password are required."

                });

            }

            if (password.length < 6) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must contain at least 6 characters."

                });

            }

            const cleanName =
                name.trim();

            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();

            // -----------------------------------------
            // CHECK USER
            // -----------------------------------------

            db.get(

                "SELECT id FROM users WHERE email = ?",

                [normalizedEmail],

                async (
                    err,
                    existingUser
                ) => {

                    if (err) {

                        console.error(
                            "❌ REGISTER DATABASE ERROR:",
                            err
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Database error."

                        });

                    }

                    if (existingUser) {

                        return res.status(409).json({

                            success: false,

                            message:
                                "An account with this email already exists."

                        });

                    }

                    // -----------------------------------------
                    // HASH PASSWORD
                    // -----------------------------------------

                    const hashedPassword =
                        await bcrypt.hash(
                            password,
                            12
                        );

                    // -----------------------------------------
                    // CREATE USER
                    // -----------------------------------------

                    db.run(

                        `INSERT INTO users
                        (name, email, password)
                        VALUES (?, ?, ?)`,

                        [

                            cleanName,

                            normalizedEmail,

                            hashedPassword

                        ],

                        function (insertError) {

                            if (insertError) {

                                console.error(
                                    "❌ USER CREATION ERROR:",
                                    insertError
                                );

                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "Unable to create account."

                                });

                            }

                            console.log(
                                "🌱 New GroWell user:",
                                normalizedEmail
                            );

                            return res.status(201).json({

                                success: true,

                                message:
                                    "Account created successfully.",

                                user: {

                                    id:
                                        this.lastID,

                                    name:
                                        cleanName,

                                    email:
                                        normalizedEmail

                                }

                            });

                        }

                    );

                }

            );

        }

        catch (error) {

            console.error(
                "❌ REGISTER ERROR:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to create account."

            });

        }

    }

);


// =====================================================
// NORMAL LOGIN
// =====================================================

router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            // -----------------------------------------
            // VALIDATION
            // -----------------------------------------

            if (
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email and password are required."

                });

            }

            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();

            // -----------------------------------------
            // FIND USER
            // -----------------------------------------

            db.get(

                "SELECT * FROM users WHERE email = ?",

                [normalizedEmail],

                async (
                    err,
                    user
                ) => {

                    if (err) {

                        console.error(
                            "❌ LOGIN DATABASE ERROR:",
                            err
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Database error."

                        });

                    }

                    if (!user) {

                        return res.status(401).json({

                            success: false,

                            message:
                                "Invalid email or password."

                        });

                    }

                    // -----------------------------------------
                    // CHECK PASSWORD
                    // -----------------------------------------

                    try {

                        const passwordMatch =
                            await bcrypt.compare(
                                password,
                                user.password
                            );

                        if (!passwordMatch) {

                            return res.status(401).json({

                                success: false,

                                message:
                                    "Invalid email or password."

                            });

                        }

                    }

                    catch (passwordError) {

                        console.error(
                            "❌ PASSWORD CHECK ERROR:",
                            passwordError
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Unable to verify password."

                        });

                    }

                    // -----------------------------------------
                    // CREATE JWT
                    // -----------------------------------------

                    const token =
                        jwt.sign(

                            {

                                id:
                                    user.id,

                                email:
                                    user.email

                            },

                            JWT_SECRET,

                            {

                                expiresIn:
                                    "7d"

                            }

                        );

                    console.log(
                        "🔐 User logged in:",
                        user.email
                    );

                    return res.json({

                        success: true,

                        message:
                            "Login successful.",

                        token,

                        user: {

                            id:
                                user.id,

                            name:
                                user.name,

                            email:
                                user.email

                        }

                    });

                }

            );

        }

        catch (error) {

            console.error(
                "❌ LOGIN ERROR:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to login."

            });

        }

    }

);


// =====================================================
// CURRENT SESSION
// =====================================================

router.get(
    "/me",
    authenticateToken,
    (req, res) => {

        db.get(

            `SELECT
                id,
                name,
                email
             FROM users
             WHERE id = ?`,

            [req.user.id],

            (err, user) => {

                if (err) {

                    console.error(
                        "❌ SESSION DATABASE ERROR:",
                        err
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });

                }

                if (!user) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "User account no longer exists."

                    });

                }

                return res.json({

                    success: true,

                    message:
                        "Session is valid.",

                    user: {

                        id:
                            user.id,

                        name:
                            user.name,

                        email:
                            user.email

                    }

                });

            }

        );

    }

);


// =====================================================
// LOGOUT
// =====================================================

router.post(
    "/logout",
    authenticateToken,
    (req, res) => {

        console.log(
            "👋 User logged out:",
            req.user.email
        );

        return res.json({

            success: true,

            message:
                "Logged out successfully."

        });

    }

);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;