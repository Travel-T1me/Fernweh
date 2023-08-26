import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";
import { Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// https://github.com/openai/openai-node/blob/master/README.md
export const getCompletion = async (req: Request, res: Response) => {
  try {
    const prompt = req.body.prompt as string;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo"
    });

    return res.json(completion.choices);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      return res.status(error.status).json({ error: error.name });
    }
    return res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

{/* 
Testing in Postman

POST: http://localhost:4000/api/gpt/complete

BODY:
{
  "prompt": "Translate the following English text to French: 'Hello, world!'"
}

RESPONSE:
[
    {
        "index": 0,
        "message": {
            "role": "assistant",
            "content": "Bonjour, monde !"
        },
        "finish_reason": "stop"
    }
]
*/}
