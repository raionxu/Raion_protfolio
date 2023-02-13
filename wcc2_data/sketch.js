let img;

let mySeed;

function preload(){
	let url = 'https://picsum.photos/1920/1080';
	img = loadImage(url);
}

function setup() {
	var cnv = createCanvas(windowWidth,windowHeight);
  cnv.style('display', 'block')
	mySeed = floor(random(1,100000));
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function draw() {
	image(img,0,0);
  randomSeed(mySeed);
	recursiveText(random(width),random(height),2*width, 7);
}

function recursiveText(x,y,mySize,level)
{
  level -= 1;
	strokeWeight(0.5);
	fill(img.get(floor(x),floor(y)));
	drawText(x,y,mySize/3)
	if (level >= 0)
	{
	  recursiveText(x/2,y/2,mySize/2,level);
		recursiveText(x/2 + width/2,y/2,mySize/2,level);
		recursiveText(x/2,y/2 + height/2,mySize/2,level);
		recursiveText(x/2 + width/2,y/2 + height/2,mySize/2,level);
	}

}

function drawText(x,y,mySize)
{	
	 textSize(mySize);
	 if (random(0,1) > 0.5)
	 {
	   text(str(frameCount + floor(random(0,10000))),x,y);
	 }else
	 {
		text(str(floor(random(0,10000))),x,y); 
	 }
}


	

