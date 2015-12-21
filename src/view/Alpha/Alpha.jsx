
import React, {Component} from 'react'
import {observer} from 'mobservable-react'
import If from '../../common/If/If.jsx'
import alphaState from '../../state/alpha/alpha'
import state from '../../state/state'


@observer
class AlphaCell extends Component {
	render() {
		var cell = this.props.cell;
		return (
			<li style={{backgroundColor: cell.active ? cell.color : "#444444"}}>{cell.letter}</li>
		);
	}
}


@observer
class AlphaRow extends Component {
	render() {
		var cells = this.props.row.map((cell, i) => {
			return <AlphaCell key={i} cell={cell} />
		});

		return <ul>{cells}</ul>;
	}
}


@observer
class AlphaTable extends Component {
	render() {
		return this.props.layout
			? <div id="alphaTable">{this.Rows(this.props.layout)}</div>
			: <ul><li>no data</li></ul>;
	}

	Rows = (rows) => {
		return rows.map((row, i) => (<AlphaRow key={i} row={row}/>));
	}
}


// todo support changing # of rows and # of cells per row
var cleared = true;

@observer
export default class Alpha extends Component {
	render() {
		var alpha = state.alpha;
		return (
			<div>
				<div>
					<button onClick={()=> alphaState.newLayout(5, 5)}>5x5</button>
					<button onClick={()=> alphaState.newLayout(10, 5)}>10x5</button>
					<button onClick={()=> alphaState.newLayout(5, 10)}>5x10</button>
					<button onClick={()=> alphaState.newLayout(10, 10)}>10x10</button>
					<button onClick={()=> alphaState.newLayout(100, 100)}>100x100</button>
					<input type="text" value={alpha.updatesPerFrame} onChange={(e)=>this.handleUpdatesChange(e)} />
				</div>
				<button onClick={this.start}>Start</button>
				<button onClick={this.stop}>Stop</button>
				<button onClick={this.fill}>Fill</button>
				<button onClick={this.clear}>Clear</button>
				<button onClick={alphaState.toggleVisible}>{alpha.visible ? "Hide" : "Show"}</button>
				<div className={alpha.visible ? "" : "hide"}>
					<AlphaTable id="alphaTable" layout={alpha.layout}/>
				</div>
			</div>
		);
	};

	running = false;

	updateTable = (ms)=> {
		var self = this,
			alpha = state.alpha;

		stats.setMode(0);

		function update(ms) {
			stats.end();
			stats.begin();

			for (var i=0; i<alpha.updatesPerFrame; i++) {
				alphaState.toggleRandomCell(alpha.width, alpha.height);
			}

			//cleared = !cleared;
			//cleared
			//	? alphaState.clearTheTable()
			//	: alphaState.fillTheTable();

			self.running && setTimeout(update, ms);
		}

		update(ms);
	};

	start = ()=> {
		this.running = true;
		this.updateTable(0);
	};

	stop = ()=> {
		this.running = false;
	};

	fill = ()=> {
		alphaState.fillTheTable(state.alpha.width, state.alpha.height);
	};

	clear = ()=> {
		alphaState.clearTheTable(state.alpha.width, state.alpha.height);
	};


	handleUpdatesChange = (e) => {
		state.alpha.updatesPerFrame = e.target.value
	};

	componentWillUnmount = ()=> {
		this.stop();
	};
}


// kinda messy but stays out of the react profiling
window.stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '50px';
document.body.appendChild( stats.domElement );

