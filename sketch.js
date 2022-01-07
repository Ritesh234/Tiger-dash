function setup() {
  createCanvas(800,400);
  tiger= createSprite(400, 200, 50, 50);
  tiger.scale= 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;

}

function draw() {
  background(255,255,255);  
  drawSprites();
}
var PLAY = 1; 
var END = 0;
var gameState = PLAY;

var tiger, tiger_running; 
var ground, invisibleGround, groundImage; 



var score =0;

var gameOver, restart;

function preload(){
  tiger_running= loadAnimation("tiger.png")

  groundImage = loadImage("ground.webp"); 

  obstacle1= loadImage("obstacle1.jpg");
  obstacle2= loadImage("obstacle2.jpg");

  gameOverImg= loadImage("gameOver.png");
  restartImg = loadImage("restart.jpg");
}
 function draw() {
  background(255);
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);

    ground.velocityX = -(6 + 3*score/100);

    if(keyDown("space") && tiger.y >= 159) {
      tiger.velocityY = -12;
    }

    tiger.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;

  ground.velocityX = 0;
  tiger.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);

  obstaclesGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    reset();
  }
}

 
drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
              default: break;
            }

            obstacle.scale = 0.5;
            obstacle.lifetime = 300;
            //add each obstacle to the group
            obstaclesGroup.add(obstacle);
          }
        }