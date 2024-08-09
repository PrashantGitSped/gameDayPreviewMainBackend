const mongoose = require('mongoose')
const playerSchema = new mongoose.Schema({
    name:{type: String, required: true},
    dateOfBirth: { type: Date, required: true},
    nationality: {type: String, required: true},
    position: {type: String, required: true},
    currentTeam: {type: String, required: true},
    performance: [
        {
            matchId: String,
            goalsScored: Number,
            assists: Number,
            minutesPlayed: Number,
        }
    ],
});
module.exports = mongoose.model('Player', playerSchema)