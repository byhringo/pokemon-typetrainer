var fs = require("fs");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

//Update these as needed
var POKEDEXNUMBER_FIRST = 1;
var POKEDEXNUMBER_LAST = 151;
var GENERATION_NUMBER = 1;

var pokedex = [];

var addToDex = function(result){
	var name = result.forms[0].name;
	var type1 = result.types[0].type.name;
	var type2 = "none";

	if(result.types.length == 2){
		type2 = result.types[1].type.name;
	}

	pokedex.push({
		number: result.id,
		name: 	name,
		gen: 	GENERATION_NUMBER,
		type1: 	type1,
		type2: 	type2
	});

	if(pokedex.length == POKEDEXNUMBER_LAST - POKEDEXNUMBER_FIRST + 1){
		console.log("Writing to file: pokedex_gen_" + GENERATION_NUMBER + ".json");

		fs.writeFile("pokedex_gen_" + GENERATION_NUMBER + ".json", JSON.stringify(pokedex));

		console.log("All done!");
	}
	else{
		console.log("Added pokémon to pokédex (" + pokedex.length + "/" + (POKEDEXNUMBER_LAST - POKEDEXNUMBER_FIRST + 1) + ")");
	}
}

var getPokeInfo = function(number){
	P.getPokemonByName(number)
		.then(function(response){
			addToDex(response);
			if(number <= POKEDEXNUMBER_LAST){
				getPokeInfo(number+1);
			}
		}).catch(function(error){
			console.log("ERROR: ", error);
		});
};

getPokeInfo(POKEDEXNUMBER_FIRST);