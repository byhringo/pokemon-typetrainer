import React from "react";

import Header from "./Header.js";
import PokemonInfoPanel from "./PokemonInfoPanel.js";
import TypePanel from "./TypePanel.js";
import NavigationPanel from "./NavigationPanel.js";
import Footer from "./Footer.js";

export default class Mode1Layout extends React.Component {

	loadJSON(url, callback) {   
		var xobj = new XMLHttpRequest();

		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true); // Replace 'my_data' with the path to your file

		xobj.onreadystatechange = function(){
			if(xobj.readyState == 4 && xobj.status == "200"){
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xobj.responseText);
			}
		};

		xobj.send(null);
	}

	constructor(){
		super();

		/* Current game mode
		0 = Random, infinite
		1 = 20 in a row
		2 = All pokés in current dex
		*/
		var mode = 0;
		//Current generation
		var gen = 1;

		this.pokedex = [];

		this.state = {	currentPokeNumber: 0,
						currentPokeName: "Missingno",
						currentPokeImgURL: "./dist/img/MissingNo.png",
						type1ID: 0,
						type2ID: 0,
						selectingType: 1,
						totalAnswers: 0,
						correctAnswers: 0,
						pokedexLoaded: false,
						mode: mode,
						generation: gen
					};

		var init = function(jsonData) {
			var pokedex = JSON.parse(jsonData);

			var startPokeNumber = Math.round(Math.random()* pokedex.length);

			this.setState({	pokedexLoaded: true,
							currentPokeNumber: 	startPokeNumber,
							currentPokeName: 	pokedex.find(function(d){return d.number==startPokeNumber;}).name,
							currentPokeImgURL: 	"./dist/img/" + startPokeNumber + ".png"
			});
		}

		this.loadJSON("./dist/dex/pokedex_gen_" + gen + ".json", init.bind(this));
	}

	//Propagates down to TypeLabel in TypeSelectorPanel
	registerTypeClicked(typeID){
		if(this.state.selectingType == 1){
			this.setState({type1ID: typeID, selectingType: 2});
		} else if(this.state.selectingType == 2){
			this.setState({type2ID: typeID, selectingType: -1});
		}
	}

	resetTypes(){
		this.setState({type1ID: 0, type2ID: 0, selectingType: 1})
	}

	render(){
		return (
			<div className="mode1layout-wrapper">
				<Header/>
				<PokemonInfoPanel
					number={this.state.currentPokeNumber}
					name={this.state.currentPokeName}
					imgurl={this.state.currentPokeImgURL}
					/>
				<TypePanel
					type1ID={this.state.type1ID}
					type2ID={this.state.type2ID}
					selectingType={this.state.selectingType}
					registerTypeClicked={this.registerTypeClicked}
					layoutobj={this}
					resetTypes={this.resetTypes.bind(this)}/>
				<NavigationPanel/>
				<Footer/>
			</div>
		);
	}
}

Mode1Layout.contextTypes = {
	typearray: React.PropTypes.array
};