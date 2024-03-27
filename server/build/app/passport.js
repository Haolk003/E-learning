"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_oauth2_1 = require("passport-oauth2");
const passport_facebook_1 = require("passport-facebook");
const user_model_1 = __importDefault(require("../models/user.model"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (user, done) => {
    done(null, user);
});
passport_1.default.use(new passport_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV !== "production"
        ? `${process.env.BACKEND_HOST}/api/v1/google/callback`
        : `${process.env.BACKEND_HOST2}/api/v1/google/callback`,
    authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenURL: "https://oauth2.googleapis.com/token",
    passReqToCallback: true,
    state: true,
}, async function (request, accessToken, refreshToken, params, profile, cb) {
    const idToken = params["id_token"];
    const googleData = jsonwebtoken_1.default.decode(idToken);
    const isEmailExist = await user_model_1.default.findOne({
        googleUserId: googleData.sub,
    });
    if (!isEmailExist) {
        const newUser = await user_model_1.default.create({
            email: googleData.email,
            avatar: { url: googleData.pirture },
            firstName: googleData.given_name,
            lastName: googleData.family_name,
            isVerified: true,
            googleUserId: googleData.sub,
            loginType: "google",
        });
        cb(null, newUser);
    }
    else {
        isEmailExist.isVerified = true;
        await isEmailExist.save();
        cb(null, isEmailExist);
    }
}));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: process.env.NODE_ENV !== "production"
        ? `${process.env.BACKEND_HOST}/api/v1/facebook/callback`
        : `${process.env.BACKEND_HOST2}/api/v1//callback`,
    profileFields: ["id", "displayName", "photos", "email", "name"],
}, async function (accessToken, refeshToken, profile, cb) {
    const isUserExist = await user_model_1.default.findOne({
        loginType: "facebook",
        facebookUserId: profile.id,
    });
    if (!isUserExist) {
        const newUser = await user_model_1.default.create({
            facebookUserId: profile.id,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            loginType: "facebook",
            isVerified: true,
            avatar: { url: profile._json.picture.data.url },
        });
        cb(null, newUser);
    }
    else {
        cb(null, isUserExist);
    }
}));
