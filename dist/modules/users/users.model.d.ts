import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    versionKey: false;
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    userName: string;
    phoneNumber: string;
    photo: string;
    email?: string;
    bio?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    userName: string;
    phoneNumber: string;
    photo: string;
    email?: string;
    bio?: string;
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    userName: string;
    phoneNumber: string;
    photo: string;
    email?: string;
    bio?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export interface User {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    bio: string;
}
