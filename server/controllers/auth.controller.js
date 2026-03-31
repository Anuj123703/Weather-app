import asynchandler from "express-async-handler";
import { User } from "../models/user.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = asynchandler(async (req, res) => {
    // steps to register user
    /*1. Get user data from req.body
    2. Validate user data
    3. Check if user already exists
    4. Hash password
    5. Save user to database
    6. generate token 
    7. Return success response with user data (excluding password) and token
     */

    // 1. Get user data from req.body
    const { username, email, password } = req.body

    // 2. Validate user data
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        throw new ApiError(400, "Username or Email and Password are required");
    }

    // clean username and email
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 3. Check if user already exists
    const userExists = await User.findOne(
        {
            $or: [
                { username: cleanUsername },
                { email: cleanEmail }
            ]
        }
    )
    if (userExists) {
        throw new ApiError(409, "User with this username or email already exists");
    }
    // validate password length
    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }
    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    // 5. Save user to database
    const user = await User.create({
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword
    })
    // check if user is created
    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }
    // 6. generate token
    const token = generateToken(user._id);
    // 7. Return success response with user data (excluding password) and token
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        }
    })


})
const loginUser = asynchandler(async (req, res) => {
    // steps to login user
    /*1. Get user data from req.body
    2. Validate user data
    3. Check if user exists
        4. Compare password
    5. Generate token
    6. Send token in response with user data (excluding password)

     */
    // 1. Get user data from req.body
    const {username, email, password } = req.body
    // 2. Validate user data
    if ((!email?.trim() && !username?.trim()) || !password?.trim()) {
        throw new ApiError(400, "Username or Email and Password are required");
    }
    // clean email and username 
    const cleanEmail = email?.trim().toLowerCase();
    const cleanUsername = username?.trim();
    const cleanPassword = password?.trim();
    // 3. Check if user exists
    const user = await User
        .findOne({ $or: [{ email: cleanEmail }, { username: cleanUsername }] })
        .select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid username, email or password");
    }
    // 4. Compare password
    const isPasswordMatch = await bcrypt.compare(cleanPassword, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid username, email or password");
    }
    // 5. Generate token
    const token = generateToken(user._id);
    // 6. Send token in response with user data (excluding password)
    res.status(200).json(
        {
            success: true,
            message: "User Logged in successfully",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                token
            }
        }
    )
})
export {
    registerUser,
    loginUser
}