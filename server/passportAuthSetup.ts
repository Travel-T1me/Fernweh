import passport from 'passport';
import { User } from './userSchema.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const initializePassportAuthentication = () => {
  passport.use(User.createStrategy());

  passport.serializeUser((user: any, done: any) => {
    // console.log("Serializing user: ", user);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: any, done: any) => {
    try {
      // console.log("Deserializing id: ", id);
      const user = await User.findById(id);
      // console.log("Deserialized user: ", user);
      done(null, user);
    } catch (err) {
      // console.log("Error during deserialization: ", err);
      done(err, null);
    }
  }); 

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/googlecallback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      // User already exists, proceed
      if (existingUser) return cb(null, existingUser);
      // If the user does not exist, create a new user record
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.emails[0].value,
      });
      await newUser.save();
      return cb(null, newUser);
    } catch (err) {
      return cb(err, null);
    }
  }));  
};