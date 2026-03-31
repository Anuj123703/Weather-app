import asynchandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyjwt = asynchandler(async (req, res, next) => {
    // steps to verify token
    /*1. Get token from req.headers
    2. Validate token
    3. If valid, attach user data to req.user and call next()
    4. If invalid, throw error
     */
    // 1. Get token from req.headers
    const authHeader = req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization : null;

    if (!authHeader) {
        throw new ApiError(401, "Authorization token is required");
    }
    // 3. If valid, attach user data to req.user and call next()
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;

        next();

    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
})