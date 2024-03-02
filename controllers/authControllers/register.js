import bcrypt from "bcrypt";

import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password:hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

export default register;