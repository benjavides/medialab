"use strict"
var moving = false;
var speed = 5;
var postes;
var poste;

function setup() {
   createCanvas(400, 400);
   postes = [];
   poste = new Poste();
}

function draw() {
   background("white");
   postes.forEach(function(post) {
      post.move();
      post.display();
      post.checkOutScreen();
   });
   if (postes.length<=3){
      probability(1/(frameRate()*1), poste.createNext.bind(poste)); //crea poste con probabilidad (lento, poco eficiente)
   }
}

class Poste {
   constructor(prev) {
         this.prev = prev; //poste anterior
         this.cables = []; //lista de cables entre este poste y siguiente
         this.pos = width; //posición x
         this.size = createVector(20, 250);
         this.nextt = null;
         postes.push(this);
         print("Poste creado");
      }
   //crea poste siguiente
   createNext() {
      if (this.prev==null){
         print("esto solo se debería imprimir una vez");
         poste = new Poste(this);
         this.nextt = poste;
      }
      
      else if (this.pos<=width/2){
         poste = new Poste(this);
         this.nextt = poste;
      }
      
      else {
         print("Lo intentaremos nuevamente");
      }
   }
   //crea cables entre este poste y el siguiente
   createCable() {
         let new_cable;
         new_cable = new Cable();
         this.cables.push(new_cable);
      }
   //revisa si el poste está en pantalla
   checkOutScreen(){
      if (this.pos<this.size.x){
         if (postes.length>=4){
            postes.splice(postes.indexOf(this), 1);
            print("Poste eliminado. Quedan:");
            print(postes.length);
         }
      }
   }
   //mueve el poste a la izquierda
   move() {
         if (moving == true) {
            this.pos -= speed;
         }
      }
   //muestra el poste
   display() {
      fill("black");
      rect(this.pos, height - this.size.y, this.size.x, this.size.y);
   }
}

class Cable {
   constructor() {

   }
}


function keyPressed() {
   if (keyCode == RIGHT_ARROW) {
      moving = true;
   }
}

function keyReleased() {
   // UP key
   if (keyCode == RIGHT_ARROW) {
      moving = false;
   }
}

//dice si se debe ejecutar funcion con probabilidad p
function probability(prob, funct) {
   let n;
   n = random(0, 1);
   if (n <= prob) {
      print("yep");
      funct();
   } else {
   }
}