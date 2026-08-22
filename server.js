require("dotenv").config();
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
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// =========================
// API ROUTES
// =========================

app.use("/api/weather", weatherRoute);

app.use("/api/chat", chatRoute);

app.use("/api/market", marketRoutes);

app.use("/api/diagnose", diagnoseRoute);

app.use("/api/soil", soilRoutes);

app.use("/api/decision", decisionRoutes);

// 🔐 AUTHENTICATION
app.use("/api/auth", authRoute);


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
// 404
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