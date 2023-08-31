import mongoose, { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema: Schema = new Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);