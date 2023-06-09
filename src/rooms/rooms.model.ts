import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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

export class Room {
  @ApiProperty()
  id: string;

  @ApiProperty()
  roomName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  numOfMessages: number;

  @ApiProperty()
  participants: Array<string>;

  @ApiProperty()
  messages: Array<string>;
}
