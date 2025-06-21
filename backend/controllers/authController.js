import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Verification from "../models/verificationModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import aj from "../utils/arcjet.js";


export const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        console.log(name, email, password)

        // check if Email is valid means exists or not
        const decision = await aj.protect(req, { email });
        console.log("Arcjet decision", decision.isDenied());

        if(decision.isDenied()) {
            res.writeHead(403, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "It's not an existing email address" }));
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword // Note: Password should be hashed before saving in production
        });

        // Send verification email
        const verificationToken = await jwt.sign(
            {userId : newUser._id, purpose: 'email-verification'},
            process.env.JWT_SECRET,
            { expiresIn : '1h' }
        )

        await Verification.create({
            userId: newUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 1*60*60*1000)
        })

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const emailBody = `<p> click <a href="${verificationLink}" target="_blank"> here </a> to verify your email.</p>`;
        const emailSubject = "Email Verification - ProMan";

        const isSent = await sendEmail(email, emailSubject, emailBody);

        if(!isSent){
            return res.status(500).json({
                message: 'Failed to send verification email'
            })
        }

        res.status(201).json({
            message: 'Verification link has been sent to your email. Please verify'
        })

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {}


export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if(!payload){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { userId, purpose } = payload;

        if(purpose !== "email-verification"){
        return res.status(401).json({ message: "Unauthorized" });
        }

        const verification = await Verification.findOne({
            userId,
            token,
        });

        if(!verification){
        return res.status(401).json({ message: "Unauthorized" });
        }

        const isTokenExpired = verification.expiresAt < new Date();

        if(isTokenExpired){
        return res.status(401).json({ message: "Token expired" });
        }

        const user = await User.findById(userId);

        if(!user){
        return res.status(401).json({ message: "Unauthorized" });
        }

        if(user.isVerified){
        return res.status(400).json({ message: "Email already verified" });
        }

        user.isVerified = true;
        await user.save();

        await Verification.findByIdAndDelete(verification._id);

        res.status(200).json({ message: "Email verified successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};