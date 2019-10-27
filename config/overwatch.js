var overwatch = require('overwatch-api');
var request = require('request');

var platform = 'pc'
var region = 'eu';

function getSR(battletag){
    return new Promise(resolve => {
        battletag = battletag.replace('#', '-');
        overwatch.getProfile(platform, region, battletag, (err, json) => {
            if(err) console.log(err);
            else{
                imageUrl = json.portrait;
                tankSR = json.competitive.tank.rank;
                dpsSR = json.competitive.damage.rank;
                supportSR = json.competitive.support.rank;
                averageSR = (tankSR + dpsSR + supportSR) / 3;
                resolve([tankSR, dpsSR, supportSR]);
            }
            resolve(false);
        })
    })
}

module.exports = getSR;