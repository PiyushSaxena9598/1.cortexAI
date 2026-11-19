
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/billing.route.js";

dotenv.config();

const port = process.env.PORT || 8004;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Billing Service is running"
    });
});

app.use("/", router);

app.listen(port, "0.0.0.0", async () => {
    console.log(`Billing Service started at ${port}`);

    try {
        await connectDb();
        console.log("Billing Database connected");
    } catch (error) {
        console.error("Billing Database connection failed:", error);
    }
});
