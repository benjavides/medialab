var mode = 1;
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
  //blur_slider = createSlider(0,1,0.5,0.01);
  //blur_slider.id("blurslider");
  //var blur = seriously.effect("blur");
  //blur.amount = "#blurslider";
  //blur.source = src;
  //target.source = blur;
  
  //var chroma = seriously.effect("chroma");
  //chroma.source = src;
  //target.source = chroma;
  
  //var edges = seriously.effect("edge");
  //edges.source = src;
  //target.source = edges;
  //edges.mode = "sobel";
  
  kalei_segments_slider = createSlider(0,10,6);
  div = createDiv(kalei_segments_slider.html());
  print(div);
  kalei_segments_slider.id("segmentsslider");
  var kalei = seriously.effect("kaleidoscope");
  kalei.segments = "#segmentsslider";
  kalei.source = src;
  target.source = kalei;
  
  seriously.go()
}

function draw() {
}