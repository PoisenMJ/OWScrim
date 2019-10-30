srToRankDict = {
    0: 'bronze-rank',
    1500: 'silver-rank',
    2000: 'gold-rank',
    2500: 'plat-rank',
    3000: 'diamond-rank',
    3500: 'masters-rank',
    4000: 'grandmaster-rank',
    4300: 'top500-rank'
}

function srToRank(sr){
    var lowest = Number.MAX_VALUE;
    var keys = Object.keys(srToRankDict);
    var index = 0;
    for(var i = 0; i < keys.length; i++){
        if((sr - keys[i]) > 0 && (sr - keys[i]) < lowest) {
            lowest = (sr - keys[i]);
            index = i;
        }
    };
    console.log(index);
    return srToRankDict[keys[index]];
}

function rankToImage(rank){
    var onlyRank = rank.split('-rank')[0];
    return '/images/' + onlyRank + '.png';
}

function chooseRole(sr, element){
    $('.role-image').css('filter', 'opacity(0.2)');
    element.style.filter = 'opacity(0.5)';
    $('#roleselect').val(element.id).prop('selected', true);

    var rank = srToRank(sr);
    var imagePath = rankToImage(rank);
    $('.match-rank').attr('src', imagePath);
    $('#match-rank').val(rank);
}

$('#' + $('#mapselect').val()).css('filter', 'grayscale(0)');
$('#' + $('#roleselect').val()).css('filter', 'opacity(0.5)');
if($('#roleselect').val() == 'tank') $('.match-rank').attr('src', rankToImage(srToRank(parseInt($('#tankSR').text()))));
else if($('#roleselect').val() == 'dps') $('.match-rank').attr('src', rankToImage(srToRank(parseInt($('#dpsSR').text()))));
else if($('#roleselect').val() == 'support') $('.match-rank').attr('src', rankToImage(srToRank(parseInt($('#supportSR').text()))));

$('.map-image').hover(function(){ $(this).css('filter', 'grayscale(0)'); });
$('.map-image').mouseleave(function(){
    if($('#mapselect').val() != $(this).attr('id')) $(this).css('filter', 'grayscale(1)');
});
$('.map-image').click(function(){
    $('.map-image').css('filter', 'grayscale(1)');
    $(this).css('filter', 'grayscale(0)')
    $('#mapselect').val($(this).attr('id')).prop('selected', true);
});
$('.role-image').hover(function(){ $(this).css('filter', 'opacity(0.5)'); });
$('.role-image').mouseleave(function(){ 
    if($('#roleselect').val() != $(this).attr('id')) $(this).css('filter', 'opacity(0.2)'); 
});