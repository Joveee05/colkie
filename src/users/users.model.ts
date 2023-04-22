import * as mongoose from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Please enter a fullName'] },
    userName: { type: String, required: [true, 'Please enter userName'] },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    phoneNumber: { type: String, required: [true, 'Please enter phoneNumber'] },
    photo: { type: String, default: 'default.jpg' },
    bio: { type: String, maxLength: 250 },
    password: { type: String, minLength: 8 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
    versionKey: false,
    timestamps: true,
  },
);

export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  password: string;
}
