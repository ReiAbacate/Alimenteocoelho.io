const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope, rope2, rope3;
var fruit;
var link, link2, link3;

var bg;
var rabbit;
var melon;
var bunny;
var button, button2, button3;

var blink, eat, sad;

var balloonsound, bgsound, eatsound, losesound, balloon, cutsound, mutebtn;

var canw, canh;

function preload() {
  bg = loadImage("images/background.png");
  rabbit = loadImage("images/Rabbit-01.png");
  melon = loadImage("images/melon.png");

  blink = loadAnimation("images/blink_1.png", "images/blink_2.png", "images/blink_3.png");
  eat = loadAnimation("images/eat_0.png", "images/eat_1.png", "images/eat_2.png", "images/eat_3.png", "images/eat_4.png");
  sad = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png");


  balloonsound = loadSound("sounds/air.wav");
  bgsound = loadSound("sounds/sound1.mp3");
  eatsound = loadSound("sounds/eating_sound.mp3");
  losesound = loadSound("sounds/sad.wav");
  cutsound = loadSound("sounds/rope_cut.mp3");

  blink.playing = true;
  blink.looping = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;

}

function setup() 
{

var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (ismobile) {

  canw = displayWidth;
  canh = displayHeight;
  
  createCanvas(displayWidth+80, displayHeight);
}

else {

canw = windowWidth;
canh = windowHeight;

  createCanvas(windowWidth, windowHeight);
}
console.log(ismobile);
// createCanvas(canw, canh);

  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  bgsound.play();
  bgsound.setVolume(0.03);


  //delay das animações
  blink.frameDelay = 8;
  eat.frameDelay = 8;
  sad.frameDelay = 8;
 
ground = new Ground(250, canh, 500, 20);
rope = new Rope(8, {x:40, y:30});
rope2 = new Rope(7, {x:370, y:40});
rope3 = new Rope(4, {x:400, y:225});
var fruitop = {density:0.001};

fruit = Bodies.circle(250, 250, 25, fruitop);
Matter.Composite.add(rope.body, fruit);
link = new Link(rope, fruit);
link2 = new Link(rope2, fruit);
link3 = new Link(rope3,fruit);

bunny = createSprite(100, canh-80, 100, 100);
bunny.scale = 0.2;

//adicionar as animações do coelho
bunny.addAnimation("blinking", blink);
bunny.addAnimation("eating", eat);
bunny.addAnimation("crying", sad);
bunny.changeAnimation("blinking");

button = createImg("images/cut_btn.png");
button.position(20, 30);
button.size(50, 50);
button.mouseClicked(drop);

button2 = createImg("images/cut_btn.png");
button2.position(330, 35);
button2.size(50, 50);
button2.mouseClicked(drop2);

button3 = createImg("images/cut_btn.png");
button3.position(360, 200);
button3.size(50, 50);
button3.mouseClicked(drop3);

mutebtn = createImg("images/mute.png");
mutebtn.position(450, 20);
mutebtn.size(40, 40);
mutebtn.mouseClicked(mute);

  // balloon = createImg("images/balloon.png");
  // balloon.position(30, 230);
  // balloon.size(150, 100);
  // balloon.mouseClicked(airballon);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  // imageMode(CENTER);
}


function draw() 
{
  background(51);
  image(bg, 0, 0, displayWidth+80, displayHeight);
  Engine.update(engine);

   ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  if (fruit != null) {
  image(melon, fruit.position.x-30, fruit.position.y-30, 80, 80);
  }

  if (collide(fruit, bunny) == true) {
  
  bgsound.stop();
  eatsound.play();
  bunny.changeAnimation("eating");
  }

  if (collide(fruit, ground.body) == true) {

    bgsound.stop();
    losesound.play();
    losesound.setVolume(0.4);
    bunny.changeAnimation("crying");
  }
  drawSprites();
  }

function drop() {
  cutsound.play();
  rope.break();
  link.separar();
  link = null;
}

function drop2() {
  cutsound.play();
  rope2.break();
  link2.separar();
  link2 = null;
}

function drop3() {
  cutsound.play();
  rope3.break();
  link3.separar();
  link3 = null;
}

function collide(body, sprite) {
if (body != null) { 
  var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
  if (d <= 80) {

  World.remove(world, fruit);
  fruit = null;
    return true;
  }
  else {

    return false;
  }
}


}

function mute() {
  if (bgsound.isPlaying()) {

    bgsound.stop();
  }
  else {

    bgsound.play();
    bgsound.setVolume(0.03);
  }
}

function airballon() {

  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.02, y:0});

}
