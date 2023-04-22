import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { User } from 'src/users/users.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<User | null> {
    return this.authService.register(user);
  }
}
