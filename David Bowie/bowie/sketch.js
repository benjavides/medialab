var img;
var a;
draw_mode = false;
var display;
var texto;

function preload() {
  img = loadImage("assets/bowie.jpg");
}

function setup() {
  createCanvas(400, 400);
  background("white");
  
}

function draw() {
   if (draw_mode){
     image(img, 0, 0);
     fill("red");
     textSize(12);
     update_text();
     display = text(texto, 300, 20);
     
  }
  noStroke();
  fill(color(249,243,221));
  rect(147,212,90,100);
  triangle(39,325,191,251,359,314);
  quad(39,324,358,313,396,400,4,400);
  fill(color(240,231,185));
  quad(132,87,241,87,259,158,124,158);
  quad(133,170,249,166,239,222, 141,222)
  quad(124,158,259,158,237,183,142,184);
  quad(141,222,239,222,207,254,175,253)
  fill("red");
  quad(179,87,229,87,177,145,140,171);
  triangle(164,152,213,120,149,220)
  fill("blue");
  triangle(168,87,179,87,140,171);
  triangle(154,163,164,154,149,220);
  fill("orange");
  //ellipse(188,44,165,87);
  quad(105,54,142,14,123,165,112,149);
  quad(141,14,234,4,241,87,132,87);
  triangle(233,4,274,60,240,87);
  quad(240,86,273,60,277,143,261,172);
  
  
 
  
  
  
}

function update_text(){
   texto = "("+str(mouseX)+" , "+str(mouseY)+")";
}