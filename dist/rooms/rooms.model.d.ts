import * as mongoose from 'mongoose';
export declare const RoomSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    versionKey: false;
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roomName: string;
    coverPhoto: string;
    participants: string[];
    messages: string[];
    description?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roomName: string;
    coverPhoto: string;
    participants: string[];
    messages: string[];
    description?: string;
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    roomName: string;
    coverPhoto: string;
    participants: string[];
    messages: string[];
    description?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export interface Room {
    id: string;
    roomName: string;
    description: string;
}
