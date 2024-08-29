import mongoose from "mongoose";

const uri =
	"mongodb+srv://villangcafcneal:7oYC9jXR5hjA3R5a@cluster0.46hdv0e.mongodb.net/";
const connectToDB = async () => {
	try {
		await mongoose.connect(uri, {
			autoIndex: true,
		});
		console.log("Connected to Mongodb Atlas");
	} catch (error) {
		console.log("cant connect");
		console.error(error);
	}
};
export default connectToDB;
