const mongoose = require("mongoose");

const Songs = require("../models/songs");
const SongsVersions = require("../models/songsVersions");

/**
 * @desc updates song and saves previous version
 * @param songId _id of the song to update
 * @param newValues new song values used on the update
 */
const getSongs = async () => {
  const songs = await Songs.find({})
    .populate({ path: "versions" })
    .lean()
    .exec();

  return songs;
};

/**
 * @desc save song
 * @param song information used on new document
 */
const saveSong = async (song) => {
  const newSong = new Songs({
    ...song,
    _id: new mongoose.Types.ObjectId(),
    version: 1,
  });

  await newSong.save();

  return newSong;
};

/**
 * @desc updates song and saves previous version
 * @param songId _id of the song to update
 * @param newValues new song values used on the update
 */
const updateSong = async (songName, newValues) => {
  // When updating a song we also need to save old version and increment version number
  const currentSong = await Songs.findOne({ name: songName }).lean().exec();

  // Save current song on songs versions
  const newSongVersion = new SongsVersions({
    ...currentSong,
    _id: new mongoose.Types.ObjectId(),
    songId: currentSong._id,
  });

  await newSongVersion.save();

  // Update song with new values
  await Songs.updateOne(
    {
      name: songName,
    },
    {
      $set: {
        ...newValues,
      },
      $inc: {
        version: 1,
      },
    },
  );

  // When updating a song we also need to save old version and increment version number
  const updatedSong = await Songs.findOne({ name: songName })
    .populate({ path: "versions" })
    .lean()
    .exec();

  return updatedSong;
};

module.exports = {
  getSongs,
  saveSong,
  updateSong,
};
