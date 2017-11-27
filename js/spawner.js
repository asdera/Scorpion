spawnerinit = {
	world: "future",
	frame: -1,
	nextFrame: 10,
	rate: 600,
	toughness: 15, //30
	maxTries: 20,
	update: function() {
		this.frame++;		
		if (this.frame >= this.nextFrame) {

			dice = Math.random();

			special = {};

			changingX = false;

			if (this.world == "future") {
				if (dice < 0.1) {
					colour = "#9a76bc"
					hp = Math.floor(Math.random() * 3 * this.toughness);
					radius = 60;
					number = 1;
				} else if (dice < 0.2) {
					colour = "#ff00d0"
					hp = Math.floor(Math.random() * 6 * this.toughness);
					radius = 120;
					number = 1;
				} else if (dice < 0.3) {
					colour = "#cee1ff"
					hp = Math.floor(Math.random() * 3 * this.toughness);
					radius = 90;
					number = 2;
				} else if (dice < 0.4) {
					colour = "#ff1e69"
					hp = Math.floor(Math.random() * 0.5 * this.toughness);
					radius = 60;
					number = 10;
				} else if (dice < 0.5) {
					guntype = random(guns.index)
					colour = guns[guntype].colour
					hp = Math.floor(this.toughness);
					radius = 60;
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
				} else if (dice < 0.53) {
					colour = "yellow"
					hp = Math.floor(this.toughness/2);
					radius = 60;
					special = {
						outline: "#ff7700",
						deathrattle: function(me) {
							player.nextUltimate = player.ultimateRate;
							menu.score.real++;
							menu.score.display = "real";
							menu.action(function() {
								menu.score.display = "fake";
							}, 100)
						}
					}
					number = 1;
				} else if (dice < 0.55) {
					colour = "orange"
					hp = Math.floor(this.toughness*4);
					radius = 200;
					special = {
						outline: "green",
						deathrattle: function(me) {
							changeWorld("nether");
							for (var e = 0; e < enemies.length; e++) {
								boxe = enemies[e];
								boxe.damage(spawner.toughness * 20);
							}
							menu.score.real++;
							menu.score.display = "real";
							menu.action(function() {
								menu.score.display = "fake";
							}, 100)
						}
					}
					number = 1;
				} else {
					colour = "#0099ff"
					hp = Math.floor(Math.random() * this.toughness);
					radius = 60;
					number = 5;
				}
				
				for (var i = 0; i < number; i++) {
					x = random(radius, canvasWidth - radius);
					tries = 0
					while (this.checkX({x: x, y: canvasHeight + radius}, radius) && tries < this.maxTries) {
						x = random(radius, canvasWidth - radius);
						tries++;
					}
					if (tries < this.maxTries) {
						enemies.push(new Enemy(Bodies.circle(x, canvasHeight + radius, radius, { isStatic: true }), colour, hp+1, 0.5, special))
					}
				}
			} else if (this.world == "nether") {
				if (dice < 0.1) {
					colour = "#420000"
					hp = Math.floor(Math.random() * this.toughness);
					radius = 75;
					number = 3;
				} else if (dice < 0.2) {
					colour = "#dd1860"
					hp = Math.floor(Math.random() * 4 * this.toughness);
					radius = 100;
					number = 1;
				} else if (dice < 0.3) {
					colour = "#aa6600"
					hp = Math.floor(Math.random() * 2 * this.toughness);
					radius = 100;
					number = 2;
				} else if (dice < 0.4) {
					colour = "#ff6060"
					hp = Math.floor(Math.random() * 0.5 * this.toughness);
					radius = 75;
					colour = "#420000"
					hp = Math.floor(Math.random() * 3 * this.toughness);
					radius = 60;
					number = 3;
				} else if (dice < 0.2) {
					colour = "#968210"
					hp = Math.floor(Math.random() * 8 * this.toughness);
					radius = 150;
					number = 1;
				} else if (dice < 0.3) {
					colour = "#120054"
					hp = Math.floor(Math.random() * 2 * this.toughness);
					radius = 90;
					number = 4;
				} else if (dice < 0.4) {
					colour = "#ff6060"
					number = 10;
				} else if (dice < 0.5) {
					guntype = random(guns.index)
					colour = guns[guntype].colour
					hp = Math.floor(this.toughness);
					radius = 75;
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
				} else if (dice < 0.53) {
					colour = "#9b0000"
					hp = Math.floor(this.toughness/2);
					radius = 75;
					special = {
						outline: "#ff7700",
						deathrattle: function(me) {
							player.fireRate *= 0.5;
							player.action(function() {
								player.fireRate *= 2;
							}, 1000)
							menu.score.real++;
							menu.score.display = "real";
							menu.action(function() {
								menu.score.display = "fake";
							}, 100)
						}
					}
					number = 1;
				} else if (dice < 0.55) {
					colour = "limegreen"
					hp = Math.floor(this.toughness*4);
					radius = 200;
					special = {
						outline: "green",
						deathrattle: function(me) {
							changeWorld("boreal");
							for (var e = 0; e < enemies.length; e++) {
								boxe = enemies[e];
								boxe.damage(spawner.toughness * 20);
							}
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
					radius = 75;
					number = 4;
					changingX = true;
				}
				
				x = random(radius, canvasWidth - radius);
				for (var i = 0; i < number; i++) {
					if (changingX) {
						x = random(radius, canvasWidth - radius);
					}
					y = canvasHeight + radius + i * radius * 2.5

					tries = 0

					while (this.checkX({x: x, y: y}, radius) && tries < this.maxTries) {
						x = random(radius, canvasWidth - radius);
						tries++;
					}
					if (tries < this.maxTries) {
						enemies.push(new Enemy(Bodies.circle(x, y, radius, { isStatic: true }), colour, hp+1, 0.7, special))
					}
				}
			} else if (this.world == "boreal") {
				if (dice < 0.1) {
					colour = "#72410d"
					hp = Math.floor(Math.random() * 3 * this.toughness);
					radius = 50;
					number = 3;
				} else if (dice < 0.2) {
					colour = "#00ff90"
					hp = Math.floor(Math.random() * 8 * this.toughness);
					radius = 150;
					number = 1;
				} else if (dice < 0.3) {
					colour = "#002d1d"
					hp = Math.floor(Math.random() * 2 * this.toughness);
					radius = 100;
					number = 4;
				} else if (dice < 0.4) {
					colour = "#ffe949"
					hp = Math.floor(Math.random() * this.toughness);
					radius = 50;
					number = 6;
				} else if (dice < 0.5) {
					guntype = random(guns.index)
					colour = guns[guntype].colour
					hp = Math.floor(this.toughness);
					radius = 100;
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
				} else if (dice < 0.53) {
					colour = "limegreen"
					hp = Math.floor(this.toughness/2);
					radius = 100;
					special = {
						outline: "#ff7700",
						deathrattle: function(me) {
							spawner.nextFrame += 100;
							for (var e = 0; e < enemies.length; e++) {
								boxe = enemies[e];
								boxe.realSpeed = boxe.speed;
								boxe.speed = 0;
								boxe.action(function(me) {
									me.speed = me.realSpeed;
								}, 1000);
							}
							menu.score.real++;
							menu.score.display = "real";
							menu.action(function() {
								menu.score.display = "fake";
							}, 100)
						}
					}
					number = 1;
				} else if (dice < 0.55) {
					colour = "navy"
					hp = Math.floor(this.toughness*4);
					radius = 200;
					special = {
						outline: "green",
						deathrattle: function(me) {
							changeWorld("future");
							for (var e = 0; e < enemies.length; e++) {
								boxe = enemies[e];
								boxe.damage(spawner.toughness * 20);
							}
							menu.score.real++;
							menu.score.display = "real";
							menu.action(function() {
								menu.score.display = "fake";
							}, 100)
						}
					}
					number = 1;
				} else {
					colour = "#307a00"
					hp = Math.floor(Math.random() * this.toughness * 6);
					radius = 100;
					number = 1;
				}
				cx = random(radius*3, canvasWidth - radius*3);
				angler = random(0, 360);
				for (var i = 0; i < number; i++) {
					x = cx + cos((360/number)*i+angler) * radius * 2.5;
			        y = canvasHeight + radius * 3 + sin((360/number)*i+angler) * radius * 2.5;
					tries = 0
					while (this.checkX({x: x, y: y}, radius) && tries < this.maxTries) {
						x = random(radius, canvasWidth - radius);
						tries++;
					}
					if (tries < this.maxTries) {
						enemies.push(new Enemy(Bodies.circle(x, y, radius, { isStatic: true }), colour, hp+1, 0.3, special))
					}
				}
			}
			this.nextFrame += random(this.rate * 0.8, this.rate * 1.2);
			this.rate = this.rate - 0.2;
			this.toughness = this.toughness + 0.2;
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
