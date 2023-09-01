import mongoose from "mongoose";

const responseTextSchema = new mongoose.Schema({
  ResponseText: String,
});

const ResponseText = mongoose.model('Response', responseTextSchema);

export default ResponseText;