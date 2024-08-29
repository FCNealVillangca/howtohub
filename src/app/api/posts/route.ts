import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		dbConnect();
		const posts = await Post.find();
		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json([]);
	}
};
