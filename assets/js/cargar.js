import { CreateBootstrapButton, GetPokemons, ToggleVisibility } from "./helpers.js";

const first20 = "https://pokeapi.co/api/v2/pokemon/";
let nextUrl = first20;


let botonCargar = document.getElementById("getLista");
botonCargar.addEventListener("click", LoadButtonClick);

async function LoadButtonClick(event){
    // event.target.setAttribute("disabled", "disabled");
    ToggleVisibility(event.target);

    console.log("click en boton");
    
    try {
		const response = await GetPokemons(nextUrl);
        console.log(response);

        nextUrl =  response.next;
        console.log(nextUrl);

        //FIX necesito un await para saber cuando termine de hacer las 20
        response.results.forEach(pokemon => {
            CreatePokemonCard(pokemon.url);
        });
	} catch (error) {
		console.log(error);
	} 
}

function CreatePokemonCards(){
    //despues de terminar de crear los 20
    const parent = document.getElementById("botones");
    CreateBootstrapButton("Cargas mas", "getMore", parent);
}