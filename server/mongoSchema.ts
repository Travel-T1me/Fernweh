import mongoose from "mongoose";

const requestTextSchema = new mongoose.Schema({
  Budget: {
    Low: Number,
    High: Number
  },
  Location: {
      Location: String,
      Start: Date,
      End: Date
  },
  Travellers: Number,
  Restaurant: [{
    name: String,
    location: String
  }],
  Forecast: [{ //this should come from an api
      High: Number,
      Low: Number,
      Precipitation: String
  }],
  AdditionalNotes: String
});

const RequestText = mongoose.model('Request', requestTextSchema);

export default RequestText;