import React from "react";

export default class ResetButton extends React.Component {

	constructor(){
		super();
	}

	render(){
		return (
			<div 	className="resetbutton-wrapper"
					onClick={this.props.resetTypes}>
				<span>Reset</span>
			</div>
		);
	}
}