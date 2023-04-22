import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { ExistingUserDTO } from 'src/users/dtos/existing-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<NewUserDTO>): Promise<User | any>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<User | null>;
    login(existingUser: ExistingUserDTO): Promise<{
        token: string;
        status: string;
        message: string;
        data: any;
    } | null>;
    verifyJwt(jwt: string): Promise<{
        exp: number;
    }>;
}
