"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // add new endpoints here ☝️
  .get("/top50", (req, res) => {
    // const top50 = ;
    res.status(200).json({
      status: 200,
      data: top50,
    });
  })

  .get("/top50/song/:Rank", (req, res) => {
    let songRank = req.params.Rank;
    let rankAsNumber = Number(songRank);
    // console.log(rankAsNumber);
    const songInfo = top50.find((song) => {
      return song.rank === rankAsNumber;
    });
    if (songInfo) {
      res.status(200).json({
        status: 200,
        songInfo,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Song not found",
      });
    }
  })

  .get("/top50/artist/:artist", (req, res) => {
    let songArtist = req.params.artist;

    const songInfo = top50.find((song) => {
      return song.artist.toLowerCase() === songArtist.toLowerCase();
    });

    if (songInfo) {
      res.status(200).json({
        status: 200,
        songInfo,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Song not found",
      });
    }
  })

  .get("/top50/most-popular-artist", (req, res) => {
    const popularArtist = top50.reduce((acc, song) => {
      if (acc[song.artist]) {
        acc[song.artist] += 1;
      } else {
        acc[song.artist] = 1;
      }
      return acc;
    }, {});
    console.log(popularArtist);
    const artistSongs = Object.values(popularArtist);
    const artistName = Object.keys(popularArtist);

    let currMax = 0;
    let currMaxIndex = null;

    artistSongs.forEach((numOfSongs, index) => {
      if (numOfSongs > currMax) {
        currMax = numOfSongs;
        currMaxIndex = index;
      }
    });
    let mostPopularArtist = artistName[currMaxIndex];
    console.log(mostPopularArtist);
    const finalResult = top50.filter((song) => {
      if (song.artist.includes(mostPopularArtist)) {
        return song;
      }
    });
    //
    res.status(200).json({
      status: 200,
      data: finalResult,
    });
  })

  .get("/top50/artist", (req, res) => {
    let artistsObj = {};
    top50.forEach((songInfo) => {
      artistsObj[songInfo.artist] = true;
    });
    const artistArr = Object.keys(artistsObj);
    console.log(artistArr);
    res.status(200).json({
      status: 200,
      data: artistArr,
    });
  })

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
