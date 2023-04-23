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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const SALT = bcrypt.genSaltSync();
        return bcrypt.hash(password, SALT);
    }
    async register(user) {
        const { fullName, userName, email, phoneNumber, bio, password } = user;
        const exsitingUser = await this.userService.findByEmail(email);
        if (exsitingUser) {
            throw new common_1.HttpException('An account already exists with this email', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(fullName, userName, email, phoneNumber, bio, hashedPassword);
        return {
            status: 'success',
            message: 'User created successfully',
            data: newUser,
        };
    }
    async doesPasswordMatch(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            return null;
        const comparePassword = await this.doesPasswordMatch(password, user.password);
        if (!comparePassword)
            return null;
        return user;
    }
    async login(existingUser) {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.HttpException('Incorrect email or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const jwt = await this.jwtService.signAsync({ user });
        return {
            status: 'success',
            message: 'Login successful',
            token: jwt,
            data: user,
        };
    }
    async verifyJwt(jwt) {
        try {
            const { exp } = await this.jwtService.verifyAsync(jwt);
            return { exp };
        }
        catch (error) {
            throw new common_1.HttpException('Invalid JWT', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map