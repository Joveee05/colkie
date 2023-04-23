import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private roomService;
    constructor(roomService: RoomsService);
    createRoom(roomName: string, description: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./rooms.model").Room> & Omit<import("./rooms.model").Room & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
    getAllRooms(): Promise<{
        status: string;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./rooms.model").Room> & Omit<import("./rooms.model").Room & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
    }>;
    getRoom(roomId: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./rooms.model").Room> & Omit<import("./rooms.model").Room & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
