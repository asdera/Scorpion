guns = {
	bouncer: {
		description: "Shoots bouncy balls",
		colour: "skyblue",
		normal: function(player) {
			force = 0.2
			ballsize = 30
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.2
			ballsize = 30
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					if (box.body.circleRadius < 300) {
						Body.scale(box.body, (box.body.circleRadius+3)/box.body.circleRadius, (box.body.circleRadius+3)/box.body.circleRadius)
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			force = 0.1
			ballsize = 30
			damage = 12
			bounce = 1
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	},
	lazer: {
		description: "Shoots mutiple smaller balls in a line",
		colour: "#470059",
		normal: function(player) {
			force = 0.1
			ballsize = 20
			damage = 6
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			player.action(function() {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
			}, 10)
		},
		power: function(player) {
			force = 0.1
			ballsize = 20
			damage = 6
			bounce = 1
			number = 11
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			for (var i = 0; i < number; i++) {
				player.action(function() {
					bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
				}, (i+1) * 5)
			}
			
		},
		ultimate: function(player) {
			force = 0.05  
			ballsize = 20
			damage = 6
			bounce = 1
			number = 16
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 10)
		}
	},
	blaster: {
		description: "Shoots mutiple shells in a wide angle",
		colour: "#006666",
		normal: function(player) {
			force = 0.05
			ballsize = 15
			damage = 5
			bounce = 0.8
			minangle = -5
			maxangle = 5
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle) * player.cannon.length, player.y + cos(player.angle+minangle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle) * force, y: cos(player.angle+minangle) * force});
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+maxangle) * player.cannon.length, player.y + cos(player.angle+maxangle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+maxangle) * force, y: cos(player.angle+maxangle) * force});
		},
		power: function(player) {
			force = 0.05  
			ballsize = 15
			damage = 5
			bounce = 1
			number = 6
			minangle = -15
			maxangle = 15
			for (var i = 0; i < number; i++) {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, player.y + cos(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle+i*(maxangle - minangle)/number) * force, y: cos(player.angle+minangle+i*(maxangle - minangle)/number) * force});
			}
			for (var j = 0; j < 3; j++) {
				player.action(function() {
					for (var i = 0; i < number; i++) {
						bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, player.y + cos(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
						Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle+i*(maxangle - minangle)/number) * force, y: cos(player.angle+minangle+i*(maxangle - minangle)/number) * force});
					}
				}, 10 + j * 10)
			}
		},
		ultimate: function(player) {
			force = 0.1 
			ballsize = 15
			damage = 5
			bounce = 1
			number = 16
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 5)
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 10)
		}
	},
	trapper: {
		description: "Shoots pointy triangles",
		colour: "#afffdd",
		normal: function(player) {
			force = 0.15
			ballsize = 40
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.polygon(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage));
			Body.rotate(bullets[bullets.length-1].body, random(0, 360))
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.15
			ballsize = 40
			damage = 24
			bounce = 1
			bullets.push(new Bullet(Bodies.polygon(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					radiusLength = sqrt((box.body.position.x - box.body.vertices[0].x)**2 + (box.body.position.y - box.body.vertices[0].y)**2);
					if (radiusLength < 100) {
						Body.scale(box.body, (radiusLength+1)/radiusLength, (radiusLength+1)/radiusLength)
					}
					if (box.hits >= 3) {
						force = 0.05
						ballsize = 30
						damage = 6
						bounce = 1
						number = 6
						for (var i = 0; i < number; i++) {
							bullets.push(new Bullet(Bodies.polygon(box.body.position.x + sin(360/number*i) * player.cannon.length, box.body.position.y + cos(360/number*i) * player.cannon.length, 3, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.rotate(bullets[bullets.length-1].body, random(0, 360))
							Body.applyForce(bullets[bullets.length-1].body, {x: box.body.position.x, y: box.body.position.y}, {x: sin(360/number*i) * force, y: cos(360/number*i) * force});
						}
						box.rip();
					}
				}
			}));
			Body.rotate(bullets[bullets.length-1].body, random(0, 360))
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			force = 0.15
			ballsize = 40
			damage = 24
			bounce = 1
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.polygon(x, player.y - player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage));
				Body.rotate(bullets[bullets.length-1].body, random(0, 360))
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	}
}