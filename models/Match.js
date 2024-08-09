const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
    matchId: {type: String, required: true},
    date: {type: Date, required: true},
    teamA: {type: String, required: true},
    teamB: {type: String, required: true},
    score: {type: String, required: true},
    events: [
        {
            eventType: String,
            timestamp: String,
            playersInvolved: [String]
        }
    ],
})
module.exports = mongoose.model('Match', matchSchema)