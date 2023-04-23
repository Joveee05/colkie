import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Post('create_room')
  createRoom(
    @Body('roomName') roomName: string,
    @Body('description') description: string,
  ) {
    return this.roomService.createRoom(roomName, description);
  }

  @Get()
  async getAllRooms() {
    const rooms = await this.roomService.getAllRooms();
    return {
      status: 'success',
      message: `${rooms.length} room(s) found`,
      data: rooms,
    };
  }

  @Get(':id')
  async getRoom(@Param('id') roomId: string) {
    const room = await this.roomService.findRoom(roomId);
    return {
      status: 'success',
      message: 'Room found',
      data: room,
    };
  }

  @Patch(':id')
  async updateRoom(
    @Param('id') roomId: string,
    @Body('roomName') roomName: string,
    @Body('description') description: string,
  ) {
    const updatedRoom = await this.roomService.updateRoom(
      roomId,
      roomName,
      description,
    );
    return {
      status: 'success',
      message: 'Room updated',
      data: updatedRoom,
    };
  }

  @Delete(':id')
  async deleteRoom(@Param('id') roomId: string) {
    await this.roomService.deleteRoom(roomId);
    return {
      status: 'success',
      message: 'Room deleted successfully',
    };
  }
}
