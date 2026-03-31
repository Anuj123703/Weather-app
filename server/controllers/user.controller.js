import {User} from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const getProfile = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
export const googleAuth = async (req, res) => {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            username: name,
            email,
            password: "google-auth", // dummy
        });
    }

    const token = generateToken(user._id);

    res.json({
        success: true,
        token,
        user,
    });
};