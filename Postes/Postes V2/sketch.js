//SIMULACIÓN POSTES DE LUZ
//BENJAMÍN BENAVIDES
//MEDIALAB 2016-1
"use strict"
var moving = false;
var speed = 10;
var postes;
var poste;
var poste1;
var frame=0;

function setup() {
   createCanvas(400, 400);
   postes = [];
   poste1 = new Poste(); //primer poste, no tiene anterior
   poste = poste1.createNext()
}

function draw() {
   background("white");
   //acción cada cuadro para cada poste
   postes.forEach(function(post) {
      post.move();
      post.display();
   });
   //si hay 4 postes postes o menos crea uno
   if (postes.length<=4){
      poste.createNext();
   }
   if (frame%60==0){
      checkDestroy();
   }
   frame+=1;
}

class Poste {
   constructor(prev) {
         this.prev = prev; //poste anterior
         this.cables = []; //lista de cables entre este poste y siguiente
         if (this.prev == null){
            this.pos = width;
         }
         else{
            this.pos = random(this.prev.pos+width,this.prev.pos+2*width); //posición x
         }
         this.size = createVector(20, 250);
         this.nextt = null; //siguiente poste
         postes.push(this); //agrega a lista de postes
         print("Poste creado");
      }
   //crea poste siguiente
   createNext() {
      poste = new Poste(this);
      this.nextt = poste;
      this.createCable();
      return poste;
   }
   //crea cables entre este poste y el siguiente
   createCable() {
         let new_cable;
         new_cable = new Cable(this,this.nextt);
         this.cables.push(new_cable);
      }
   //revisa si el poste está en pantalla
   checkOutScreen(){ 
      if (this.pos<this.size.x){
         return true;
      }
   }
   //se destruye el poste
   destroy(){
      postes.splice(postes.indexOf(this), 1);
      print("Poste eliminado. Quedan:");
      print(postes.length);
   }
   //revisa si está en pantalla
   checkInScreen(){
      if (0<=this.pos){
         return true;
      }
      else {
         return false;
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
      this.yvalues=new Array(abs(int(this.poste_finish.pos-this.poste_start.pos)));
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
//chequea si hay que destruir el poste más antiguo
function checkDestroy(){
   let first;
   first = postes[0];
   if (!first.checkInScreen()){
         if (first.nextt != null &&  !first.nextt.checkInScreen()){ //Lo elimina si el poste y su sucesor están fuera de pantalla
            first.destroy();
         }
   }
}
