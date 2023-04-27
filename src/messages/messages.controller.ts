import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Message } from './messages.model';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @ApiTags('Messages')
  @Post(':id/rooms/:roomId')
  @ApiCreatedResponse({
    description: 'Message created successfully',
    type: Message,
  })
  createMessage(
    @Param('userId') userId: string,
    @Body('body') body: string,
    @Param('roomId') roomId: string,
  ) {
    return this.messageService.createMessage(body, roomId, userId);
  }

  @ApiTags('Messages')
  @Get()
  @ApiOkResponse({ description: '2 messages found', type: Message })
  @ApiNotFoundResponse({ description: 'No messages found in database' })
  async allMessages() {
    const messages = await this.messageService.getAllMessages();
    return {
      status: 'success',
      message: `${messages.length} message(s) found`,
      data: messages,
    };
  }

  @ApiTags('Messages')
  @Get(':id')
  @ApiOkResponse({ description: 'Message found', type: Message })
  @ApiNotFoundResponse({ description: 'Could not find a message with this id' })
  async getMessage(@Param('id') messageId: string) {
    const message = await this.messageService.getOneMessage(messageId);
    return {
      status: 'success',
      message: 'Message found',
      data: message,
    };
  }

  @ApiTags('Messages')
  @Delete(':id/rooms/:roomId')
  @ApiOkResponse({ description: 'Message deleted successfully' })
  @ApiNotFoundResponse({ description: 'Could not find a message with this id' })
  async deleteMessages(
    @Param('messageId') messageId: string,
    @Param('roomId') roomId: string,
  ) {
    await this.messageService.deleteMessage(messageId, roomId);
    return {
      status: 'success',
      message: 'Message deleted successfully',
    };
  }

  @ApiTags('Messages')
  @Get('room/get_messages')
  @ApiOkResponse({ description: 'This room has 5 messages', type: Message })
  @ApiNotFoundResponse({ description: 'Oops... This room has no messages yet' })
  async getRoomMessages(@Query('roomId') roomId: string) {
    const message = await this.messageService.getMessagesFromRoom(roomId);
    return {
      status: 'success',
      message: `This room has ${message.length} messages`,
      data: message,
    };
  }
}
