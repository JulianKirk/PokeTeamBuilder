root = document.querySelector("#root")

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

function initializeOptions(callback) {
    // document.querySelector("#PokemonNameSelector").innerHTML = "";

    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=0`)
    .then(response => response.json())
    .then(async (data) => {
        for (let i = 1; i < data.count; i++) 
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((response) => response.json())
            .then(function(data) {
                document.querySelector("#PokemonNameSelector").innerHTML +=
                `<Option value = "${data.name}">${data.name}</Option>`;
            })
            .catch((err) => console.log("Pokemon not found", err));
        }
    })
    .catch((err) => console.log("Pokemon count cannot be found", err));
}

function updateContentBox() {
    let content = document.querySelector("#PokeContentBox");
    let pokeName = document.querySelector("#PokemonNameSelector").options[select.selectedIndex].value;
    ` 
    <p>
        PokemonName: document.querySelector("#PokemonNameSelector").
    </p>
    `
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then((response) => response.json())
            .then(function(data) {
                content.innerHTML +=
                `<p>Name: ${pokeName} \n Weaknesses: </p>`;
            })
            .catch((err) => console.log("Pokemon not found", err));
}

getPokemon("ditto", displayPokemon);
initializeOptions();
