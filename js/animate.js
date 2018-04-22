function showNumberWithAnimation(i, j, randNumber) {//实现随机数字的样式变动

    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", setNumberBackgroundColor(randNumber));
    numberCell.css("color", setNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width : "100px",
        height : "100px",
        top : setTop(i, j),
        left : setLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){//实现移动格子的样式变动

    var numberCell = $('#number-cell-'+fromx +'-'+fromy);
    numberCell.animate({top:setTop(tox,toy),
        left:setLeft(tox,toy)},200);

}