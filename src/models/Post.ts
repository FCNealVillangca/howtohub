// src/models/Post.ts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		content: String,
		categoryId: String,
	},
	{ timestamps: true }
);

const Post =
	mongoose.models.Post || mongoose.model("Post", PostSchema, "posts");

export default Post;
