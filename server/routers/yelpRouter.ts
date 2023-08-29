import { Router } from "express";
import * as yelpController from '../controllers/yelpController.js';

const yelpRouter = Router();

yelpRouter.get('/restaurants', yelpController.getRestaurants);

export default yelpRouter;