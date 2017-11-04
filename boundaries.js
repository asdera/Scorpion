function setBoundaries() {
	edge = 100
	// grounds.push(new Ground(Bodies.rectangle(canvaswidth/2, canvasheight + edge/2, canvaswidth, edge, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(-edge/2, canvasheight/2, edge, canvasheight * 10, { isStatic: true })));
	grounds.push(new Ground(Bodies.rectangle(canvaswidth + edge/2, canvasheight/2, edge, canvasheight * 10, { isStatic: true })));

	bounds = Matter.Bounds.create([{x: -1000, y: -canvasheight}, {x: canvaswidth + 1000, y: canvasheight * 2}])
}


boxy = {
	height: player.y * 2,
	outline: 10,
	strips: 7,
	minX: 45,
	maxX: canvaswidth-45,
	update: function() {stroke("gray");
		strokeWeight(this.outline);
		fill("lightgray");
		rect(this.outline/2, this.outline/2, canvaswidth - this.outline, this.height - this.outline/2);
		for (var i = this.strips - 1; i >= 0; i--) {
			line(i*canvaswidth/this.strips, this.outline/2, (i+1)*canvaswidth/this.strips, this.height)
		}
	}
}