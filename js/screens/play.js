game.PlayScreen = me.Stage.extend({
	// action to perfrom on state change
	onResetEvent: function() {
		game.data.score = 0;
		// this.HUD = new game.HUD.Container();
		
		me.game.world.addChild(new me.ColorLayer("background", "#111111"), 0);
		me.game.world.addChild(new game.StarBackground(0, 0, 50, 50), 1);
		me.game.world.addChild(new game.PlanetBackground(0, me.game.viewport.height-200, {
			width: 640,
			height: 200
		}), 2);
		me.game.world.addChild(new game.LandingPad(
			me.Math.randomFloat(0, (me.game.viewport.width - 60)),
			me.game.viewport.height - 151,
			{width: 61, height: 151}
		), 5);
		// me.game.world.addChild(this.HUD);
		me.game.world.addChild(me.pool.pull("player", 50, 50, {}), 200);

		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
	},
	onDestroyEvent: function() {
		// me.game.world.removeChild(this.HUD);
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
	}
});
