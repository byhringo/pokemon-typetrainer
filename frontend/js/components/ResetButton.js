import React from "react";

export default class ResetButton extends React.Component {

	constructor(){
		super();
	}

	render(){
		var deactivatedStyle = {backgroundColor: "#bbaaaa", color: "#888888"};
		var blankStyle = {};

		return (
			<div 	className="resetbutton-wrapper"
					onClick={this.props.resetTypes}
					style={this.props.canResetTypes ? blankStyle : deactivatedStyle}>
				<span>Reset</span>
			</div>
		);
	}
}