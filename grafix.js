let can=document.querySelector('canvas');
let cc=can.getContext('2d');
can.width=window.innerWidth;
can.height=window.innerHeight;
function draw_circle(radius=0,x=0,y=0,color="#EBF4FA"){
    cc.beginPath();
    cc.arc(x,y,radius,0,Math.PI*2);
    cc.fillStyle=color;
    cc.fill();
}
function draw_rect(x=0,y=0,w=0,h=0,angle=0,color="blue"){
    cc.fillStyle=color;
    cc.fillRect(x,y,w,h);
    
}
