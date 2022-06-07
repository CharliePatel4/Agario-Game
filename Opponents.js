class Opponents{

    constructor(){
        this.size = random(50,500)
        this.x = random(-WORLD_SIZE, WORLD_SIZE);
        this.y = random(-WORLD_SIZE, WORLD_SIZE);
        this.speed = 700/(this.size+500);
        this.isAlive = true;
        this.color = random(colors)
    }

    display(){  
        if (this.isAlive == true){
            noStroke();
            fill(this.color);
            ellipse(this.x,this.y,this.size);
            this.move(); 
            this.dotContact();
        }      
    }
    
    move(){
        let distance = dist(mainVehicle.position.x, mainVehicle.position.y, this.x, this.y)
        if (distance < 700){
            if (this.size > mainVehicle.size){
                this.chase();
            }
            if (this.size < mainVehicle.size){
                this.escape();
                console.log('hi')
            }
        }
    }

    chase(){   
        let angle = atan2(mainVehicle.position.y - this.y, mainVehicle.position.x - this.x);
        let dY = this.speed * -sin(angle);
        let dX = this.speed * -cos(angle);
        this.y -= dY
        this.x -= dX
    }

    escape(){
        let angle = atan2(mainVehicle.position.y - this.y, mainVehicle.position.x - this.x);
        let dY = this.speed * sin(angle);
        let dX = this.speed * cos(angle);
        this.y += dY
        this.x += dX  

        if (this.y  > -WORLD_SIZE + this.size/2){
            this.y -= dY;
        }
        else {
            this.y = -WORLD_SIZE + this.size/2;
        }

        if(this.y < WORLD_SIZE - this.size/2){
            this.y -= dY;
        }
        else{
            this.y = WORLD_SIZE - this.size/2
        }

        if (this.x < WORLD_SIZE - this.size/2) {
            this.x -= dX;
        }
        else {
            this.x = WORLD_SIZE - this.size/2;
        }

        if (this.x > -WORLD_SIZE + this.size/2){
            this.x -= dY;
        }
        else {
            this.x = -WORLD_SIZE + this.size/2;
        }
    }

    dotContact(){
        for (let i = 0; i < dotsArray.length; i++) {
            let distance = dist(this.position.x, this.position.y, dotsArray[i].x, dotsArray[i].y);
            if (dotsArray[i].isAlive == true){
                if (distance < this.size/2){
                    dotsArray[i].isAlive = false;
                    this.size += 1;   
                }
            }
        }
    }
}