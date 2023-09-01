import OpenAI from "openai";
import { NextFunction, Request, Response } from "express";
import ResponseText from '../responseSchema.js';
import mongoose from "mongoose";
import { cacheRead, cacheWrite } from './cacheController.js'
import { OPENAI_API_KEY } from '../config.js';


const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

interface IRequestText {
  Budget: string;
  Location: {
    location: string;
    latLong: string;
    start: Date;
    end: Date;
  };
  Travellers: number;
  Restaurants: Array<{
    name: string;
    rating: number;
    price_range: string;
  }>;
  Forecast: Array<{
    temp: number;
    precipitation: number;
    humidity: number;
    windSpeed: number;
  }>;
  AdditionalNotes: string;
  _id: mongoose.Types.ObjectId;
}

// https://github.com/openai/openai-node/blob/master/README.md
export const getCompletion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('ID?', req.params.id)
    // if(cacheRead(req.params.id)) {
    //   console.log('READING CACHED RESPONSE')
    //   res.locals.response = cacheRead(req.params.id)
    //   return next();
    // }
    // const doc = await RequestText.findById(`${req.params.id}`) as unknown as IRequestText;

    // const docForecast = doc.Forecast.map((forecast, index) => {
    //   return `--Day${index+1}: (temp: ${forecast.temp} C, precipitation: ${forecast.precipitation}%, humidity: ${forecast.humidity}%, windSpeed: ${forecast.windSpeed} meters/second )`
    // });

    const api_prompt: string = `
---START TEMPLATE---
Assume the role of TravelAgentGPT. Your job is to help the user create a travel itinerary for an upcoming trip. To get started, the user provided the following information:
1- Destination: ${req.params.latLong} (in latitude and longitude)
2- Arrival Date: ${req.params.start}
3- Departure Date: ${req.params.end}
4- Number of Travelers: ${req.params.Travellers}
5- Travel Budget (1 to 4 $, where 1 is frugal and 4 is lavish): ${req.params.Budget}
6- Additional Notes: ${req.params.AdditionalNotes}

You will respond using the following template. Be descriptive with the activities suggested. Also, try to incorporate at least one (and as many as you see fit) of the 10 restaurants recommended by Yelp:
// START TEMPLATE
# [Destination] Travel Itinerary
## Duration: [Arrival Date] - [Departure Date]
## Number of Travelers: [Number of Travelers]
## Budget: [Budget from user input]
### Day 1: [Arrival Date]
#### Morning:
  - Activity 1
  - Activity 2
#### Afternoon:
  - Activity 1
  - Activity 2
#### Evening:
  - Activity 1
  - Activity 2
#### Additional Notes:
  - Note 1
  - Note 2
... [so on for other days]
### Special Occasions and Notes:
  - Occasion/Note 1
  - Occasion/Note 2
// END TEMPLATE

In addition, your users are experts in AI and ethics, so they already know you're a language model and your capabilities and limitations, so don't remind them of that. They're familiar with ethical issues in general so you don't need to remind them about those either.
# YELP RECOMMENDED RESTAURANTS
${req.params.Restaurants}
---END TEMPLATE ---
`;
    // const prompt = req.body.prompt as string;
    // if (!prompt) {
    //   return res.status(400).json({ error: "Prompt is required" });
    // }

    // console.log(`PROMPT???`, api_prompt);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: api_prompt }],
      model: "gpt-3.5-turbo"
    });

    // return res.json(completion.choices);

    const newResponse = new ResponseText({
      Response: completion.choices[0].message.content,
    })

    
    res.locals.response = {
      response: completion.choices[0].message.content,
      id: newResponse._id
    }

    // cacheWrite(req.params.id, res.locals.response);
    return next();
  } catch (err) {

  console.error('Error:', err.message);
  console.error('Rate Limit Headers:', err.response.headers['x-ratelimit-limit']);
  console.error('Remaining Requests:', err.response.headers['x-ratelimit-remaining']);
  console.error('Rate Limit Reset Time:', err.response.headers['x-ratelimit-reset']);
  }
};