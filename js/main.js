

window.onload=function () {

    gridwidth = document.getElementById("grid-container").clientWidth;
    cellwidth=0.2*gridwidth;
    newgame();
};

window.onresize = function(){  //浏览器大小改变重载样式
    gridwidth = document.getElementById("grid-container").clientWidth;
    cellwidth=0.2*gridwidth;
    gridinit();
    updateBoardView();
}



function newgame() {
    init();//初始化
    //随机两个个格子
    giveNumberCell();
    giveNumberCell();

}

//pc端事件响应循环
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                setScore();
                giveNumberCell();
                setTimeout("isOver()", 400);//每次新增一个数字就可能出现游戏结束
            }
            break;
        case 38://Up
            if (moveUp()) {
                setScore();
                giveNumberCell();
                setTimeout("isOver()", 400);//每次新增一个数字就可能出现游戏结束
            }
            break;
        case 39://right
            if (moveRight()) {
                setScore();
                giveNumberCell();
                setTimeout("isOver()", 400);//每次新增一个数字就可能出现游戏结束
            }
            break;
        case 40://down
            if (moveDown()) {
                setScore();
                giveNumberCell();
                setTimeout("isOver()", 400);//每次新增一个数字就可能出现游戏结束
            }
            break;
    }


});
//移动端事件监听
document.addEventListener('touchstart', function (event) {

    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
}, {passive: false});

document.addEventListener('touchmove', function (event) {
    event.preventDefault();//取消默认事件
}, {passive: false});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.2 *document.body.clientWidth && Math.abs(deltay) < 0.2 * document.body.clientWidth)
        return;

    //x
    if (Math.abs(deltax) >= Math.abs(deltay)) {//水平滑动
        if (deltax > 0) {
            //move right
            if (moveRight()) {
                setScore();
                setTimeout("giveNumberCell()", 210);
                setTimeout("isOver()", 300);
            }
            ;
        } else {
            //move left
            if (moveLeft()) {
                setScore();
                setTimeout("giveNumberCell()", 210);
                setTimeout("isOver()", 300);
            }
            ;
        }
    }
    //y
    else {//竖直滑动
        if (deltay > 0) {
            //move down
            if (moveDown()) {
                setScore();
                setTimeout("giveNumberCell()", 210);
                setTimeout("isOver()", 300);
            }
            ;
        } else {
            //move up
            if (moveUp()) {
                setScore();
                setTimeout("giveNumberCell()", 210);
                setTimeout("isOver()", 300);
            }
            ;
        }
    }

}, {passive: false})
