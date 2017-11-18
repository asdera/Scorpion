function draw() {
	background(51, menu.blur);
	mouseHovered();
	menu.update();
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
	width: 500,
	height: 300,
	blur: 130,
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
	effects: [],
	update: function() {
		if (this.state == "pregame") {
			fill("black");
			stroke("white");
			strokeWeight(10);
			ctx.shadowColor = "white";
      		ctx.shadowBlur = 20;
			rect(this.center.x-this.width, this.center.y-this.height, this.width*2, this.height*2);

			fill("white");
			textAlign(CENTER, CENTER);
			ctx.shadowColor = this.title.colour;
			textSize(180);
			text("Scorpion", this.center.x, this.center.y - 200);
			this.title.colour = changeHue(this.title.colour, 1)

			if (this.playButton.press) {
				ctx.shadowColor = "yellow";
			} else if (this.playButton.hover) {
				ctx.shadowColor = "red";
			} else {
				ctx.shadowColor = "blue";
			}
			fill("black");

			beginShape();
		    for (i = 0; i < 6; i++) {
		    	px = this.center.x + cos(i * 60 + this.playButton.angle) * this.playButton.length;
		        py = this.center.y + this.playButton.y + sin(i * 60 + this.playButton.angle) * this.playButton.length;
		        vertex(px, py);
		    }
		    endShape(CLOSE);
		    fill("white");
		    triangle(this.center.x - this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y + this.playButton.arrow, this.center.x + this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y, this.center.x - this.playButton.arrow + this.playButton.offsetArrow, this.center.y + this.playButton.y - this.playButton.arrow);
			ctx.shadowBlur = 0;

			// trasforms
			this.playButton.angle += 2;

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
		    	text(String(this.score.real), this.center.x, this.center.y);
		    } else {
		    	text(String(this.score.fake), this.center.x, this.center.y);
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


