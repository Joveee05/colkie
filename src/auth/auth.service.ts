import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { ExistingUserDTO } from 'src/users/dtos/existing-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const comparePassword = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!comparePassword) return null;

    return user;
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string; status: string; message: string; data } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const jwt = await this.jwtService.signAsync({ user });
    return {
      status: 'success',
      message: 'Login successful',
      token: jwt,
      data: user,
    };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
