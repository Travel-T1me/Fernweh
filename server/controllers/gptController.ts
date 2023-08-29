import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";
import { NextFunction, Request, Response } from "express";
import RequestText from '../mongoSchema.js';

const openai = new OpenAI({
  apiKey: `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`
});

// https://github.com/openai/openai-node/blob/master/README.md
export const getCompletion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await RequestText.findById(`${req.params.id}`);
    const docForecast = doc.Forecast.map((forecast, index) => {
      return `--Day${index+1}: (temp: ${forecast.temp} C, precipitation: ${forecast.precipitation}%, humidity: ${forecast.humidity}%)`
    })

    const api_prompt: string = `
---START TEMPLATE---
Assume the role of TravelAgentGPT. Your job is to help the user create a travel itinerary for an upcoming trip. To get started, the user provided the following information:
1- Destination: ${doc.Location.latLong} (in latitude and longitude)
2- Arrival Date: ${doc.Location.start}
3- Departure Date: ${doc.Location.end}
4- Number of Travelers: ${doc.Travellers}
5- Travel Budget (1 to 4, where 1 is frugal and 4 is lavish): ${doc.Budget}
6- Additional Notes: ${doc.AdditionalNotes}
7- Weather Forecast: ${docForecast}
Note: Be sure to take account of the weather, temperature, and precipitation of the given day as you craft the itinerary and activities.

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
${doc.Restaurants}
---END TEMPLATE ---
`;
    // const prompt = req.body.prompt as string;
    // if (!prompt) {
    //   return res.status(400).json({ error: "Prompt is required" });
    // }

    console.log(`PROMPT???`, api_prompt);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: api_prompt }],
      model: "gpt-3.5-turbo"
    });

    // return res.json(completion.choices);
    res.locals.response = completion.choices;
    return next();
  } catch (err) {

  console.error('Error:', err.message);
  console.error('Rate Limit Headers:', err.response.headers['x-ratelimit-limit']);
  console.error('Remaining Requests:', err.response.headers['x-ratelimit-remaining']);
  console.error('Rate Limit Reset Time:', err.response.headers['x-ratelimit-reset']);
  }
};