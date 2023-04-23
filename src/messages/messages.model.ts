import * as mongoose from 'mongoose';

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

export interface Message {
  id: string;
  body: string;
  userID: string;
  roomID: string;
}
