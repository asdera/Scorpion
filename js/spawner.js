spawnerinit = {
	frame: -1,
	nextframe: 10,
	rate: 600,
	toughness: 30, //30
	speed: 0.5,
	maxtries: 20,
	update: function() {
		this.frame++;		
		if (this.frame >= this.nextframe) {

			dice = Math.random()

			special = {}

			if (dice < 0.1) {
				colour = "#420000"
				hp = Math.floor(Math.random() * 3 * this.toughness);
				radius = 50;
				number = 1;
			} else if (dice < 0.2) {
				colour = "#00ff90"
				hp = Math.floor(Math.random() * 6 * this.toughness);
				radius = 200;
				number = 1;
			} else if (dice < 0.3) {
				colour = "#aa6600"
				hp = Math.floor(Math.random() * 3 * this.toughness);
				radius = 100;
				number = 2;
			} else if (dice < 0.4) {
				colour = "#ff6060"
				hp = Math.floor(Math.random() * 0.5 * this.toughness);
				radius = 50;
				number = 10;
			} else if (dice < 0.5) {
				guntype = random(guns.index)
				colour = guns[guntype].colour
				hp = Math.floor(this.toughness);
				radius = 50;
				special = {
					gun: guntype,
					outline: "blue",
					deathrattle: function(me) {
						player.gun = guns[me.special.gun];
						menu.score.real++;
						menu.score.display = "real";
						menu.action(function() {
							menu.score.display = "fake";
						}, 100)
					}
				}
				number = 1;
			} else {
				colour = "#ff9900"
				hp = Math.floor(Math.random() * this.toughness);
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
					enemies.push(new Enemy(Bodies.circle(x, canvasheight + radius, radius, { isStatic: true }), colour, hp, this.speed, special))
				}
			}
			this.nextframe += random(this.rate * 0.8, this.rate * 1.2);
			this.rate = this.rate - 0.2
			this.toughness = this.toughness + 0.2
		}
	},
	checkX: function(pos, r) {
		for (var i = 0; i < enemies.length; i++) {
			boxi = enemies[i];
			if (boxi.collide({position: pos, circleRadius: r})) {
				return true;
			}
		}
		return false;
	}
}

worlds = {
	
}
