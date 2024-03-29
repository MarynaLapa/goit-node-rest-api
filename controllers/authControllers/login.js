import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotevn from 'dotenv';

import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    dotevn.config()
    const { SECRET_KEY } = process.env;

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email,
            subscription: user.subscription
        }
    });
};

export default login;