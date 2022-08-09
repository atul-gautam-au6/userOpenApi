import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { validateEmail } from "src/config/email.validator";

const userSchema = new mongoose.Schema(
  {
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
      validate: [validateEmail, "Please fill a valid email address"],
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
    // isAdmin: {
    //   type: Boolean,
    //   require: true,
    //   default: true,
    // },
    // isSubAdmin: {
    //   type: Boolean,
    //   require: true,
    //   default: false,
    // },
    // otp: {
    //   type: Number,
    //   default: null,
    // },
    // emailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default userSchema;
