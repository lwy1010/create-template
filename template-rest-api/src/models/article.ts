import { Schema, model, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import idPlugin from "mongoose-id";

const artileSchema = new Schema({
  title: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  collectCount: { type: Number, default: 0 },
  readCount: { type: Number, default: 0 },
  agreeCount: { type: Number, default: 0 },
  isHot: { type: Boolean, default: false },
  likeCount: { type: Number, default: 0 },
});

artileSchema.plugin(idPlugin);
artileSchema.plugin(mongoosePaginate);

const ArticleModel = model<Document, PaginateModel<Document>>("Article", artileSchema);

export { ArticleModel };
