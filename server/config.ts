import dotenv from 'dotenv';
dotenv.config();

export const SESSION_SECRET = process.env.SESSION_SECRET || 'default_secret';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/default_db';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;