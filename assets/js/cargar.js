import { CreateBootstrapButton, GetPokemon, CreatePokemonCard, CreateChart, CreateData, GetPokemons, ToggleVisibility } from "./helpers.js";
import { Pokemon } from "./pokemon.js";

const first20 = "https://pokeapi.co/api/v2/pokemon/";
let nextUrl = first20;

let statsChart;

const modal = document.getElementById('statsModal');  
const modalStats = new bootstrap.Modal(modal);

let botonCargar = document.getElementById("getLista");
botonCargar.addEventListener("click", LoadButtonClick);

let botonBorrar = document.getElementById("btn-borrar");
botonBorrar.addEventListener("click", DeleteButtonClick);

async function LoadButtonClick(event){
    // event.target.setAttribute("disabled", "disabled");
    const getList = document.getElementById("getLista");
    if(getList){
        getList.remove();
    } 
    // ToggleVisibility(event.target);

    console.log("click en boton");
    
    try {
		const response = await GetPokemons(nextUrl);
        console.log(response);

        nextUrl =  response.next;
        console.log(nextUrl);

        //FIX necesito un await para saber cuando termine de hacer las 20
        // response.results.forEach(pokemon => {
        //     CreatePokemonCard(pokemon.url);
        // });
        await CreatePokemonCards(response.results);

        const parent = document.getElementById("botones");
        const newButton = CreateBootstrapButton("Cargas mas", "getMore", parent);
        newButton.addEventListener("click", MoreButtonClick);
    
	} catch (error) {
		console.log(error);
	} 
}

async function MoreButtonClick(event){
    event.target.setAttribute("disabled", "disabled");
    try {
		const response = await GetPokemons(nextUrl);
        console.log(response);

        nextUrl =  response.next;
        console.log(nextUrl);

        //FIX necesito un await para saber cuando termine de hacer las 20
        // response.results.forEach(pokemon => {
        //     CreatePokemonCard(pokemon.url);
        // });
        await CreatePokemonCards(response.results)
        event.target.removeAttribute("disabled");
    
	} catch (error) {
		console.log(error);
	} 
}

async function CreatePokemonCards(pokemons){
    console.log(pokemons);

    document.getElementById("resultado").innerHTML = "";

    pokemons.forEach(async (pokemon) => {
        const pokemonRetornado = await GetPokemon(pokemon.url);
        CreatePokemon(pokemonRetornado);
    });

    return new Promise((resolve, reject) => {
        resolve(console.log("done"));
    });
    

}

function CreatePokemon(pokemon){
    let newPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.height, pokemon.weight, pokemon.types, pokemon.stats);

    console.log(newPokemon);

    let card = CreatePokemonCard(newPokemon, "resultado");
    card.classList.add("col-2");
	card.addEventListener('click', ()=>{
		const data = CreateData(newPokemon.stats);
		if(statsChart != undefined){statsChart.destroy();}
		statsChart = CreateChart(data);

		const modalTitle = modal.querySelector('.modal-title');
		modalTitle.textContent = "Estadisticas de " + newPokemon.name.toUpperCase();
		modalStats.show();
	});
}

function DeleteButtonClick(event){
    const resultado = document.getElementById("resultado");

    if(resultado.childElementCount < 1){
        console.log("no hay nada");
    }else{
        document.getElementById("getMore").remove();
        nextUrl = first20;
        LoadButtonClick(event)
        console.log("borrando");
    }
}