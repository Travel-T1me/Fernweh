import mongoose from "mongoose";

const requestTextSchema = new mongoose.Schema({
  Budget: {
    low: Number,
    high: Number
  },
  Location: {
      location: String,
      start: Date,
      end: Date
  },
  Travellers: Number,
  Restaurant: [{
    name: String,
    location: String,
  }],
  Forecast: [{ //this should come from an api
      temp: Number,
      humidity: Number,
      precipitation: String
  }],
  AdditionalNotes: String
});

const RequestText = mongoose.model('Request', requestTextSchema);

export default RequestText;