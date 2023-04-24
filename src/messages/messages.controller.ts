import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get(':id')
  async getMessage(@Param('id') messageId: string) {
    const message = await this.messageService.findMessage(messageId);
    return {
      status: 'success',
      message: 'Message found',
      data: message,
    };
  }
}
