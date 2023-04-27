import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { User } from 'src/users/users.model';
import { ExistingUserDTO } from 'src/users/dtos/existing-user.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Post('register')
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: User,
  })
  @ApiConflictResponse({
    description: 'An account already exists with this email',
  })
  register(@Body() user: NewUserDTO): Promise<User | null> {
    return this.authService.register(user);
  }

  @ApiTags('Auth')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    description: 'Incorrect email or password',
  })
  @ApiOkResponse({ description: 'Login successful', type: User })
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  @ApiTags('Auth')
  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
