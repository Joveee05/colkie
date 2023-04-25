import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './rooms.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Room',
        useFactory: () => {
          const schema = RoomSchema;
          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'participants messages',
              select: 'fullName userName body',
            });
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
