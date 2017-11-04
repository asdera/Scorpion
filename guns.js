guns = {
	bouncer: {
		description: "Shoots bouncy balls",
		colour: "skyblue",
		normal: function(player) {
			// drawing box
			force = 0.2
			size = 30
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, size, { restitution: 1 }), this.colour));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		}
	},
	lazer: {
		description: "Shoots a line of balls",
		colour: "red",
		normal: function(player) {
			// drawing box
			force = 0.1
			size = 20
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, size, { restitution: 0.9 }), this.colour));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			player.action(function() {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, size, { restitution: 0.9 }), player.gun.colour));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
			}, 10)
		}
	}
}