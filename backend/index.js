const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://merntaskfront.netlify.app"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Define routes directly
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API Server is running!",
        version: "1.0.0",
        endpoints: {
            auth: "/api/register, /api/login",
            user: "/api/profile",
            tasks: "/api/tasks"
        }
    });
});

// Use the API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
});