spawner = {
	frame: -1,
	nextframe: 10,
	rate: 500,
	speed: 0.5,
	maxtries: 10,
	update: function() {
		this.frame++;		
		if (this.frame >= this.nextframe) {

			dice = Math.random()

			if (dice < 0.1) {
				colour = "#420000"
				hp = 12;
				radius = 50;
				number = 1;
			} else if (dice < 0.2) {
				colour = "#00ff90"
				hp = 24;
				radius = 200;
				number = 1;
			} else if (dice < 0.3) {
				colour = "#aa6600"
				hp = 6;
				radius = 100;
				number = 2;
			} else {
				colour = "#ff9900"
				hp = 3;
				radius = 50;
				number = 4;
			}

			for (var i = 0; i < number; i++) {
				x = random(radius, canvaswidth - radius);
				tries = 0
				while (this.checkX({x: x, y: canvasheight + radius}, radius) && tries < this.maxtries) {
					x = random(radius, canvaswidth - radius);
					tries++;
				}
				if (tries < this.maxtries) {
					enemies.push(new Enemy(Bodies.circle(x, canvasheight + radius, radius, { isStatic: true }), colour, hp, this.speed))
				}
			}
			this.nextframe += this.rate;
			this.rate = this.rate * 99 / 100
		}
	},
	checkX: function(pos, r) {
		for (var i = 0; i < enemies.length; i++) {
			boxi = enemies[i];
			if (boxi.collide(pos, r)) {
				return true;
			}
		}
		return false;
	}
}