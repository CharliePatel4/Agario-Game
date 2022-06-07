
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Vehicle {
      // Constructor initialize all values
    constructor(size) {
      this.position = createVector(mainVehicle.position.x,mainVehicle.position.y );
      this.size = size;
      this.maxspeed = 4;
      this.maxforce = 0.10;
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, 0);
      this.isAlive = true;
    }

    display() {
      if (this.isAlive == true){
        fill(startColor);
        noStroke();
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.size, this.size);
        pop();
      }
    }
  
    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }
   
    applyBehaviors(x, y, vehicles) {
      let separateForce = this.separate(vehicles);
      let seekForce = this.seek(createVector(x,y));
      separateForce.mult(2);
      seekForce.mult(1);
      this.applyForce(separateForce);
      this.applyForce(seekForce);
    }
   
    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
      let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the position to the target
     
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus velocity
      let steer = p5.Vector.sub(desired,this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
     
      return steer;
    }
  
    // Separation
    // Method checks for nearby vehicles and steers away
    separate (vehicles) {
      let desiredseparation = mainVehicle.size/2 + this.size/2;
      let sum = new createVector();
      let count = 0;
      // For every boid in the system, check if it's too close
      for (const other of vehicles) {
        let d = p5.Vector.dist(this.position, other.position);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
          // Calculate vector pointing away from neighbor
          let diff = p5.Vector.sub(this.position, other.position);
          diff.normalize();
          diff.div(d);        // Weight by distance
          sum.add(diff);
          count++;            // Keep track of how many
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        sum.div(count);
        // Our desired vector is the average scaled to maximum speed
        sum.normalize();
        sum.mult(this.maxspeed);
        // Implement Reynolds: Steering = Desired - Velocity
        sum.sub(this.velocity);
        sum.limit(this.maxforce);
      }
      return sum;
    }
  
  
    // Method to update position
    update(){
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelertion to 0 each cycle
      this.acceleration.mult(0);
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

    oppContact(){
      for (let i = 0; i < opponents.length; i++) {
        let distance = dist(this.position.x, this.position.y, opponents[i].x, opponents[i].y);
          if (opponents[i].isAlive == true){
            if (distance < opponents[i].size/2 || distance < this.size/2){
              if (opponents[i].size < this.size){
                opponents[i].isAlive = false;
                console.log(opponents[i].size)
                this.size += opponents[i].size/2;
              }  
              if (opponents[i].size > this.size){
                this.isAlive = false;
                //this.size += opponentsArray[i].size;      
              }
            }
          }
        }
    }
}