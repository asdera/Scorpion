spawner = {
	frame: -1,
	rate: 420,
	size: 100,
	number: 4,
	update: function() {
		this.frame++;
		if (this.frame % this.rate == 0) {
			xs = []
			for (var i = 0; i < this.number; i++) {
				x = random(this.size, canvaswidth - this.size);
				while (this.checkX(x, xs)) {
					x = random(this.size, canvaswidth - this.size);
				}
				xs.push(x)
				enemies.push(new Enemy(Bodies.circle(x, canvasheight + this.size, this.size, { isStatic: true }), "orange", 5, 0.5))
			}
		}
	},
	checkX: function(x, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (abs(arr[i] - x) < this.size * 2) {
				return true;
			}
		}
	}
}