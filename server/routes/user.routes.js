import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.Controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { googleAuth } from "../controllers/user.controller.js"

const userRoutes = Router();
userRoutes.post("/google", googleAuth);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", verifyjwt, (req, res) => {
    res.json({
        success: true,
        message: "User profile retrieved successfully",
        user: req.user
    });
});


export default userRoutes; 