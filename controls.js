mouse = {
	x: 0,
	y: 0,
	selected: false
}

function mousePressed() {
	// bullets.push(new Bullet(Bodies.rectangle(mouseX, mouseY, 40, 40, { restitution: 1 })));
	// bullets.push(new Bullet(Bodies.circle(mouseX, mouseY, 20, { restitution: 0.4 })));
	mouse.x = mouseX;
	mouse.y = mouseY;
}

function mouseReleased() {
	if (mouseButton == LEFT) {
		if (mouseX == mouse.x && mouseY == mouse.y) {
			bullets.push(new Bullet(Bodies.circle(mouseX, mouseY, 40, { restitution: 1 }), "orange"));
		} else if (abs(mouseX - mouse.x) * abs(mouseY - mouse.y) > 1000){
			bullets.push(new Bullet(Bodies.rectangle(min(mouseX, mouse.x) + abs(mouseX - mouse.x) / 2, min(mouseY, mouse.y) + abs(mouseY - mouse.y) / 2, abs(mouseX - mouse.x), abs(mouseY - mouse.y), { restitution: 1 }), "darkgreen"));
		}
	} else {
		for (var i = bullets.length - 1; i >= 0; i--) {
			boxi = bullets[i];
			if (Vertices.contains(boxi.body.vertices, {x: mouse.x, y: mouse.y})) {
				boxi.rip();
			}

		}
	}
}

function keyPressed() {
	if (keyCode == 80) {
		// quick console.log
		console.log(player)
	}
	if (keyCode == 82) {
		// restart level
		clearWorld();
	}
	if (keyCode == 90) {
		// ultimate attack
		player.shoot("ultimate");
	}
	if (keyCode == 88) {
		// power attack
		player.shoot("power");
	}
	if (keyCode == 32) {
		// normal attack
		player.shoot("normal");
	}
	if (keyCode == 67) {
		// switch weapons
		var keys = Object.keys(guns)
    	player.gun = guns[keys[ keys.length * Math.random() << 0]];
	}
}

function keyDown() {
	if (keyIsDown(65) || keyIsDown(40)) {
		// lunge to the left
		player.velX -= player.speed;
	}
	if (keyIsDown(68) || keyIsDown(38)) {
		// lunge to the right
		player.velX += player.speed;
	}
	if (keyIsDown(81) || keyIsDown(37)) {
		// spin clockwise
		player.velA -= player.turn;
	}
	if (keyIsDown(69) || keyIsDown(39)) {
		// spin counter-clockwise
		player.velA += player.turn;
	}
	if (keyIsDown(83)) {
		// speed brakes
		player.velX *= 0.9;
	}
	if (keyIsDown(87)) {
		// turn brakes
		player.velA *= 0.9;
	}
	// if (keyIsDown(90)) {
	// 	// normal attack
	// 	player.shoot();
	// }
}