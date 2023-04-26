import { Controller, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UsersService } from 'src/users/users.service';
import { NewUserDTO } from './dtos/new-user.dto';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @Get()
  @ApiOkResponse({ description: '2 users found', type: User })
  @ApiNotFoundResponse({ description: 'No users found in database' })
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return {
      status: 'success',
      message: `${users.length} users found`,
      data: users,
    };
  }

  @ApiTags('Users')
  @Get(':id')
  @ApiOkResponse({ description: 'User found', type: User })
  @ApiNotFoundResponse({ description: 'Could not find user with this id' })
  async getUser(@Param('id') userId: string) {
    const user = await this.usersService.getSingleUser(userId);
    return {
      status: 'success',
      message: 'User found',
      data: user,
    };
  }

  @ApiTags('Users')
  @Patch(':id')
  @ApiBody({ type: [NewUserDTO] })
  @ApiOkResponse({ description: 'User updated', type: User })
  @ApiNotFoundResponse({ description: 'Could not find user with this id' })
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

  @ApiTags('Users')
  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'Could not find user with this id' })
  async deleteUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return {
      status: 'success',
      message: 'User deleted successfully',
    };
  }
}
