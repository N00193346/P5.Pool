var topBorder;
var leftBorder;
var rightBorder;
var bottomBorder;

var balls = [];
var pockets = [];

var cueActive = false;  // Drag mouse/finger to activate cue-tip.
var cue;
var cueBsunk = false;   // Is the cueBall sunk?
                        // If so, allow collision between cue and *all* balls.

function setup() {
  createCanvas(1000, 500);
  background(10, 108, 3);
    
    //Create borders
    topBorder = new Border(500, 15, 1000, 30);
    leftBorder = new Border(15, 0, 30, 1000);
    rightBorder = new Border(985, 0, 30, 1000);
    bottomBorder = new Border(500, 485, 1000, 30);
    
    setupBalls();
    
    //Create Pockets
    for (let i = 0; i < 6; i++){
        pockets.push(new Pocket(0,0));
    }
    pockets[0].pos.x = 35;
    pockets[0].pos.y = 30;
    pockets[1].pos.x = 500;
    pockets[1].pos.y = 30;
    pockets[2].pos.x = 965;
    pockets[2].pos.y = 30;
    pockets[3].pos.x = 35;
    pockets[3].pos.y = 470;
    pockets[4].pos.x = 500;
    pockets[4].pos.y = 470;
    pockets[5].pos.x = 965;
    pockets[5].pos.y = 470;
    
    cue = new Cue();
}

function draw() {
     background(10, 108, 3);
    
    //Draw borders
    topBorder.draw();
    leftBorder.draw();
    rightBorder.draw();
    bottomBorder.draw();
    
    //Loop through balls array
    for (let i = balls.length-1; i >= 0; i--) {
            
         //Checking if cue hit the Cue ball
        if ((cueActive && balls[i] instanceof CueBall) || cueBsunk)
        cue.checkStrike(balls[i]);
        
        //Check each ball for colliding with another
        for (let j = 0; j < balls.length; j++){
            if (i !== j ){
                balls[i].checkBallCollision(balls[j]);
            }
        }
        
        //Balls colliding with edges
        if (topBorder.checkCollision(balls[i]) || bottomBorder.checkCollision(balls[i]) == true) {
            balls[i].velocity.y = balls[i].velocity.y * -1;
        }
        
         if (leftBorder.checkCollision(balls[i]) || rightBorder.checkCollision(balls[i]) == true) {
            balls[i].velocity.x = balls[i].velocity.x * -1;
        }
    
        //Draw balls
        balls[i].draw();
        balls[i].move();
       
        //Check pocket collisions
        var sunk = false;
            for (let k = 0; k < pockets.length; k++){
                //Check if the balls are colliding with pockets
                if (pockets[k].checkBallPocket(balls[i])){
                //If the ball colliding the the pocket is the cue ball, use cueBallSunk method
                 if (balls[i] instanceof CueBall) {cueBallSunk();}
                //Else Remove the ball from the array 
                    else{
                    balls.splice(i, 1);      
                    sunk = true;
                }
                }
                
                if (sunk === true) break;
                }
        
    }
        // Draw pockets after, else will disappear if no balls left on array.
            for (let k = 0; k < pockets.length; k++){
                    pockets[k].draw();
            }
    
    //Draw Cue
    cue.update(cueBsunk);
    cue.draw();
}

function mouseDragged(){
    cueActive = true;   
}

function touchStarted(){
    cueActive = true;
}

function touchEnded(){
    cueActive = false;
}

function cueBallSunk(){
//    cueBsunk = true;
    balls[0].pos.x = 250;
    balls[0].pos.y = this.height/2;
    balls[0].velocity.x = 0;
    balls[0].velocity.y = 0;
}

function setupBalls(){
    

    
    balls.push(new CueBall(22));
    
     // Triangle.
    let d = 24;    // Diameter of balls.
    let centre = createVector(width/2, height/2);
    //end row
    for (let i = 1; i <= 5; i++){
        let posX = centre.x + (d*7);
        let posY = (centre.y - d*3) + i * (d+2) ;
           balls.push(new redBall(posX, posY, d)); 
        }
    //4th row
    for (let i = 1; i <= 4; i++){
        let posX = centre.x + (d*6);
        let posY = (centre.y - d*2.5) + i * (d+2) ;
           balls.push(new redBall(posX, posY, d)); 
        }
    //3rd row
     for (let i = 1; i <= 3; i++){
        let posX = centre.x + (d*5);
        let posY = (centre.y - d*2) + i * (d+2) ;
           balls.push(new redBall(posX, posY, d)); 
        }
    //2nd row
     for (let i = 1; i <= 2; i++){
        let posX = centre.x + (d*4);
        let posY = (centre.y - d*1.5) + i * (d+2) ;
           balls.push(new redBall(posX, posY, d)); 
        }
     //1st row
     for (let i = 1; i <= 1; i++){
        let posX = centre.x + (d*3);
        let posY = (centre.y - d) + i * (d+2) ;
           balls.push(new redBall(posX, posY, d)); 
        }
    }
    


    
    

