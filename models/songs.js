const mongoose = require("mongoose");

// Songs schema
const SongsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    duration: {
      type: Number,
    },
    version: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Create versions array containing previous version of documents
SongsSchema.virtual("versions", {
  ref: "SongsVersions",
  localField: "_id",
  foreignField: "songId",
});

const Songs = mongoose.model("Songs", SongsSchema, "Songs");

module.exports = Songs;
