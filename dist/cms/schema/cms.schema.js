"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const cmsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 20,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
        max: 50000,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: "cms",
});
exports.default = cmsSchema;
//# sourceMappingURL=cms.schema.js.map