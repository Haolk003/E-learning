import passport from "passport";
import jwt from "jsonwebtoken";

import { Strategy as Oauth2Strategy } from "passport-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";

import userModel from "../models/user.model";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  done(null, user);
});

passport.use(
  new Oauth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_HOST}/api/v1/google/callback`,
      authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenURL: "https://oauth2.googleapis.com/token",
      passReqToCallback: true,
      state: true,
    },
    async function (
      request: any,
      accessToken: string,
      refreshToken: string,
      params,
      profile: any,
      cb: any
    ) {
      const idToken = params["id_token"];

      const googleData: any = jwt.decode(idToken);
      const isEmailExist = await userModel.findOne({
        googleUserId: googleData.sub,
      });
      if (!isEmailExist) {
        const newUser = await userModel.create({
          email: googleData.email,
          avatar: { url: googleData.pirture },
          firstName: googleData.given_name,
          lastName: googleData.family_name,
          isVerified: true,
          googleUserId: googleData.sub,
          loginType: "google",
        });
        cb(null, newUser);
      } else {
        isEmailExist.isVerified = true;
        await isEmailExist.save();
        cb(null, isEmailExist);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET_KEY as string,
      callbackURL: `${process.env.BACKEND_HOST}/api/v1/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email", "name"],
    },
    async function (accessToken, refeshToken, profile, cb) {
      const isUserExist = await userModel.findOne({
        loginType: "facebook",
        facebookUserId: profile.id,
      });
      if (!isUserExist) {
        const newUser = await userModel.create({
          facebookUserId: profile.id,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          loginType: "facebook",
          isVerified: true,
          avatar: { url: profile._json.picture.data.url },
        });
        cb(null, newUser);
      } else {
        cb(null, isUserExist);
      }
    }
  )
);
