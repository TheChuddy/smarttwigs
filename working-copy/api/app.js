const express = require("express");
const cors = require("cors");
const mongoose = require("./database/mongoose");
const Player = require("./database/models/player.model");

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------------
// API

// POST /players
// Create a new player
app.post("/players", (req, res, next) => {
    const newPlayer = new Player({
        name: req.body.name,
    });

    newPlayer
        .save()
        .then((player) => res.send(player))
        .catch((error) => console.log(error));
});

// GET /players
// Get all players
app.get("/players", (req, res, next) => {
    Player.find({})
        .sort({ wins: "desc" })
        .sort({ cumulativePoints: "asc" })
        .then((players) => res.send(players))
        .catch((error) => console.log(error));
});

// GET /players/:playerID
// Get a specific player
app.get("/players/:playerName", (req, res, next) => {
    Player.findOne({ name: req.params.playerName })
        .then((player) => {
            res.send(player);
        })
        .catch((error) => console.log(error));
});

// PATCH /players/:name
app.patch("/players/:playerName", (req, res, next) => {
    console.log("patch");
    console.log(req.params.playerName);
    console.log(req.body);
    Player.findOneAndUpdate({ name: req.params.playerName }, req.body, {
        new: true,
    })
        .then((player) => res.send(player))
        .catch((error) => {
            console.log("error occurred", error);
        });
});

app.listen(3000, () => console.log("server listening on port 3000"));
