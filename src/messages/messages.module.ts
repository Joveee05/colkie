import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageSchema } from './messages.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from 'src/rooms/rooms.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Message',
        useFactory: () => {
          const schema = MessageSchema;
          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'roomID userID',
              select: 'roomName fullName userName',
            });
            next();
          });
          return schema;
        },
      },
      {
        name: 'Room',
        useFactory: () => {
          const schema = RoomSchema;
          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'roomName coverPhoto',
            });
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
