PokemonOne = document.querySelector("#PokemonOne");
PokemonTwo = document.querySelector("#PokemonTwo");
PokemonThree = document.querySelector("#PokemonThree");
PokemonFour = document.querySelector("#PokemonFour");
PokemonFive = document.querySelector("#PokemonFive");
PokemonSix = document.querySelector("#PokemonSix");

function getPokemon(name, outputFunc) //Name is case sensitive (full lowercase only) 
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then(async (data) => (await outputFunc(data)))
    .catch((err) => console.log("Pokemon not found", err));
}

const weaknessDict = {
    "fire" : ["water", "ground", "rock"],
    "water" : ["grass", "electric"],
    "ground" : ["water", "grass", "ice"],
    "ice" : ["fire", "fighting", "rock", "steel"],
    "dark" : ["fighting", "bug", "fairy"],
    "electric" : ["ground"],
    "flying" : ["electric", "ice", "rock"],
    "psychic" : ["bug", "ghost", "dark"],
    "fighting": ["flying", "psychic", "fairy"],
    "rock" : ["water", "grass", "fighting", "ground", "steel"],
    "normal" : ["fighting"],
    "grass" : ["fire", "ice", "poison", "flying", "bug"],
    "poison": ["ground", "psychic"],
    "bug" : ["fire", "flying", "rock"],
    "ghost": ["ghost", "dark"],
    "dragon": ["ice", "dragon", "fairy"],
    "steel" : ["fire", "fighting", "ground"],
    "fairy" : ["poison", "steel"]
}

function updateContent(currentPokemon) {
    console.log("content being updated")
    let content = currentPokemon.querySelector("#PokeContentBox");
    let pokeImage = currentPokemon.querySelector("#PokemonImage");
    let nameSelectBox = currentPokemon.querySelector("#PokemonNameSelector");

    let pokeName = nameSelectBox.value ?? "bulbasaur";

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then((response) => response.json())
            .then(function(data) {
                let types = "";
                let weaknesses = "";

                if(data.types.length == 1) 
                {
                    types = data.types[0].type.name;
                    weaknesses = weaknessDict[data.types[0].type.name];
                } else 
                {
                    types = `${data.types[0].type.name}, ${data.types[1].type.name}`;
                    weaknesses = `${weaknessDict[data.types[0].type.name]}, ${weaknessDict[data.types[1].type.name]}`;
                }

                content.innerHTML =
                `<p>
                Name: ${pokeName} <br>
                Type(s): ${types} <br>
                Weaknesses: ${weaknesses}
                </p>`; 
                //Later change the types to show on the box graphic
                //Eval is meant to convert the string to syntax
                
                pokeImage.innerHTML = 
                `<image src = "${data.sprites.front_default}" alt = "Image of the pokemon"></image>`
                
            })
            .catch((err) => console.log("Pokemon not found", err));

    
}

function initializeOptions(currentPokemon, pokeNames) {
    pokeNames.forEach((name, index) => {
        currentPokemon.querySelector("#PokemonNameSelector").innerHTML += 
            `<Option value = "${name}">${name}</Option>`;
    })

    updateContent(currentPokemon);
}

async function obtainOptions()
{
    let pokemonNameOptions = []

    let speciesPromise = fetch(`https://pokeapi.co/api/v2/pokemon-species`) //Removed the "?limit=0"
    .then(response => response.json())
    .then(async (data) => { 
        let promises = []
        for (let i = 1; i < data.count; i++) 
        {
            let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((response) => response.json())
                .then(function(pokeData) { 
                    pokemonNameOptions.push(pokeData.name);
                })
                .catch((err) => console.log('Pokemon' + i + 'cannot be found/added to the list', err));
            promises.push(promise);
        }
        await Promise.all(promises);
    })
    .catch((err) => console.log("Pokemon list cannot be found!", err)); 
    
    await speciesPromise;

    let attackOptions = []

    console.log("ABOUT TO INITIALIZE");
    console.log(pokemonNameOptions);

    initializeOptions(PokemonOne, pokemonNameOptions);
    initializeOptions(PokemonTwo, pokemonNameOptions);
    initializeOptions(PokemonThree, pokemonNameOptions);
    initializeOptions(PokemonFour, pokemonNameOptions);
    initializeOptions(PokemonFive, pokemonNameOptions);
    initializeOptions(PokemonSix, pokemonNameOptions);


    console.log("DONE INITIALIZING");
}

//#region Detect Changes / Events
    PokemonOne.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonOne);
    PokemonTwo.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonTwo);
    PokemonThree.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonThree);
    PokemonFour.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonFour);
    PokemonFive.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonFive);
    PokemonSix.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonSix);

//#endregion

obtainOptions();

