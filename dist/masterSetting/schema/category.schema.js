"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 20,
        trim: true,
    },
    isPodcast: {
        type: Boolean,
        require: true,
        default: false,
    },
    isQuetion: {
        type: Boolean,
        require: true,
        default: false,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'categories',
});
exports.default = categorySchema;
//# sourceMappingURL=category.schema.js.map