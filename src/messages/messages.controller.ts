import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post(':id/rooms/:roomId')
  createMessage(
    @Param('id') userId: string,
    @Body('body') body: string,
    @Param('roomId') roomId: string,
  ) {
    return this.messageService.createMessage(body, roomId, userId);
  }

  @Get()
  async allMessages() {
    const messages = await this.messageService.getAllMessages();
    return {
      status: 'success',
      message: `${messages.length} message(s) found`,
      data: messages,
    };
  }

  @Get(':id')
  async getMessage(@Param('id') messageId: string) {
    const message = await this.messageService.getOneMessage(messageId);
    return {
      status: 'success',
      message: 'Message found',
      data: message,
    };
  }

  @Delete(':id/rooms/:roomId')
  async deleteMessages(
    @Param('id') messageId: string,
    @Param('roomId') roomId: string,
  ) {
    await this.messageService.deleteMessage(messageId, roomId);
    return {
      status: 'success',
      message: 'Message deleted successfully',
    };
  }
}
