"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const moodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 20,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'mood',
});
exports.default = moodSchema;
//# sourceMappingURL=mood.schema.js.map