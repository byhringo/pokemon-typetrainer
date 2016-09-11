import React from "react";

export default class PokemonInfoPanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		return (
			<div className="pokemoninfopanel-wrapper">
				<h2>{"#" + this.props.number + " - " + this.props.name}</h2>
				<img src={this.props.imgurl}></img>
			</div>
		);
	}
}