"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TreatmentSchema = new mongoose.Schema({
    TreatmentName: {
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
    collection: 'Treatment',
});
exports.default = TreatmentSchema;
//# sourceMappingURL=treatment.schema.js.map