const pokemonName = document.querySelector('.pokemon__name'); //veio de span
const pokemonNumber = document.querySelector('.pokemon__number'); //veio de span
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form'); //esse faz mostra o pokemon
const input = document.querySelector('.input__search'); //esse o imput funcionar
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json(); //valida o erro 404 no found
        return data;
    }
}

const renderPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...'; //mostra imagem carregando
    pokemonNumber.innerHTML = ''; // limpa o numero quando tiver carregando

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; //pegou de dentro da api do sprint e da verion blackwhite
        input.value = ''; //limpa o nome quando pesquisado
        searchPokemon = data.id; //quando for usar o butao vai voltar no certo
    } else {
        pokemonImage.style.display = 'none'; //limpa a imagem se n achar
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // previnir o evento paddrao do subimit
    renderPokemon(input.value.toLowerCase()); //tranforma letra internamente em minuscula
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(25); //aqui vai aparecer um pokemon inicial. se vc colocar searchpokemn vai começar com primeiro