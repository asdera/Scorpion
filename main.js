// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vertices = Matter.Vertices,
    Bounds = Matter.Bounds

var engine;
var world;
var player;
var bullets;
var grounds;
var bounds;
var canvaswidth = 1800;
var canvasheight = 900;
var game = {};

function setup() {
	angleMode(DEGREES);
	bullets = [];
	enemies = [];
	grounds = [];
	Body.create();
	createCanvas(canvaswidth, canvasheight);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	setPlayer();
	setBoundaries();
	enemies.push(new Enemy(Bodies.circle(500, 500, 50, { isStatic: true }), "Tan"))
}

function draw() {
	background(51);
	boxy.update();
	keyDown();
	for (var i = bullets.length - 1; i >= 0; i--) {
		boxi = bullets[i];
		if (boxi.destroy) {
			bullets.splice(i,1)
		} else {
			boxi.show();
		}
	}
	for (var i = enemies.length - 1; i >= 0; i--) {
		boxi = enemies[i];
		if (boxi.destroy) {
			enemies.splice(i,1)
		} else {
			boxi.show();
		}
	}
	player.update();
}

function clearWorld() {
	Matter.World.clear(world, false);
	setup();
}



