import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.cellId
		};

		this._onCellClick = this.props.onCellClick.bind(this, this.state.id);
	}

	render() {
		return (
			<div className={`tic-tac-toe__cell ${this.props.winner ? 'tic-tac-toe__cell--winner' : ''}`} onClick={this._onCellClick}>
				{this.props.content}
			</div>
		);
	}
}

Cell.propTypes = {
	cellId: PropTypes.number,
	content: PropTypes.string,
	onCellClick: PropTypes.func,
	currentPlayer: PropTypes.string
};

export default Cell;