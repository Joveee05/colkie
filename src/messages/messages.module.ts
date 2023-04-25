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
    ]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
