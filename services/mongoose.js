const mongoose = require("mongoose");

// Initialize Mongoose
const startMongoose = async () => {
  await mongoose.connect("mongodb://localhost:27017/versionTracking");

  const db = mongoose.connection;

  console.log("Mongo connected");

  // handle mongoose error
  db.on("error", async () => {
    console.log("Mongoose error");
  });

  // handle mongoose disconnect
  db.on("disconnected", async () => {
    console.log("Mongoose disconnected");
  });
};

module.exports = startMongoose;
