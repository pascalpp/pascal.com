import type { LayoutLoad } from './$types';

export const prerender = false;

export type Result = {
  name: string;
  url: string;
};

let names: string[];

const pokemon = new Map();

export const load: LayoutLoad = async ({ fetch, params }) => {
  const fetchPokemonNames = async () => {
    if (!names) {
      console.log('fetching pokemon names');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1292');
      const data = await response.json();
      const results = data.results.sort(sortByName);
      names = results.map((result: Result) => result.name);
    }
    return names;
  };

  const fetchPokemon = async () => {
    if (!params.name) return;
    if (pokemon.has(params.name)) return pokemon.get(params.name);
    console.log(`fetching ${params.name}`);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const data = await response.json();
    pokemon.set(params.name, data);
    return data;
  };

  return {
    names: await fetchPokemonNames(),
    pokemon: await fetchPokemon(),
  };
};

function sortByName(a: Result, b: Result) {
  return a.name.localeCompare(b.name);
}
