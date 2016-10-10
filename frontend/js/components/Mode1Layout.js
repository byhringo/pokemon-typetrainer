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
		var mode = 1;
		//Current generation
		var gen = 1;

		var initpokedex = [{number: 0, name: "Missingno", type1: "none", type2: "none"}];

		this.state = {	pokedex: initpokedex,
						currentPokeNumber: 0,
						currentPokeName: "Missingno",
						currentPokeImgURL: "./dist/img/0.png",
						type1ID: 0,
						type2ID: 0,
						selectingType: 1,
						answerValidated: false,
						answeredCorrectly: false,
						totalAnswers: 0,
						correctAnswers: 0,
						pokedexLoaded: false,
						mode: mode,
						generation: gen,
						finished: false
					};

		var init = function(jsonData) {
			var pokedex = JSON.parse(jsonData);

			this.setState({	pokedex: pokedex,
							pokedexLoaded: true});

			this.setNewPokemon(this.state.mode == 2 ? 1 : this.getValidPokemonNumber())
		}

		this.loadJSON("./dist/dex/pokedex_gen_" + gen + ".json", init.bind(this));
	}

	getValidPokemonNumber(){
		return Math.floor(Math.random() * this.state.pokedex.length) + 1;
	}

	setNewPokemon(pokedexNumber){
		this.setState({
						currentPokeNumber: 	pokedexNumber,
						currentPokeName: 	this.state.pokedex[pokedexNumber].name,
						currentPokeImgURL: 	"./dist/img/" + pokedexNumber + ".png"
		});
	}

	//Propagates down to TypeLabel in TypeSelectorPanel
	registerTypeClicked(typeID){
		if(this.state.selectingType == 1 && !this.state.answerValidated){
			this.setState({type1ID: typeID, selectingType: 2});
		} else if(this.state.selectingType == 2 && !this.state.answerValidated){
			this.setState({type2ID: typeID, selectingType: -1}, this.validateAnswer.bind(this));
		}
	}

	resetTypes(){
		if(!this.state.answerValidated){
			this.setState({type1ID: 0, type2ID: 0, selectingType: 1});
		}
	}

	validateAnswer(){
		var t1 = this.state.pokedex[this.state.currentPokeNumber].type1;
		var t2 = this.state.pokedex[this.state.currentPokeNumber].type2;

		var answert1 = this.context.typearray[this.state.type1ID];
		var answert2 = this.context.typearray[this.state.type2ID];

		//Check if answer is correct. Order doesn't matter, so we check both ways
		if((t1 == answert1 && t2 == answert2) || (t1 == answert2 && t2 == answert1)){
			this.setState({
				answeredCorrectly: true, 
				correctAnswers: this.state.correctAnswers + 1
			});
		}
		else{
			this.setState({
				answeredCorrectly: false
			});
		}

		this.setState({
			totalAnswers: this.state.totalAnswers + 1,
			answerValidated: true
		});
	}

	nextTask(){
		var finished = false;
		var nextPoke = this.getValidPokemonNumber();
		
		if(this.state.mode == 0){ //Infinite

		} else if(this.state.mode == 1){ //20 random
			finished = this.state.totalAnswers >= 20;
		} else if(this.state.mode == 2){ //Entire 'dex
			//subtract 1 because of missingno at position 0
			finished = this.state.totalAnswers >= (this.state.pokedex - 1);
			nextPoke = this.state.totalAnswers+1;
		}

		if(!finished){
			this.setState({	type1ID: 0,
							type2ID: 0,
							selectingType: 1,
							answerValidated: false,
							answeredCorrectly: false
						});
			this.setNewPokemon(nextPoke);
		}
		else{ //We are finished!
			this.setState({finished: true});
		}
	}

	render(){
		if(!this.state.finished){
			if(this.state.pokedexLoaded){
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
							canResetTypes={!this.state.answerValidated && this.state.selectingType != 1}
							resetTypes={this.resetTypes.bind(this)}
							/>
						<NavigationPanel 
							canValidate={this.state.selectingType != 1}
							validated={this.state.answerValidated}
							valuation={this.state.answeredCorrectly}
							validateAnswer={this.validateAnswer.bind(this)}
							currentPokeName={this.state.currentPokeName}
							currentPokeT1={this.state.pokedex[this.state.currentPokeNumber].type1}
							currentPokeT2={this.state.pokedex[this.state.currentPokeNumber].type2}
							nextTask={this.nextTask.bind(this)}
							/>
						<Footer/>
					</div>
				);
			} else {
				return(<div>Loading...</div>);
			}
		}
		else{ //Display "game over"-screen
			return (<div>You did it!</div>);
		}
	}
}

Mode1Layout.contextTypes = {
	typearray: React.PropTypes.array
};