import mongoose from "mongoose";

// Connect to the MongoDB database
const mongodb_url =
  process.env.DB_URL || "mongodb://localhost:27017/dev-visit-home";

mongoose
  .connect(mongodb_url)
  .then(() =>
    console.log(
      "Connected to the database : " +
        mongoose.connection.host +
        ":" +
        mongoose.connection.port
    )
  )
  .catch((err) => console.log("Database connection error : " + err));
export default mongoose;
