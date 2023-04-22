"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const validator_1 = require("validator");
exports.UserSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, 'Please enter a fullName'] },
    userName: { type: String, required: [true, 'Please enter userName'] },
    email: {
        type: String,
        validate: [validator_1.default.isEmail, 'Please provide a valid email address'],
    },
    phoneNumber: { type: String, required: [true, 'Please enter phoneNumber'] },
    photo: { type: String, default: 'default.jpg' },
    bio: { type: String, maxLength: 250 },
}, {
    versionKey: false,
    timestamps: true,
});
//# sourceMappingURL=users.model.js.map