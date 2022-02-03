import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import idPlugin from "mongoose-id";

const postSchema = new Schema({
  title: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  collectCount: { type: Number, default: 0 },
  readCount: { type: Number, default: 0 },
  agreeCount: { type: Number, default: 0 },
  isHot: { type: Boolean, default: false },
  likeCount: { type: Number, default: 0 },
});

postSchema.plugin(idPlugin);
postSchema.plugin(mongoosePaginate);

const PostModel = model("Post", postSchema);

export { PostModel };
