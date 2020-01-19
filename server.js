const express = require("express");
const app = express();
const connectDB = require("./config/db");

// to connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// test get API
app.get("/", (req, res) => res.send("API Running Successfully...."));

// Define the Routes here
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/task", require("./routes/task.routes"));

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
