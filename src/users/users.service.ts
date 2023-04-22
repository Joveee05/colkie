import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(
    fullName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    bio: string,
    hashedPassword: string,
  ) {
    const newUser = new this.userModel({
      fullName,
      userName,
      email,
      phoneNumber,
      bio,
      password: hashedPassword,
    });
    const response = await newUser.save({ validateBeforeSave: true });
    return response;
  }
  async getAllUsers() {
    const users = await this.userModel.find().sort('-createdAt');
    if (users.length < 1) {
      throw new NotFoundException('No users found in database');
    }
    return users;
  }

  async getSingleUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Could not find user with this id');
    }
    return user;
  }

  async updateUser(
    userId: string,
    fullName: string,
    userName: string,
    email: string,
    bio: string,
  ) {
    const user = await this.userModel.findByIdAndUpdate(userId);
    if (!user) {
      throw new NotFoundException('Could not find user with this id');
    }
    if (fullName) {
      user.fullName = fullName;
    } else if (userName) {
      user.userName = userName;
    } else if (email) {
      user.email = email;
    } else if (bio) {
      user.bio = bio;
    }
    const result = await user.save({ validateBeforeSave: true });
    return result;
  }
  async deleteUser(userId: string) {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException('Could not find user with this id');
    }
  }
}
