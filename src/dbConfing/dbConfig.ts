import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
};

export default connect;
