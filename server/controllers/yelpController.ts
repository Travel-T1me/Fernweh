import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  const { location } = req.query;

  if (!location) {
    res.status(400).send('Location query parameter is required.');
    return;
  }

  const options = {
    method: 'GET',
    url: 'https://yelp-reviews.p.rapidapi.com/business-search',
    params: {
      query: 'Restaurants',
      location: location as string,
      start: '0',
      yelp_domain: 'yelp.com'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'yelp-reviews.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching Yelp data.');
  }
};