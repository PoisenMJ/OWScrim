var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const playerSchema = new Schema({
    battletag: { type: String, reuqired: true },
    SR: { type: Number, min: 0, max: 5000, required: true },
    role: { type: String, required: true },
    team: { type: String, required: true },
    ready: { type: Boolean, default: false }
});

const Player = mongoose.model('player', playerSchema);
module.exports = Player;