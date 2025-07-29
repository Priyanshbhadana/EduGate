import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { ApiError } from '../utils/ApiError.js';

const dbconnect = async () => {
	try {
		const fullUri = process.env.MONGO_URI;
		console.log("Connecting to MongoDB at:", fullUri);

		const connectionInstance = await mongoose.connect(fullUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("✅ Database connection successful");
		console.log("➡️  Host:", connectionInstance.connection.host);
		console.log("📂 DB Name:", connectionInstance.connection.name);
	} catch (error) {
		console.error("❌ Database connection failed");
		throw new ApiError(400, "Database connection error", error);
	}
};

export default dbconnect;
