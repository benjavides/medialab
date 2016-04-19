function setup() {
  canvas = createCanvas(640,480, WEBGL);
  canvas.id("p5canvas");
  video = createCapture(VIDEO);
  video.size(640,480);
  video.id("p5video");
  
  video.hide();
  
  var seriously = new Seriously();
  
  var src = seriously.source("#p5video");
  var target = seriously.target("#p5canvas");
  
  kalei_segments_slider = createSlider(0,10,0);
  kalei_segments_slider.id("segmentsslider");
  var kalei = seriously.effect("kaleidoscope");
  kalei.offset = "#segmentsslider";
  kalei.source = src;
  target.source = kalei;
  
  seriously.go()
}

function draw() {
}