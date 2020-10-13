let world=new Array();
function dist(x0,y0,x1,y1){
    return ((x0-x1)**2+(y1-y0)**2)**0.5;
}
function Vector(x,y){
  this.x=x;
  this.y=y;
  this.dot=function(v){
      return this.x*v.x+this.y*v.y;
  }
  this.norm=function(){
       return (this.x**2+this.y**2)**0.5;
  }
  this.resolve=function(v){
      let ret=new Vector((this.dot(v)*v.x)/v.norm(),(this.dot(v)*v.y/v.norm()));
      return ret;
  }
  this.add=function(v){
      return new Vector(this.x+v.x,this.y+v.y);
  }
this.diff=function(v){
return new Vector(this.x-v.x,this.y-v.y);
} 
}
function linerconserve(obj1,obj2){
    let temp1=(obj1.r).diff(obj2.r);
    let d1=(((obj1.v).diff(obj2.v)).dot((obj1.r).diff(obj2.r)))/((((obj1.r).diff(obj2.r)).norm())**2);
    d1*=((2*obj2.mass)/(obj1.mass+obj2.mass));
    (temp1.x)*=d1;
    (temp1.y)*=d1;
    let v1f=obj1.v.diff(temp1);



    let temp2=(obj2.r).diff(obj1.r);
    let d2=(((obj2.v).diff(obj1.v)).dot((obj2.r).diff(obj1.r)))/((((obj2.r).diff(obj1.r)).norm())**2);
    d2*=((2*obj1.mass)/(obj2.mass+obj1.mass));
    (temp2.x)*=d2;
    (temp2.y)*=d2;
    let v2f=obj2.v.diff(temp2);
    obj2.v=v2f;
    obj1.v=v1f;

}



function Circle(mass,radius,x,y,vx,vy,ax,ay){
    world.push(this);
    this.mass=mass;
    this.radius=radius;
    this.r=new Vector(x,y);
    this.v=new Vector(vx,vy);
    this.a=new Vector(ax,ay);
    this.update=function update(n=10){
        this.r.x+=this.v.x/n;
        this.r.y+=this.v.y/n;
        this.v.x+=this.a.x/n;
        this.v.y+=this.a.y/n;
        if(Math.abs(this.r.x-can.width)<this.radius+2 || this.r.x<this.radius+2)this.v.x=-0.9*this.v.x;
        if(Math.abs(this.r.y-can.height)<this.radius+2 || this.r.y<this.radius+2)this.v.y=-0.9*this.v.y;
        for(let i=0;i<world.length;i++){
            if(this!=world[i] && dist(this.r.x,this.r.y,world[i].r.x,world[i].r.y)<=this.radius+world[i].radius){
               linerconserve(this,world[i]); 
            }
        }

    }

    this.draw=function draw(){
             draw_circle(this.radius,this.r.x,this.r.y);
    }

};
