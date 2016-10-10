import React from "react";

export default class PokemonTypeInfoText extends React.Component {

	constructor(){
		super();
	}

	getTypeColorHexCode(typename){
		var index = this.context.typearray.indexOf(typename);
		return this.context.hexcodearray[index];
	}

	render(){
		var type1color = this.getTypeColorHexCode(this.props.type1Name);
		var type2color = this.getTypeColorHexCode(this.props.type2Name);

		var includeT2 = this.props.type2Name != "none";

		var typetext = [];

		if(this.props.visible){
			typetext.push(<span key="typeinfoprefix">{this.props.pokeName + " is a "}</span>);

			typetext.push(<span key="type1info" style={{color: type1color}}>{this.props.type1Name}</span>);

			if(includeT2){
				typetext.push(<span key="typeseparator">/</span>);
				typetext.push(<span key="type2info" style={{color: type2color}}>{this.props.type2Name}</span>);
			}
			typetext.push(<span key="typeinfosuffix"> Pokémon!</span>);
		}

		return (
			<div className="pokemontypeinfotext-wrapper">
				{typetext}
			</div>
		);
	}
}

PokemonTypeInfoText.contextTypes = {
	typearray: React.PropTypes.array,
	hexcodearray: React.PropTypes.array
};