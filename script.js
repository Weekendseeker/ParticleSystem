var canvas =document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var searchRadius = canvas.width/2.5;
    // canvas.width=window.innerWidth;
    // canvas.height=window.innerHeight;
//
//
     canvas.width=window.innerWidth;
     canvas.height=window.innerHeight;

    ctx.fillStyle="lightgray";
    ctx.fillRect(0,0,canvas.width, canvas.height);
     colors=["purple","orange", "green"];
     boxes={};
     boxesNum=160;
     boxesIndex=0;


//     var posX;
 //    var posY;

////////////////////////////////////////////////////////////////////////////Class Box
function Box(x1,y1,bwidth,bheight,color,dx,dy) {
    this.posX=x1;
    //his.posX=posX;
    this.posY=y1;


    this.startPosX=this.posX;
    this.startPosY=this.posY;

    this.angleX=Math.random()*(360-0);
    this.angleY=Math.random()*(360-0);

    //this.posY=posY;

    this.dx=0.1;
    this.dy=0.1;

    this.bw=bwidth;
    this.bh=bheight;

    this.color=color;

    boxes[boxesIndex]=this;
    boxesIndex++;
    this.id=boxesIndex;

    this.gravity= {x:1,y:1};

    this.life=0;
    this.maxLife=Math.random()*300-10;
}



Box.prototype.draw=function () {
    this.dx=Math.cos(this.angleX);
    this.dy=Math.sin(this.angleY);

    if(this.posX<5 || this.posX > canvas.width + 5){
        this.gravity.x = -this.gravity.x;
    }


    if(this.posY<5 || this.posY > canvas.height + 5){
        this.gravity.y = -this.gravity.y;
    }


    this.posX+=this.dx * this.gravity.x;
    this.posY+=this.dy * this.gravity.y;
   // this.life++;
/*

    if(this.posX<10){


        var newAngle = Math.atan2(this.posX - this.startPosX, this.posY - this.startPosY);
        this.angleX = Math.sin(newAngle);
    }

    if(this.posX>canvas.width+10){

        var newAngle = Math.atan2(this.posX - this.startPosX, this.posY - this.startPosY);
        this.angleX = Math.sin(newAngle);
        //this.gravity.x = -this.gravity.x;
    }


    if(this.posY>canvas.height-10||this.posY<10){
        this.dy+= Math.sin(this.angleY);
        this.gravity = -this.gravity;
    }


    //his.dx*=this.gravity.x;
    this.dy*=this.gravity;
   //  if(this.life>=this.maxLife){
   //
   //      delete boxes[this.id];
   //  }*/
    ctx.fillStyle=this.color;
    ctx.fillRect(this.posX,this.posY, this.bw,this.bh);
};
///////////////////////////////////////////////////////////////////////////class Line
function line(x1,y1,x2,y2,color,isdraw) {

    this.lx1=x1;
    this.ly1=y1;

    this.lx2=x2;
    this.ly2=y2;

    this.color=color;

    this.drawing=isdraw;
}

line.prototype.draw=function () {
    ctx.beginPath();
    ctx.moveTo(this.lx1, this.ly1);
    ctx.lineTo(this.lx2, this.ly2);
    ctx.strokeStyle=this.color;
    ctx.stroke();
};
///////////////////////////////////////////////////////////////////////////drawing
for(var i=0; i<boxesNum;i++){
    var ran=Math.floor(Math.random()*(2-0));
    //console.log(ran);
    var b =new Box(Math.random()*canvas.width,
        Math.random()*canvas.height,
        5, 5,colors[ran]);

}

function checkInCircle(xc,yc,x1,y1){
    return Math.pow((y1-yc),2) + Math.pow((x1-xc),2) <= Math.pow(searchRadius,2);
}

setInterval(function () {

    ctx.fillStyle="lightgray";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(var i=0;i<boxesNum;i++){
        var posX=boxes[i].posX;
        var  posY=boxes[i].posY;
        for(var j=i+1;j<boxesNum;j++){
            var newposX = boxes[j].posX;
            var newposY = boxes[j].posY;

            //if(Math.sqrt(posX-newposX)<=10&&Math.sqrt(posY-newposY)<=10) {
            if(checkInCircle(posX,posY,newposX,newposY) == true){
                var l = new line(boxes[i].posX+2.5, boxes[i].posY+2.5,
                    boxes[j].posX+2.5, boxes[j].posY+2.5,
                     "rgba(128, 141, 60,0.3)",true);

                    // if(l.drawing==true){
                    //     boxes[j].dx+=0.5;
                    //     boxes[i].posY+=0.5;
                    //
                    //     // boxes[j].posX+=0.5;
                    //     // boxes[j].posY+=0.5;
                    // }
                l.draw();
            }
        }
    }
    for(var i in boxes){
        boxes[i].draw();
    }
},1000/60);













