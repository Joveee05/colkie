import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './rooms.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Room',
        useFactory: () => {
          const schema = RoomSchema;
          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'participants',
              select: 'fullName userName',
            });
            next();
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
