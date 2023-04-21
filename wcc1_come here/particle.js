var s 
class Particle{
    constructor(){
        this.pos = createVector(width/2, height/2)
        this.vel = createVector(0,0)
        this.acc = p5.Vector.random2D().normalize()
        this.r = map(this.pos.x, 0, width, 255, 0)
        this.g = map(this.pos.y, 0, height, 0, 255)
        this.b = map(dist(width/2, height/2, this.pos.x, this.pos.y), 0, width/2, 0, 255)
        this.alpha = 1
        this.size = random(0,8)
    }

    update(){
        var m = map(sin(frameCount), -1, 1, 0.4, 0.6)
        this.acc.mult(m)

        this.vel.add(this.acc)
        this.pos.add(this.vel)

        this.r = map(this.pos.x, 0, width, 255, 0)
        this.g = map(this.pos.y, 0, height, 0, 255)
        this.b = map(dist(width/2, height/2, this.pos.x, this.pos.y), 0, width/2, 0, 255)
        
        if(dist(width/2, height/2, this.pos.x, this.pos.y)>50)
        {
            this.alpha+=2
        }    

    }

    show(){
        noStroke()
        fill(this.r, this.g, this.b, this.alpha)
        if(dist(mouseX, mouseY, width/2, height/2) < 100)
        {
        ellipse(this.pos.x, this.pos.y, this.size)
        }
        else{
            ellipse(this.pos.x, this.pos.y, this.size)
            this.alpha -= 12
        }
    }
}