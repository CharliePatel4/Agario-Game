
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class MainVehicle {
    constructor(x, y){
        this.position = createVector(0, 0);
        this.size =  0;

        this.position.x = x;
        this.position.y = y;
        this.speed = 500/(this.size+500);
        this.isAlive = true;
        
    }
 
    display(){
        if (this.isAlive == true){
            this.circle();
            this.move();
            this.dotContact();
            this.oppContact()
        }
        
    }

    scoreBoard(){
        fill(0)
        rect(width-150, 10, 140, 50);
        fill(startColor)
        text(floor(this.size) - 50,width-130, 50)
    }

    circle(){
        noStroke();
        fill(startColor);
        ellipse(width/2, height/2, this.size);
    }


    move(){
        let angle = atan2(mouseY - height/2, mouseX - width/2)
        let dY = this.speed * -sin(angle);
        let dX = this.speed * -cos(angle);
        this.position.y -= dY
        this.position.x -= dX

        if (this.position.y  > -WORLD_SIZE + this.size/2){
            this.position.y -= dY;
        }
        else {
            this.position.y = -WORLD_SIZE + this.size/2;
        }

        if(this.position.y < WORLD_SIZE - this.size/2){
            this.position.y -= dY;
        }
        else{
            this.position.y = WORLD_SIZE - this.size/2
        }

        if (this.position.x < WORLD_SIZE - this.size/2) {
            this.position.x -= dX;
        }
        else {
            this.position.x = WORLD_SIZE - this.size/2;
        }

        if (this.position.x > -WORLD_SIZE + this.size/2){
            this.position.x -= dY;
        }
        else {
            this.position.x = -WORLD_SIZE + this.size/2;
        }
    }

    dotContact(){
        for (let i = 0; i < dotsArray.length; i++) {
            let distance = dist(this.position.x, this.position.y, dotsArray[i].x, dotsArray[i].y);
            if (dotsArray[i].isAlive == true){
                if (distance < this.size/2){
                    dotsArray[i].isAlive = false;
                    this.size += 1; 
                    console.log(this.speed)  
                }
            }
        }
    }

    oppContact(){
        for (let i = 0; i < opponents.length; i++) {
          let distance = dist(this.position.x, this.position.y, opponents[i].x, opponents[i].y);
            if (opponents[i].isAlive == true){
              if (distance < opponents[i].size/2 || distance < this.size/2){
                if (opponents[i].size < this.size){
                    opponents[i].isAlive = false;
                    console.log(opponents[i].size)
                    this.size += opponents[i].size;
                    this.speed -= opponents[i].size*.001;
                    console.log(this.speed);
                    }  
                if (opponents[i].size > this.size){
                    this.isAlive = false;
                    this.finScore = floor(mainVehicle.size - 50);   
                    }
                }
            }
        }
    }
}