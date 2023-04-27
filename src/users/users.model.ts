import * as mongoose from 'mongoose';
import validator from 'validator';
import { ApiProperty } from '@nestjs/swagger';

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
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
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

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
