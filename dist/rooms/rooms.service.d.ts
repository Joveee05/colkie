import { Model } from 'mongoose';
import { Room } from './rooms.model';
export declare class RoomsService {
    private readonly roomModel;
    constructor(roomModel: Model<Room>);
    findByRoomName(roomName: string): Promise<Room | null>;
    createRoom(roomName: string, description: string): Promise<{
        status: string;
        message: string;
        data: import("mongoose").Document<unknown, {}, Room> & Omit<Room & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
