import type { LayoutLoad } from './$types';

export const prerender = false;

export type Result = {
  name: string;
  url: string;
};

let pokemonNames: string[];

const pokemonData = new Map();

export const load: LayoutLoad = async ({ fetch, params }) => {
  const fetchPokemonNames = async () => {
    if (!pokemonNames) {
      console.log('fetching pokemon names');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1292');
      const data = await response.json();
      const results = data.results.sort(sortByName);
      pokemonNames = results.map((result: Result) => result.name);
    }
    return pokemonNames;
  };

  const fetchPokemon = async () => {
    if (!params.name) return;
    if (pokemonData.has(params.name)) return pokemonData.get(params.name);
    console.log(`fetching ${params.name}`);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const data = await response.json();
    pokemonData.set(params.name, data);
    return data;
  };

  const [names, pokemon] = await Promise.all([fetchPokemonNames(), fetchPokemon()]);

  return { names, pokemon };
};

function sortByName(a: Result, b: Result) {
  return a.name.localeCompare(b.name);
}
