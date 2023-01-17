"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const healthConditionSchema = new mongoose.Schema({
    HealthCondition: {
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
    collection: "healthcondition",
});
exports.default = healthConditionSchema;
//# sourceMappingURL=healthcondition.schema.js.map