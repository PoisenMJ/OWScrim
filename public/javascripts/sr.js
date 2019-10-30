var keys = require('../../config/keys');

const rankCheck = (sr) => {
    Object.keys(keys.ranks.srToRank).forEach((key) => {
        if(sr >= key) return keys.ranks.srToRank[keys];
    })
};

const rankToImage = (rank) => {
    return keys.ranks.rankToImage(rank);
}

const srToImage = (sr) => {
    var rank = rankCheck(sr);
    return rankToImage(rank);
}

//module.exports = srToImage;