var numStars = 100;
var positions = [];
var starColors = [];
var starColor = new me.Color(200, 200, 200, 1);
var landingPadColor = new me.Color(255, 50, 50, 1);

// pre-generate random positions
for (i = 0; i < numStars; i++) {
	randXPos = me.Math.randomFloat(0, 1);
	randYPos = me.Math.randomFloat(0, 1);
	positions.push(new me.Vector2d(randXPos, randYPos));
}

game.StarBackground = me.Renderable.extend({
	draw: function(renderer, region) {
		this._super(me.Renderable, 'draw', [renderer, region]);
		var currentColor = renderer.getColor();
		renderer.setColor(starColor);
		positions.forEach((p) => {
			renderer.fillEllipse(p.x*region.width, p.y*region.height, 1, 1);
		});
		renderer.setColor(currentColor);
	}
});

game.PlanetBackground = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, settings]);
		this.renderable = new me.Sprite(0, 0, {image: "planet"});
		this.body.shapes = [(new me.Rect(0, 140, this.width, this.height)).toPolygon()];
		this.body.gravity.set(0, 0);
		this.body.collisionType = me.collision.types.WORLD_SHAPE;
		this.body.name = "PlanetSurface";
	}
});

game.LandingPad = me.Entity.extend({
	init: function(x, y, settings) {
		settings.image = "pad";
		this._super(me.Entity, "init", [x, y, settings]);
		this.body.shapes = [(new me.Rect(0, 51, this.width, this.height)).toPolygon()];
		this.body.gravity.set(0, 0);
		this.body.collisionType = me.collision.types.WORLD_SHAPE;
		this.body.name = "LandingPad";
	}
});
