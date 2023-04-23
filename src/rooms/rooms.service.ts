import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './rooms.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async findByRoomName(roomName: string): Promise<Room | null> {
    return this.roomModel.findOne({ roomName }).exec();
  }

  async createRoom(roomName: string, description: string) {
    const existingRoom = await this.findByRoomName(roomName);
    if (existingRoom) {
      throw new HttpException(
        'A room already exists with this name',
        HttpStatus.CONFLICT,
      );
    }
    const newRoom = new this.roomModel({
      roomName,
      description,
    });
    const response = await newRoom.save({ validateBeforeSave: true });
    return {
      status: 'success',
      message: 'Room created successfully',
      data: response,
    };
  }

  async getAllRooms() {
    const rooms = await this.roomModel.find().sort('-createdAt');
    if (rooms.length < 1) {
      throw new NotFoundException('No rooms found in database');
    }
    return rooms;
  }

  async findRoom(roomId: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException('Could not find a room with this id');
    }
    return room;
  }

  async updateRoom(roomId: string, roomName: string, description: string) {
    const room = await this.roomModel.findByIdAndUpdate(roomId);
    if (!room) {
      throw new NotFoundException('Could not find any room with this id');
    }
    if (roomName) {
      room.roomName = roomName;
    } else if (description) {
      room.description = description;
    }
    const result = await room.save({ validateBeforeSave: true });
    return result;
  }
}
