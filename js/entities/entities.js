var thrustersStrength = 0.5;
var zeroVector = new me.Vector2d(0, 0);
var cargoSize = 3;
var maxFuel = 400;

game.ShipRenderable = me.Container.extend({
	init: function(x, y, w, h) {
		this._super(me.Container, 'init', [x, y, w, h]);

		this.thrusters = this.addChild(new me.ParticleEmitter(0, 8, {
			angle: 1.5*Math.PI,
			angleVariation: 0.05*Math.PI,
			totalParticles: 100,
			speed: 3,
			frequency: 50,
			minLife: 500,
			maxLife: 3000,
		}), 10);
		this.addChild(this.thrusters.container, 10);
		this.sprite = this.addChild(new me.Sprite(0, 0, {
			image: "ship",
			framewidth: w,
			frameheight: h
		}), 13);

		this.thrusters.streamParticles();
	}
});
	

game.Ship = me.Entity.extend({
	init: function(x, y, settings) {
		// TODO here keep also particle generators, probably
		this._super(me.Entity, 'init', [x, y, {
			width: 48,
			height: 26
		}]);

		this.alwaysUpdate = true;
		this.body.gravity.set(0, 0.1);
		this.body.setMaxVelocity(5, 5);
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.body.bounce = 0;
		this.body.shapes = [(new me.Rect(0, 0, this.width, this.height)).toPolygon()];
		this.body.name = "Ship";
		this.body.updateBounds();
		this.renderable = new game.ShipRenderable(this.width/2, this.height/2, this.width, this.height);
		this.cargo = 0;
		this.fuel = maxFuel;

		this.spriteBounds = new me.Rect(
			0,
			0,
			me.game.viewport.width-this.width,
			me.game.viewport.height-this.height
		);

		this.body.respondToCollision = function (response) {
			this.vel.set(0, 0);
			this.force.set(0, 0);
		};
	},
	update: function(dt) {
		this._super(me.Entity, "update", [dt]);
		this.body.force.set(0, 0);
		
		if (this.fuel > 0 && this.alive) {
			if (me.input.isKeyPressed("left")) {
				this.body.force.x -= thrustersStrength;
			}

			if (me.input.isKeyPressed("right")) {
				this.body.force.x += thrustersStrength;
			}

			if (me.input.isKeyPressed("up")) {
				this.body.force.y -= thrustersStrength;
			}

			if (me.input.isKeyPressed("down")) {
				this.body.force.y += thrustersStrength;
			}
			// expend fuel
			this.fuel -= this.body.force.distance(zeroVector);
		}

		this.body.update(dt);
		me.collision.check(this);
		if (this.renderable.thrusters) {
			this.renderable.thrusters.angle = Math.atan2(this.body.force.y, -this.body.force.x);
			this.renderable.thrusters.totalParticles = this.body.force.distance(zeroVector)*1000;
		}
		this.pos.x = me.Math.clamp(this.pos.x, this.spriteBounds.left, this.spriteBounds.right);
		this.pos.y = me.Math.clamp(this.pos.y, this.spriteBounds.top, this.spriteBounds.bottom);
		if (this.pos.x == this.spriteBounds.left) {
			this.body.force.x = 0;
		}
		if (this.pos.y == this.spriteBounds.bottom) {
			this.body.force.set(0, 0);
			this.body.vel.set(0, 0);
		}

		return true;
	},
	onCollision: function(response, other) {
		switch (other.body.collisionType) {
			case me.collision.types.WORLD_SHAPE:
				if (other.body.name == "LandingPad") {
					if (this.body.vel.distance(zeroVector) > 3) {
						this.alive = false;
						this.renderable = createExplosionEmitter();
						this.renderable.pos.z = 10;
						this.renderable._emitter.burstParticles();
					} else {
						game.data.score += this.cargo;
					}
					this.cargo = 0;
					this.body.force.set(0, 0);
					this.body.vel.set(0, 0);
					return true;
				} else if (other.body.name == "PlanetSurface") {
					if (this.alive) {
						console.log("boom");
						this.alive = false;
						this.cargo = 0;
						this.renderable = createExplosionEmitter();
						this.renderable.pos.z = 10;
						this.renderable._emitter.burstParticles();

					}
					this.body.force.set(0, 0);
					this.body.vel.set(0, 0);

					return true;
				}

				break;

			case me.collision.types.COLLECTABLE_OBJECT:
				if (other.body.name == "Oscar" && this.cargo < cargoSize && this.alive) {
					// collect, update gui
					this.cargo += 1;
					me.game.world.removeChild(other);
				}
				break;
		}

		return false;
	}
});

game.Oscar = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			width: 15,
			height: 40,
			image: 'oscar'
		}]);

		this.body.name = "Oscar";
		this.body.gravity.set(0, 0.05);
		this.body.setMaxVelocity(5, 5);
		this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
	},
	update: function(dt) {
		this.body.update(dt);
		return true;
	}
});

function createExplosionEmitter() {
	return new me.ParticleEmitter(0, 8, {
		angle: 0.5*Math.PI,
		angleVariation: 0.5*Math.PI,
		totalParticles: 200,
		speed: 3.5,
		minLife: 300,
		maxLife: 3000,
		gravity: 0.05,
		image: me.loader.getImage("explosion"),
	}).container;
}
