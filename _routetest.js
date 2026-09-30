require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
app.use("/api/market", require("./routes/market"));
app.listen(3111, () => console.log("test up"));
