import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;

    if (!url) {
      throw new Error("A variável MONGODB_URL não foi definida no .env");
    }

    await mongoose.connect(url);
    console.log("mongoDB Connected!");
  } catch (error) {
    console.error("Failed to connect DB: ", error.message);
    process.exit(1);
  }
};
