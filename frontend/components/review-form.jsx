var React = require('react');

var ReviewForm = React.createClass({
	getInitialState: function () {
		return {
			text: '',
			score: ''
		};
	},

	_handleTextChange: function (e) {
		this.setState({
			text: e.target.value
		});
	},

	_handleScoreChange: function (e) {
		this.setState({
			score: e.target.value
		});
	},

	_handleSubmit: function (e) {
		e.preventDefault();
		
		e.target.reset();
	},

	render: function () {
		return (
			<div>
				<form onSubmit={this._handleSubmit}>
					<div>
						<label>Review
							<textarea
								value={this.state.text}
								onChange={this._handleTextChange}>
							</textarea>
						</label>
					</div>
					<div>
						<label>Score
							<select
								value={this.state.score}
								onChange={this._handleScoreChange}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</label>
					</div>
					<input type="submit" value="Save Review" />
				</form>
			</div>
		);
	}
});

module.exports = ReviewForm;
