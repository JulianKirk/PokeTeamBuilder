root = document.querySelector("#root")

function getPokemon(name, outputFunc) //Name is case sensitive (full lowercase only) 
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => (outputFunc(data)))
    .catch((err) => console.log("Pokemon not found", err));
}

function displayPokemon(data) 
{
    console.log(data);
}

function returnPokeName(data) {
    console.log(data.name);
    return data.name;
}

function initializeOptions() {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=0`)
    .then(response => response.json())
    .then((data) => {
        for (let i = 1; i < data.count; i++) 
        {
            document.querySelector("#PokemonNameSelector").innerHTML +=
            `
                <Option>${getPokemon(i, returnPokeName)}</Option>
            `
            ; 
        }
    })
    .catch((err) => console.log("Pokemon count cannot be found", err));
}

getPokemon("ditto", displayPokemon);
initializeOptions();
console.log(document.querySelector("#PokemonNameSelector").innerHTML)