"use strict"
var postes = [];
var poste;
var nuevo_poste;
var camera;
var moving = false;

function setup() {
  createCanvas(400,400);
  
  poste = new Poste();
  camera = new Camera();
}

function draw() {
   background("grey");
   camera.move();
   //dibuja cada poste
  for(var i = 0; i < postes.length; i++){
     postes[i].display();
  }
}

class Camera {
   constructor(){
      this.posx = 0;
      this.moving = false
      this.vel = 2;
   }
   move(){
      if (this.moving == true){
         this.posx -= this.vel;
      }
   }
}

class Poste {
   constructor(){
      this.loc = createVector((1-camera.posx)+height,50);
      this.size = createVector(20,400);
      postes.push(this);
      print("poste creado")
   }
   
   display(){
      //print("poste en: ");
      //print(camera.posx+this.loc.x);
      if (this.checkScreen() == true){
         fill("black");
         rect(camera.posx+this.loc.x, this.loc.y, this.size.x,this.size.y);
      }
   }
   
   checkScreen(){
      if (camera.posx+this.loc.x+this.size.x <= 0){
         this.destroy();
         this.checkNew();
         return false;
      }
      else {
         return true;
      }
   }
   
   checkNew(){
      if (camera.posx+this.loc.x <= this.size.x && postes.length<=1){
         nuevo_poste = new Poste();
      }
   }
   
   destroy(){
      postes.splice(postes.indexOf(this),1)
      print("poste eliminado, postes: ");
      print(postes.length);
   }
}

class Cable {
   constructor(){
      this.loc = createVector(0,0);
   }
   
   display(){
      
   }
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    camera.moving = true;
  }
}

function keyReleased() {
   // UP key
  if(keyCode == RIGHT_ARROW) {
    camera.moving = false;
  }
}