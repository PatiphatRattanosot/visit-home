import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    //email sd: <user_id>bp@bangpaeschool.ac.th
    //email tc: bp<user_id>@bangpaeschool.ac.th
    email: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        required: true,
        enum: ["Admin", "Teacher", "Student"],
        default: "Student",
      },
    ],
    tpye: {
      type: String,
      required: true,
      enum: ["tc", "sd"],
      default: "sd",
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
