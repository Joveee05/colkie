import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: [true, 'Please enter a roomName'] },
    coverPhoto: { type: String, default: 'default.jpg' },
    description: { type: String, maxLength: 250 },
    participants: [{ type: String }],
    messages: [{ type: String }],
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
}
