"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RoomsService = class RoomsService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async findByRoomName(roomName) {
        return this.roomModel.findOne({ roomName }).exec();
    }
    async createRoom(roomName, description) {
        const existingRoom = await this.findByRoomName(roomName);
        if (existingRoom) {
            throw new common_1.HttpException('A room already exists with this name', common_1.HttpStatus.CONFLICT);
        }
        const newRoom = new this.roomModel({
            roomName,
            description,
        });
        const response = await newRoom.save({ validateBeforeSave: true });
        return {
            status: 'success',
            message: 'Room created successfully',
            data: response,
        };
    }
    async getAllRooms() {
        const rooms = await this.roomModel.find().sort('-createdAt');
        if (rooms.length < 1) {
            throw new common_1.NotFoundException('No rooms found in database');
        }
        return rooms;
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Room')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map