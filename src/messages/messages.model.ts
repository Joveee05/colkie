import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const MessageSchema = new mongoose.Schema(
  {
    body: { type: String, required: [true, 'Please enter a message'] },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A message must have a userId'],
    },
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'A message must have a roomId'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export class Message {
  @ApiProperty()
  id: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  userID: string;

  @ApiProperty()
  roomID: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
