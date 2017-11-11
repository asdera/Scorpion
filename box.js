function Ground(body, colour) {
  this.type = "ground";
  this.body = body;
  this.destroy = false;
  World.add(world, this.body);

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }
}

function Bullet(body, colour, damage=1, special={}) {
  this.type = "bullet";
  this.body = body;
  this.damage = damage;
  this.colour = (colour === undefined) ? "black" : colour;
  this.destroy = false;
  World.add(world, this.body);

  this.show = function() {
    pos = this.body.position;
    push();
    stroke("white")
    fill(this.colour);
    strokeWeight(4);
    if (pos.y < 0) {
      triangle(pos.x, 0, pos.x - 20, 20, pos.x + 20, 20);
    } else {
      beginShape();
      for (var i in this.body.vertices) {
        vertexi = this.body.vertices[i];
        vertex(vertexi.x, vertexi.y);
      }
      endShape(CLOSE);
    }
    pop();
    if (!Matter.Bounds.contains(bounds, pos)) {
      this.rip();
    }
    if (special.update) {
      special.update(this);
    }
  }

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }
}

function Enemy(body, colour, hp, speed) {
  this.type = "enemy";
  this.hp = hp;
  this.speed = speed;
  this.body = body;
  this.colour = (colour === undefined) ? "black" : colour;
  this.destroy = false;
  this.nextHit = 0,
  this.hitRate = 10,
  this.effects = [],
  World.add(world, this.body);

  this.show = function() {
    pos = this.body.position;
    push();
    stroke("white")
    fill(this.colour);
    strokeWeight(4);

    if (pos.y < 0) {
      triangle(pos.x, 0, pos.x - 20, 20, pos.x + 20, 20);
    } else {
      beginShape();
      for (var i in this.body.vertices) {
        vertexi = this.body.vertices[i];
        vertex(vertexi.x, vertexi.y);
      }
      endShape(CLOSE);
    }
    pop();

    // effects
    eff = this.effects.length
    while (eff--) {
      effect = this.effects[eff];
      me = effect.me
      effect.time--;
      if (effect.time <= 0) {
        effect.effect();
        this.effects.splice(eff, 1);
      }
    }

    textSize(this.body.circleRadius);
    stroke("white")
    fill("white");
    textAlign(CENTER, CENTER);
    text(String(this.hp), pos.x, pos.y);

    if (this.nextHit > 0) {
      this.nextHit--;
    } else {
      this.nextHit = 0;
    }

    this.collision();

    if (this.hp <= 0) {
      this.action(function() {me.rip()}, 1);
      this.hp = 0;
    }

    Body.translate(this.body, {x: 0, y: -this.speed});

    if (!Matter.Bounds.contains(bounds, pos) || this.body.position.y <= boxy.height) {
      player.hp--;
      this.rip();
    }
  }

  this.collide = function(pos, r=0) {
    if ((this.body.position.x - pos.x)**2 + (this.body.position.y - pos.y)**2 <= (this.body.circleRadius + r)**2) {
      return true;
    }
  }

  this.collision = function() {
    for (var i = bullets.length - 1; i >= 0; i--) {
      boxi = bullets[i];
      if (this.collide(boxi.body.position, boxi.body.circleRadius)) {
        if (this.nextHit <= 0) {
          this.hp -= boxi.damage;
          this.nextHit = this.hitRate;
        }
      }
    }
  }

  this.action = function(effect, time) {
    this.effects.push({effect: effect, time: time, me: this})
  }

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }
}