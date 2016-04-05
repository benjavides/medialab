"use strict"
var postes = [];
var poste;
var nuevo_poste;
var camera;
var moving = false;
var xspacing = 1;
var period = 200;
var x;
var dx;
var cable;


function setup() {
   createCanvas(400, 400);
   var dx = (TWO_PI / period) * xspacing;
   print(dx);
   poste = new Poste();
   camera = new Camera();
   cable = new Cable();
}

function draw() {
   //background("white");
   camera.move();
   //dibuja cada poste
   for (var i = 0; i < postes.length; i++) {
      postes[i].display();
   }
}

class Camera {
   constructor() {
      this.posx = 0;
      this.moving = false
      this.vel = 3;
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
      postes.splice(postes.indexOf(this), 1)
   }
}

class Cable {
   constructor(start) {
      this.loc = createVector(0, 0);
      this.yvalues = new Array(width);
      this.amplitude = 40;
      this.calcWave();
      this.display();
   }

   calcWave() {
      x = 0;
      //print(x);
      for (var i = 0; i < width; i++) {
         this.yvalues[i] = sin(x) * this.amplitude+100;
         x += 0.031415926535897934;
      }
   }

   display() {
      //print(this.yvalues);
      //print(this.yvalues);
      stroke("Black");
      fill("Black");
      point(100, 100);
      for (var x = 0; x < width; x++) {
         stroke("Black");
         fill("Black");
         point((1 - camera.posx)+x, this.yvalues[x]);
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