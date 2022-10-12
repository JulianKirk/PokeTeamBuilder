import React from 'react';
import ReactDOM from 'react-dom/client';

function getPokemon(name) //Name is case sensitive (full lowercase only) 
{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => (displayPokemon(data)))
    .catch((err) => console.log("Pokemon not found", err));
}

function displayPokemon(data) 
{
    console.log(data);
}

function initializeOptions() {
    
}

getPokemon("ditto");