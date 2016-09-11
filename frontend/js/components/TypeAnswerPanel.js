import React from "react";
import TypeLabel from "./TypeLabel.js";

export default class TypeAnswerPanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		return (
			<div className="typeanswerpanel-wrapper">
				<h3>Type #{this.props.typeorder + (this.props.typeorder == 2 ? " (optional)" : "")}</h3>
				<TypeLabel 	typeid={this.props.chosentype} 
							large={true}/>
			</div>
		);
	}
}