import { GetPokemon, CreatePokemonCard, CreateChart, CreateData, CreateElement } from "./helpers.js";
import { Pokemon } from "./pokemon.js";

const url = "https://pokeapi.co/api/v2/pokemon/";

const button = document.getElementById("getPokemon");
button.addEventListener("click", SubmitData);

const input = document.getElementById("input-pokemon");
input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        SubmitData();
    }
});

const modal = document.getElementById('statsModal');  
const modalStats = new bootstrap.Modal(modal);
// const statsModal = document.getElementById("statsModal");
// statsModal.addEventListener('hidden.bs.modal',() =>{
//     const modalTitle = statsModal.querySelector('.modal-title')
//     const modalBody = statsModal.querySelector('.modal-body')
//     modalTitle.textContent = "";
//     modalBody.textContent = "";
// })

//global para poder .delete() el chart anterior, es necesario per la documentacion de Chart.js
let statsChart;

function SubmitData() {
	let input = document.getElementById("input-pokemon").value;

	if (input === "") {
		alert("Please enter a name");
	} else {
		ProcessData(input);
	}
}

async function ProcessData(input) {
	try {
		const pokemon = await GetPokemon(url + input);
        console.log(pokemon);
        CreatePokemon(pokemon)
	} catch (error) {
		console.log(error);
	}
}

function CreatePokemon(pokemon){
    let newPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.height, pokemon.weight, pokemon.types, pokemon.stats);

    console.log(newPokemon);

	document.getElementById("resCard").innerHTML = "";
    let card = CreatePokemonCard(newPokemon,"resCard");
	card.addEventListener('click', ()=>{
		const data = CreateData(newPokemon.stats);
		if(statsChart != undefined){statsChart.destroy();}
		statsChart = CreateChart(data);

		const modalTitle = modal.querySelector('.modal-title');
		modalTitle.textContent = "Estadisticas de " + newPokemon.name.toUpperCase();
		modalStats.show();
	});
}



// async function GetPokemon(url) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			setTimeout(resolve(FetchPokemon(url)), 2000);
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// async function FetchPokemon(url){
//     try {
//         const response = await Fetch(url);
//         console.log(response);
//     } catch (error) {

//     }
// }

// GetPokemon('https://pokeapi.co/api/v2/pokemon/35')

// const exampleModal = document.getElementById('exampleModal')
// exampleModal.addEventListener('show.bs.modal', event => {
    
//     const modalTitle = exampleModal.querySelector('.modal-title')
//     const modalBody = exampleModal.querySelector('.modal-body')
// })