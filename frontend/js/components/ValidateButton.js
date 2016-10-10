import React from "react";

var bgcolDeactivated	= "#aaaabb";
var bgcolCheck 			= "#7777ff";
var bgcolCorrect 		= "#22ff22";
var bgcolWrong 			= "#ff2222";

export default class ValidateButton extends React.Component {

	constructor(){
		super();
	}

	render(){
		var bgcol = "#000000";

		/*
			0 - deactivated (no types selected)
			1 - active (1 or 2 types selected)
			2 - correct answer
			3 - wrong answer
		*/

		switch(this.props.buttonState){
			case 0: bgcol = bgcolDeactivated; break;
			case 1: bgcol = bgcolCheck; break;
			case 2: bgcol = bgcolCorrect; break;
			case 3: bgcol = bgcolWrong; break;
			default: break;
		}

		var style = {backgroundColor: bgcol, color: (this.props.buttonState == 0 ? "#888888" : "#000000")};

		return (
			<div 	className="validatebutton-wrapper"
					style={style}
					onClick={this.props.buttonState == 1 ? this.props.validateAnswer : null}
			>
				<span>{this.props.validated ? this.props.valuationText : "Check answer!"}</span>
			</div>
		);
	}
}