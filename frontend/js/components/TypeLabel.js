import React from "react";

export default class TypeLabel extends React.Component {

	constructor(){
		super();
	}

	sayhi(){
		console.log("hi");
	}

	render(){
		var style = {backgroundColor: this.context.hexcodearray[this.props.typeid]};

		return (
			<div	className="typelabel-wrapper" style={style}
					onClick={this.props.registerTypeClicked}
					data-large={this.props.large}>
				<span>{this.context.typearray[this.props.typeid]}</span>
			</div>
		);
	}
}

TypeLabel.contextTypes = {
	typearray: React.PropTypes.array,
	hexcodearray: React.PropTypes.array
};