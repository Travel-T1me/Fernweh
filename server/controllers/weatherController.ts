import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

export const apiController = {
  retrieveWeatherData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('start');
      const options = {
        method: 'GET',
        url: 'https://tomorrow-io1.p.rapidapi.com/v4/timelines',
        params: {
          startTime: 'now',
          location: '42.13, 82,11',
          fields: ['temperature', 'precipitationProbability', 'humidity', 'windSpeed'],
          endTime: 'nowPlus3h',
          timesteps: '1h,1d',
          units: 'metric'
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API,
          'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
        }
      };
      console.log('reqbody?', req.body);

      const startDate = DateTime.fromFormat(req.body.startDate, 'D')
      const endDate = DateTime.fromFormat(req.body.endDate, 'D')
      console.log('start?', startDate);
      console.log('end?', endDate);
      const latLong = req.body.latLong as string;
      options.params.location = latLong
      options.params.startTime = startDate.toISO()
      options.params.endTime = endDate.toISO();
      console.log('Options?', options);
      const response = await axios.request(options);
      // console.log(JSON.stringify(response.data, null, 2));
      res.locals.forecast = response.data;
      return next();
    } catch (error) {
      console.error(error);
    }
  }
}