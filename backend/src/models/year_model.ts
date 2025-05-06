import { Schema, model, Document } from "mongoose";

interface IYear extends Document {
  year: Number; // ปีการศึกษา
}

const YearSchema = new Schema<IYear>(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const YearModel = model<IYear>("Year", YearSchema);
export default YearModel;
export { IYear };
