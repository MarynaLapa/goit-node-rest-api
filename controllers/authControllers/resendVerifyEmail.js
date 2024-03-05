import HttpError from "../../helpers/HttpError.js";
import sendEmail from "../../helpers/sendEmail.js";
import User from "../../models/user.js";

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email not found");
    };

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    };

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank" rel="noopener noreferrer">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent",
    });
    
};

export default resendVerifyEmail;