import passport from 'passport';
import { User } from './userSchema.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const initializePassportAuthentication = () => {
  passport.use(User.createStrategy());

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/googlecallback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  }, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    (User as any).findOrCreate({ googleId: profile.id }, (err: any, user: any) => {
      return cb(err, user);
    });
  }));
};