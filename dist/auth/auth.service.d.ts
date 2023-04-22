import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<NewUserDTO>): Promise<User | any>;
}
