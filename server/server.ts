/// <reference path="../custom-types.d.ts" />

import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import cors from 'cors';
import findOrCreate from 'mongoose-findorcreate';
import { router } from './routers/apiRouter.js';
// import { FindOrCreateModel } from './findorcreate';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Could not connect to MongoDB:", err));

const userSchema: mongoose.Schema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user: any, done: any) {
  done(null, user.id);
});

passport.deserializeUser(function(id: any, done: any) {
  User.findById(id, function(err: any, user: any) {
    done(err, user);
  });
});

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   callbackURL: "http://localhost:4000/googlecallback",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
// (accessToken, refreshToken, profile, cb) => {
//   console.log(profile);

//   User.findOrCreate({ googleId: profile.id }, function (err: any, user: any) {
//     return cb(err, user);
//   });
// }
// ));

(passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:4000/googlecallback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
(accessToken, refreshToken, profile, cb) => {
  console.log(profile);

  (User as any).findOrCreate({ googleId: profile.id }, function (err: any, user: any) {
    return cb(err, user);
  });
}
)));

app.use("/api", router);
// app.use("/api/gpt", gptRouter);
// app.use("/api/yelp", yelpRouter)

// Google OAuth2.0 login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth2.0 callback route
app.get('/googlecallback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Successful login
  });

// Unknown route handler
app.use((req: Request, res: Response) => res.status(404).send('This is not the page you\'re looking for...'));

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(4000, function() {
  console.log("Starting on port 4000.");
});