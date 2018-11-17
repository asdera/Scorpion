function setBoundaries() {
	edge = 100
	// grounds.push(new Ground(Bodies.rectangle(canvasWidth/2, canvasHeight + edge/2, canvasWidth, edge, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(-edge/2, canvasHeight/2, edge, canvasHeight * 10, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(canvasWidth + edge/2, canvasHeight/2, edge, canvasHeight * 10, { isStatic: true })));

	bounds = Matter.Bounds.create([{x: -1000, y: -canvasHeight}, {x: canvasWidth + 1000, y: canvasHeight * 2}])
}


boxyinit = {
	y: 0,
	height: playerinit.y * 2,
	outline: 10,
	strips: 7,
	minX: 45,
	maxX: canvasWidth-45,
	vel: -60,
	update: function() {
		// if () {
		// 	textSize(90);
		// 	text("word", 100, 30);
		// }
		stroke("red");
		strokeWeight(this.outline);
		fill("lightgray");
		rect(this.outline/2, this.y + this.outline/2, canvasWidth - this.outline, this.height - this.outline/2);
		fill("#ffbaba");
		rect(this.outline/2, this.y + this.outline/2, player.hp / player.maxHp * (canvasWidth - this.outline), this.height - this.outline/2);
	},
	afterupdate: function() {stroke("gray");
		stroke("white");
		strokeWeight(this.outline);
		for (var i = this.strips - 1; i >= 0; i--) {
			line(i*canvasWidth/this.strips, this.y + this.outline/2, (i+1)*canvasWidth/this.strips, this.y + this.height)
		}
		if (menu.state == "ingame" && !menu.glow && player.nextUltimate == player.ultimateRate) {
			stroke("yellow");
		} else {
			stroke("white");
			noFill();
			shadowColor("red");
		}
      	shadowBlur(20);
		rect(this.outline/2, this.y + this.outline/2, canvasWidth - this.outline, this.height - this.outline/2);
		ctx.shadowBlur = 0;
	},
	fall: function() {
		this.vel++;
		this.y += this.vel/10;
		player.y = this.y + 50;
		if (this.y > canvasHeight*3) {
			menu.state = "endgame";
			menu.semistate == "ingame"
			boxy = {};
			player = {};
			spawner = {};
		}
	},
}

