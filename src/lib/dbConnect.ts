import mongoose from "mongoose";
const uri =
	"mongodb+srv://villangcafcneal:7oYC9jXR5hjA3R5a@cluster0.46hdv0e.mongodb.net/howtohub?retryWrites=true&w=majority"; // Replace 'myDatabase' with your database name

let isConnected = false;

const connectToDB = async () => {
	if (isConnected) return; // Prevent multiple connections
	try {
		await mongoose.connect(uri);
		isConnected = true;
		console.log("Connected to MongoDB Atlas");
	} catch (error) {
		console.error("Failed to connect to MongoDB Atlas:", error);
	}
};

export default connectToDB;
