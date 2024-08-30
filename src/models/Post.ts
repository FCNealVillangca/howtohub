import mongoose from "mongoose";
import slugify from "slugify";

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			required: false,
		},
		content: {
			type: String,
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{ timestamps: true }
);

PostSchema.pre("save", function (next) {
	if (this.isModified("title") || this.isNew) {
		// Generate a slug from the title
		this.slug = slugify(this.title, { lower: true, strict: true });
	}
	console.log("Pre-save hook: Document state:", this);
	next();
});

const Post =
	mongoose.models.Post || mongoose.model("Post", PostSchema, "posts");

export default Post;
