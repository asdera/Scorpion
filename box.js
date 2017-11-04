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

function Bullet(body, colour) {
  this.type = "bullet";
  this.body = body;
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
    if (this.add) {
      this.add(pos);
    }
  }

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }
}

function Enemy(body, colour, hp) {
  this.type = "enemy";
  this.hp = hp;
  this.body = body;
  this.colour = (colour === undefined) ? "black" : colour;
  this.destroy = false;
  this.hp = 4;
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

    this.collision();

    if (this.hp <= 0) {
      this.rip();
    }

    pop();
    if (!Matter.Bounds.contains(bounds, pos)) {
      this.rip();
    }
    if (this.add) {
      this.add(pos);
    }
  }

  this.collision = function() {
    for (var i = bullets.length - 1; i >= 0; i--) {
      boxi = bullets[i];
      if ((this.body.position.x - boxi.body.position.x)**2 + (this.body.position.y - boxi.body.position.y)**2 <= (this.body.circleRadius + boxi.body.circleRadius)**2) {
        this.hp--;
      }
    }
  }

  this.rip = function() {
    World.remove(world, this.body);
    this.destroy = true;
  }
}