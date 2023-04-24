import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './messages.model';
import { Room } from 'src/rooms/rooms.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('Room') private readonly roomModel: Model<Room>,
  ) {}
  async pushToArray(roomId: string, messageId: string) {
    await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { messages: messageId },
    });
  }
  async createMessage(body: string, roomID: string, userID: string) {
    const newMessage = new this.messageModel({
      body,
      roomID,
      userID,
    });
    const response = await newMessage.save({ validateBeforeSave: true });
    const messageId = response.id;
    await this.pushToArray(roomID, messageId);
    return {
      status: 'success',
      message: 'Message created successfully',
      data: response,
    };
  }
}
