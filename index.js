PokemonOne = document.querySelector("#PokemonOne")

function getPokemon(name, outputFunc) //Name is case sensitive (full lowercase only) 
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then(async (data) => (await outputFunc(data)))
    .catch((err) => console.log("Pokemon not found", err));
}

function displayPokemon(data) 
{
    console.log(data);
}

function updateContent(currentPokemon) {
    let content = currentPokemon.querySelector("#PokeContentBox");
    let pokeImage = currentPokemon.querySelector(".PokemonImage"); //DO SOMETHING ABOUT THIS
    let nameSelectBox = currentPokemon.querySelector("#PokemonNameSelector");

    let pokeName = nameSelectBox.options[nameSelectBox.selectedIndex]?.value;
    pokeName = pokeName == undefined ? "bulbasaur" : pokeName;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then((response) => response.json())
            .then(function(data) {
                content.innerHTML =
                `<p>
                Name: ${pokeName} <br>
                Type(s): ${data.types[0].type.name}; ${data.types[1].type?.name ?? ""} <br>
                Weaknesses: ${data}
                </p>`; //Later change the types to show on the box graphic
                
                pokeImage.innerHTML = 
                `<image src = "${data.sprites.front_default}" alt = "Image of the pokemon"></image>
                ;`
                
            })
            .catch((err) => console.log("Pokemon not found", err));

    
}

function initializeOptions(currentPokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=0`) 
    .then(response => response.json())
    .then(async (data) => {
        for (let i = 1; i < data.count; i++) 
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((response) => response.json())
            .then(function(data) {
                currentPokemon.querySelector("#PokemonNameSelector").innerHTML +=
                `<Option value = "${data.name}">${data.name}</Option>`;
            })
            .then(updateContent(currentPokemon))
            .catch((err) => console.log('Pokemon' + i + 'cannot be found/added to the list', err));
        }
    })
    .catch((err) => console.log("Pokemon count cannot be found!", err)); 
}

//#region Detect Changes / Events
    PokemonOne.querySelector("#PokemonNameSelector").onchange = updateContent(PokemonOne); //This is not working for some reason
//#endregion


getPokemon("ditto", displayPokemon);
initializeOptions(PokemonOne);
