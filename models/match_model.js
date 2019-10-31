var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const player = new Schema({
    battletag: { type: String, reuqired: true },
    SR: { type: Number, min: 0, max: 5000, required: true },
    role: { type: String, required: true },
    team: { type: String, required: true },
    iconURL: { type: String, required: true },
    ready: { type: Boolean, default: false }
});

const matchSchema = new Schema({
    timeCreated: { type: Date, default: Date.now, required: true },
    creator: { type: String, required: true },
    rankRequired: { type: String, required: true },
    players: [player],
    positionsLeft: { type: Number, required: true, default: 11 },
    map: { type: String, required: true }
});

const Match = mongoose.model('match', matchSchema);
module.exports = Match;