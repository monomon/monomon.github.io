game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
	init: function() {
		this._super(me.Container, 'init');
		this.isPersistent = true;
		this.floating = true;
		this.name = "HUD";
		this.addChild(new game.HUD.ScoreItem(5, 5));
	}
});

game.HUD.ScoreItem = me.Renderable.extend({
	init: function(x, y) {
		this._super(me.Renderable, 'init', [x, y, 10, 10]);
		this.score = -1;
	},

	update: function() {

	},
	draw: function() {

	}
});
