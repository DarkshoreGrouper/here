import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell.jsx';

class TicTacToeGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gridState: new Map(),
			matchingTriplet: []
		};

		this._onCellClick = this.onCellClick.bind(this);
	}

	render() {
		return (
			<div className="tic-tac-toe__grid">
				{this._getCells()}
			</div>
		);
	}

	onCellClick(clickedCellId) {
		if (this.state.matchingTriplet.length) {
			this._reset();
			return;
		}
		this.state.gridState.set(clickedCellId, this.props.currentPlayer);
		const matchingTriplet = this._checkWin(clickedCellId);
		if (matchingTriplet.length) {
			this.setState({
				matchingTriplet
			}, this.props.onGameEnd);
			return;
		} else if (this.state.gridState.size === 9) {
			this.props.onGameEnd(false);
			return;
		}
		this.props.changePlayer();
	}

	_reset() {
		this.setState({
			gridState: new Map(),
			matchingTriplet: []
		}, this.props.reset);
	}

	_getCells() {
		let cellArray = [];
		for (let i = 0; i < 9; i++) {
			cellArray.push(
				<Cell
					key={`cell${i}`}
					cellId={i}
					content={this.state.gridState.get(i)}
					onCellClick={this._onCellClick}
					currentPlayer={this.props.currentPlayer}
					winner={this.state.matchingTriplet.indexOf(i) !== -1}
				/>
			);
		}
		return cellArray;
	}

	_checkWin(clickedCellId) {
		let tripletsToCheck;
		switch (clickedCellId) {
			case 0:
				tripletsToCheck = [[0, 1, 2], [0, 3, 6], [0, 4, 8]];
				break;
			case 1:
				tripletsToCheck = [[1, 0, 2], [1, 4, 7]];
				break;
			case 2:
				tripletsToCheck = [[2, 0, 1], [2, 5, 8], [2, 4, 6]];
				break;
			case 3:
				tripletsToCheck = [[3, 0, 6], [3, 4, 5]];
				break;
			case 4:
				tripletsToCheck = [[4, 0, 8], [4, 2, 6], [4, 3, 5], [4, 1, 7]];
				break;
			case 5:
				tripletsToCheck = [[5, 2, 8], [5, 3, 4]];
				break;
			case 6:
				tripletsToCheck = [[6, 0, 3], [6, 4, 2], [6, 7, 8]];
				break;
			case 7:
				tripletsToCheck = [[7, 6, 8], [7, 1, 4]];
				break;
			case 8:
				tripletsToCheck = [[8, 2, 5], [8, 0, 4], [8, 6, 7]];
				break;
			default:
		}

		return this._testTriplets(tripletsToCheck);
	}

	_testTriplets(cellTriplets) {
		let gridState = this.state.gridState;
		let matchingTriplet = [];
		cellTriplets.forEach((triplet) => {
			if (gridState.get(triplet[0]) === gridState.get(triplet[1]) && gridState.get(triplet[0]) === gridState.get(triplet[2])) {
				matchingTriplet = triplet;
			}
		});

		return matchingTriplet;
	}

}

TicTacToeGrid.propTypes = {
	currentPlayer: PropTypes.string,
	changePlayer: PropTypes.func,
	onGameEnd: PropTypes.func,
	reset: PropTypes.func
};

export default TicTacToeGrid;