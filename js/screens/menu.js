game.StartButton = me.GUI_Object.extend({
	init: function(x, y) {
		this.relative = new me.Vector2d(x, y);
		this._super(me.GUI_Object, "init", [0, 0, {
			image: "oscar",
			framewidth: 100,
			frameheight: 20
		}]);

		this.textOffset = new me.Vector2d(15, 5);
		this.font = new me.BitmapText(this.textOffset.x, this.textOffset.y, {
			font: "xolo",
			textAlign: "left",
			textBaseline: "middle",
			text: "start"
		});
	},
	onClick: function(event) {
		me.state.change(me.state.PLAY);
	},
	draw: function(renderer) {
		this._super(me.GUI_Object, "draw", [renderer]);
		this.font.draw(renderer, "start", this.pos.x + this.textOffset.x, this.pos.y + this.textOffset.y);
	},
	update: function(dt) {
		this.pos.x = me.game.viewport.width + this.relative.x;
		this.pos.y = me.game.viewport.height + this.relative.y;
		// return this._super(me.GUI_Object, "update", [dt]);
		return true;
	}
});


game.MainMenu = me.Stage.extend({
	onResetEvent: function() {
		me.game.world.addChild(new me.ColorLayer("background", "#111111"), 0);
		me.game.world.addChild(new game.StartButton(-20, -50), 1);
	},

	onDestroyEvent: function() {
	
	}
});
