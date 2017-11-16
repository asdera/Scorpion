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
var spawner;
var boxy;
var bullets;
var grounds;
var bounds;
var canvaswidth = 1800;
var canvasheight = 900;
var game = {};

function setup() {
	angleMode(DEGREES);
	player = Object.assign({}, playerinit);
	boxy = Object.assign({}, boxyinit);
	spawner = Object.assign({}, spawnerinit);
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
}

function reset() {
	clearWorld();
	setup();
}

function length(pos1, pos2) {
    return sqrt((pos1.x-pos2.x)**2 + (pos1.y-pos2.y)**2)
}