import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gptRouter from "./routers/gptRouter.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/gpt", gptRouter);

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

mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log('Starting on port 4000');
    app.listen(4000);    
});