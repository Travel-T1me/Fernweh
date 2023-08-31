import mongoose from "mongoose";

const requestTextSchema = new mongoose.Schema({
  Budget: String,
  Location: {
      location: String,
      latLong: String,
      start: Date,
      end: Date
  },
  Travellers: Number,
  Restaurants: [{
    name: String,
    rating: Number,
    price_range: String
  }],
  Forecast: [{ //this should come from an api
      temp: Number,
      precipitation: Number,
      humidity: Number,
      windSpeed: Number,
  }],
  AdditionalNotes: String
});

const RequestText = mongoose.model('Request', requestTextSchema);

export default RequestText;