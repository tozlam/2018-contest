var score=0;
var border=[];
var add=[];
$(document).ready(function(e){
    init();
});

function init() {
        score=0;
        document.getElementById("header_score").innerHTML=score;
        $("#gameover").css("display","none");
        for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                        var gridCell=$("#grid-cell-"+i+"-"+j);
                        gridCell.css("top",setTop(i,j));
                        gridCell.css("left",setLeft(i,j));
                }
        }
        for (let i=0;i<4;i++){       //初始化格子数组

                border[i]=[];
                for(let j=0;j<4;j++){
                        border[i][j]=0;
                }
        }

        for (let i=0;i<4;i++){  //初始化合并数组
                add[i]=[];
                for(let j=0;j<4;j++){
                        add[i][j]=0;
                }
        }


}

function setTop(i,j) {
    return 20+i*120;
}
function setLeft(i,j) {
    return 20+j*120;
}