import HttpError from "../../helpers/HttpError";
import User from "../../models/user";

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(401, "")
    }
};

export default verifyEmail;