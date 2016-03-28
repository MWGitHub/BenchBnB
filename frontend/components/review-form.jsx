var React = require('react');
var ApiUtil = require('../util/api-util');

var ReviewForm = React.createClass({
	contextTypes: {
		router: function() {
			return React.PropTypes.func.isRequired;
		}
	},

	getInitialState: function () {
		return {
			body: '',
			score: ''
		};
	},

	_handleTextChange: function (e) {
		this.setState({
			body: e.target.value
		});
	},

	_handleScoreChange: function (e) {
		this.setState({
			score: e.target.value
		});
	},

	_handleSubmit: function (e) {
		e.preventDefault();

		var benchId = this.props.params.id;
		var that = this;
		ApiUtil.createReview(benchId, {
			body: this.state.body,
			score: this.state.score
		}, function (data) {
			that.context.router.push({
				pathname: '/benches/' + benchId + '/reviews'
			});
		});

		e.target.reset();

		this.setState(this.getInitialState());

	},

	render: function () {
		return (
			<div>
				<form onSubmit={this._handleSubmit}>
					<div>
						<label>Review
							<textarea
								value={this.state.body}
								onChange={this._handleTextChange}>
							</textarea>
						</label>
					</div>
					<div>
						<label>Score
							<select
								value={this.state.score}
								onChange={this._handleScoreChange}>
								<option value=""></option>
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
