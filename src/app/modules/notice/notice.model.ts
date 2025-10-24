import mongoose, {  Schema } from "mongoose";
import { INotice } from "./notice.interface";


const noticeSchema = new Schema<INotice>(
  {
    description: { type: String, required: true },
    publishDate: { type: Date, default: () => new Date() },
    images: [{ type: String }],
    documents: [{ type: String }],
  },
  { timestamps: true }
);

const Notice = mongoose.model<INotice>("Notice", noticeSchema);

export default Notice;
