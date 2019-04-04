var game = {
	data: {
		score: 0,
		player: undefined
	},
	assets: [
		{ name: "ship", type: "image", src: "assets/ship.png" },
		{ name: "planet", type: "image", src: "assets/planet.png" },
		{ name: "pad", type: "image", src: "assets/landing_pad.png" },
		{ name: "explosion", type: "image", src: "assets/explosion.png" },
		{ name: "oscar", type: "image", src: "assets/oscar.png" },
		{ name: "xolo", type: "image", src: "assets/xolo12.png" },
		{ name: "xolo", type: "binary", src: "assets/xolo12.fnt" },
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
		me.pool.register("oscar", game.Oscar);
		this.playScreen = new game.PlayScreen();
		this.mainMenu = new game.MainMenu();
		me.state.set(me.state.PLAY, this.playScreen);
		me.state.set(me.state.MENU, this.mainMenu);
		me.state.change(me.state.MENU);
	}
};
