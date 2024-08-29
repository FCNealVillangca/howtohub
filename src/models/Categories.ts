import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Category document

// Define the Mongoose schema for the Category
const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

// Create and export the Category model
const Category =
	mongoose.models.Category ||
	mongoose.model("Category", CategorySchema, "categories");

export default Category;
