require("dotenv").config();
const path = require("path");
const fs = require("fs");
console.log("🔎 GOOGLE CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("🔎 JWT SECRET LOADED:", !!process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");

// =========================
// ROUTES
// =========================

const weatherRoute = require("./routes/weather");
const chatRoute = require("./routes/chat");
const diagnoseRoute = require("./routes/diagnose");
const marketRoutes = require("./routes/market");
const soilRoutes = require("./routes/soil");
const decisionRoutes = require("./routes/decision");
const authRoute = require("./routes/auth");
const translateRoute = require("./routes/translate");


// =========================
// APP
// =========================

const app = express();

const PORT = process.env.PORT || 3000;


// =========================
// MIDDLEWARE
// =========================

app.use(
    cors({
        origin(origin, callback) {
            callback(null, origin || true);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// =========================
// API ROUTES (must come before static)
// =========================

app.use("/api/weather", weatherRoute);

app.use("/api/chat", chatRoute);

app.use("/api/market", marketRoutes);

app.use("/api/diagnose", diagnoseRoute);

app.use("/api/soil", soilRoutes);

app.use("/api/decision", decisionRoutes);

// 🔐 AUTHENTICATION
app.use("/api/auth", authRoute);

// 🌐 TRANSLATION
app.use("/api/translate", translateRoute);


// =========================
// STATUS
// =========================

app.get("/api/status", (req, res) => {

    res.json({
        success: true,
        name: "GroWell AI",
        status: "Online",
        message: "Agricultural Intelligence System Ready 🌱"
    });

});


// =========================
// SERVE REACT APP (client/dist)
// =========================

const clientDist = path.join(__dirname, "client", "dist");

if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));

    // SPA fallback — serve index.html for any non-API path
    app.use((req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }

        res.sendFile(path.join(clientDist, "index.html"));
    });
} else {
    app.use(express.static("public"));
}


// =========================
// 404 (API only)
// =========================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found."
    });

});


// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {

    console.error("");
    console.error("======================================");
    console.error("❌ SERVER ERROR");
    console.error("======================================");
    console.error(err);
    console.error("======================================");
    console.error("");

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("🌱 GroWell AI Backend Started");
    console.log("======================================");
    console.log(`🚀 Server : http://localhost:${PORT}`);
    console.log(`📡 Status : http://localhost:${PORT}/api/status`);
    console.log(`🔐 Auth   : http://localhost:${PORT}/api/auth`);
    console.log("======================================");
    console.log("");

});