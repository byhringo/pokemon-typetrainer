import React from "react";
import ValidateButton from "./ValidateButton.js";
import NextButton from "./NextButton.js";
import PokemonTypeInfoText from "./PokemonTypeInfoText.js";

var correctFeedback =	[
							"That's right!",
							"Correct!",
							"You got it!",
							"Nice job!",
							"You answered correctly.",
							"Fantastic!",
							"Oh yeah!",
							"You rock, Arbok!",
							"Raichu are!",
							"That's the stuff, Jigglypuff!",
							"Rhydon!",
							"That's right, Omanyte!"
						];

var incorrectFeedback =	[
							"Sorry, wrong answer.",
							"That's not right...",
							"Uh oh...",
							"WRONG ANSWER!",
							"Hand in your gym badges, trainer.",
							"I'm afraid that's not correct.",
							"Too hard, Charizard?",
							"You're out of luck, Psyduck.",
							"That's wrong, Dewgong."
						];

export default class NavigationPanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		var buttonState = 0;

		//Answer is validated
		if(this.props.validated){
			//And is either correct (true) or incorrect (false)
			buttonState = this.props.valuation ? 2 : 3;
		}
		//Answer is not validated, but button should be clickable
		else if(this.props.canValidate){
			buttonState = 1;
		}

		var valuationtext = "";

		if(this.props.validated){
			valuationtext += this.props.valuation
				? correctFeedback[Math.floor(correctFeedback.length * Math.random())]
				: incorrectFeedback[Math.floor(incorrectFeedback.length * Math.random())];
		}

		

		return (
			<div className="navigationpanel-wrapper">
				<ValidateButton 
					buttonState={buttonState}
					validated={this.props.validated}
					validateAnswer={this.props.validateAnswer}
					valuationText={valuationtext}
				/>
				<PokemonTypeInfoText
					pokeName={this.props.currentPokeName}
					type1Name={this.props.currentPokeT1}
					type2Name={this.props.currentPokeT2}
					visible={this.props.validated}
				/>
				<NextButton 
					visible={this.props.validated}
					nextTask={this.props.nextTask}/>
			</div>
		);
	}
}

