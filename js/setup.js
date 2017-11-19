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
const ratio = 1800/900;
const canvasPadding = 60
const canvaswidth = window.innerWidth-canvasPadding*2;
const canvasheight = canvaswidth/ratio;
var game = {};
var ctx;

function preload() {
	// myFont = loadFont("libraries/Gravedigger.otf");
}

function setup() {
	textFont("Trebuchet MS");
	createCanvas(canvaswidth, canvasheight);
	ctx = canvas.getContext('2d');
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	angleMode(DEGREES);
	init();
	// start();
}

function init() {
	player = {}
	boxy = Object.assign({}, boxyinit);
	spawner = {}
	bullets = [];
	enemies = [];
	grounds = [];
	setBoundaries();
}

function start() {
	spawner = Object.assign({}, spawnerinit);
	player = Object.assign({}, playerinit);
	setPlayer();
	menu.state = "ingame";
    menu.semistate = "pregame";
}

function reset() {
	clearWorld();
	menu.state = "pregame";
}

function clearWorld() {
	Matter.World.clear(world, false);
	setup();
}

function length(pos1, pos2) {
    return sqrt((pos1.x-pos2.x)**2 + (pos1.y-pos2.y)**2)
}

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function shadowColor(a) {
    if (menu.glow) {
        ctx.shadowColor = a;
    } else {
        stroke(a);
    }
}

function shadowBlur(a) {
    if (menu.glow) {
        ctx.shadowBlur = a;
    }
}