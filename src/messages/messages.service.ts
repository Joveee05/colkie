import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messages.model';
import { Model } from 'mongoose';
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

  async numOfMessages(roomId: string) {
    await this.roomModel.findByIdAndUpdate(roomId, {
      $inc: { numOfMessages: 1 },
    });
  }

  async removeNumOfMessages(roomId: string) {
    const room = await this.roomModel.findById(roomId);
    if (room.numOfMessages === 0) {
      return room;
    } else {
      await this.roomModel.findByIdAndUpdate(roomId, {
        $inc: { numOfMessages: -1 },
      });
    }
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
    await this.numOfMessages(roomID);
    return {
      status: 'success',
      message: 'Message created successfully',
      data: response,
    };
  }

  async getAllMessages() {
    const messages = await this.messageModel.find().sort('-createdAt');
    if (messages.length < 1) {
      throw new NotFoundException('No messages found in database');
    }
    return messages;
  }

  async getOneMessage(messageId: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) {
      throw new NotFoundException('Could not find a message with this id');
    }
    return message;
  }

  async deleteMessage(messageId: string, roomId: string) {
    const result = await this.messageModel.findByIdAndDelete(messageId);
    await this.removeNumOfMessages(roomId);
    if (!result) {
      throw new NotFoundException('Could not find message with this id');
    }
  }
}
