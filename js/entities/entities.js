var thrustersStrength = 0.5;
var zeroVector = new me.Vector2d(0, 0);

game.ShipRenderable = me.Container.extend({
	init: function(x, y, w, h) {
		this._super(me.Container, 'init', [x, y, w, h]);

		var emitter = new me.ParticleEmitter(0, 8, {
			angle: 1.5*Math.PI,
			angleVariation: 0.05*Math.PI,
			totalParticles: 100,
			speed: 3,
			frequency: 50,
			minLife: 500,
			maxLife: 3000,
			width: w,
			height: 0
		});
		this.thrusters = this.addChild(emitter, 10);
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
		this.body.updateBounds();
		this.renderable = new game.ShipRenderable(this.width/2, this.height/2, this.width, this.height);

		this.spriteBounds = new me.Rect(
			0,
			0,
			me.game.viewport.width-this.width,
			me.game.viewport.height-this.height
		);
	},
	update: function(dt) {
		this._super(me.Entity, "update", [dt]);
		this.body.force.set(0, 0);
		
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

		me.collision.check(this);
		this.body.update(dt);
		this.renderable.thrusters.angle = Math.atan2(this.body.force.y, -this.body.force.x);
		this.renderable.thrusters.totalParticles = this.body.force.distance(zeroVector)*1000;
		this.pos.x = me.Math.clamp(this.pos.x, this.spriteBounds.left, this.spriteBounds.right);
		this.pos.y = me.Math.clamp(this.pos.y, this.spriteBounds.top, this.spriteBounds.bottom);

		// if (this.pos.x == this.spriteBounds.left) {
		// 	this.body.force.x = 0;
		// }
		// if (this.pos.y == this.spriteBounds.bottom) {
		// 	this.body.force.set(0, 0);
		// 	this.body.vel.set(0, 0);
		// }
		return true;
	},
	onCollision: function(response, other) {
		console.log(other.body.name);
		return true;
	}
});
