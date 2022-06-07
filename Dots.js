class Dots{ 
    
    constructor(color){
        this.x = random(-WORLD_SIZE, WORLD_SIZE);
        this.y = random(-WORLD_SIZE, WORLD_SIZE);
        this.size = 15;
        this.isAlive = true;
        this.color = random(colors)
    }
    
    display(){ 
        if (this.isAlive == true) {
            fill(this.color)
            ellipse(this.x, this.y, this.size);  
        }
    }

}