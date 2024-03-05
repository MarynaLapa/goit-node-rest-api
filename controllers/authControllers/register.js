import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import dotevn from 'dotenv';

import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";
import sendEmail from "../../helpers/sendEmail.js";

dotevn.config();
const { BASE_URL } = process.env; 

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

export default register;