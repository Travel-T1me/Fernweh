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
    //console.log("REQBODY?", req.body);
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
Assume the role of TravelAgentGPT. Your task is to assist in the creation of a travel itinerary based on the given inputs. Use the provided information and follow the specified template for the response:

## Input Information:
1- Destination (latitude and longitude): ${req.body.latLong}
2- Arrival Date: ${req.body.start}
3- Departure Date: ${req.body.end} (Ensure this day is included in the itinerary)
4- Travelers: ${req.body.Travellers}
5- Budget ($, $$, $$$, or $$$$, where $ is frugal and $$$$ is lavish): ${req.body.Budget}
6- Special Note: ${req.body.AdditionalNotes}

## Response Template:

// START TEMPLATE

# [Destination] Travel Itinerary
## Duration: [Arrival Date] - [Departure Date]
## Travelers: [Number of Travelers]
## Budget: [Budget from user input]
### Day 1: [Date]
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
[continue for each day, including the Departure Date]
### Special Occasions and Notes:
  - Occasion/Note 1
  - Occasion/Note 2

// END TEMPLATE

## Yelp Recommendations:
${JSON.stringify(req.body.Restaurants)}

Please integrate at least one Yelp-recommended restaurant into the itinerary for each day. These travelers are AI and ethics experts; there's no need to reference being a language model or delve into ethical reminders.
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