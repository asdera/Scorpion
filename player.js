playerinit = {
	x: canvaswidth/2,
	y: 50,
	angle: 0,
	speed: 1,
	velX: 0,
	turn: 0.3,
	velA: 0,
	friction: 0.98,
	grease: 0.95,
	nextFire: 0,
  	fireRate: 120, // 120,
  	nextPower: 0,
  	powerRate: 300, // 300,
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
		stroke("white");
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
			ctx.shadowColor = "gold";
      		ctx.shadowBlur = 10;
		} else {
			ctx.shadowColor = "blue";
      		ctx.shadowBlur = 10;
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
			bullets.push(new Bullet(Bodies.rectangle((player.hp + 0.5) / player.maxHp * (canvaswidth - boxy.outline), (boxy.height - boxy.outline) / 2, (canvaswidth - boxy.outline) / player.maxHp, boxy.height - boxy.outline/2, { restitution: 1 }), "#ffbaba", 25, {
				outline: "red",
				thickness: boxy.outline
			}));
		}
	},
	shoot: function(fire) {
		if (this.nextFire <= 0) {
	    	if (fire == "normal") {
	    		this.gun.normal(this);
	    	} else if (fire == "power") {
	    		if (this.nextPower >= this.powerRate) {
			    	this.gun.power(this);
			    	this.nextPower = 0;
			    }
		    } else {
		    	this.gun.ultimate(this);
		    }
	    	this.nextFire = this.fireRate;
	    }
	},
	action: function(effect, time) {
    	this.effects.push({effect: effect, time: time})
  	}
}

function setPlayer() {
	this.y += boxy.outline/4
	player.gun = guns["bouncer"]
	player.cannon = {
		outline: 5,
		bodysize: 90,
		muzzle: 60,
		length: 80,
		minX: -80,
		maxX: 80,
	}
}