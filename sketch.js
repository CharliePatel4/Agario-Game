
// Daniel Shiffman
// http://natureofcode.com

// A list of vehicles
let vehicles =[];
let dotsArray = [];
let opponents = [];
let running = false;
let startColor = 0;
let colors = [
  [255, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
  [255, 255, 0],
  [255, 128, 0],
  [127, 0, 225],
  [255, 0, 255],
  [173,216,230]
]


function setup() { 
  createCanvas(windowWidth,windowHeight);
  border = new Border();
  
  for (let i = 0; i < DOTS_NUM; i++){
    dotsArray.push(new Dots())
  }

  for (let i = 0; i < OPPONENTS_NUM; i++){
    opponents.push(new Opponents())
  }
  mainVehicle = new MainVehicle(width/2,height/2)
}


function draw() {

  if (running == false){
    startPage();
  }

  else{
    gameRun();
  }
}
  
function colOption(col,x,y){
  noStroke()
  fill(col)
  ellipse(x, y, 100);
  let distance = dist(mouseX,mouseY,x,y)
  if (distance < 50){
    noStroke()
    fill(col)
    ellipse(width/2, height/2, 300);
    
    fill(255)
    textSize(40);
    text('Click To Play', width/2-115, height/2)
    
    startColor = col
  }
}

function death(){
    fill(0)
    ellipse(width/2,height/2,mainVehicle.size)
    fill(255)
    text('Game Over', width/2-100, height/2)
    mainVehicle.size +=5
    if (mainVehicle.size > height){
      text('Score:',width/2-120, height/2+50)
      text(mainVehicle.finScore, width/2 +30, height/2+50)
      fill(startColor)
      text("Play Again", width/2 -100, height/2+100)
    }
}

function gameRun(){
  background(255);
  push();
  translate(-mainVehicle.position.x, -mainVehicle.position.y);
  translate(width/2, height/2); 
  callDots();
  callVehicles();
  callOpps();
  border.display();
  pop();  
  callMainVehicle()
}

function startPage(){
  colOption(colors[0], width/2 + 200, height/2 + 200)
  colOption(colors[1], width/2 - 200, height/2 + 200)
  colOption(colors[2], width/2 + 200, height/2 - 200)
  colOption(colors[3], width/2 - 200, height/2 - 200)
  colOption(colors[4], width/2, height/2 + 300)
  colOption(colors[5], width/2, height/2 - 300)
  colOption(colors[6], width/2 - 300, height/2)
  colOption(colors[7], width/2 + 300, height/2)

  let distance = dist(mouseX,mouseY,width/2, height/2)
  if (distance < 150){
    if (mouseIsPressed){
      return running = true
    }
  }
}

function callOpps(){
  for (const opps of opponents){
    if (opps.isAlive == true){
      opps.display();
    }
  } 
}

function callDots(){
  for (const dots of dotsArray){
    dots.display();
  }
}
function callVehicles(){
  for (const v of vehicles){
    if (v.isAlive == true){
      // Path following and separation are worked on in this function
      v.applyBehaviors(mainVehicle.position.x, mainVehicle.position.y, [...vehicles, mainVehicle]);
      // Call the generic run method (update, borders, display, etc.)
      v.update();
      v.display();
      v.dotContact();
      v.oppContact();
    }
  }
}
function callMainVehicle(){
  if (mainVehicle.isAlive == true){
    mainVehicle.scoreBoard();
    mainVehicle.display();
    if (mainVehicle.size > height){
      mainVehicle.size ++
      fill(255)
      textSize(40);
      text('You Win', width/2-50, height/2)
    }
  } 
  else{
    death();
  }
}

function keyPressed() {
  if (keyCode == 32){
    if (mainVehicle.size > 100){
      mainVehicle.size = mainVehicle.size/2
      vehicles.push(new Vehicle(mainVehicle.size));      
    }
  }
}

function reStart(){
  vehicles = [];
  dotsArray = [];
  opponents = [];
  running = false;
  startColor = 0;
}