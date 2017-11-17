function setBoundaries() {
	edge = 100
	// grounds.push(new Ground(Bodies.rectangle(canvaswidth/2, canvasheight + edge/2, canvaswidth, edge, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(-edge/2, canvasheight/2, edge, canvasheight * 10, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(canvaswidth + edge/2, canvasheight/2, edge, canvasheight * 10, { isStatic: true })));

	bounds = Matter.Bounds.create([{x: -1000, y: -canvasheight}, {x: canvaswidth + 1000, y: canvasheight * 2}])
}


boxyinit = {
	y: 0,
	height: playerinit.y * 2,
	outline: 10,
	strips: 7,
	minX: 45,
	maxX: canvaswidth-45,
	vel: -60,
	update: function() {
		stroke("red");
		strokeWeight(this.outline);
		fill("lightgray");
		rect(this.outline/2, this.y + this.outline/2, canvaswidth - this.outline, this.height - this.outline/2);
		fill("#ffbaba");
		rect(this.outline/2, this.y + this.outline/2, player.hp / player.maxHp * (canvaswidth - this.outline), this.height - this.outline/2);
	},
	afterupdate: function() {stroke("gray");
		stroke("white");
		strokeWeight(this.outline);
		for (var i = this.strips - 1; i >= 0; i--) {
			line(i*canvaswidth/this.strips, this.y + this.outline/2, (i+1)*canvaswidth/this.strips, this.y + this.height)
		}
		stroke("white");
		noFill();
		ctx.shadowColor = "red";
      	ctx.shadowBlur = 20;
		rect(this.outline/2, this.y + this.outline/2, canvaswidth - this.outline, this.height - this.outline/2);
		ctx.shadowBlur = 0;
	},
	fall: function() {
		this.vel++;
		this.y += this.vel/5;
		player.y = this.y + 50;
	},
}

