import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Category document
interface CategoryDocument extends Document {
	_id: string;
	name: string;
}

// Define the Mongoose schema for the Category
const CategorySchema: Schema<CategoryDocument> = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

// Create and export the Category model
const Category = mongoose.model<CategoryDocument>("category", CategorySchema);

export default Category;
