class Border {
    constructor(x,y,w,h){
        this.pos = createVector(x,y);

        this.width = w;
        this.height = h;

    }

    //Check Collision between ball and borders
    checkCollision(ball){
        
        //Ball's new Velocity
        let newVelocity = createVector();
        let borderWidth = 0;
        
        //If the width of the border is greater than the height, it is a left/right border
        if (this.width > this.height) {
           newVelocity = createVector(ball.pos.x, this.pos.y);
            borderWidth = this.height/2;
        
        } else {
            newVelocity = createVector(this.pos.x, ball.pos.y);
            borderWidth = this.width/2;
        }
        
        
        let distance = p5.Vector.sub(ball.pos, newVelocity);
        distance = distance.mag();
        
        if (distance < ball.radius*2){
            return true;
        } else{
         return false;
        }
    }
    
    draw(){
        rectMode(CENTER);
        
        fill(139, 69, 19);
        noStroke();
        rect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

class Ball extends Border {
    
    constructor(x,y, diameter){
        super(x,y, diameter);
        this.diameter = diameter;
        this.radius = this.diameter/2;
        
        this.velocity = createVector();
        this.acceleration = createVector();
    }
    
    //Checking for a ball colliding with another ball
    checkBallCollision(ball){
        
        //Create a distance vector by subtracting the positions 
        let distance = p5.Vector.sub(ball.pos, this.pos);
        //Get the magnitute 
        let distanceMag = distance.mag();
        
        //If the mangitude is less than the sum of the two ball's radiuses, they are overlapping/colliding
        if (distanceMag <= ball.radius + this.radius){
         
            distance = distance.normalize();
            
            //Make sure balls are not overlapping
            this.pos.sub(distance.mult(0.1));
            
            let distanceNew = p5.Vector.sub(this.pos, ball.pos);
            distanceNew = distanceNew.normalize();
            
            //Getting perpindicular vector
            let newVector = createVector(-distanceNew.y, distance.x);
             newVector.normalize();
            
            //Storing the velcocity of the ball coliding
            let velocityStore = ball.velocity.mag();
            
            //Applying velocity after collision
            this.velocity.mult(0.9);
            ball.velocity.mult(0.75);
            
            //Applying the stored velocity the ball being collided into
            this.acceleration.add(distanceNew.mult(0.5*velocityStore));
           
            ball.acceleration.add(-newVector.mult(0.5*velocityStore));
        }
    }
    
    draw(){
        
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    }
    
    move(){
        //Add acceleration to the velocity
        this.velocity.add(this.acceleration);
        //Add velocity to the balls position
        this.pos.add(this.velocity);
        
        //If the ball is moving, multiplay by .99 to slow it down
        if (this.velocity.mag() > 0.02){
            this.velocity.mult(0.99);
        }
        else {
            this.velocity.x = 0; 
            this.velocity.y = 0;
        }
        
        this.acceleration.mult(0);
    }
}

class redBall extends Ball {
    constructor(x, y, diameter){
        super(x, y, diameter);
    }
    
    draw(){
        // Red
        fill(255,0,0);
        
        stroke(255,101);
        strokeWeight(1);
        
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    }
}

class Pocket extends Border{
    
    constructor(x,y){
        super (x,y);
        
        this.diameter = 40;
    }
    
       draw(){
        
        fill(0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.diameter);
    }
    
     checkBallPocket(ball){
        
         let distance = p5.Vector.sub(ball.pos, this.pos);
        distance = distance.mag();
        
        if (distance < ball.radius + this.diameter/2){
            return true;
        } else {
            return false;
        }
    }
}

class CueBall extends Ball {
    constructor(diameter){
        super ();
        this.pos.x = 250;
        this.pos.y = height/2;
        
        this.diameter = diameter;
        this.radius = this.diameter/2;
    }
    
    render(){
        fill(255);
        stroke(0);
        strokeWeight(1);
        
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    }
    
    
}

class Cue extends Border {
    constructor(){
        super(mouseX,mouseY,32)
    }
    
    update(sunk){
        this.pos.x = mouseX;
        this.pos.y = mouseY;
        
        this.tip = createVector(0,0);
    
    
            if (!sunk){
            //To centre of Cue ball
            let toCB = createVector(0,0);
            //Where Cue ball is
            let wmbi = createVector(0,0);
            //Where the position is
            let wtpi = createVector(0,0);
                
            wmbi.x = balls[0].pos.x;
            wmbi.y = balls[0].pos.y;
            wtpi.x = mouseX;
            wtpi.y = mouseY;
            toCB = p5.Vector.sub(wmbi, wtpi);
            
            toCB = toCB.normalize();
            let backCB = createVector(toCB.x, toCB.y);
            stroke(200,101,0);
            strokeWeight(9);
                
            //Adding vector to mouse position
            let l1 = createVector(wtpi.x, wtpi.y);
            l1 = l1.add(toCB.mult(100));
            let l2 = createVector(wtpi.x, wtpi.y); 
            l2 = l2.sub(backCB.mult(280));
          
            //Paint cue and tip
            line(l1.x,l1.y,l2.x,l2.y);
            stroke(200);
            strokeWeight(11);
            point(l1.x,l1.y);
            this.tip.x = l1.x;
            this.tip.y = l1.y;
        }
    }
    

    
    checkStrike(ball){
        

         let distance = p5.Vector.sub(ball.pos, this.tip);
        let mDistance = distance.mag();
        
        if (mDistance < ball.radius + 9){
            
            distance = distance.normalize();
  
            ball.acceleration = distance.mult(3.14);
        }
        }
        
    
        
    
    

}