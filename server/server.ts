import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { initializePassportAuthentication } from './passportAuthSetup.js';
import { SESSION_SECRET, MONGODB_URI } from './config.js';
import { router } from './routers/apiRouter.js';
import * as googleAuthController from './controllers/googleAuthController.js';

const app: Application = express();

app.use(express.json());
const corsOptions = { credentials: true, origin: 'http://localhost:3000' };
app.use(cors(corsOptions));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 * 60},
}));

// Initialize Passport Authentication
initializePassportAuthentication();
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch(err => console.log("Could not connect to MongoDB:", err));

// API Routes
app.use("/api", router);

// Google OAuth2.0 Routes
app.get('/auth/google', googleAuthController.googleAuth);
app.get('/googlecallback', googleAuthController.googleCallback);
app.get('/isAuthenticated', googleAuthController.isAuthenticated);
app.get('/logout', googleAuthController.logout);

// Unknown route handler
app.use((req: Request, res: Response) => res.status(404).send('This is not the page you\'re looking for...'));

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Express error details: ", err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(4000, () => {
  console.log("Starting on port 4000.");
});