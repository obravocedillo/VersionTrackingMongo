const mongoose = require("mongoose");

// Songs versions schema
const SongsVersionsSchema = new mongoose.Schema({
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Songs" },
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

const SongsVersions = mongoose.model(
  "SongsVersions",
  SongsVersionsSchema,
  "SongsVersions",
);

module.exports = SongsVersions;
