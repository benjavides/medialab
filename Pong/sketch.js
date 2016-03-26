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
var texto = rebotes; // lo que dice el texto
var display; // el contenedor de texto
var record=0; //high score

function setup() {
  createCanvas(ancho, alto);
  ball = new Ball();
  right = new Bracket(ancho-20, alto/2, bot);
  left = new Bracket(10, alto/2);
  background("white");
  
}

function draw() {
   //Dibujar borde;
   stroke("black");
   noFill();
   rect(0,0,ancho-1,alto-1);
   
   ball.move();
   ball.display();
   right.move();
   right.collide();
   right.display();
   left.move();
   left.collide();
   left.display();
   
   // texto con rebotes
   fill("whilte");
   noStroke();
   rect(ancho/2-2,4,60,30)
   if (rebotes>=record){
     fill("red")
   }
   else{
     fill(51);
   }
   textSize(32);
   display = text(texto, ancho/2, 30);
}

// Ball class
class Ball {
   constructor () {
      this.x = ancho/2;
      this.y = random(40,height);
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
    fill(color(this.x*255/ancho, this.y*255/alto,mouseX*255/ancho));
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
  collition (){
     // colision bordes inferior y superior
      if (this.y <= 50 | this.y >= alto){
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
   constructor (x,y, bot){
      this.bot = bot || false;
      this.prey=y
      this.x=x;
      this.y=y;
      this.sizex = 10;
      this.sizey = 60;
      this.speed = 5;
      this.movingu = false;
      this.movingd = false;
      this.boost = false;
    }
   
   display (){
    this.undisplay();
    stroke("black");
    fill(255, 204, 0);
    rect(this.x, this.y, this.sizex, this.sizey);
   }
   
   undisplay(){
    stroke("white");
    fill("white");
    rect(this.x, this.prey-2, this.sizex, this.sizey+4);
   }
   
   move () {
      if (this.movingu == true && this.y >= 40){
         this.prey = this.y;
         this.y -= this.speed;
      }
      if (this.movingd == true && this.y <= alto-this.sizey-1){
         this.prey = this.y;
         this.y += this.speed;
      }
      else if (this.bot){
         this.prey = this.y;
         this.y = ball.y;
      }
  }
  //Colisión bracket con pelota
  collide() {
     if(collideRectCircle(this.x, this.y, this.sizex, this.sizey, ball.x, ball.y, ball.diameter )){
        ball.speedx *= -1;
        rebotes += 1;
        texto = rebotes;
        difficulty();
     }
  }
}

// Ajuste dificultad
function difficulty() {
   ball.speed += 0.1;
}

// Reset
function reset() {
   stroke("black");
   fill("white");
   rect(0,0,ancho-1,alto-1);
   setHighScore();
   ball= new Ball();
   rebotes = 0;
   texto = rebotes;
}

// Set Highscore
function setHighScore(){
  if (rebotes > record){
    record = rebotes;
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
  if(keyCode == UP_ARROW) {
    left.movingu = false;
  }
  
  if(keyCode == DOWN_ARROW) { 
    left.movingd = false;
  }
  
  if(keyCode == CONTROL) { 
     left.speed = 5;
  }
  return false;
}
   
   

