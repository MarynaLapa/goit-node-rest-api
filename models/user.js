import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

export const emailRegaxp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const subscriptionEnum = ["starter", "pro", "business"];

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegaxp,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlenght: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: subscriptionEnum,
        default: "starter",
    },
    avatarURL: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false
    },
    verificationCode
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

export default User;
