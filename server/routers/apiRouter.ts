import * as express from "express";
import { dbWriteController } from "../controllers/dbWriteController.js";
import { apiController } from "../controllers/weatherController.js";
import * as yelpController from '../controllers/yelpController.js';
import * as gptController from "../controllers/gptController.js";

export const router = express.Router();

router.post('/initial', dbWriteController.writeInitial, (req, res) => {
  console.log('Initial write successful');
  res.send(res.locals.docID); //id for mongoDoc
})

router.post('/weather/:id', apiController.retrieveWeatherData, dbWriteController.writeForecast, (req, res) => {
  //consume start/end date of trip
  //ping weather api, receive forecast
  res.send(res.locals.doc);
  //write to mongoDB doc's forecast field => array of forecast objects {high: , low: , precipitation: }
})

router.post('/yelp/:id', yelpController.getRestaurants, dbWriteController.writeRestaurants, (req, res) => {
  res.send(res.locals.doc);
})

router.post('/notes/:id', dbWriteController.writeNotes, (req, res) => {
  console.log("DOC???", res.locals.doc)
  res.send(res.locals.doc);
})



router.post('/llm/:id', gptController.getCompletion, (req, res) => {
  res.send(res.locals.response);
})
