import React from "react";

var nextVariations = [
						"Another Pokémon!",
						"Continue",
						"Next!",
						"More Pokémon!",
]

export default class NextButton extends React.Component {

	constructor(){
		super();
		this.var = ["", ""];
		this.state = {prop1: "val1", prop2: "val2"};
	}

	render(){
		return (
			<div 	className="nextbutton-wrapper"
					data-visible={this.props.visible}
					onClick={this.props.nextTask}
			>
				{nextVariations[Math.floor(nextVariations.length * Math.random())]}
			</div>
		);
	}
}