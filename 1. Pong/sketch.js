"use strict";
var ball;
var right;
var left;
var alto = 300;
var ancho = 400;
var ptjeizq = 0;
var ptjeder = 0;
var bot = true; //se juega contra el pc
var rebotes = 0;
var texto = rebotes;
var display;

function setup() {
  createCanvas(ancho, alto);
  ball = new Ball();
  right = new Bracket(ancho-10, alto/2, bot);
  left = new Bracket(10, alto/2);
}

function draw() {
   background(153);
   ball.move();
   ball.display();
   right.move();
   right.collide();
   right.display();
   left.move();
   left.collide();
   left.display();
   
   // texto con rebotes
   fill(51);
   textSize(32);
   display = text(texto, ancho/2, 30);
}

// Ball class
class Ball {
   constructor () {
      this.x = ancho/2;
      this.y = random(height);
      this.diameter = 20;
      this.speed = 3;
      this.speedx = -1;
      this.speedy = 1;
   }
  
  move () {
    this.x += this.speedx*this.speed;
    this.y += this.speedy*this.speed;
    this.collition();
  }

  display () {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
  collition (){
     // colision bordes inferior y superior
      if (this.y <= 0 | this.y >= alto){
         this.speedy *= -1;
      }
      // punto lado izquierdo
      if (this.x <=0){
         ptjeder += 1;
         reset();
         
      }
      // punto lado derecho
      else if (this.x >= ancho){
         ptjeizq += 1;
         reset();
      }
      
  }
}

// Bracket class
class Bracket {
   constructor (x,y, bot=false){
      this.x=x;
      this.y=y;
      this.sizex = 10;
      this.sizey = 60;
      this.speed = 5;
      this.movingu = false;
      this.movingd = false;
      this.boost = false;
      this.bot = bot;
    }
   
   display (){
    fill(255, 204, 0);
    rect(this.x, this.y, this.sizex, this.sizey);
   }
   
   move () {
      
      if (this.movingu == true && this.y >= 0){
         this.y -= this.speed;
      }
      if (this.movingd == true && this.y <= alto-this.sizey){
         this.y += this.speed;
      }
      else if (this.bot){
         this.y = ball.y;
      }
  }
  
  collide() {
     if(collideRectCircle(this.x, this.y, this.sizex, this.sizey, ball.x, ball.y, ball.diameter )){
        ball.speedx *= -1;
        rebotes += 1;
        texto = rebotes;
        difficulty();
     }
  }
}


// Movimiento
function keyPressed() {
   
  // UP key
  if(keyCode == UP_ARROW) {
    left.movingu = true;
  }
 
  // DOWN key
  if(keyCode == DOWN_ARROW) { 
    left.movingd = true;
  }
  
  // CONTROL key
  if(keyCode == CONTROL) { 
    left.speed = 7;
  }
}

function keyReleased() {
   // UP key
  if(keyCode == UP_ARROW) {
    left.movingu = false;
  }
 
  // DOWN key
  if(keyCode == DOWN_ARROW) { 
    left.movingd = false;
  }
  
  // CONTROL key
  if(keyCode == CONTROL) { 
     left.speed = 5;
  }
  return false;
}

// Ajuste dificultad
function difficulty() {
   ball.speed += 0.1;
}

// Reset
function reset() {
   ball= new Ball();
   rebotes = 0;
   texto = rebotes;
}
   
   
   

