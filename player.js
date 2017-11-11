player = {
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
  	fireRate: 120,// 100,
  	hp: 50,
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
		stroke("#000040");
		fill("gray");
		strokeWeight(this.cannon.outline);
		ellipse(this.x, this.y, this.cannon.bodysize)
		fill("lightgray");
		quad(this.x - cos(this.angle) * this.cannon.muzzle/2, this.y + sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2, this.y - sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * this.cannon.length, this.y - sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * this.cannon.length, this.x - cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * this.cannon.length, this.y + sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * this.cannon.length);
		fill(this.gun.colour);
		templength = this.cannon.length * (this.fireRate - this.nextFire) / this.fireRate
		quad(this.x - cos(this.angle) * this.cannon.muzzle/2, this.y + sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2, this.y - sin(this.angle) * this.cannon.muzzle/2, this.x + cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * templength, this.y - sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * templength, this.x - cos(this.angle) * this.cannon.muzzle/2 + sin(this.angle) * templength, this.y + sin(this.angle) * this.cannon.muzzle/2 + cos(this.angle) * templength);

		// cannon movement
		if (this.nextFire > 0) {
	      this.nextFire--;
	    } else {
	      this.nextFire = 0;
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
	shoot: function(fire) {
		if (this.nextFire <= 0) {
	    	this.gun[fire](this);
	    	this.nextFire = this.fireRate;
	    }
	},
	action: function(effect, time) {
	    this.effects.push({effect: effect, time: time, me: this})
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