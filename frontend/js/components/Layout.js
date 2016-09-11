import React from "react";
import Mode1Layout from "./Mode1Layout.js";

export default class Layout extends React.Component {
	getChildContext() {
		return {typearray: [
					"none",
					"normal", 
					"fighting", 
					"flying", 
					"poison", 
					"ground", 
					"rock", 
					"bug", 
					"ghost", 
					"steel", 
					"fire",
					"water",
					"grass",
					"electric",
					"psychic",
					"ice",
					"dragon",
					"dark",
					"fairy"],
				hexcodearray: [
					"#ffffff",
					"#A8A878",
					"#C03028",
					"#A890F0",
					"#A040A0",
					"#E0C068",
					"#B8A038",
					"#A8B820",
					"#705898",
					"#B8B8D0",
					"#F08030",
					"#6890F0",
					"#78C850",
					"#F8D030",
					"#F85888",
					"#98D8D8",
					"#7038F8",
					"#705848",
					"#EE99AC"]
		};
	}

	constructor(){
		super();
	}

	render(){
		return (
			<div className="layout-wrapper">
			 <Mode1Layout/>
			</div>
		);
	}
}

Layout.childContextTypes = {
	typearray: React.PropTypes.array,
	hexcodearray: React.PropTypes.array
};