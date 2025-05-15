import { Schema, model } from "mongoose";
import UserModel from "./user.model";

const TeacherSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "รับราชการ", //รับราชการ, ลาออก,เกษียณ,ย้ายโรงเรียน
    },
  },
  {
    timestamps: true,
  }
);
const TeacherModel = UserModel.discriminator("Teacher", TeacherSchema);
export default TeacherModel;
