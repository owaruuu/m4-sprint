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

    CreatePokemonCard(newPokemon,"resCard");
}

function CreatePokemonCard(pokemon,idContenedor){
	
	let contenedor=document.getElementById(idContenedor);
		contenedor.innerHTML="";
	let card = CreateElement("div", contenedor, "", ["card"]);
	let imgCard = CreateElement("img", card, "", ["card-img-top"]);
	let bodyCard = CreateElement("div", card, "", ["card-body"]);
	let titleCard = CreateElement("h5", bodyCard, "", ["card-title","pokemon-name"]);
	let sub1Card = CreateElement("h6", bodyCard, "", ["card-subtitle","mb-2","text-body-secondary","pokemon-height"]);
	let sub2Card = CreateElement("h6", bodyCard, "", ["card-subtitle","mb-2","text-body-secondary","pokemon-weight"]);
	let sub3Card = CreateElement("h6", bodyCard, "", ["card-subtitle","mb-2","text-body-secondary"]);
	let listaCard = CreateElement("ul", bodyCard, "", ["list-group","list-group-flush","pokemon-types"]);

    console.log(pokemon);

	imgCard.src = pokemon.img;
	titleCard.innerHTML = "Nombre: " + pokemon.name;
	sub1Card.innerHTML = "Altura: " + pokemon.height + " dm" ;
	sub2Card.innerHTML = "Peso: " + pokemon.weight + " hg";

	listaCard.innerHTML = "";

	let tituloLista = CreateElement("li", listaCard, "Tipos: ",["list-group-item","active"]);

	pokemon.types.forEach(type => {
		CreateElement("li", listaCard, type.type.name, ["list-group-item"]);
	});

	const data = CreateData(pokemon.stats);
	if(statsChart != undefined){statsChart.destroy();}
	statsChart = CreateChart(data);

	card.addEventListener('click', ()=>{
		const data = CreateData(pokemon.stats);
		if(statsChart != undefined){statsChart.destroy();}
		statsChart = CreateChart(data);

		const modalTitle = modal.querySelector('.modal-title');
		modalTitle.textContent = "Estadisticas de " + pokemon.name.toUpperCase();
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