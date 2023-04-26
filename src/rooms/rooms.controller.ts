import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Room } from './rooms.model';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @ApiTags('Rooms')
  @Post('create_room')
  @ApiCreatedResponse({
    description: 'Room created successfully',
    type: Room,
  })
  @ApiConflictResponse({
    description: 'A room already exists with this name',
  })
  createRoom(
    @Body('roomName') roomName: string,
    @Body('description') description: string,
  ) {
    return this.roomService.createRoom(roomName, description);
  }

  @ApiTags('Rooms')
  @Get()
  @ApiOkResponse({ description: '2 room(s) found', type: Room })
  @ApiNotFoundResponse({ description: 'No rooms found in database' })
  async getAllRooms() {
    const rooms = await this.roomService.getAllRooms();
    return {
      status: 'success',
      message: `${rooms.length} room(s) found`,
      data: rooms,
    };
  }

  @ApiTags('Rooms')
  @Get(':id')
  @ApiOkResponse({ description: 'Room found', type: Room })
  @ApiNotFoundResponse({ description: 'Could not find a room with this id' })
  async getRoom(@Param('id') roomId: string) {
    const room = await this.roomService.findRoom(roomId);
    return {
      status: 'success',
      message: 'Room found',
      data: room,
    };
  }

  @ApiTags('Rooms')
  @Patch(':id')
  @ApiBody({ type: [Room] })
  @ApiOkResponse({ description: 'Room updated', type: Room })
  @ApiNotFoundResponse({ description: 'Could not find a room with this id' })
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

  @ApiTags('Rooms')
  @Delete(':id')
  @ApiOkResponse({ description: 'Room deleted successfully' })
  @ApiNotFoundResponse({ description: 'Could not find a room with this id' })
  async deleteRoom(@Param('id') roomId: string) {
    await this.roomService.deleteRoom(roomId);
    return {
      status: 'success',
      message: 'Room deleted successfully',
    };
  }

  @ApiTags('Rooms')
  @Put(':id/add_user')
  @ApiOkResponse({ description: 'User added to room successfully' })
  @ApiNotFoundResponse({ description: 'Could not find a room with this id' })
  async addUser(@Param('id') roomId: string, @Query('userId') userId: string) {
    await this.roomService.addUserToRoom(roomId, userId);
    return {
      status: 'success',
      message: 'User added to room successfully',
    };
  }
}
