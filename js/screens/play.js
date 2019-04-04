function addOscar() {
	return me.game.world.addChild(me.pool.pull("oscar", me.Math.random(10, me.game.viewport.width - 60), -20, {}), 200);
}

game.PlayScreen = me.Stage.extend({
	// action to perfrom on state change
	onResetEvent: function() {
		game.data.score = 0;
		this.HUD = new game.HUD.Container();

		var height = 200;
		var groundOffset = 151;
		
		me.game.world.addChild(new me.ColorLayer("background", "#111111"), 0);
		me.game.world.addChild(new game.StarBackground(0, 0, 50, 50), 1);
		me.game.world.addChild(new game.PlanetBackground(0, me.game.viewport.height-height, {
			width: 640,
			height: height
		}), 2);
		me.game.world.addChild(new game.LandingPad(
			me.Math.randomFloat(0, (me.game.viewport.width - 60)),
			me.game.viewport.height - groundOffset,
			{width: 61, height: groundOffset}
		), 5);
		me.game.world.addChild(this.HUD);
		game.data.player = me.game.world.addChild(me.pool.pull("player", 50, 50, {}), 200);
		this.fallingObjectInterval = me.timer.setInterval(addOscar, 3000);

		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
	},
	onDestroyEvent: function() {
		me.game.world.removeChild(this.HUD);
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
		me.timer.clearInterval(this.fallingObjectInterval);
	}
});
