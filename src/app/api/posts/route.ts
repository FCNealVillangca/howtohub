import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { NextResponse, NextRequest } from "next/server";

// GET method to retrieve all posts
export const GET = async () => {
	try {
		await dbConnect();
		const posts = await Post.find();
		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json([], { status: 500 });
	}
};

// POST method to create a new post
export const POST = async (req: NextRequest) => {
	try {
		await dbConnect();
		const { title, content, categoryId } = await req.json();

		// Validate the required fields
		if (!title || !content || !categoryId) {
			return NextResponse.json(
				{ message: "Title, content, and categoryId are required" },
				{ status: 400 }
			);
		}
		const newPost = new Post({
			title,
			content,
			categoryId,
		});
		// Save the post to the database
		const saved = await newPost.save();
		return NextResponse.json(saved, { status: 201 });
	} catch (error: any) {
		console.error("Error saving post:", error);
		return NextResponse.json(
			{ message: "Failed to create post", error: error.message },
			{ status: 500 }
		);
	}
};

// PUT method to update an existing post by ID
export const PUT = async (req: NextRequest) => {
	try {
		await dbConnect();
		const { id, title, content, categoryId } = await req.json();
		console.log(id, title, content, categoryId);

		// Validate the required fields
		if (!id || !title || !content || !categoryId) {
			return NextResponse.json(
				{ message: "ID, title, content, and categoryId are required" },
				{ status: 400 }
			);
		}

		// Find the post by ID and update it
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ title, content, categoryId },
			{ new: true, runValidators: true }
		);

		if (!updatedPost) {
			return NextResponse.json({ message: "Post not found" }, { status: 404 });
		}

		return NextResponse.json(updatedPost, { status: 200 });
	} catch (error: any) {
		console.error("Error updating post:", error);
		return NextResponse.json(
			{ message: "Failed to update post", error: error.message },
			{ status: 500 }
		);
	}
};
