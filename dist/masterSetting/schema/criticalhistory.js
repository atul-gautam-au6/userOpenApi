"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const criticalhistorySchema = new mongoose.Schema({
    CriticalHistory: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: "criticalhistory",
});
exports.default = criticalhistorySchema;
//# sourceMappingURL=criticalhistory.js.map