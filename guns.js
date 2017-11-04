guns = {
	bouncer: {
		description: "Shoots a bouncy ball",
		colour: "skyblue",
		normal: function(player) {
			// drawing box
			force = 0.2
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, 30, { restitution: 0.8 }), this.colour));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		}
	}
}