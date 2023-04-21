import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/service/users/users.service';
// import { UsersController } from './users.controller';
import { UserSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  //   controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
