var score = 0;
var border = [];
var add = [];


function init() {
    score = 0;
    document.getElementById("header_score").innerHTML = score;
    $("#gameover").css("display", "none");
    for (let i = 0; i < 4; i++) {          //初始化4x4格子
        for (let j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", setTop(i, j));
            gridCell.css("left", setLeft(i, j));
        }
    }
    for (let i = 0; i < 4; i++) {       //初始化格子数组

        border[i] = [];
        for (let j = 0; j < 4; j++) {
            border[i][j] = 0;
        }
    }

    for (let i = 0; i < 4; i++) {  //初始化合并数组
        add[i] = [];
        for (let j = 0; j < 4; j++) {
            add[i][j] = 0;
        }
    }
    updateBoardView();

}

function setTop(i, j) {
    return 20 + i * 120;
}

function setLeft(i, j) {
    return 20 + j * 120;
}

function updateBoardView() {//更新数组的前端样式
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            console.log(border);
            if (border[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top',setTop(i, j));
                theNumberCell.css('left', setLeft(i, j));
            } else {
               theNumberCell.addClass("number-cell");
                theNumberCell.css('top', setTop(i, j));
                theNumberCell.css('left', setLeft(i, j));
                //NumberCell覆盖
                theNumberCell.css('background-color', setNumberBackgroundColor(border[i][j]));//返回背景色
                theNumberCell.css('color', setNumberColor(border[i][j]));//返回前景色
                theNumberCell.text(border[i][j]);
            }
        }
    }
}

function setNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

function setNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}

function giveNumberCell() {

    if (!havespace(border)){
        return false;
    }
    while (true) {

        var randx = parseInt(Math.floor((Math.random() * 4)));
        var randy = parseInt(Math.floor((Math.random() * 4)));
        if (border[randx][randy] == 0) {

            break;
        }
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    border[randx][randy] = randNumber;
        updateBoardView();
    return true;
}

function havespace(border) {
    for (let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                    if(border[i][j]==0){

                            return true;
                    }
            }
    }
    return false;
}

function moveLeft() {
    if(!canMoveLeft(border)){
            return false;
    }

}
