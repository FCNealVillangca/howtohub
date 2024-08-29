// src/models/Post.ts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		_id: String,
		content: String,
		categoryId: String,
	},
	{ timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("post", PostSchema);

export default Post;
