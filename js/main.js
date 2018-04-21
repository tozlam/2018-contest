$(document).ready(function(e){
    newgame()
});

function newgame() {
    init();
    giveNumberCell();
    giveNumberCell();

}

//事件响应循环
$(document).keydown(function(event){
    switch (event.keyCode) {
        case 37://left
            if(moveLeft()){
                //setTimeout("generateOneNumber()",210);
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout("isgameover()",400);//300毫秒
            }
            break;
        case 38://up
            if(moveUp()){
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout("isgameover()",400);
            }
            break;
        case 39://right
            if(moveRight()){
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout("isgameover()",400);
            }
            break;
        case 40://down
            if(moveDown()){
                getScore();
                generateOneNumber();//每次新增一个数字就可能出现游戏结束
                setTimeout("isgameover()",400);
            }
            break;

    }
});

