"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const email_validator_1 = require("../../config/email.validator");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 20,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validate: [email_validator_1.validateEmail, 'Please fill a valid email address'],
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: Boolean,
        require: true,
        default: true,
    },
}, {
    timestamps: true,
    collection: 'users',
});
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
exports.default = userSchema;
//# sourceMappingURL=user.schema.js.map