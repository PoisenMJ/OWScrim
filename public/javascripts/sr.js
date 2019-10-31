var keys = require('../../config/keys');

const rankCheck = (sr) => {
    var lowest = Number.MAX_VALUE;
    var k = Object.keys(keys.ranks.srToRank);
    var index = 0;
    for(var i = 0; i < k.length; i++){
        if((sr - k[i]) > 0 && (sr - k[i]) < lowest) {
            lowest = (sr - k[i]);
            index = i;
        }
    };
    return keys.ranks.srToRank[k[index]];
};

const rankToImage = (rank) => {
    return keys.ranks.rankToImage(rank);
}

const srToImage = (sr) => {
    var rank = rankCheck(sr);
    return rankToImage(rank);
}

module.exports = rankCheck;