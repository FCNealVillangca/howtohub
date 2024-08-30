import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// DELETE method to remove a post by slug
export const DELETE = async (
	req: Request,
	{ params }: { params: { slug: string } }
) => {
	console.log("working here");

	try {
		await dbConnect();
		const { slug } = params;

		if (!slug) {
			return NextResponse.json(
				{ message: "Slug is required" },
				{ status: 400 }
			);
		}

		// Find the post by slug and delete it
		const deletedPost = await Post.findOneAndDelete({ slug });

		if (!deletedPost) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Post deleted successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error deleting post:", error);
		return NextResponse.json(
			{ message: "Failed to delete post", error: error.message },
			{ status: 500 }
		);
	}
};

// GET method to retrieve a single post by slug
export const GET = async (
	req: Request,
	{ params }: { params: { slug: string } }
) => {
	try {
		await dbConnect();
		const { slug } = params;
		console.log(slug);

		if (!slug) {
			return NextResponse.json(
				{ message: "Slug is required" },
				{ status: 400 }
			);
		}

		// Find the post by slug
		const post = await Post.findOne({ slug });

		if (!post) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(post, { status: 200 });
	} catch (error: any) {
		console.error("Error retrieving post:", error);
		return NextResponse.json(
			{ message: "Failed to retrieve post", error: error.message },
			{ status: 500 }
		);
	}
};
