PokemonOne = document.querySelector("#PokemonOne");
PokemonTwo = document.querySelector("#PokemonTwo");

function getPokemon(name, outputFunc) //Name is case sensitive (full lowercase only) 
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then(async (data) => (await outputFunc(data)))
    .catch((err) => console.log("Pokemon not found", err));
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
                let types = ""

                if(data.types.length == 1) 
                {
                    types = data.types[0].type.name
                } else 
                {
                    types = `${data.types[0].type.name}, ${data.types[1].type.name}`
                }

                content.innerHTML =
                `<p>
                Name: ${pokeName} <br>
                Type(s): ${types} <br>
                Weaknesses: example weaknesses
                </p>`; //Later change the types to show on the box graphic
                
                pokeImage.innerHTML = 
                `<image src = "${data.sprites.front_default}" alt = "Image of the pokemon"></image>`
                
            })
            .catch((err) => console.log("Pokemon not found", err));

    
}

function initializeOptions(currentPokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species`) //Removed the "?limit=0"
    .then(response => response.json())
    .then(async (data) => { 
        let promises= [];  
        for (let i = 1; i < data.count; i++) 
        {
            let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((response) => response.json())
                .then(function(data) {
                    currentPokemon.querySelector("#PokemonNameSelector").innerHTML +=
                    `<Option value = "${data.name}">${data.name}</Option>`;
                })
                .catch((err) => console.log('Pokemon' + i + 'cannot be found/added to the list', err));
            promises.push(promise);
        }
        await Promise.all(promises);
        updateContent(currentPokemon);
    })
    .catch((err) => console.log("Pokemon count cannot be found!", err)); 
}

async function obtainOptions()
{
    let promises = []

    let pokemonNameOptions = []
    fetch(`https://pokeapi.co/api/v2/pokemon-species`) //Removed the "?limit=0"
    .then(response => response.json())
    .then((data) => { 
        for (let i = 1; i < data.count; i++) 
        {
            let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((response) => response.json())
                .then(function(data) { pokemonNameOptions.push(data.name)})
                .catch((err) => console.log('Pokemon' + i + 'cannot be found/added to the list', err));
            promises.push(promise);
        }
    })

    let attackOptions = []

    await Promise.all(promises);

    initializeOptions(PokemonOne);
    initializeOptions(PokemonTwo);
}

//#region Detect Changes / Events
    PokemonOne.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonOne);
    PokemonTwo.querySelector("#PokemonNameSelector").onchange = () => updateContent(PokemonTwo);
//#endregion

// obtainOptions();
initializeOptions(PokemonOne);

