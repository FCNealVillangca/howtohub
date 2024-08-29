import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Categories";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		dbConnect();
		const categories = await Category.find({});

		return NextResponse.json(categories);
	} catch (error) {
		return NextResponse.json([]);
	}
};
