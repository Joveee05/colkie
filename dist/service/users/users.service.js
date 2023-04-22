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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(fullName, userName, email, phoneNumber, bio) {
        const newUser = new this.userModel({
            fullName,
            userName,
            email,
            phoneNumber,
            bio,
        });
        const response = await newUser.save({ validateBeforeSave: true });
        return response;
    }
    async getAllUsers() {
        const users = await this.userModel.find().sort('-createdAt');
        if (users.length < 1) {
            throw new common_1.NotFoundException('No users found in database');
        }
        return users;
    }
    async getSingleUser(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Could not find user with this id');
        }
        return user;
    }
    async updateUser(userId, fullName, userName, email, bio) {
        const user = await this.userModel.findByIdAndUpdate(userId);
        if (!user) {
            throw new common_1.NotFoundException('Could not find user with this id');
        }
        if (fullName) {
            user.fullName = fullName;
        }
        else if (userName) {
            user.userName = userName;
        }
        else if (email) {
            user.email = email;
        }
        else if (bio) {
            user.bio = bio;
        }
        const result = await user.save({ validateBeforeSave: true });
        return result;
    }
    async deleteUser(userId) {
        const result = await this.userModel.findByIdAndDelete(userId);
        if (!result) {
            throw new common_1.NotFoundException('Could not find user with this id');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map