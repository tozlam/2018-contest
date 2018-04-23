var score = 0;
var border = [];
var add = [];
var heightestScore = 0;
var screenwidth;
var gridwidth;
var cellwidth;

function init() {                               //初始化
    score = 0;
    document.getElementById("header_score").innerHTML = score;//分数归零
    getCookie();                                                //获取历史最高分
    $("#gameover").addClass("gameover");                      //隐藏gameover元素


    gridinit();

    for (let i = 0; i < 4; i++) {       //初始化格子矩阵

        border[i] = [];
        for (let j = 0; j < 4; j++) {
            border[i][j] = 0;
        }
    }

    for (let i = 0; i < 4; i++) {  //初始化合并矩阵
        add[i] = [];
        for (let j = 0; j < 4; j++) {
            add[i][j] = 0;
        }
    }
    updateBoardView();

}

function gridinit() {
    for (let i = 0; i < 4; i++) {          //初始化4x4矩阵
        for (let j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", setTop(i, j));
            gridCell.css("left", setLeft(i, j));
        }
    }
}

function setTop(i, j) {         //设置格子y

    return 0.2*cellwidth + i * (cellwidth+0.2*cellwidth);
}

function setLeft(i, j) {        //设置格子x
    return  0.2*cellwidth + j * (cellwidth+0.2*cellwidth);
}

function updateBoardView() {//更新数组的前端样式
    $(".grid-cell").css("width",cellwidth);
    $(".grid-cell").css("height",cellwidth);

    $(".number-cell").remove();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if (border[i][j] == 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", setTop(i, j));
                theNumberCell.css("left", setLeft(i, j));
            } else {
                theNumberCell.css("width",cellwidth);
                theNumberCell.css("height",cellwidth);
                theNumberCell.css("z-index",10);
                theNumberCell.css("top", setTop(i, j));
                theNumberCell.css("left", setLeft(i, j));
                //NumberCell覆盖
                theNumberCell.css("background-color", setNumberBackgroundColor(border[i][j]));//返回背景色
                theNumberCell.css("color", setNumberColor(border[i][j]));//返回前景色
                if (border[i][j] == 2048)                       //2048分值加入光芒
                    theNumberCell.css("box-shadow", "0 0 50px 10px yellow");
                theNumberCell.text(border[i][j]);
            }
        }
    }
    $(".number-cell").css("line-height",cellwidth*0.02);
}

function setNumberBackgroundColor(number) { //设置各个分值对应的颜色
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

function setNumberColor(number) {   //设置数字颜色
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

function setScore() {           //更新分数
    document.getElementById("header_score").innerHTML = score;
}

function giveNumberCell() {     //随机一个格子

    if (!havespace(border)) {   //判断是否还有位置
        return false;
    }
    while (true) {
        //随机一个矩阵的x和y
        var randx = parseInt(Math.floor((Math.random() * 4)));
        var randy = parseInt(Math.floor((Math.random() * 4)));
        if (border[randx][randy] == 0) {

            break;
        }
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    border[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);//实现随机数字的样式变动
    return true;
}

function havespace(border) {        //判断是否还有位置
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] == 0) {

                return true;
            }
        }
    }
    return false;
}

function havemove(border) {         //判断是否还可以移动
    if (canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) {
        return true;
    }
    return false;
}

function resetAdd() {           //重置add矩阵
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            add[i][j] = 0;
        }
    }
}

function noBlockHorizontal(row, col1, col2, border) { //判断水平方向是否有障碍物
    for (let i = col1 + 1; i < col2; i++) {
        if (border[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, border) {//判断竖直方向是否有障碍物
    for (let i = row1 + 1; i < row2; i++) {
        if (border[i][col] != 0) {
            return false;
        }
    }
    return true;
}

//左移实现
function moveLeft() {
    if (!canMoveLeft(border)) { //判断能否左移
        return false;
    }
    resetAdd();
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {//第一列的数字不可能向左移动
            if (border[i][j] != 0) {
                //(i,j)的左侧
                for (let x = 0; x < j; x++) {

                    if (border[i][x] == 0 && noBlockHorizontal(i, x, j, border)) {//到达的位置为空且中间没有障碍
                        showMoveAnimation(i, j, i, x);
                        border[i][x] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[i][x] == border[i][j] && noBlockHorizontal(i, x, j, border)) { //到达的位置的数字和本来的数字相等 && 中间没有障碍物
                        showMoveAnimation(i, j, i, x);//实现移动格子的样式变动
                        if (add[i][x] != 0) {//目标位置是否完成过合并
                            border[i][x + 1] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[i][x] += border[i][j];
                            border[i][j] = 0;
                            add[i][x] = 1;
                            score += border[i][x];

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
    if (!canMoveRight(border)) {//判断能否右移
        return false;
    }
    resetAdd();
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {//最后一列的数字不可能向右移动
            if (border[i][j] != 0) {
                //(i,j)的右侧
                for (let x = 3; x > j; x--) {

                    if (border[i][x] == 0 && noBlockHorizontal(i, x, j, border)) {//到达的位置为空且中间没有障碍
                        showMoveAnimation(i, j, i, x);//实现移动格子的样式变动
                        border[i][x] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[i][x] == border[i][j] && noBlockHorizontal(i, x, j, border)) {//到达的位置的数字和本来的数字相等 && 中间没有障碍物
                        showMoveAnimation(i, j, i, x);//实现移动格子的样式变动
                        if (add[i][x] != 0) {//目标位置是否完成过合并
                            border[i][x - 1] = border[i][j];
                            border[i][j] = 0;
                        }
                        else {
                            border[i][x] += border[i][j];
                            border[i][j] = 0;
                            add[i][x] = 1;
                            score += border[i][x];

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
    if (!canMoveUp(border)) {//判断能否上移
        return false;
    }
    resetAdd();
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {//第一行的数字不可能向上移动
            if (border[i][j] != 0) {
                //(i,j)的上面
                for (let x = 0; x < i; x++) {

                    if (border[x][j] == 0 && noBlockVertical(j, x, i, border)) {//到达的位置为空且中间没有障碍
                        showMoveAnimation(i, j, x, j);//实现移动格子的样式变动
                        border[x][j] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[x][j] == border[i][j] && noBlockVertical(j, x, i, border)) {//到达的位置的数字和本来的数字相等 && 中间没有障碍物
                        showMoveAnimation(i, j, x, j);//实现移动格子的样式变动
                        if (add[x][i] != 0) {//目标位置是否完成过合并
                            border[x + 1][j] = border[i][j];
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
    if (!canMoveDown(border)) {//判断能否下移
        return false;
    }
    resetAdd();
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {//最后一行的数字不可能向下移动
            if (border[i][j] != 0) {
                //(i,j)的下面
                for (let x = 3; x > i; x--) {

                    if (border[x][j] == 0 && noBlockVertical(j, x, i, border)) {//到达的位置为空且中间没有障碍
                        showMoveAnimation(i, j, x, j);//实现移动格子的样式变动
                        border[x][j] = border[i][j];
                        border[i][j] = 0;
                        continue;
                    } else if (border[x][j] == border[i][j] && noBlockVertical(j, x, i, border)) {//到达的位置的数字和本来的数字相等 && 中间没有障碍物
                        showMoveAnimation(i, j, x, j);//实现移动格子的样式变动
                        if (add[x][i] != 0) {//目标位置是否完成过合并
                            border[x - 1][j] = border[i][j];
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

//判断能否移动
function canMoveLeft() {//判断能否向左移动
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

function canMoveRight() {//判断能否向右移动
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

function canMoveUp() {//判断能否向上移动
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && i != 0) {
                if (border[i - 1][j] == 0 || border[i - 1][j] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}

function canMoveDown() {//判断能否向下移动
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (border[i][j] != 0 && i != 3) {
                if (border[i + 1][j] == 0 || border[i + 1][j] == border[i][j])
                    return true;
            }

        }
    }
    return false;
}

function isOver() {     //判断游戏与否
    if (!havespace(border) && !havemove(border)) {
        gameover();
        setGameover(score);   //设置游戏结束后的处理
    }
}

function gameover() {       //显示gameover元素
    $("#gameover").addClass("gameover_display");

}

function setGameover(score) {       //设置游戏结束后的处理
    var date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); //设置date为当前时间加一年
    document.cookie = "score=" + score + ";expires=" + date.toGMTString();    //设置分数cookie
    if (heightestScore == 0 || score > heightestScore) {                    //第一次游戏和当局分数为最高分的情况
        document.getElementById("gameover_show").innerHTML = "New Best!";
    }
    else {
        document.getElementById("gameover_scoreaway").innerHTML = (heightestScore - score);
    }

}

function getCookie() {      //获取历史最高分
    if (document.cookie.length > 0) {
        var hs_start = document.cookie.indexOf("score=");
        if (hs_start == -1) {
            return;
        }
        var hs_end = document.cookie.indexOf(";", hs_start);
        if (hs_end != -1) {
            heightestScore = document.cookie.substring(hs_start + 6, hs_end);
        }
        else {
            heightestScore = document.cookie.substring(hs_start + 6);
        }

        document.getElementById("header_best").innerHTML = heightestScore;
    }
}