var score = 0;
var border = [];
var add = [];


function init() {
    score = 0;
    document.getElementById("header_score").innerHTML = score;
    $("#gameover").addClass("gameover");
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
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", setTop(i, j));
                theNumberCell.css("left", setLeft(i, j));
            } else {
                theNumberCell.addClass("number-cell");
                theNumberCell.css("top", setTop(i, j));
                theNumberCell.css("left", setLeft(i, j));
                //NumberCell覆盖
                theNumberCell.css("background-color", setNumberBackgroundColor(border[i][j]));//返回背景色
                theNumberCell.css("color", setNumberColor(border[i][j]));//返回前景色
                if (border[i][j] == 2048)
                    theNumberCell.css("box-shadow", "0 0 50px 10px yellow");
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
            return "#ffc222";
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
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

function setScore() {
    document.getElementById("header_score").innerHTML = score;
}

function giveNumberCell() {

    if (!havespace(border)) {
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
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] == 0) {

                return true;
            }
        }
    }
    return false;
}

function havemove(border) {
    if (canMoveLeft()||canMoveRight()||canMoveUp()) {
        return true;
    }
    return false;
}

function resetAdd() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            add[i][j] = 0;
        }
    }
}

function noBlockHorizontal(row, col1, col2, border) {
    for (let i = col1 + 1; i < col2; i++) {
        if (border[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, border) {
    for (let i = row1 + 1; i < row2; i++) {
        if (border[i][col] != 0) {
            return false;
        }
    }
    return true;
}


function moveLeft() {
    if (!canMoveLeft(border)) {
        return false;
    }
    resetAdd();
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (border[i][j] != 0) {
                for (let x = 0; x < j; x++) {

                    if (border[i][x] == 0 && noBlockHorizontal(i, x, j, border)) {//到达的位置为空且中间没有障碍
                        border[i][x] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[i][x] == border[i][j] && noBlockHorizontal(i, x, j, border)) {
                        if (add[i][x] != 0) {
                            border[i][x + 1] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[i][x] += border[i][j];
                            border[i][j] = 0;
                            add[i][x] = 1;
                            score += border[i][x];
                            console.log(score);
                        }
                        continue;
                    }

                }
            }

        }
    }
    setTimeout("updateBoardView()", 100);
    return true;
}

function moveRight() {
    if (!canMoveRight(border)) {
        return false;
    }
    resetAdd();
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (border[i][j] != 0) {
                for (let x = 3; x > j; x--) {

                    if (border[i][x] == 0 && noBlockHorizontal(i, x, j, border)) {//到达的位置为空且中间没有障碍
                        border[i][x] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[i][x] == border[i][j] && noBlockHorizontal(i, x, j, border)) {
                        if (add[i][x] != 0) {
                            border[i][x - 1] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[i][x] += border[i][j];
                            border[i][j] = 0;
                            add[i][x] = 1;
                            score += border[i][x];
                            console.log(score);
                        }
                        continue;
                    }

                }
            }

        }
    }
    setTimeout("updateBoardView()", 100);
    return true;
}
function moveUp() {
    if (!canMoveUp(border)) {
        return false;
    }
    resetAdd();
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (border[i][j] != 0) {
                for (let x = 0; x < i; x++) {

                    if (border[x][j] == 0 && noBlockVertical(j, x, i, border)) {//到达的位置为空且中间没有障碍
                        border[x][j] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[x][j] == border[i][j] && noBlockVertical(j, x, i, border)) {
                        if (add[x][i] != 0) {
                            border[x+1][j] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[x][j] += border[i][j];
                            border[i][j] = 0;
                            add[x][j] = 1;
                            score += border[x][j];

                        }
                        continue;
                    }

                }
            }

        }
    }
    setTimeout("updateBoardView()", 100);
    return true;
}
function moveDown() {
    if (!canMoveDown(border)) {
        return false;
    }
    resetAdd();
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >=0; i--) {
            if (border[i][j] != 0) {
                for (let x = 3; x >i; x--) {

                    if (border[x][j] == 0 && noBlockVertical(j, x, i, border)) {//到达的位置为空且中间没有障碍
                        border[x][j] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[x][j] == border[i][j] && noBlockVertical(j, x, i, border)) {
                        if (add[x][i] != 0) {
                            border[x-1][j] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[x][j] += border[i][j];
                            border[i][j] = 0;
                            add[x][j] = 1;
                            score += border[x][j];

                        }
                        continue;
                    }

                }
            }

        }
    }
    setTimeout("updateBoardView()", 100);
    return true;
}
function canMoveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && j != 0) {
                if (border[i][j - 1] == 0 || border[i][j - 1] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}

function canMoveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && j != 3) {
                if (border[i][j + 1] == 0 || border[i][j + 1] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}
function canMoveUp() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && i != 0) {
                if (border[i-1][j] == 0 || border[i-1][j] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}
function canMoveDown() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && i != 3) {
                if (border[i+1][j ] == 0 || border[i+1][j] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}
function isOver() {
    if (!havespace(border) && !havemove(border)) {
        gameover();
    }
}

function gameover() {
    $("#gameover").addClass("gameover_display");

}
