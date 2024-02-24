import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

export const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

export default User;
