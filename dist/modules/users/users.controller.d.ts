import { UsersService } from 'src/service/users/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    addUser(fullName: string, userName: string, email: string, phoneNumber: string, bio: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./users.model").User> & Omit<import("./users.model").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
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
