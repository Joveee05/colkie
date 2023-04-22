import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('fullName') fullName: string,
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('bio') bio: string,
  ) {
    const user = await this.usersService.createUser(
      fullName,
      userName,
      email,
      phoneNumber,
      bio,
    );
    return {
      status: 'success',
      message: 'User created successfully',
      data: user,
    };
  }
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return {
      status: 'success',
      message: `${users.length} users found`,
      data: users,
    };
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    const user = await this.usersService.getSingleUser(userId);
    return {
      status: 'success',
      message: 'User found',
      data: user,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('fullName') fullname: string,
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('bio') bio: string,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      fullname,
      userName,
      email,
      bio,
    );
    return {
      status: 'success',
      message: 'User updated',
      data: updatedUser,
    };
  }
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return {
      status: 'success',
      message: 'User deleted successfully',
    };
  }
}
