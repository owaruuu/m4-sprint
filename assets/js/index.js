import { GetPokemon, CreateChart, CreateData, CreateElement } from "./helpers.js";
import { Pokemon } from "./pokemon.js";

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
		const pokemon = await GetPokemon(input);
        console.log(pokemon);
        CreatePokemon(pokemon)
	} catch (error) {
		console.log(error);
	}
}

function CreatePokemon(pokemon){
    let newPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.height, pokemon.weight, pokemon.types, pokemon.stats);

    console.log(newPokemon);

    CreatePokemonCard(newPokemon);
}

function CreatePokemonCard(pokemon){
    console.log(pokemon);
	console.log(document.querySelector(".card-img-top"));
	document.querySelector(".card-img-top").src = pokemon.img;
	document.querySelector(".pokemon-name").innerHTML = "Nombre: " + pokemon.name;
	document.querySelector(".pokemon-height").innerHTML = "Altura: " + pokemon.height + " dm" ;
	document.querySelector(".pokemon-weight").innerHTML = "Peso: " + pokemon.weight + " hg";

	let typesDiv = document.querySelector(".pokemon-types");
	typesDiv.innerHTML = "";

	let first = CreateElement("li", typesDiv, "Tipos: ");
	first.classList.add("list-group-item","active");

	pokemon.types.forEach(type => {
		CreateElement("li", typesDiv, type.type.name, ["list-group-item"]);
	});

	const data = CreateData(pokemon.stats);
	if(statsChart != undefined){
		statsChart.destroy();
	}
	statsChart = CreateChart(data);

	document.getElementById("resCard").addEventListener('click', ShowModal);
}

function ShowModal(){
	// const modal = document.getElementById('statsModal');  
	// const modalTitle = modal.querySelector('.modal-title')
	// const modalBody = modal.querySelector('.modal-body')

	// modalTitle.textContent = "TITULO";
	// modalBody.textContent = "CUERPO";

	// const myModal = new bootstrap.Modal(modal);
	// myModal.show();
	modalStats.show();
	// modal.show();
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