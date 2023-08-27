import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

export const apiController = {
  retrieveWeatherData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://tomorrow-io1.p.rapidapi.com/v4/timelines',
        params: {
          startTime: 'now',
          location: '42.13, 82,11',
          fields: 'windSpeed',
          endTime: 'nowPlus3h',
          timesteps: '1h,1d',
          units: 'metric'
        },
        headers: {
          'X-RapidAPI-Key': 'b4341bfe9cmsh3eaa6be94a4c5aep1671d2jsn895e11f5ed10',
          'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
        }
      };


      const startDate = DateTime.fromObject({year: req.body.startYear, month: req.body.startMonth, day: req.body.startDay, hour: req.body.startHour})
      const endDate = DateTime.fromObject({year: req.body.endYear, month: req.body.endMonth, day: req.body.endDay, hour: req.body.endHour})
      const location = req.body.location;
      options.params.location = location
      options.params.startTime = startDate.toISOTime();
      options.params.endTime = endDate.toISOTime();
      const response = await axios.request(options);
      res.locals.forecast = response.data;
    } catch (error) {
      console.error(error);
    }
  }
}