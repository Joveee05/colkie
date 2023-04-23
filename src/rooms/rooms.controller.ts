import { Controller, Post, Body, Get } from '@nestjs/common';
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
}