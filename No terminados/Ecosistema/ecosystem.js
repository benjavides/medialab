class World{
  def constructor(x,y){
    this.sizex = x;
    this.sizey = y;
    this.cells = [];
  }
  def run(){
    this.cells.foreach(x)
  }
}

class Cell {
  var cells = [];
  def constructor(world){
    this.world = world;
    this.world.cells.push(this); //agrega a lista de celulas
    this.pos = [random(0,this.world.sizex), random(0,this.world.sizey)];
    this.vel = [0,0];
    this.look = []; //vector mira
    this.size = 10;
    this.energy = 100;
  }

  def live(){
    if (this.energy >= 0){
      this.move();
      this.display();
    else {
      this.world.cells.remove(this);
    }
  }

  def move(){
    this.energy-=1;
    this.position+=this.vel;
  }

  def display(){
    ellipse(this.pos[0],this.pos[1],this.size);
  }
}
