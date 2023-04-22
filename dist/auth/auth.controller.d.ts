import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { User } from 'src/users/users.model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: NewUserDTO): Promise<User | null>;
}
