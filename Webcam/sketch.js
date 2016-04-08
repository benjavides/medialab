var capture;
var colorr = 7;
var stepSize = 20;
var imagen = false;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  if (imagen ==true){
     image(capture, 0, 0, 640, 480); //muestro imagen original
  }
  capture.loadPixels() //carga los pixeles de la webcam
  //itero sobre todos los pixeles
  for (var y=0; y<height; y+=stepSize) { 
    for (var x=0; x<width; x+=stepSize) {
      var i = y * width + x;
      var bright = capture.pixels[i*4];
      if (bright != null){
         textSize(bright/stepSize);
         if (colorr%2 != 0){
            fill("black");
         }
         else {
            fill(color(bright,bright,255-bright))
         }
         text(bright, x,y);
      }
    }
  }
}
function keyPressed() {
   var tamaño=stepSize;
   if (keyCode == RIGHT_ARROW) {
      tamaño -= 1;
   }
   if (keyCode == LEFT_ARROW) {
      tamaño += 1;
   }
   if (keyCode == ENTER) {
      colorr += 1;
   }
   if (keyCode == BACKSPACE) {
      imagen = !imagen;
   }
   stepSize = constrain(tamaño,10,20);
   }