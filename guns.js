guns = {
	bouncer: {
		description: "Shoots bouncy balls",
		colour: "skyblue",
		normal: function(player) {
			// drawing box
			force = 0.2
			ballsize = 30
			damage = 4
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 1 }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			// drawing box
			force = 0.2
			ballsize = 30
			damage = 4
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 1 }), this.colour, damage, {
				update: function(box) {
					if (box.body.circleRadius < 300) {
						Body.scale(box.body, (box.body.circleRadius+1)/box.body.circleRadius, (box.body.circleRadius+1)/box.body.circleRadius)
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			// drawing box
			force = 0.1
			ballsize = 30
			damage = 4
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y + player.cannon.length, ballsize, { restitution: 1 }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	},
	lazer: {
		description: "Shoots mutiple smaller balls",
		colour: "#470059",
		normal: function(player) {
			// drawing box
			force = 0.1
			ballsize = 20
			damage = 2
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 0.9 }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			player.action(function() {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 0.9 }), player.gun.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
			}, 10)
		},
		power: function(player) {
			// drawing box
			force = 0.1
			ballsize = 20
			damage = 2
			number = 11
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 0.9 }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			for (var i = 0; i < number; i++) {
				player.action(function() {
					bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: 0.9 }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
				}, (i+1) * 5)
			}
			
		},
		ultimate: function(player) {
			// drawing box
			force = 0.05  
			ballsize = 15
			damage = 2
			number = 24
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: 1 }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: 1 }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 10)
		}
	}
}