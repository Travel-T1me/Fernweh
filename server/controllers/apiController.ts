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
          fields: ['temperature', 'precipitation'],
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

      const startDate = DateTime.fromObject({year: req.body.startYear, month: req.body.startMonth, day: req.body.startDay, hour: req.body.startHour})
      const endDate = DateTime.fromObject({year: req.body.endYear, month: req.body.endMonth, day: req.body.endDay, hour: req.body.endHour})
      // console.log('start?', startDate);
      // console.log('end?', endDate);
      const location = req.body.location;
      options.params.location = location
      options.params.startTime = startDate.toISO()
      options.params.endTime = endDate.toISO();
      // console.log('Options?', options);
      const response = await axios.request(options);
      // console.log(JSON.stringify(response.data, null, 2));
      res.locals.forecast = response.data;
      return next();
    } catch (error) {
      console.error(error);
    }
  }
}