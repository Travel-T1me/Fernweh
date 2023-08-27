import RequestText from "../mongoSchema.js";
import { Request, Response, NextFunction } from "express";
import { DateTime } from 'luxon';


export const dbWriteController = {
 writeBudget: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRequest = new RequestText({
      Budget: {
        Low: req.body.low,
        High: req.body.high
      }
    })

    const saved = await newRequest.save()

    console.log('Doc saved');
    const docID = saved._id;
    res.locals.docID = docID;
    const document = await RequestText.findById(docID).exec();
    console.log(document);
    console.log('docID?', res.locals.docID);
    return next();
  } catch (err) {
    return next(err);
  }
},
  writeForecast: async (req: Request, res: Response, next: NextFunction) => {
    const forecast = res.locals.forecast
    RequestText.findByIdAndUpdate(req.params.id, {Forecast: forecast}, {new: true});
    console.log(forecast);
  }
}