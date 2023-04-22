import { UsersService } from 'src/users/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        status: string;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./users.model").User> & Omit<import("./users.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    getUser(userId: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./users.model").User> & Omit<import("./users.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    updateUser(userId: string, fullname: string, userName: string, email: string, bio: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./users.model").User> & Omit<import("./users.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    deleteUser(userId: string): Promise<{
        status: string;
        message: string;
    }>;
}
