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
var ctx;

menu = {
	x: 0,
	state: "pregame",
	width: 500,
	height: 300,
	blur: 130,
	colour: "blue",
	score: {
		fake: 0,
		real: 0,
		display: "fake",
	},
	effects: [],
	update: function() {
		if (this.state == "pregame") {
			ctx.shadowColor = "blue";
      		ctx.shadowBlur = 20;
			ctx.fillRect(canvaswidth/2-this.width, canvasheight/2-this.height, this.width*2, this.height*2);
			ctx.shadowBlur = 0;
		} else if (this.state == "ingame") {
			// effects
			eff = this.effects.length
		    while (eff--) {
		      effect = this.effects[eff];
		      effect.time--;
		      if (effect.time <= 0) {
		        effect.effect();
		        this.effects.splice(eff, 1);
		      }
		    }
			if (this.score.display == "real") {
				ctx.shadowColor = "yellow";
			} else {
				ctx.shadowColor = "white";
			}
      		ctx.shadowBlur = 20;
			textSize(400);
			strokeWeight(10);
		    stroke("white")
		    fill("gray");
		    textAlign(CENTER, CENTER);
		    if (this.score.display == "real") {
		    	text(String(this.score.real), canvaswidth/2, canvasheight/2);
		    } else {
		    	text(String(this.score.fake), canvaswidth/2, canvasheight/2);
		    }
		    ctx.shadowBlur = 0;
		}
	},
	fall: function() {

	},
	action: function(effect, time) {
    	this.effects.push({effect: effect, time: time})
  	}
}

function setup() {
	angleMode(DEGREES);
	init();
	start();
}

function init() {
	createCanvas(canvaswidth, canvasheight);
	ctx = canvas.getContext('2d');
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	player = Object.assign({}, playerinit);
	boxy = Object.assign({}, boxyinit);
	spawner = {}
	bullets = [];
	enemies = [];
	grounds = [];
	setPlayer();
	setBoundaries();
}

function start() {
	spawner = Object.assign({}, spawnerinit);
	menu.state = "ingame";
}

function reset() {
	clearWorld();
	init();
}

function length(pos1, pos2) {
    return sqrt((pos1.x-pos2.x)**2 + (pos1.y-pos2.y)**2)
}