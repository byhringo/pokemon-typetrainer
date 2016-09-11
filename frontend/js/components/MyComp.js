import React from "react";

export default class MyComp extends React.Component {

	constructor(){
		super();
		this.var = ["", ""];
		this.state = {prop1: "val1", prop2: "val2"};
	}

	render(){
		return (
			<div className="mycomp-wrapper">
			</div>
		);
	}
}