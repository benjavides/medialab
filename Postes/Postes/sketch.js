"use strict"
var postes = [];
var poste;
var nuevo_poste;
var cables = [];
var camera;
var moving = false;
var xspacing = 1;
var period = 800;
var x=0;
var dx;
var cable;


function setup() {
   createCanvas(400, 400);
   print(dx);
   poste = new Poste();
   camera = new Camera();
   cable = new Cable();
}

function draw() {
   background("white");
   camera.move();
   //dibuja cables
   for (var i = 0; i < cables.length; i++) {
      cables[i].display();
   }
   //dibuja cada poste
   for (var i = 0; i < postes.length; i++) {
      postes[i].display();
   }
}

class Camera {
   constructor() {
      this.posx = 0;
      this.moving = false;
      this.vel = 5;
   }
   move() {
      if (this.moving == true) {
         this.posx -= this.vel;
      }
   }
}

class Poste {
   constructor() {
      this.loc = createVector((1 - camera.posx) + height, 50);
      this.size = createVector(20, 400);
      postes.push(this);
      print("poste creado");
   }

   display() {
      if (this.checkScreen() == true) {
         fill("black");
         rect(camera.posx + this.loc.x, this.loc.y, this.size.x, this.size.y);
      }
   }

   checkScreen() {
      if (camera.posx + this.loc.x + this.size.x <= 0) {
         cable.calcWave();
         this.destroy();
         this.checkNew();
         return false;
      } else {
         return true;
      }
   }

   checkNew() {
      if (camera.posx + this.loc.x <= this.size.x && postes.length <= 1) {
         nuevo_poste = new Poste();
      }
   }

   destroy() {
      postes.splice(postes.indexOf(this), 1);
   }
}

class Cable {
   constructor(prev,poste1,poste2) {
      this.prev = prev; //Mismo cable antes del ultimo poste
      this.poste1 = poste1;
      this.poste2 = poste2;
      this.loc = createVector(0, 0);
      if (this.prev != null){
         this.loc = createVector(0, (heigth-random(this.poste1.size.y*0.8,this.poste1.size.y))); //El cable parte en cualquier lugar sobre el 80% de la altura del poste inicial
      }
      
      this.yvalues = new Array(width);
      this.dx = (6.28318530718 / period) * xspacing;
      this.amplitude = 40;
      this.tension = 1;
      this.peso = 1;
      this.a = this.tension/this.peso;
      this.minimo = 300;
      this.calcWave();
      cables.push(this);
   }

   calcWave() {
      x = 0;
      print(x);
      print(x+dx);
      for (var i = 0; ((1-camera.posx)+i) < (1 - camera.posx)+width; i++) {
         this.yvalues[i] = sin(x) * this.amplitude+100;
         
         //this.yvalues[i] = this.a*Math.cosh(x/this.a)+this.minimo;
         x += this.dx;
      }
   }

   display() {
      //print(this.yvalues);
      //print(this.yvalues);
      stroke("Black");
      fill("Black");
      point(100, 100);
      for (let x = 0; ((1-camera.posx)+x) < (1 - camera.posx)+width; x++) {
         stroke("Black");
         fill("Black");
         point(x-(1 - camera.posx), this.yvalues[x]);
      }
   }
}

function keyPressed() {
   if (keyCode == RIGHT_ARROW) {
      camera.moving = true;
   }
}

function keyReleased() {
   // UP key
   if (keyCode == RIGHT_ARROW) {
      camera.moving = false;
   }
}