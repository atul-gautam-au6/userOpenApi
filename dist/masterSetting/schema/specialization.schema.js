"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const specializationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 20,
        trim: true,
        unique: true,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'specialization',
});
exports.default = specializationSchema;
//# sourceMappingURL=specialization.schema.js.map