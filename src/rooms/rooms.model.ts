import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: [true, 'Please enter a roomName'] },
    coverPhoto: { type: String, default: 'default.jpg' },
    numOfMessages: { type: Number, default: 0 },
    description: { type: String, maxLength: 250 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export interface Room {
  id: string;
  roomName: string;
  description: string;
  numOfMessages: number;
  participants: string;
}
