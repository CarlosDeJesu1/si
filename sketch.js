var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running;
var ground, groundpng,invisground;
var cloud,cloudpng,groupC;
var obstacle, o, o1, o2, o3, o4, o5,groupO;
var score;
var go, gO;

function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundpng = loadImage("ground2.png");
cloudpng = loadImage("cloud.png");
o = loadImage("obstacle1.png");
o1 = loadImage("obstacle2.png");
o2 = loadImage("obstacle3.png");
o3 = loadImage("obstacle4.png");
o4 = loadImage("obstacle5.png");
o5 = loadImage("obstacle6.png");
gO = loadImage("gameOver.png");
}

function setup(){

  createCanvas(1000,500);
trex = createSprite(50,350,50,70);
trex.addAnimation("running",trex_running);
trex.scale = 0.7;
ground = createSprite(500,400,1000,30);
ground.addImage("ground", groundpng);
ground.x = ground.width/2;

go = createSprite(500,250);
go.addImage(gO);

invisground = createSprite(200,410,400,10);
invisground.visible = false;

score = 0;
}

function draw(){

  background("white");
   
  text("score "+score, 800, 100);

   if (gameState === PLAY){
      if(keyDown("space") && (trex.y >= 300)){
        trex.velocity.y = -10;
      }
      score = score + Math.round(frameCount/60);
      ground.velocity.x = -6;
      trex.velocity.y = trex.velocity.y + 0.8;
      

      if(ground.x < 0){
        ground.x = ground.width / 2;
      }
      
      if(groupO.isTouching(trex)){
        gameState = END;
      }

      spamc();
      spamo();

      go.visible = false;
    }else if(gameState === END){
      go.visible = true;
   }


  trex.collide(invisground);

drawSprites();
}

function spamc(){ 
  if(frameCount % 120 === 0){
  
  cloud = createSprite(1010,150,400,10);
  cloud.velocityX = -2;
  cloud.addImage("cloud",cloudpng);
  cloud.y = Math.round(random(250,150));
  cloud.lifetime = 530;
  cloud.depth = trex.depth;
  groupC.add(cloud);

  trex.depth = trex.depth + 1;
  }
}

function spamo(){
  if(frameCount % 120 === 0){

    obstacle = createSprite(1010,370,400,10);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));

    switch(rand){
      case 1: obstacle.addImage(o);
      break;
      case 2: obstacle.addImage(o1);
      break;
      case 3: obstacle.addImage(o2);
      break;
      case 4: obstacle.addImage(o3);
      break;
      case 5: obstacle.addImage(o4);
      break;
      case 6: obstacle.addImage(o5);
      break;
      default: break;
    }
    obstacle.scale = 0.9;
    obstacle.lifetime = 175;
    groupO.add(obstacle);
  }


}
