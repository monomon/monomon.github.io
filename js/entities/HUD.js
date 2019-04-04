game.HUD = game.HUD || {};

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
			framewidth: 80,
			frameheight: 20
		}]);

		this.textOffset = new me.Vector2d(0, 5);
		this.font = new me.BitmapText(this.textOffset.x, this.textOffset.y, {
			font: "xolo",
			textAlign: "right",
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

		this._super(me.Renderable, 'init', [x, y, 20, 20]);

		this.score = -1;
		this.font = new me.BitmapText(0, 0, {
			font: "xolo",
			textAlign: "right",
			textBaseline: "bottom"
		});
	},

	update: function() {
		this.pos.x = me.game.viewport.width + this.relative.x;
		this.pos.y = me.game.viewport.height + this.relative.y;
		if (this.score != game.data.score) {
			this.score = game.data.score;
			return true;
		}
		return false;
	},
	draw: function(renderer) {
		this._super(me.Renderable, 'draw', [renderer]);
		this.font.draw(renderer, "cargo: " + game.data.player.cargo + "/3", this.pos.x, this.pos.y);
		this.font.draw(renderer, "score: " + game.data.score, this.pos.x, this.pos.y + 10);
	}
});
