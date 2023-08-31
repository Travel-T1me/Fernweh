import { notStrictEqual } from "assert";
import RequestText from "../mongoSchema.js";
import { Request, Response, NextFunction } from "express";

interface Restaurant {
  id: string,
  alias: string,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  business_page_link: string,
  rating: number
  review_count: number,
  price_range: string,
  photo: string,
  photos_page_link: string,
  phone: string,
  country: string
}

interface WeatherInterval {
  temp: number,
  precipitation: number,
  humidity: number,
  windSpeed: number,
}

export const dbWriteController = {
 writeInitial: async (req: Request, res: Response, next: NextFunction) => {
  // console.log('IN INITIAL WRITE');
  try {
    const newRequest = new RequestText({
      Budget: req.body.budget,
      Travellers: req.body.number
    })

    const saved = await newRequest.save()

    // console.log('Doc saved');
    const docID = saved._id;
    res.locals.docID = docID;

    // console.log('docID?', res.locals.docID);

    return next();
  } catch (err) {
    return next(err);
  }
},
  writeForecast: async (req: Request, res: Response, next: NextFunction) => {
    try {

    const location = {
      location: req.body.destination,
      latLong: req.body.latLong,
      start: req.body.startDate,
      end: req.body.endDate,
    }

    const forecast = res.locals.forecast
    const foreCastArr = forecast.data.timelines[0].intervals.map((interval: any) => { //type interval later
      // console.log(interval);
      return {
        temp: interval.values.temperature,
        precipitation: interval.values.precipitationProbability,
        humidity: interval.values.humidity,
        windSpeed: interval.values.windSpeed,
      }
    })

    // const foreCastArr = [{
    //   temp: 95,
    //   precipitation: 55,
    //   humidity: 55,
    //   windSpeed: 4.2
    // }]

    // console.log('LOGGING NEW DOCUMENT');
    // console.log('FORECASTARR?', foreCastArr);
    // console.log('LOCATION?', location);
    const doc = await RequestText.findByIdAndUpdate(req.params.id, {
      Location: location,
      Forecast: foreCastArr
    }, {new: true})

    // console.log(doc);

    res.locals.doc = doc

    return next();
  } catch (err) {
    return next(err);
  }
},

writeRestaurants: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurants = res.locals.restaurants.map((restaurant: Restaurant) => {
      return {
        name: restaurant.name,
        rating: restaurant.rating,
        price_range: restaurant.price_range
      }
    })

    const doc = await RequestText.findByIdAndUpdate(req.params.id, {
      Restaurants: restaurants
    }, {new: true})
    // console.log(doc);
    res.locals.doc = doc;
    return next();
  } catch (err) {
    return next(err);
  }
},

writeNotes: async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('IN WRITE NOTES')
    const notes = req.body.notes;

    const doc = await RequestText.findByIdAndUpdate(req.params.id, {
      AdditionalNotes: notes
    }, {new: true})

    res.locals.doc = doc;

    // console.log('DOC?????', res.locals.doc);

    return next()
  } catch (err) {
    return next(err);
  }
}
}