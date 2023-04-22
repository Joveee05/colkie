import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async hashPassword(password: string): Promise<string> {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(password, SALT);
  }

  async register(user: Readonly<NewUserDTO>): Promise<User | any> {
    const { fullName, userName, email, phoneNumber, bio, password } = user;

    const exsitingUser = await this.userService.findByEmail(email);

    if (exsitingUser) {
      throw new HttpException(
        'An account already exists with this email',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(
      fullName,
      userName,
      email,
      phoneNumber,
      bio,
      hashedPassword,
    );
    return {
      status: 'success',
      message: 'User created successfully',
      data: newUser,
    };
  }
}
