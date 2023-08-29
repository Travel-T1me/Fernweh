import RequestText from "../mongoSchema.js";
import { Request, Response, NextFunction } from "express";

export const dbWriteController = {
 writeBudget: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRequest = new RequestText({
      Budget: {
        low: req.body.low,
        high: req.body.high
      }
    })

    const saved = await newRequest.save()

    console.log('Doc saved');
    const docID = saved._id;
    res.locals.docID = docID;

    console.log('docID?', res.locals.docID);

    return next();
  } catch (err) {
    return next(err);
  }
},
  writeForecast: async (req: Request, res: Response, next: NextFunction) => {
    try {
    const forecast = res.locals.forecast
    const foreCastArr = forecast.data.timelines[0].intervals.map((interval: any) => { //type interval later
      // console.log(interval);
      return {
        temp: interval.values.temperature,
        precipitation: interval.values.precipitation,
        humidity: interval.values.humidity,
      }
    })
    await RequestText.findByIdAndUpdate(req.params.id, {Forecast: foreCastArr}, {new: true});

    return next();
  } catch (err) {
    return next(err);
  }
}
}