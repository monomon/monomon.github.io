var game = {
	data: {
		score: 0
	},
	assets: [
		{ name: "ship", type: "image", src: "assets/ship.png" },
		{ name: "planet", type: "image", src: "assets/planet.png" },
	],
	onLoad: function () {
		if (!me.video.init(640, 480, {wrapper: "screen", scale: 1})) {
			alert("Your browser does not support html5 canvas");
			return;
		}

		me.loader.preload(game.assets, this.loaded.bind(this));
	},
	loaded: function () {
		me.pool.register("player", game.Ship);
		this.playScreen = new game.PlayScreen();
		me.state.set(me.state.PLAY, this.playScreen);
		me.state.change(me.state.PLAY);
	}
};
