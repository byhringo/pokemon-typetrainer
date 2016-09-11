import React from "react";
import ValidateButton from "./ValidateButton.js";
import ResetButton from "./ResetButton.js";
import NextButton from "./NextButton.js";

export default class NavigationPanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		return (
			<div className="navigationpanel-wrapper">
				<ValidateButton />
				<NextButton />
			</div>
		);
	}
}