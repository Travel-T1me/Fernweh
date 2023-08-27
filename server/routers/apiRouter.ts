import * as express from "express";
import { dbWriteController } from "../controllers/dbWriteController.js";
import { apiController } from "../controllers/apiController.js";

export const router = express.Router();

router.post('/budget', dbWriteController.writeBudget, (req, res) => {
  console.log('Budget written to database');
  res.send(res.locals.docID); //id for mongoDoc
})

router.post('/flight/:id', (req, res) => {
  //consume flight class, departure, destination, start, end
  //spit out flight information object to store in db
  //possibly also write start and end of trip dates to db doc?
  const mongoID = req.params.id; //send mongoID to all subsequent routes
  //write departure/destination/flight info into mongoDoc
  //make call to flight API in controller
})

router.post('/weather/:id', apiController.retrieveWeatherData, (req, res) => {
  //consume start/end date of trip
  //ping weather api, receive forecast
  res.send(res.locals.forecast);
  //write to mongoDB doc's forecast field => array of forecast objects {high: , low: , precipitation: }
})

router.post('/hotel/:id', (req, res) => {
  //consumes hotel preference information
  //rooms
  //amenities
  //rating
  const mongoID = req.params.id;
  //make API call to hotel booking api with these params?
  //write hotel suggestions to hotel info section of mongoDo
})

router.post('/notes/:id', (req, res) => {
  const mongoID = req.params.id;
  //write notes to mongoDocument
})

router.post('/llm/:id', (req, res) => {
  const mongoID = req.params.id;
  //read entire object with all fields filled, send object to chatgpt
})
