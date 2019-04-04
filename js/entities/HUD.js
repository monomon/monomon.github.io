game.HUD = game.HUD || {};
var whiteColor = new me.Color(255, 255, 255, 1);

game.HUD.Container = me.Container.extend({
	init: function() {
		this._super(me.Container, 'init');
		// this.isPersistent = true;
		this.floating = true;
		this.name = "HUD";
		this.addChild(new game.HUD.RestartButton(-10, -50), 100);
		this.addChild(new game.HUD.ScoreItem(-10, -20), 100);
		this.z = 300;
	}
});

game.HUD.RestartButton = me.GUI_Object.extend({
	init: function(x, y) {
		this.relative = new me.Vector2d(x, y);
		this._super(me.GUI_Object, "init", [0, 0, {
			image: "oscar",
			isVisible: true,
			framewidth: 75,
			frameheight: 20,
			anchorPoint: new me.Vector2d(1, 1)
		}]);

		this.textOffset = new me.Vector2d(15, 5);
		this.font = new me.BitmapText(this.textOffset.x, this.textOffset.y, {
			font: "xolo",
			textAlign: "left",
			textBaseline: "middle",
			text: "restart"
		});
	},
	onClick: function(event) {
		// me.state.stop();
		stage = me.state.current();
		stage.destroy();
		stage.reset();
		// me.state.change(me.state.PLAY);
		return true;
	},
	draw: function(renderer) {
		this._super(me.GUI_Object, "draw", [renderer]);
		this.font.draw(renderer, "restart", this.pos.x + this.textOffset.x, this.pos.y + this.textOffset.y);
	},
	update: function(dt) {
		this.pos.x = me.game.viewport.width + this.relative.x;
		this.pos.y = me.game.viewport.height + this.relative.y;
		return this._super(me.GUI_Object, "update", [dt]);
	}
});

game.HUD.ScoreItem = me.Renderable.extend({
	init: function(x, y) {
		this.relative = new me.Vector2d(x, y);

		this._super(me.Renderable, 'init', [x, y, 80, 50]);

		this.score = -1;
		this.font = new me.BitmapText(0, 0, {
			font: "xolo",
			textAlign: "right",
			textBaseline: "bottom",
			lineHeight: 1.2
		});
		this.fuelIndicator = new me.Rect(x, y, 100, 10);
	},

	update: function() {
		this.pos.x = me.game.viewport.width + this.relative.x;
		this.pos.y = me.game.viewport.height + this.relative.y;

		this.fuelIndicator.pos.x = this.pos.x - 60;
		this.fuelIndicator.pos.y = this.pos.y + 15;
		this.fuelIndicator.width = (game.data.player.fuel/maxFuel)*100;
		if (this.score != game.data.score) {
			this.score = game.data.score;
			return true;
		}
		return false;
	},
	draw: function(renderer) {
		this._super(me.Renderable, 'draw', [renderer]);
		// multiline text doesn't seem to be working, so make multiple boxes
		this.font.draw(renderer, "cargo: " + game.data.player.cargo + "/3", this.pos.x, this.pos.y);
		this.font.draw(renderer, "score: " + game.data.score, this.pos.x, this.pos.y + 12);
		// this.font.draw(renderer, "fuel: " + game.data.player.fuel, this.pos.x - 80, this.pos.y + 24);
		this.font.draw(renderer, "fuel: ", this.pos.x - 80, this.pos.y + 24);
		renderer.setColor(whiteColor);
		renderer.fill(this.fuelIndicator);
	}
});
