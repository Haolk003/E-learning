"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
class AuthService {
    //register
    async registrationUser({ email, firstName, lastName, password, }) {
        const isEmailExist = await user_model_1.default.findOne({
            email,
            loginType: "password",
        });
        if (isEmailExist) {
            throw new errorHandle_1.default(400, "Email is Exist");
        }
        const { activationCode, token } = await (0, jwt_1.createActiveToken)({
            email,
            firstName,
            lastName,
        });
        await (0, sendEmail_1.default)({
            data: {
                user: { name: `${firstName} ${lastName}` },
                activationCode: activationCode,
            },
            email: email,
            template: "activation-email.ejs",
            subject: "Activate your account",
        });
        const user = await user_model_1.default.create({
            firstName,
            lastName,
            email,
            password,
            loginType: "password",
        });
        return { token, user };
    }
    //verify user from email
    async verifyUser({ activationCode, token }) {
        const verifyToken = jsonwebtoken_1.default.verify(token, process.env.ACTIVATION_KEY); // Adjust the type as necessary
        if (verifyToken.activationCode !== activationCode) {
            throw new errorHandle_1.default(400, "Invalid activation code");
        }
        const existEmail = await user_model_1.default.findOne({
            email: verifyToken.user.email,
        });
        if (!existEmail || existEmail.isVerified) {
            throw new errorHandle_1.default(400, "Invalid token");
        }
        existEmail.isVerified = true;
        const cart = await cart_model_1.default.create({
            userId: existEmail._id,
            totalPrice: 0,
        });
        await existEmail.save();
        return;
    }
    //login
    async loginUser({ email, password }) {
        const findUser = await user_model_1.default.findOne({ email, loginType: "password" });
        if (!findUser) {
            throw new errorHandle_1.default(400, "Email doesn't exist");
        }
        if (!findUser.isVerified) {
            throw new errorHandle_1.default(400, "Unverified account");
        }
        const isMatchPassword = await findUser.comparePassword(password);
        if (!isMatchPassword) {
            throw new errorHandle_1.default(400, "Password is not matched");
        }
        return findUser;
    }
    // send a link to email to retrieve your password
    async forgotPassword({ email }) {
        const isEmailExist = await user_model_1.default.findOne({ email: email });
        if (!isEmailExist) {
            throw new errorHandle_1.default(400, "Email doesn't exist");
        }
        const token = jsonwebtoken_1.default.sign({ id: isEmailExist._id, email: isEmailExist.email }, process.env.ACTIVATION_KEY, { expiresIn: "5m" });
        await (0, sendEmail_1.default)({
            data: {
                user: { name: `${isEmailExist.firstName} ${isEmailExist.lastName}` },
                link: `http://localhost:3000/reset-password/${token}`,
            },
            email: isEmailExist.email,
            subject: "Forgot Password",
            template: "forgot-password.ejs",
        });
        return token;
    }
    //reset password from mail
    async resetPassword({ token, newPassword, }) {
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.ACTIVATION_KEY); // Adjust the type as necessary
        if (!decodeToken) {
            throw new errorHandle_1.default(400, "Incorrect token");
        }
        const findUser = await user_model_1.default.findById(decodeToken.id);
        if (!findUser || findUser.email !== decodeToken.email) {
            throw new errorHandle_1.default(400, "User not found");
        }
        findUser.password = newPassword;
        await findUser.save();
        return;
    }
    //resend email
    async resendEmail({ email, firstName, lastName, }) {
        const { activationCode, token } = await (0, jwt_1.createActiveToken)({
            email,
            firstName,
            lastName,
        });
        await (0, sendEmail_1.default)({
            data: {
                user: { name: `${firstName} ${lastName}` },
                activationCode: activationCode,
            },
            email: email,
            template: "activation-email.ejs",
            subject: "Activate your account",
        });
        return token;
    }
}
exports.default = new AuthService();
