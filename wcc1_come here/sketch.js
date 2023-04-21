
var particle =[]
var move = 0
var changecolor = 200
function preload() {
	fontBold = loadFont('ADOBEARABIC-BOLD.OTF');
  }

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES)
	colorMode(HSB, 360, 100, 100, 100);
	noiseDetail(2,1)
	textAlign(CENTER, CENTER);
	textFont(fontBold);
}



function draw() {

    background(255)
	

	for(var i = 0; i<5; i++){
		p = new Particle()
		particle.push(p)
	}
 

	for(var i = 0; i<particle.length; i++){
		if(particle[i].alpha>0){
		particle[i].update()
		particle[i].show()
		}
		else{
			particle.splice(i,1)
		}
	}

	translate (width/2,height/2)
	fill(255,200)
	circle(0,0,220)
	
	
	if(!(mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 && mouseY > windowHeight / 2 - 100 && mouseY < windowHeight / 2 + 100))
        {
			changecolor -=60
		}
		fill (changecolor,70,200)
		textSize(30);
		text('COME HERE', 0, 0);

	var space = 1
	for(var i = 0; i<360; i+=space){
		
		var xoff = map(cos(i), -2, 1, 0, 3)
		var yoff = map(sin(i), -2, 1, 0, 3)

		var n = noise(xoff+move,yoff+move)
		var h = map(n,0,1,-150,150)
				var r1 = map(sin(i), -1, 1, 100, 200)
		var g1 = map(h, -360,width,0,200)
		var b1 = map(n,0,1,height,255)

		if(!(mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 && mouseY > windowHeight / 2 - 100 && mouseY < windowHeight / 2 + 100))
        {
			changecolor = 100
			var r1 = map(sin(i)*3, -1, 1, 100, 200)
			var g1 = map(h, 0,width/2,0,200)
			var b1 = map(n,0,1,height,255)
		}
		

		fill (r1,g1,b1)
		rotate (space)
		rect (110,0,h/5,5)

		
		rotate (space)
		rect (110,0,h,1)



	}
	move += 0.005

}



