import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, 'User not found')
    };
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.json({
        message: 'Verification successful',
    });
};

export default verifyEmail;