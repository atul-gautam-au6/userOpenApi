"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    state: {
        type: String,
        require: true,
        max: 30,
        trim: true,
    },
    city: {
        type: String,
        require: true,
        max: 30,
        trim: true,
    },
    pinCode: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'locations',
});
exports.default = locationSchema;
//# sourceMappingURL=location.schema.js.map