import { Schema, model, Document, PaginateModel } from "mongoose";
import Joi from "joi";
import mongoosePaginate from "mongoose-paginate-v2";
import { Post } from "@/types/post";

const schema = new Schema(
  {
    banner: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    readTime: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const validatePost = (post: Post) => {
  const schema = Joi.object({
    banner: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    readTime: Joi.string().required(),
  });

  return schema.validate(post);
};

schema.plugin(mongoosePaginate);

const PostModel: PaginateModel<Post & Document> = model("Post", schema);

export { PostModel, validatePost };
