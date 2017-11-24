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
		for (i = 0; i < menu.music.index.length; i++) {
			musicShape = menu.music[menu.music.index[i]]
			if (getLength({x: mouseX, y: mouseY}, {x: menu.center.x + musicShape.x, y: menu.center.y + musicShape.y}) <= menu.music.length / 2) {
				musicShape.hover = true;
			} else {
				musicShape.hover = false;
			}
		}
		for (i = 0; i < menu.icons.index.length; i++) {
			iconsShape = menu.icons[menu.icons.index[i]]
			if (getLength({x: mouseX, y: mouseY}, {x: menu.center.x + iconsShape.x, y: menu.center.y + iconsShape.y}) <= menu.icons.length / 2) {
				iconsShape.hover = true;
			} else {
				iconsShape.hover = false;
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
	if (menu.state == "pregame") {
		for (i = 0; i < menu.music.index.length; i++) {
			musicShape = menu.music[menu.music.index[i]]
			if (musicShape.hover) {
				menu.music.selected = menu.music.index[i]
			}
		}
		if (menu.playButton.hover) {
			menu.playButton.press = true;
		}
	}
	if (menu.state == "pregame") {
		for (i = 0; i < menu.icons.index.length; i++) {
			iconsShape = menu.icons[menu.icons.index[i]]
			if (iconsShape.hover) {
				iconsShape.press = true;
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
			menu.playButton.press = false;
		}
		for (i = 0; i < menu.icons.index.length; i++) {
			iconsShape = menu.icons[menu.icons.index[i]]
			if (iconsShape.press) {
				iconsShape.press = false;
				// if (menu.icons.index[i] == "glow") {

				// } else if (menu.icons.index[i] == "mute") {

				// } else if (menu.icons.index[i] == "github") {

				// }
			}
		}
	}
}

function keyPressed() {
	if (menu.state == "ingame" || menu.tutorial) {
		if (keyCode == 80) {
			// quick console.log
			print(player)
		}
		if (keyCode == 82) {
			// restart game
			reset();
		}
		if (keyCode == 90 || keyCode == 76) {
			// ultimate attack
			player.shoot("ultimate");
			if (menu.tutorial) {
				tutorial.lastKey = "u";
				tutorial.timer = 30;
			}
		}
		if (keyCode == 88 || keyCode == 75) {
			// power attack
			player.shoot("power");
			if (menu.tutorial) {
				tutorial.lastKey = "p";
				tutorial.timer = 30;
			}
		}
		if (keyCode == 32 || keyCode == 74) {
			// normal attack
			player.shoot("normal");
			if (menu.tutorial) {
				tutorial.lastKey = "s";
				tutorial.timer = 30;
			}
		}
	}
	if (keyCode == 67 && menu.state == "pregame") {
		// switch weapons
    	player.gun = guns[guns.index[(guns.index.indexOf(player.gun.name)+1)%guns.index.length]];
	}
	if (keyCode >= 48 && keyCode <= 57 && menu.state == "pregame") {
		// switch weapons
    	player.gun = guns[guns.index[keyCode - 48]];
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
	tutorial.keys = [];
	if (menu.state == "ingame" || menu.tutorial) {
		if (keyIsDown(65) || keyIsDown(40)) {
			// lunge to the left
			player.velX -= player.speed;
			if (menu.tutorial) {
				tutorial.keys.push("b");
			}
		}
		if (keyIsDown(68) || keyIsDown(38)) {
			// lunge to the right
			player.velX += player.speed;
			if (menu.tutorial) {
				tutorial.keys.push("f");
			}
		}
		if (keyIsDown(81) || keyIsDown(37)) {
			// spin clockwise
			player.velA -= player.turn;
			if (menu.tutorial) {
				tutorial.keys.push("q");
			}
		}
		if (keyIsDown(69) || keyIsDown(39)) {
			// spin counter-clockwise
			player.velA += player.turn;
			if (menu.tutorial) {
				tutorial.keys.push("e");
			}
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