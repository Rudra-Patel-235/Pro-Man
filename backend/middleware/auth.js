import jwt from "jsonwebtoken"; 
import User from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch(error){
        console.log("Error in isAuthenticated: " ,error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default isAuthenticated;