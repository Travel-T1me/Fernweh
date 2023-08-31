import axios from 'axios';
import { Request, Response } from 'express';
import { PEXELS_API_KEY } from '../config.js';

interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  liked: boolean;
  alt?: string;
}

interface PexelsResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
}

export const searchPhotos = async (req: Request, res: Response) => {
  const query = req.query.query; // London
  const locale = req.query.locale || 'en-US';
  const perPage = req.query.per_page || '1';
  const page = req.query.page || '1';

  const options = {
    method: 'GET' as const,
    url: 'https://pexelsdimasv1.p.rapidapi.com/v1/search',
    params: { query, locale, per_page: perPage, page },
    headers: {
      Authorization: PEXELS_API_KEY,
      'X-RapidAPI-Key': PEXELS_API_KEY,
      'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request<PexelsResponse>(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
};