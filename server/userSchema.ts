import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema: Schema = new Schema({
  email: { type: String, unique: true, sparse: true },
  password: String,
  googleId: { type: String, unique: true, sparse: true },
  secret: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export const User = mongoose.model("User", userSchema);