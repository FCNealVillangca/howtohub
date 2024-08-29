import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Categories";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		dbConnect();
		const categories = await Category.find();
		console.log(categories);
		return NextResponse.json(categories);
	} catch (error) {
		console.log("here");
		console.log(error);
		return NextResponse.json([]);
	}
};
