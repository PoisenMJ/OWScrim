var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const matchSchema = new Schema({
    timeCreated: { type: Date, default: Date.now, required: true },
    creator: { type: String, required: true },
    rankRequired: { type: String, required: true },
    players: [{ 'type': Schema.Types.ObjectId, 'ref': 'player' }],
    positionsLeft: { type: Number, required: true, default: 11 },
    map: { type: String, required: true }
});

const Match = mongoose.model('match', matchSchema);
module.exports = Match;