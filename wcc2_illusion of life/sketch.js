// By Roni Kaufman

let kMax; // maximal value for the parameter "k" of the blobs
let step = 0.01; // difference in time between two consecutive blobs
let n = 100; // total number of blobs
let radius = 1; // radius of the base circle
let inter = 0.01; // difference of base radii of two consecutive blobs
let maxNoise = 400; // maximal value for the parameter "noisiness" for the blobs
let c = 1.35;
let v = 400;
let s = 10;
let button;
let button2;




  
function Pressed(){
  if(c>0.9 && v>10){
  c-=0.03;
  v-=20;
  s+=1;
  }
  
}

function leave(){
  c = 1.35;
  v = 400;
  s = 10;
}


function setup() {
   var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cursor('grab');
  colorMode(HSB,c);
	angleMode(DEGREES);
	kMax = random(0.6, 1.0);
	noStroke();

 

  button = createButton('CLOSER');
  button.position(00, windowHeight-30);
  button.mousePressed(Pressed);

  button2 = createButton('LEAVE');
  button2.position(70, windowHeight-30);
  button2.mousePressed(leave);

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }

function draw() {

  background(50);
  colorMode(HSB,c);
  let t = frameCount/v;
  for (let i = n; i > 0; i--) {
		let alpha = 1 - (i / n);
		fill((alpha/4 + 0.75)%1, 1, 1, alpha);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * (i / n);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
  }

  
}

// Creates and draws a blob
// size is the radius (before noise) of the base circle
// (xCenter, yCenter) is the position of the center of the blob
// k is the tightness of the blob (0 = perfect circle, higher = more spiky)
// t is the time
// noisiness is the magnitude of the noise (i.e. how far it streches out)
function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / s;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		r1 = cos(theta)+1;
		r2 = sin(theta)+1; // +1 because it has to be positive for the function noise
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();

  
}


    
