import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const app = express(); // ✅ SABSE PEHLE

// 🔥 COOP FIX (IMPORTANT)
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

// ✅ CORS
app.use(cors({
    origin: "*"
}));

app.use(express.json());

// routes
app.use("/api/auth/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Weather API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});