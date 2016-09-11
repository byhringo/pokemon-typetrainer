import React from "react";
import TypeAnswerPanel from "./TypeAnswerPanel.js";
import TypeSelectorPanel from "./TypeSelectorPanel.js";
import ResetButton from "./ResetButton.js"

export default class TypePanel extends React.Component {

	constructor(){
		super();
	}

	render(){
		return (
			<div className="typepanel-wrapper">
				<TypeAnswerPanel 
					typeorder={1}
					chosentype={this.props.type1ID}
					beingset={this.props.selectingType == 1} />
				<ResetButton 
					resetTypes={this.props.resetTypes}/>
				<TypeAnswerPanel 
					typeorder={2}
					chosentype={this.props.type2ID}
					beingset={this.props.selectingType == 2} />
				<TypeSelectorPanel
					registerTypeClicked={this.props.registerTypeClicked}
					layoutobj={this.props.layoutobj} />
			</div>
		);
	}
}