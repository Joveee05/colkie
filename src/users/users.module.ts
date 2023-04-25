import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre(/^find/, function (next) {
            this.populate({
              path: 'rooms',
              select: 'roomName description',
            });
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
