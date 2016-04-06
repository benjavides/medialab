//SIMULACIÓN POSTES DE LUZ
//BENJAMÍN BENAVIDES
//MEDIALAB 2016-1
"use strict"
var moving = false;
var speed = 5;
var postes;
var poste;

function setup() {
   createCanvas(400, 400);
   postes = [];
   poste = new Poste();
   poste.createNext(true);
}

function draw() {
   background("white");
   //acción cada cuadro para cada poste
   postes.forEach(function(post) {
      post.move();
      post.display();
      post.checkOutScreen();
      //post.checkInScreen();
   });
   //si hay 3 postes postes o menos crea uno con cierta probabilidad 
   if (postes.length<=4){
      probability(1/(frameRate()*1), poste.createNext.bind(poste)); //crea poste con probabilidad (lento, poco eficiente)
   }
}

class Poste {
   constructor(prev) {
         this.prev = prev; //poste anterior
         this.cables = []; //lista de cables entre este poste y siguiente
         this.pos = width; //posición x
         this.size = createVector(20, 250);
         this.nextt = null; //siguiente poste
         postes.push(this); //agrega a lista de postes
         print("Poste creado");
      }
   //crea poste siguiente
   createNext(first) {
      if (this.prev==null){
         print("esto solo se debería imprimir una vez");
         poste = new Poste(this);
         this.nextt = poste;
         this.createCable(this,this.nextt);
         //si hay 2 o menos postes crea uno
         if (postes.length<=2){
            this.createNext();
         }
      }
      //crea poste solo si la separación es mayor al 50% de la pantalla
      else if (this.pos<=width/2 | first == true){
         poste = new Poste(this);
         this.nextt = poste;
         this.createCable();
      }
      else {
         print("Lo intentaremos nuevamente");
      }
   }
   //crea cables entre este poste y el siguiente
   createCable() {
         let new_cable;
         new_cable = new Cable(this,this.nextt);
         this.cables.push(new_cable);
      }
   //revisa si el poste está en pantalla y se destruye de ser asi
   checkOutScreen(){
      if (this.pos<this.size.x){
         if (postes.length>=5){
            postes.splice(postes.indexOf(this), 1);
            print("Poste eliminado. Quedan:");
            print(postes.length);
         }
      }
   }
   //revisa si está en pentalla, de ser asi y no tener poste a continuación lo crea
   checkInScreen(){
      if ((0<=this.pos<=width) && this.nextt==null){
         this.createNext();
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
      this.displayCables();
   }
   //muestra cada uno de los cables que parten del poste
   displayCables(){
      for (let c=0;c<this.cables.length ;c++){
         this.cables[c].display();
      }
   }
}

class Cable {
   constructor(poste_start,poste_finish) {
      this.poste_start=poste_start;
      this.poste_finish=poste_finish;
      this.yvalues=new Array(abs(this.poste_finish.pos-this.poste_start.pos));
      this.calcCurve();
   }
   //calcula el cable
   calcCurve(){
      let x=0;
      for (let j=0;j<this.yvalues.length ;j++){
         this.yvalues[j]=sin(x)*5+200;
         x+=0.2;
      }
   }
   //muestra el cable
   display(){
      fill("black");
      stroke("black");
      for (let i=0;i<abs(this.poste_finish.pos-this.poste_start.pos);i++){
         point(this.poste_start.pos+i,this.yvalues[i]);
      }
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

//dice si se debe ejecutar la funcion funct con probabilidad p
function probability(prob, funct) {
   let n;
   n = random(0, 1);
   if (n <= prob) {
      funct();
   } 
   else {
   }
}