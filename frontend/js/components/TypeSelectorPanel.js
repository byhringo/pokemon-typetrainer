import React from "react";
import TypeLabel from "./TypeLabel.js";

export default class TypeSelectorPanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		var typeButtons = [];

		for(var i = 1; i <= 18; i++){
			typeButtons.push((
				<TypeLabel
					typeid={i}
					key={"typeButton" + i}
					registerTypeClicked={this.props.registerTypeClicked.bind(this.props.layoutobj, i)}
					large={false}
				/>));
		}

		return (
			<div className="typeselectorpanel-wrapper">
				{typeButtons}
			</div>
		);
	}
}