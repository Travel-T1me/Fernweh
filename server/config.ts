import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const PEXELS_API_KEY = process.env.PEXELS_API_KEY!;
export const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
export const SESSION_SECRET = process.env.SESSION_SECRET!;