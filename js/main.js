function draw() {
	background(51, menu.alpha);
	mouseHovered();
	menu.update();
	ctx.globalAlpha = 1;
	if (spawner.update) {
		spawner.update();
	}
	keyDown();
	for (var i = enemies.length - 1; i >= 0; i--) {
		boxi = enemies[i];
		if (boxi.destroy) {
			enemies.splice(i,1)
		} else {
			boxi.show();
		}
	}
	boxy.update();
	for (var i = bullets.length - 1; i >= 0; i--) {
		boxi = bullets[i];
		if (boxi.special.behind) {
			if (boxi.destroy) {
				bullets.splice(i,1)
			} else {
				boxi.show();
			}
		}
	}
	boxy.afterupdate();
	for (var i = bullets.length - 1; i >= 0; i--) {
		boxi = bullets[i];
		if (!boxi.special.behind) {
			if (boxi.destroy) {
				bullets.splice(i,1)
			} else {
				boxi.show();
			}
		}
	}
	if (player.update) {
		player.update();
	}
}

menu = {
	state: "pregame",
	semistate: "none",
	fade: 1,
	width: 500,
	height: 300,
	alpha: 130,
	title: {
		colour: "#0000ff"
	},
	center: {
		x: canvaswidth/2,
		y: canvasheight/2
	},
	score: {
		fake: 0,
		real: 0,
		display: "fake",
	},
	playButton: {
		x: 0,
		y: 90,
		offsetArrow: 10,
		angle: 0,
		length: 150,
		arrow: 60,
		hover: false,
		press: false,
	},
	difficulty: {
		offsetWord: 50,
		length: 30,
		arrow: 60,
		selected: "easy",
		index: ["easy", "medium", "hard", "expert"],
		easy: {
			x: -500,
			y: -50,
			sides: 3,
			angle: 0,
			speed: 2,
			hover: false,
		},
		medium: {
			x: -500,
			y: 40,
			sides: 4,
			angle: 0,
			speed: 4,
			hover: false,
		},
		hard: {
			x: -500,
			y: 130,
			sides: 5,
			angle: 0,
			speed: 6,
			hover: false,
			press: false,
		},
		expert: {
			x: -500,
			y: 220,
			sides: 6,
			angle: 0,
			speed: 8,
			hover: false
		},
	},
	music: {
		time: 0
	},
	effects: [],
	update: function() {
		// Scorpion

		if (this.state == "pregame") {
			this.pregame();
		}
		if (this.state == "ingame") {
			if (this.semistate == "pregame") {
				ctx.globalAlpha = this.fade;
				this.pregame();
				ctx.globalAlpha = 1 - this.fade;
				if (this.fade <= 0.02) {
					this.fade = 1;
					this.semistate = "none";
				} else {
					this.fade -= 0.01
				}
			}
			this.ingame()
		}

		// Outside Beat
		ctx.shadowColor = "blue";
		noFill();
		stroke("blue")
		strokeWeight(2);
		beat = 40 * sin(this.music.time*5) + 40;
		strength = beat/20;
		for (var i = 0; i < strength; i++) {
			ctx.shadowBlur = beat/strength*i
			rect(-1, -1, canvaswidth+2, canvasheight+2);
		}
		ctx.shadowBlur = 0;
		this.music.time++;
	},
	pregame: function() {
		fill("black");
		stroke("white");
		strokeWeight(10);
		ctx.shadowColor = "white";
  		ctx.shadowBlur = 20;
		//rect(this.center.x-this.width, this.center.y-this.height, this.width*2, this.height*2);

		fill("white");
		textAlign(CENTER, CENTER);
		ctx.shadowColor = this.title.colour;
		textSize(180);
		text("Scorpion", this.center.x, this.center.y - 200);
		this.title.colour = changeHue(this.title.colour, 1)

		// Difficulty Buttons

		for (i = 0; i < this.difficulty.index.length; i++) {
			difficultyShape = this.difficulty[this.difficulty.index[i]]

			if (this.difficulty.index[i] == this.difficulty.selected) {
				ctx.shadowColor = "yellow";
			} else if (difficultyShape.hover) {
				ctx.shadowColor = "red";
			} else {
				ctx.shadowColor = "white";
			}
			ctx.shadowBlur = 20;
			fill("lightgray");
			strokeWeight(10);

			beginShape();
		    for (j = 0; j < difficultyShape.sides; j++) {
		    	px = this.center.x + difficultyShape.x + cos(j * 360 / difficultyShape.sides + difficultyShape.angle) * this.difficulty.length;
		        py = this.center.y + difficultyShape.y + sin(j * 360 / difficultyShape.sides + difficultyShape.angle) * this.difficulty.length;
		        vertex(px, py);
		    }
		    endShape(CLOSE);

		    ctx.shadowBlur = 10;
		    textSize(50);
		    strokeWeight(0);
		    fill("white");
			textAlign(LEFT, CENTER);
		    text(this.difficulty.index[i].charAt(0).toUpperCase() + this.difficulty.index[i].slice(1), this.center.x + difficultyShape.x + this.difficulty.offsetWord, this.center.y + difficultyShape.y);

		    difficultyShape.angle += difficultyShape.speed;
		}

		// Play Button

		if (this.playButton.press) {
			ctx.shadowColor = "yellow";
		} else if (this.playButton.hover) {
			ctx.shadowColor = "red";
		} else {
			ctx.shadowColor = "white";
		}
		ctx.shadowBlur = 20;
		strokeWeight(10);
		fill("#202020");

		beginShape();
	    for (i = 0; i < 6; i++) {
	    	px = this.center.x + cos(i * 60 + this.playButton.angle) * this.playButton.length;
	        py = this.center.y + this.playButton.y + sin(i * 60 + this.playButton.angle) * this.playButton.length;
	        vertex(px, py);
	    }
	    endShape(CLOSE);
	    fill("white");
	    triangle(this.center.x - this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y + this.playButton.arrow, this.center.x + this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y, this.center.x - this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y - this.playButton.arrow);
		// trasforms
		this.playButton.angle += 2;
	},
	ingame: function() {
		// Effects
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
			ctx.shadowColor = "blue";
		} else {
			ctx.shadowColor = "white";
		}
		this.scorpion();
  		ctx.shadowBlur = 20;
		textSize(400);
		strokeWeight(10);
	    stroke("white")
	    fill("gray");
	    textAlign(CENTER, CENTER);
	    if (this.score.display == "real") {
	    	text(String(this.score.real), this.center.x, this.center.y);
	    } else {
	    	text(String(this.score.fake), this.center.x, this.center.y);
	    }
	},
	action: function(effect, time) {
    	this.effects.push({effect: effect, time: time})
  	},
  	scorpion: function() {
  		noStroke();
	    fill("#222222");
		ellipse(this.center.x-200, this.center.y+50, 300)
		ellipse(this.center.x, this.center.y+50, 300)
		ellipse(this.center.x+200, this.center.y+50, 300)
		ellipse(this.center.x+400, this.center.y+50, 300)
		rect(this.center.x-500, this.center.y, 200, 100)
		rect(this.center.x-700, this.center.y+25, 200, 50)
		rect(this.center.x-700, this.center.y-100, 50, 175)
		quad(this.center.x-700, this.center.y-100, this.center.x-650, this.center.y-100, this.center.x-500, this.center.y-250, this.center.x-500, this.center.y-300);
		rect(this.center.x-500, this.center.y-300, 150, 50)
		rect(this.center.x-500, this.center.y-300, 50, 150)
		rect(this.center.x-500, this.center.y-200, 150, 50)
		rect(this.center.x-400, this.center.y-300, 50, 150)

		triangle(this.center.x-400, this.center.y-150, this.center.x-350, this.center.y-200, this.center.x-300, this.center.y-100)

		// Lower Legs
		quad(this.center.x-300, this.center.y+100, this.center.x-250, this.center.y+100, this.center.x-100, this.center.y+250, this.center.x-150, this.center.y+250);

		quad(this.center.x-100, this.center.y+100, this.center.x-50, this.center.y+100, this.center.x+100, this.center.y+250, this.center.x+50, this.center.y+250);

		quad(this.center.x+100, this.center.y+100, this.center.x+150, this.center.y+100, this.center.x+300, this.center.y+250, this.center.x+250, this.center.y+250);

		quad(this.center.x-300, this.center.y+400, this.center.x-250, this.center.y+400, this.center.x-100, this.center.y+250, this.center.x-150, this.center.y+250);

		quad(this.center.x-100, this.center.y+400, this.center.x-50, this.center.y+400, this.center.x+100, this.center.y+250, this.center.x+50, this.center.y+250);

		quad(this.center.x+100, this.center.y+400, this.center.x+150, this.center.y+400, this.center.x+300, this.center.y+250, this.center.x+250, this.center.y+250);

		// Higher Legs
		quad(this.center.x-300, this.center.y, this.center.x-250, this.center.y, this.center.x-100, this.center.y-150, this.center.x-150, this.center.y-150);

		quad(this.center.x-100, this.center.y, this.center.x-50, this.center.y, this.center.x+100, this.center.y-150, this.center.x+50, this.center.y-150);

		quad(this.center.x+100, this.center.y, this.center.x+150, this.center.y, this.center.x+300, this.center.y-150, this.center.x+250, this.center.y-150);

		quad(this.center.x-300, this.center.y-300, this.center.x-250, this.center.y-300, this.center.x-100, this.center.y-150, this.center.x-150, this.center.y-150);

		quad(this.center.x-100, this.center.y-300, this.center.x-50, this.center.y-300, this.center.x+100, this.center.y-150, this.center.x+50, this.center.y-150);

		quad(this.center.x+100, this.center.y-300, this.center.x+150, this.center.y-300, this.center.x+300, this.center.y-150, this.center.x+250, this.center.y-150);

		// Claws
		quad(this.center.x+275, this.center.y, this.center.x+325, this.center.y, this.center.x+475, this.center.y-200, this.center.x+425, this.center.y-200);

		quad(this.center.x+475, this.center.y-200, this.center.x+425, this.center.y-200, this.center.x+525, this.center.y-275, this.center.x+525, this.center.y-225);

		rect(this.center.x+525, this.center.y-275, 100, 50);

		quad(this.center.x+475, this.center.y-200, this.center.x+425, this.center.y-200, this.center.x+525, this.center.y-125, this.center.x+525, this.center.y-175);

		rect(this.center.x+525, this.center.y-175, 100, 50);

		quad(this.center.x+275, this.center.y+100, this.center.x+325, this.center.y+100, this.center.x+475, this.center.y+300, this.center.x+425, this.center.y+300);

		quad(this.center.x+475, this.center.y+300, this.center.x+425, this.center.y+300, this.center.x+525, this.center.y+375, this.center.x+525, this.center.y+325);

		rect(this.center.x+525, this.center.y+325, 100, 50);

		quad(this.center.x+475, this.center.y+300, this.center.x+425, this.center.y+300, this.center.x+525, this.center.y+225, this.center.x+525, this.center.y+275);

		rect(this.center.x+525, this.center.y+225, 100, 50);

		quad(this.center.x+475, this.center.y-25, this.center.x+500, this.center.y+25, this.center.x+725, this.center.y-75, this.center.x+700, this.center.y-125);

		quad(this.center.x+475, this.center.y+125, this.center.x+500, this.center.y+75, this.center.x+725, this.center.y+175, this.center.x+700, this.center.y+225);
  	}
}


