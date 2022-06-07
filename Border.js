class Border {
    constructor(){
        this.bWidth = WORLD_SIZE;
        this.bHeight = WORLD_SIZE;
    }

    display(){
        noFill();
        strokeWeight(7);
        stroke(0,0,0);
        rect(-WORLD_SIZE, -WORLD_SIZE, WORLD_SIZE*2, WORLD_SIZE*2);
    }
}