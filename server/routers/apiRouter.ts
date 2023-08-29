import * as express from "express";
import { dbWriteController } from "../controllers/dbWriteController.js";
import { apiController } from "../controllers/apiController.js";

export const router = express.Router();

router.post('/budget', dbWriteController.writeBudget, (req, res) => {
  console.log('Budget written to database');
  res.send(res.locals.docID); //id for mongoDoc
})

router.post('/weather/:id', apiController.retrieveWeatherData, dbWriteController.writeForecast, (req, res) => {
  //consume start/end date of trip
  //ping weather api, receive forecast
  res.send(res.locals.forecast);
  //write to mongoDB doc's forecast field => array of forecast objects {high: , low: , precipitation: }
})

router.post('/notes/:id', (req, res) => {
  const mongoID = req.params.id;
  //write notes to mongoDocument
})



router.post('/llm/:id', (req, res) => {
  const mongoID = req.params.id;
  //read entire object with all fields filled, send object to chatgpt
})
