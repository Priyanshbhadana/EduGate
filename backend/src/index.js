import dbconnect from "./database/index.js";
import { ApiError } from "./utils/ApiError.js";
import app from "./app.js";
import dotenv from "dotenv";

// ✅ Load .env normally
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN); // ✅ Add this for CORS debug

dbconnect()
  .then(() => {
    app.on('error', (error) => {
      console.log("Express error : ", error);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    throw new ApiError(400, "Database connection error", error);
  });
