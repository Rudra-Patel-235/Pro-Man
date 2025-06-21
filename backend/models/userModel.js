import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Exclude password from queries by default
    },

    Pic : {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    lastlogin: {
        type: Date,   
    },

    is2FA : {
        type: Boolean,
        default: false
    },

    FAotp : {
        type: String,
        select: false // Exclude FAotp from queries by default
    },

    FAotpExpires : {
        type: Date,
        select: false // Exclude FAotpExpires from queries by default
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;