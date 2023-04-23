"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose = require("mongoose");
exports.RoomSchema = new mongoose.Schema({
    roomName: { type: String, required: [true, 'Please enter a roomName'] },
    coverPhoto: { type: String, default: 'default.jpg' },
    description: { type: String, maxLength: 250 },
    participants: [{ type: String }],
    messages: [{ type: String }],
}, {
    versionKey: false,
    timestamps: true,
});
//# sourceMappingURL=rooms.model.js.map