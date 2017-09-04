import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GAME_STATE } from './constants';

class TicTacToeHeader extends Component {
	render() {
		return (
			<div className="tic-tac-toe__header">
				{this._getTitle()}
			</div>
		);
	}

	_getTitle() {
		let title;
		switch (this.props.gameState) {
			case GAME_STATE.WIN:
				title = `Player ${this.props.currentPlayer} Won!!!`;
				break;
			case GAME_STATE.DRAW:
				title = 'It\'s a draw... Too bad...';
				break;
			default:
				title = `Player ${this.props.currentPlayer}, it's your turn`;

		}

		return title;
	}
}

TicTacToeHeader.propTypes = {
	currentPlayer: PropTypes.string,
	gameState: PropTypes.number
};

export default TicTacToeHeader;