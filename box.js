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
  this.hits = 0;
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
    }
    beginShape();
    for (var i in this.body.vertices) {
      vertexi = this.body.vertices[i];
      vertex(vertexi.x, vertexi.y);
    }
    endShape(CLOSE);
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
  this.hitRate = 3,
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
    }
    beginShape();
    for (var i in this.body.vertices) {
      vertexi = this.body.vertices[i];
      vertex(vertexi.x, vertexi.y);
    }
    endShape(CLOSE);
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

  this.collide = function(boxbody) {
    if (boxbody.label == "Rectangle Body" || boxbody.label == "Polygon Body") {
      return collideCirclePoly(this.body.position.x, this.body.position.y, this.body.circleRadius*2, boxbody.vertices)
    }
    boxbody.circleRadius = (typeof boxbody.circleRadius === 'undefined') ? 0 : boxbody.circleRadius;
    if ((this.body.position.x - boxbody.position.x)**2 + (this.body.position.y - boxbody.position.y)**2 <= (this.body.circleRadius + boxbody.circleRadius)**2) {
      return true;
    }
    return false;
  }

  this.collision = function() {
    for (var i = bullets.length - 1; i >= 0; i--) {
      boxi = bullets[i];
      if (this.collide(boxi.body)) {
        if (this.nextHit <= 0) {
          boxi.hits++;
          this.hp -= boxi.damage;
          player.nextPower += boxi.damage;
          if (player.nextPower >= player.powerRate) {
            player.nextPower = player.powerRate;
          }
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