"use strict"
void setup(){

}

void update(){

}

class particula{
  function constructor(){
    this.location = new PVector(random(width),random(height));
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0,0);
    this.mass = 10.0;
  }
  function applyForce(force){
    f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }
  function update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
}
