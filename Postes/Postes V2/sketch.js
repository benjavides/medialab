//SIMULACIÓN POSTES DE LUZ
//BENJAMÍN BENAVIDES
//MEDIALAB 2016-1
"use strict"
var moving = false;
var speed = 18;
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
   //Revisa si debe eliminar el poste más antiguo cada 30 cuadros
   if (frame%30==0){
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
         this.size = createVector(width/20, random(height/1.75, height/1.75+20));
         this.nextt = null; //siguiente poste
         postes.push(this); //agrega a lista de postes
         //print("Poste creado");
      }
   //crea poste siguiente
   createNext() {
      poste = new Poste(this);
      this.nextt = poste;
      this.createCables();
      return poste;
   }
   //Crea entre 1 y 3 cables con distintas probabilidades
   createCables(){
      let num=1;
      if(probability(0.7)){
         num = 2;
      }
      else if(probability(0.2)){
         num = 3;
      }
      for (let v=1; v<=num;v++){
         this.createCable(num-1);
      }
   }
   //crea un cable entre este poste y el siguiente
   createCable(c) {
         let new_cable;
         new_cable = new Cable(this,this.nextt,c);
         this.cables.push(new_cable);
      }
   //se destruye el poste
   destroy(){
      postes.splice(postes.indexOf(this), 1);
      //print("Poste eliminado. Quedan:");
      //print(postes.length);
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
   constructor(poste_start,poste_finish,c) {
      this.poste_start=poste_start;
      this.poste_finish=poste_finish;
      this.yvalues=new Array(abs(int(this.poste_finish.pos-this.poste_start.pos))); //valores y de cada punto
      this.desv = random(height/2,c*5+height/2); //cambia el valor vertical del cable
      //this.desv = height/2; descomentar si se ve raro con el parametro anterior
      this.amplitude = random(20,30+15*c); //cambia la amplitud de la onda
      this.calcCurve();
   }
   //calcula el cable
   calcCurve(c){
      let x=0;
      for (let j=0;j<this.yvalues.length ;j++){
         this.yvalues[j]=sin(x)*this.amplitude+this.desv;
         x+=random(0.01); //Cambia el ruido de la onda
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
//cuando se presiona la flecha derecha
function keyPressed() {
   if (keyCode == RIGHT_ARROW) {
      moving = true;
   }
}
//cuando se deja de presionar la flecha derecha
function keyReleased() {
   if (keyCode == RIGHT_ARROW) {
      moving = false;
   }
}

//retorna true con cierta probabilidad
function probability(prob, funct) {
   let n;
   n = random(0, 1);
   if (n <= prob) {
      return true;
   } 
   else {
      return false;
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