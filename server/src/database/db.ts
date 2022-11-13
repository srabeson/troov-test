import mongoose from "mongoose";

/**
 * Connect to a mongodb URI
 *
 * @param uri mongodb URI to connect to
 * @returns mongoose instance
 */
const connect = async (uri: string) => {
  try {
    // Listen to connection events
    mongoose.connection.on("connecting", () => {
      console.log("MongoDB: connecting...");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB: connected.");
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("MongoDB: disconnecting...");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB: disconnected.");
    });

    return await mongoose.connect(uri);
  } catch (error) {
    console.error("Error while trying to MongoDB database:", error);
    throw error;
  }
};

export default connect;
