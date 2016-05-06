"use strict"
var cols;
var rows;
var grid = [];
var w = 40;

function setup() {
  createCanvas(800,800);
  cols = floor(width/w);
  rows = floor(height/w);

  for (let i=0; i<cols;i++){
    for (let j=0; j<rows ;j++){
      let cell = new Cell(i,j);
      grid.push(cell);
    }
  }
}

function draw() {
  w = screen.width-mouseX;
  background(51);
  var s = 0;
  for (let p=0; p<grid.length; p++){
    grid[p].show();
  }
}

class Cell{
  constructor(i,j){
    this.i = i;
    this.j = j;
  }
  show(){
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    noFill();
    //rect(x,y, w,w);
    line(x,y,x+w,y);
    line(x,y,x,y+w);
    line(x+w,y,x+x+mouseY,y+w);
    stroke(color(x,mouseY,x*y));
    line(x,y-x,sqrt(mouseX)+x+w,y+w);
  }
}
