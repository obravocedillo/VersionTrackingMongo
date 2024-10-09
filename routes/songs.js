const express = require("express");
const songsController = require("../controllers/songs");

// Express router
const router = express.Router();

/**
 * @desc Will save a new song in the database
 * @param {*} req express request
 * @param {*} res espress response
 */
const saveSong = async (req, res) => {
  try {
    let song = req.body.song;

    // If song is not present on the request body then the call is not valid
    if (song) {
      // Call controller logic
      let ceateSongResponse = await songsController.saveSong(song);

      // Return controller response
      return res.status(200).send(ceateSongResponse);
    }

    // Return bad request error
    res.status(400).send("Error data incomplete");
  } catch (error) {
    // Return error message
    res.status(500).send(error);
  }
};

/**
 * @desc Will update a song in the database
 * @param {*} req express request
 * @param {*} res espress response
 */
const updateSong = async (req, res) => {
  try {
    let songName = req.body.songName;
    let newValues = req.body.newValues;

    // If songName or new values are not present on the request body then the call is not valid
    if (songName && newValues) {
      // Call controller logic
      let updateSongResponse = await songsController.updateSong(
        songName,
        newValues,
      );

      // Return controller response
      return res.status(200).send(updateSongResponse);
    }

    // Return bad request error
    res.status(400).send("Error data incomplete");
  } catch (error) {
    // Return error message
    res.status(500).send(error);
  }
};

/**
 * @desc Will get songs from the database
 * @param {*} req express request
 * @param {*} res espress response
 */
const getSongs = async (req, res) => {
  try {
    // Call controller logic
    let getSongsResponse = await songsController.getSongs();

    // Return controller response
    return res.status(200).send(getSongsResponse);
  } catch (error) {
    // Return error message
    res.status(500).send(error);
  }
};

// Route that saves a new song
router.post("/", saveSong);

// Route that updates a song
router.put("/", updateSong);

// Route that gets songs
router.get("/", getSongs);

module.exports = router;
