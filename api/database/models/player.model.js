const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    wins: {
        type: Number,
        default: 0,
    },
    cumulativePoints: {
        type: Number,
        default: 0,
    },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
