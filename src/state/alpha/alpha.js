
import {extendObservable} from "mobservable"
import state from '../state'

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function random(limit) {
	return Math.floor(Math.random() * limit);
}

function randomLetter() {
	return letters.charAt(random(letters.length));
}

function randomColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}


extendObservable(state, {
	alpha: {
		width: 10,
		height: 10,
		size: 100,
		updatesPerFrame: 1,
		layout: [],
		run: false,
		visible: false
	}
});


export default {

	newLayout: function(w, h) {
		state.alpha.width = w;
		state.alpha.height = h;
		state.alpha.layout = this.blankTable(w, h);
	},

	blankTable: function(w, h) {
		var layout = [];

		// gen our table of random letters
		for (var y = 0; y < h; y++) {
			layout[y] = [];
			for (var x = 0; x < w; x++) {
				layout[y][x] = {
					letter: '', //randomLetter(),
					color: 	randomColor(),
					active: false
				};
			}
		}

		return layout;
	},

	fullTable: function(w, h) {
		var layout = [];

		// gen our table of random letters
		for (var y = 0; y < h; y++) {
			layout[y] = [];
			for (var x = 0; x < w; x++) {
				layout[y][x] = {
					letter: '',//randomLetter(),
					color: 	randomColor(),
					active: true
				};
			}
		}

		return layout;
	},

	clearTheTable: function(w, h) {
		console.time("update and render new data");
		state.alpha.layout = this.blankTable(w, h);
		console.timeEnd("update and render new data");
	},

	fillTheTable: function(w, h) {
		console.time("update and render new data");
		state.alpha.layout = this.fullTable(w, h);
		console.timeEnd("update and render new data");

	},

	toggleRun: function() {
		state.alpha.run = !state.alpha.run;
	},

	toggleVisible: function() {
		console.log("toggle visibility");
		state.alpha.visible = !(state.alpha.visible);
	},

	toggleRandomCell: function(w, h) {
		var cell = state.alpha.layout[random(h)][random(w)];
		cell.active = !(cell.active);
	},

	toggleNextCell: function(w, h) {

		if (xi >= w) {
			xi = 0;
			if (yi >= h) {
				yi = 0;
			} else {
				yi++;
			}
		} else {
			xi++
		}

		var cell = state.alpha.layout[yi][xi];
		cell.active = !cell.active;
	}
};