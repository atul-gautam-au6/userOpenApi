"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const criticalmedicalconditionSchema = new mongoose.Schema({
    MedicalConditionName: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
});
exports.default = criticalmedicalconditionSchema;
//# sourceMappingURL=criticalmedicalcondition.js.map