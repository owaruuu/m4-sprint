function GetPokemon(url) {
	return new Promise((resolve, reject) => {
		fetch(url).then((response) => {
			switch (response.status) {
				case 200:
					resolve(response.json());
					break;
				default:
					reject(response.status);
					break;
			}
		});
	});
}

function GetPokemons(url){
  return new Promise((resolve, reject) => {
		fetch(url).then((response) => {
			switch (response.status) {
				case 200:
					resolve(response.json());
					break;
				default:
					reject(response.status);
					break;
			}
		});
	});
}

function CreatePokemonCard(pokemon,idContenedor){	
	let contenedor=document.getElementById(idContenedor);
	let card = CreateElement("div", contenedor, "", ["card"]);
	let imgCard = CreateElement("img", card, "", ["card-img-top"]);
	let bodyCard = CreateElement("div", card, "", ["card-body"]);
	let titleCard = CreateElement("h5", bodyCard, "", ["card-title","pokemon-name"]);
	let sub1Card = CreateElement("h6", bodyCard, "", ["card-subtitle","mb-2","text-body-secondary","pokemon-height"]);
	let sub2Card = CreateElement("h6", bodyCard, "", ["card-subtitle","mb-2","text-body-secondary","pokemon-weight"]);
	let listaCard = CreateElement("ul", bodyCard, "", ["list-group","list-group-flush","pokemon-types"]);

	imgCard.src = pokemon.img;
	titleCard.innerHTML = "Nombre: " + pokemon.name;
	sub1Card.innerHTML = "Altura: " + pokemon.height + " dm" ;
	sub2Card.innerHTML = "Peso: " + pokemon.weight + " hg";

	listaCard.innerHTML = "";

	CreateElement("li", listaCard, "Tipos: ",["list-group-item", "active"]);

	pokemon.types.forEach(type => {
		CreateElement("li", listaCard, type.type.name, ["list-group-item"]);
	});

	return card;
}

function CreateChart(data) {
	const ctx = document.getElementById("myChart");
  ctx.innerHTML = ""; 

	const chart = new Chart(ctx, {
		type: "polarArea",
		data : data,
    options : {     
      animation: {
        animateRotate: true,
        animateScale: true
      }
    },
	});

  return chart;
}

function CreateData(stats){
  const data = {};
  data.labels = stats.map(stat => stat.stat.name);
  let dataset = {
    label: "value",
    data: stats.map(stat => stat.base_stat),
    backgroundColor: [
        'rgb(255, 99, 132, 0.4)',
        'rgb(75, 192, 192, 0.4)',
        'rgb(255, 205, 86, 0.4)',
        'rgb(201, 203, 207, 0.4)',
        'rgb(54, 162, 235, 0.4)',
        'rgb(54, 20, 235, 0.4)'
      ],
    borderWidth : 0
  };

  data.datasets = [dataset];
  console.log("creating data with: ", stats);
  return data;
}

function CreateElement(elem, parent, value, classNames = []){
  const element = document.createElement(elem);
  element.innerHTML = value;

  classNames.forEach(clase => {
    element.classList.add(clase);
  });

  parent.appendChild(element);
  return element;
}

function CreateBootstrapButton(value, id, parent){
  const button = document.createElement("button");
  parent.appendChild(button);
  button.innerHTML = value;
  button.setAttribute("id", id);
  button.classList.add("btn", "btn-outline-primary");
  return button;
}

// function ToggleVisibility(element){
//   element.hasAttribute("hidden") ? element.removeAttribute("hidden") : element.setAttribute("hidden", "");
// }

export { GetPokemon, GetPokemons, CreatePokemonCard, CreateChart, CreateData, CreateElement, CreateBootstrapButton };
