import bcrypt from "bcrypt";
import gravatar from "gravatar";

import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";


const register = async (req, res) => {
    const { email, password } = req.body;
    console.log('email', email)
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    console.log('avatarURL', gravatar.url(email))

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

export default register;