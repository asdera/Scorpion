playerinit = {
	x: canvasWidth/2,
	y: 50,
	angle: 0,
	speed: 1,
	velX: 0,
	turn: 0.3,
	velA: 0,
	friction: 0.98,
	grease: 0.95,
	brakes: false,
	nextFire: 0,
  	fireRate: 120, // 120,
  	nextPower: 0,
  	powerRate: 300, // 300,
  	nextUltimate: 0,
  	ultimateRate: 1200, // 300,
  	maxHp: 10,
  	hp: 10,
  	effects: [],
	cannon: {},
	update: function() {
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

		// drawing cannon
		if (menu.glow) {
			stroke("white");
		} else {
			stroke("navy");
		}
		strokeWeight(0);
		fill("grey");
		ellipse(this.x, this.y, this.cannon.bodysize)
		fill("blue");
		if (this.nextPower > 0) {
			if (this.nextPower > this.powerRate/5) {
				strokeWeight(this.cannon.outline);
			}
			if (this.nextPower == this.powerRate) {
				ellipse(this.x, this.y, this.cannon.bodysize)
			} else {
				arc(this.x, this.y, this.cannon.bodysize, this.cannon.bodysize, -180 * this.nextPower / this.powerRate + 90, 180 * this.nextPower / this.powerRate + 90, CHORD);
				strokeWeight(this.cannon.outline);
			}
		}
		if (this.nextPower == this.powerRate) {
			shadowColor("gold");
      		shadowBlur(10);
		} else {
			shadowColor("navy");
      		shadowBlur(10);
		}
		strokeWeight(this.cannon.outline);
		noFill()
		ellipse(this.x, this.y, this.cannon.bodysize)

		strokeWeight(this.cannon.outline);
		fill("lightgrey");
		quad(this.x - cos(this.angle) * this.cannon.muzzle/2, this.y + sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2, this.y - sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * this.cannon.length, this.y - sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * this.cannon.length, this.x - cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * this.cannon.length, this.y + sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * this.cannon.length);
		ctx.shadowBlur = 0;
		fill(this.gun.colour);
		templength = this.cannon.length * (this.fireRate - this.nextFire) / this.fireRate
		quad(this.x - cos(this.angle) * this.cannon.muzzle/2, this.y + sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2, this.y - sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * templength, this.y - sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * templength, this.x - cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * templength, this.y + sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * templength);
		

		// cannon movement
		if (this.nextFire > 0) {
	      	this.nextFire--;
	    } else {
	      	this.nextFire = 0;
	    }

	    if (this.hp <= 0) {
	    	boxy.fall();
	    }

		this.x += this.velX;
		this.velX *= this.friction;
		if (this.x <= boxy.minX) {
			this.x = boxy.minX
			this.velX = -this.velX;
		}
		if (this.x >= boxy.maxX) {
			this.x = boxy.maxX
			this.velX = -this.velX;
		}
		this.angle += this.velA;
		this.velA *= this.grease;
		if (this.angle <= this.cannon.minX) {
			this.angle = this.cannon.minX
			this.velA = -this.velA;
		}
		if (this.angle >= this.cannon.maxX) {
			this.angle = this.cannon.maxX
			this.velA = -this.velA;
		}
	},
	damage: function(hit=1) {
		for (var i = 0; i < hit; i++) {
			player.hp--;
			bullets.push(new Bullet(Bodies.rectangle((player.hp + 0.5) / player.maxHp * (canvasWidth - boxy.outline*2) + boxy.outline, (boxy.height - boxy.outline) / 2, (canvasWidth - boxy.outline) / player.maxHp, boxy.height - boxy.outline/2, { restitution: 1 }), "#ffbaba", 25, {
				outline: "red",
				behind: true,
				thickness: boxy.outline
			}));
		}
	},
	shoot: function(fire) {
		if (this.nextFire <= 0) {
	    	if (fire == "normal") {
	    		this.gun.normal(this);
	    		this.nextFire = this.fireRate;
	    	} else if (fire == "power") {
	    		if (this.nextPower >= this.powerRate) {
			    	this.gun.power(this);
			    	this.nextPower = 0;
			    	this.nextFire = this.fireRate;
			    }
		    } else {
		    	if (this.nextUltimate >= this.ultimateRate) {
			    	this.gun.ultimate(this);
			    	this.nextUltimate = 0;
			    	this.nextFire = this.fireRate;
			    }
		    }
	    }
	},
	action: function(effect, time) {
    	this.effects.push({effect: effect, time: time})
  	}
}

function setPlayer() {
	player.y += boxy.outline/4
	player.gun = guns[random(guns.index)]
	player.cannon = {
		outline: 5,
		bodysize: 90,
		muzzle: 60,
		length: 80,
		minX: -80,
		maxX: 80,
	}
	if (menu.difficulty.selected == "expert") {
        spawner.rate = 300;
        player.hp = 1;
        player.maxHp = 1;
    } else if (menu.difficulty.selected == "hard") {
        spawner.rate = 400;
        player.hp = 3;
        player.maxHp = 3;
    } else if (menu.difficulty.selected == "medium") {
        spawner.rate = 500;
        player.hp = 5;
        player.maxHp = 5;
    }
}