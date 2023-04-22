import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { User } from 'src/users/users.model';
import { ExistingUserDTO } from 'src/users/dtos/existing-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: NewUserDTO): Promise<User | null>;
    login(user: ExistingUserDTO): Promise<{
        token: string;
    } | null>;
    verifyJwt(payload: {
        jwt: string;
    }): Promise<{
        exp: number;
    }>;
}
