import React, { Component } from 'react';
import './App.css';
import TicTacToeHeader from './TicTacToeHeader.jsx';
import TicTacToeGrid from './TicTacToeGrid.jsx';
import { PLAYER_ONE_ICON, PLAYER_TWO_ICON, GAME_STATE} from './constants';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPlayer: PLAYER_ONE_ICON,
			gameState: GAME_STATE.ONGOING
		};

		this._changePlayer = this.changePlayer.bind(this);
		this._onGameEnd = this.onGameEnd.bind(this);
		this._reset = this.reset.bind(this);
	}

	render() {
		return (
			<div className="tic-tac-toe">
				<TicTacToeHeader
					currentPlayer={this.state.currentPlayer}
					gameState={this.state.gameState}
				/>
				<TicTacToeGrid
					currentPlayer={this.state.currentPlayer}
					changePlayer={this._changePlayer}
					onGameEnd={this._onGameEnd}
					reset={this._reset}
				/>
			</div>
		);
	}

	changePlayer() {
		let currentPlayer = this.state.currentPlayer === PLAYER_ONE_ICON ? PLAYER_TWO_ICON : PLAYER_ONE_ICON;
		this.setState({
			currentPlayer
		});
	}

	onGameEnd(win = true) {
		this.setState({
			gameState: win ? GAME_STATE.WIN : GAME_STATE.DRAW
		});
	}

	reset() {
		this.setState({
			currentPlayer: PLAYER_ONE_ICON,
			gameState: GAME_STATE.ONGOING
		});
	}
}

export default App;
