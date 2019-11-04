const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            ability: result.abilities.map((ability) => ability.ability.name).join(', '),
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokemon1) => `
        <li class="card">
            <img class="card-image" src="${pokemon1.image}"/>
            <h2 class="card-title">${pokemon1.id}. ${pokemon1.name}</h2>
            <p class="card-subtitle">Type: ${pokemon1.type}
            <br/>Abilities: ${pokemon1.ability}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
