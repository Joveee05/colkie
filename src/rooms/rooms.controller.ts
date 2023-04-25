import { Controller, Post, Body } from '@nestjs/common';
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
}
