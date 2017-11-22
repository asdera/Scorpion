// mouse = {
// 	x: 0,
// 	y: 0,
// 	selected: false
// }

function mouseHovered() {
	if (menu.state == "pregame") {
		for (i = 0; i < menu.difficulty.index.length; i++) {
			difficultyShape = menu.difficulty[menu.difficulty.index[i]]
			if (getLength({x: mouseX, y: mouseY}, {x: menu.center.x + difficultyShape.x, y: menu.center.y + difficultyShape.y}) <= menu.difficulty.length) {
				difficultyShape.hover = true;
			} else {
				difficultyShape.hover = false;
			}
		}
		if (getLength({x: mouseX, y: mouseY}, {x: menu.center.x + menu.playButton.x, y: menu.center.y + menu.playButton.y}) <= menu.playButton.length) {
			menu.playButton.hover = true;
		} else {
			menu.playButton.hover = false;
		}
	}
}


function mousePressed() {
	if (menu.state == "pregame") {
		for (i = 0; i < menu.difficulty.index.length; i++) {
			difficultyShape = menu.difficulty[menu.difficulty.index[i]]
			if (difficultyShape.hover) {
				menu.difficulty.selected = menu.difficulty.index[i]
			}
		}
		if (menu.playButton.hover) {
			menu.playButton.press = true;
		}
	}
	for (var i = 0; i < 4; i++) {
		particles.push(new Particle("line", mouseX, mouseY, 30, i*90+45, "blue"))
	}
}

function mouseReleased() {
	if (menu.state == "pregame") {
		if (menu.playButton.press) {
			start();
		}
	}
}

function keyPressed() {
	if (menu.state == "ingame") {
		if (keyCode == 80) {
			// quick console.log
			console.log(player)
		}
		if (keyCode == 82) {
			// restart game
			reset();
		}
		if (keyCode == 90 || keyCode == 85) {
			// ultimate attack
			player.shoot("ultimate");
		}
		if (keyCode == 88 || keyCode == 80) {
			// power attack
			player.shoot("power");
		}
		if (keyCode == 32 || keyCode == 73 || keyCode == 79) {
			// normal attack
			player.shoot("normal");
		}
		if (keyCode == 67) {
			// switch weapons
	    	player.gun = guns[guns.index[(guns.index.indexOf(player.gun.name)+1)%guns.index.length]];
		}
		if (keyCode >= 48 && keyCode <= 57) {
			// switch weapons
	    	player.gun = guns[guns.index[keyCode - 48]];
		}
	}
	if (keyCode == 66) {
		// permanent brakes
		player.breaks = !player.breaks;
	}
	if (keyCode == 71) {
		// toggle glow
		menu.glow = !menu.glow;
	}
}

function keyDown() {
	if (menu.state == "ingame") {
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
		if (player.breaks) {
			player.velX *= 0.9;
			player.velA *= 0.9;
		}
		// if (keyIsDown(90)) {
		// 	// normal attack
		// 	player.shoot();
		// }
	}
}