function draw() {
	background(51);
	spawner.update();
	keyDown();
	for (var i = enemies.length - 1; i >= 0; i--) {
		boxi = enemies[i];
		if (boxi.destroy) {
			enemies.splice(i,1)
		} else {
			boxi.show();
		}
	}
	boxy.update();
	for (var i = bullets.length - 1; i >= 0; i--) {
		boxi = bullets[i];
		if (boxi.destroy) {
			bullets.splice(i,1)
		} else {
			boxi.show();
		}
	}
	boxy.afterupdate();
	player.update();
}

function clearWorld() {
	Matter.World.clear(world, false);
	setup();
}



