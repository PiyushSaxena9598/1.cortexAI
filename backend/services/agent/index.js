
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/agent.route.js";

dotenv.config();

const port = process.env.PORT || 8003;

const app = express();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Agent service is running"
    });
});

// Agent routes
app.use("/", router);

// Error handling middleware (always after routes)
app.use((err, req, res, next) => {
    console.error("Agent Error:", err);

    if (err.status) {
        return res.status(err.status).json(err.data || {
            message: err.message
        });
    }

    return res.status(500).json({
        message: `Agent error: ${err.message}`
    });
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`Agent started at ${port}`);

    connectDb().catch((err) => {
        console.error("Database connection failed:", err);
    });
});
