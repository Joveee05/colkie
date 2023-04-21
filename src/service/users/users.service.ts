import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    fullName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    bio: string,
  ) {
    const newUser = new this.userModel({
      fullName,
      userName,
      email,
      phoneNumber,
      bio,
    });
    const response = await newUser.save({ validateBeforeSave: true });
    return response;
  }
}
