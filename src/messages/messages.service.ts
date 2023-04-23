import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async createMessage(body: string, roomID: string, userID: string) {
    const newMessage = new this.messageModel({
      body,
      roomID,
      userID,
    });
    const response = await newMessage.save({ validateBeforeSave: true });
    return {
      status: 'success',
      message: 'Message created successfully',
      data: response,
    };
  }
}
