"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
    relationship: {
        type: String,
        require: true,
        max: 40,
        trim: true,
    },
    type: {
        type: String,
        require: true,
        max: 30,
        trim: true,
        enum: ["Family", "Professional", "Locality"],
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: "relation",
});
exports.default = relationSchema;
//# sourceMappingURL=relation.schema.js.map