const express = require("express");

const startMongoose = require("./services/mongoose");

const songsRouter = require("./routes/songs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 *
 * @desc initialized all needed services
 */
const initializeConnections = async () => {
  try {
    await startMongoose();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

initializeConnections().then(() => {
  app.get("/health", (_req, res) => {
    res.status(200).send("App working!");
  });

  app.use("/songs", songsRouter);
});

module.exports = app;
