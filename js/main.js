$(document).ready(function (e) {
    newgame()
});

function newgame() {
    init();
    giveNumberCell();
    giveNumberCell();

}

//事件响应循环
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                setScore();
                giveNumberCell()//每次新增一个数字就可能出现游戏结束
                setTimeout("isOver()", 400);
            }
            break;
        case 38://Up
            if (moveUp()) {
                setScore();
                giveNumberCell()//每次新增一个数字就可能出现游戏结束
                setTimeout("isOver()", 400);
            }
            break;
        case 39://right
            if (moveRight()) {
                setScore();
                giveNumberCell()//每次新增一个数字就可能出现游戏结束
                setTimeout("isOver()", 400);
            }
            break;
        case 40://down
            if (moveDown()) {
                setScore();
                giveNumberCell()//每次新增一个数字就可能出现游戏结束
                setTimeout("isOver()", 400);
            }
            break;
    }


});

