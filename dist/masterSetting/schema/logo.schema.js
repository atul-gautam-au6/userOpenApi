"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const logoSchema = new mongoose.Schema({
    logo: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'logo',
});
exports.default = logoSchema;
//# sourceMappingURL=logo.schema.js.map