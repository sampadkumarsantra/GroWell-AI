const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const db = require("../database/pool");
const {
    signToken,
    authenticateToken,
    ensureSubscription,
    describeUser
} = require("../middleware/auth");

const router = express.Router();


// =====================================================
// CONFIGURATION
// =====================================================

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "growell-development-secret";

const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID || "";

const googleClient = new OAuth2Client();


if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
    console.warn(
        "🚨 JWT_SECRET is not set. Sessions are signed with a publicly known value. Set it before taking payments."
    );
}


// =====================================================
// REGISTER
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

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Name, email and password are required."
                });
            }

            if (String(password).length < 6) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password must contain at least 6 characters."
                });
            }

            const cleanName = name.trim();
            const normalizedEmail = email
                .trim()
                .toLowerCase();

            const existing = await db.get(
                "SELECT id FROM users WHERE email = $1",
                [normalizedEmail]
            );

            if (existing) {
                return res.status(409).json({
                    success: false,
                    message:
                        "An account with this email already exists."
                });
            }

            const hashedPassword = await bcrypt.hash(
                password,
                12
            );

            const result = await db.get(
                `INSERT INTO users (name, email, password)
                 VALUES ($1, $2, $3)
                 RETURNING id`,
                [
                    cleanName,
                    normalizedEmail,
                    hashedPassword
                ]
            );

            await ensureSubscription(result.id);

            console.log(
                "🌱 New GroWell user:",
                normalizedEmail
            );

            return res.status(201).json({
                success: true,
                message: "Account created successfully.",
                user: {
                    id: result.id,
                    name: cleanName,
                    email: normalizedEmail
                }
            });

        } catch (error) {

            console.error(
                "❌ REGISTER ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to create account."
            });

        }

    }
);


// =====================================================
// LOGIN
// =====================================================

router.post(
    "/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email and password are required."
                });
            }

            const normalizedEmail = email
                .trim()
                .toLowerCase();

            const user = await db.get(
                "SELECT * FROM users WHERE email = $1",
                [normalizedEmail]
            );

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            const token = signToken(user);

            await ensureSubscription(user.id);

            const profile = await describeUser(user);

            console.log(
                `🔐 User logged in: ${user.email} [${profile.plan}]`
            );

            return res.json({
                success: true,
                message: "Login successful.",
                token,
                user: profile
            });

        } catch (error) {

            console.error(
                "❌ LOGIN ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to login."
            });

        }

    }
);


// =====================================================
// GOOGLE LOGIN
// =====================================================

router.post(
    "/google",
    async (req, res) => {

        try {

            const { credential } = req.body;

            if (!GOOGLE_CLIENT_ID) {
                return res.status(500).json({
                    success: false,
                    message:
                        "Google authentication is not configured on the server."
                });
            }

            if (!credential) {
                return res.status(400).json({
                    success: false,
                    message: "Google credential is missing."
                });
            }

            const ticket =
                await googleClient.verifyIdToken({
                    idToken: credential,
                    audience: GOOGLE_CLIENT_ID
                });

            const payload = ticket.getPayload();

            if (!payload) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Google account information."
                });
            }

            const googleId = payload.sub;
            const email = payload.email
                ?.trim()
                .toLowerCase();
            const name = payload.name || "GroWell Farmer";
            const picture = payload.picture || "";

            if (!googleId) {
                return res.status(401).json({
                    success: false,
                    message: "Google account ID is missing."
                });
            }

            if (!email) {
                return res.status(401).json({
                    success: false,
                    message: "Google account email is missing."
                });
            }

            if (payload.email_verified !== true) {
                return res.status(401).json({
                    success: false,
                    message: "Your Google email is not verified."
                });
            }

            let user = await db.get(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            if (user) {
                user = await db.get(
                    `UPDATE users
                     SET picture = COALESCE(NULLIF($1, ''), picture)
                     WHERE id = $2
                     RETURNING *`,
                    [picture, user.id]
                );
            } else {
                const randomPassword = crypto
                    .randomBytes(32)
                    .toString("hex");

                const hashedPassword =
                    await bcrypt.hash(randomPassword, 12);

                user = await db.get(
                    `INSERT INTO users
                        (name, email, password, picture, google_id)
                     VALUES ($1, $2, $3, $4, $5)
                     ON CONFLICT (email) DO UPDATE SET
                        picture = EXCLUDED.picture
                     RETURNING *`,
                    [
                        name.trim(),
                        email,
                        hashedPassword,
                        picture,
                        googleId
                    ]
                );
            }

            await ensureSubscription(user.id);

            const token = signToken(user);
            const profile = await describeUser(user);

            console.log(
                `🔐 Google login: ${user.email} [${profile.plan}]`
            );

            return res.json({
                success: true,
                message: "Google login successful.",
                token,
                user: profile
            });

        } catch (error) {

            console.error(
                "❌ GOOGLE AUTH ERROR:",
                error
            );

            return res.status(401).json({
                success: false,
                message:
                    "Google account verification failed."
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
    async (req, res) => {

        try {

            const user = await db.get(
                `SELECT id, name, email, picture
                 FROM users
                 WHERE id = $1`,
                [req.user.id]
            );

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User account no longer exists."
                });
            }

            await ensureSubscription(user.id);

            return res.json({
                success: true,
                message: "Session is valid.",
                user: await describeUser(user)
            });

        } catch (error) {

            console.error(
                "❌ SESSION ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Database error."
            });

        }

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
            message: "Logged out successfully."
        });

    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;
