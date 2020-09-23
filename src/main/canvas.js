//draw ROI contouring
import MainUIElements from "./MainUI";
function draw1(){
    var canvas = document.getElementById("myCanvas");
    var  ctx=canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(80, 60, 60, 60);
        ctx.fillStyle = "#ff0000";
        ctx.globalAlpha=0.5;

        ctx.fill();
        ctx.closePath();

}
function draw2(){
    var canvas = document.getElementById("myCanvas");
    var  ctx=canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(60, 80, 100, 60);
    ctx.fillStyle = "#00ff00";
    ctx.globalAlpha=0.5;

    ctx.fill();
    ctx.closePath();

}
function draw3(){
    var canvas = document.getElementById("myCanvas");
    var  ctx=canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(70, 90, 70, 50);
    ctx.fillStyle = "#0000ff";
    ctx.globalAlpha=0.5;

    ctx.fill();
    ctx.closePath();

}
function draw4(){
    var canvas = document.getElementById("myCanvas");
    var  ctx=canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(40, 40, 6, 0,Math.PI*2,true);
    ctx.fillStyle = "#00fefe";
    ctx.globalAlpha=0.5;

    ctx.fill();
    ctx.closePath();

}

function path(){
    var canvas = document. getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(40,40);
    ctx.lineTo(50,50);
    ctx.lineTo(60,60);
    ctx.lineTo(70,50);
    ctx.lineTo(80,40);
    ctx.fillStyle = "#00fefe";
    // ctx.moveTo(-34.86,-78.8);
    // ctx.lineTo(-25.49,-64.73);
    // ctx.lineTo(-33.71,-62.99);
    // ctx.lineTo(-35.47,-78.22);
    ctx.fill();
}
function cursor(event){
    var canvas = document.getElementById("myCanvas");
    var  ctx=canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(event.pageX, event.pageY, 15, 0,Math.PI*2,true);
        ctx.fillStyle="#ff0000";

}

export {draw1,draw2,draw3,draw4,path}
