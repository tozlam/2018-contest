$(document).ready(function (e) {
    newgame();
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

document.addEventListener('touchstart', function(event){

    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
}, {passive: false});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
}, {passive: false});

document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.2 * screenWidth && Math.abs(deltay) < 0.2 * screenWidth)
        return;

    //x
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            //move right
            if(moveRight()){
                setScore();
                setTimeout("giveNumberCell()",210);
                setTimeout("isOver()",300);
            };
        } else {
            //move left
            if(moveLeft()){
                setScore();
                setTimeout("giveNumberCell()",210);
                setTimeout("isOver()",300);
            };
        }
    }
    //y
    else {
        if (deltay > 0) {
            //move down
            if(moveDown()){
                setScore();
                setTimeout("giveNumberCell()",210);
                setTimeout("isOver()",300);
            };
        } else {
            //move up
            if(moveUp()){
                setScore();
                setTimeout("giveNumberCell()",210);
                setTimeout("isOver()",300);
            };
        }
    }

}, {passive: false})
