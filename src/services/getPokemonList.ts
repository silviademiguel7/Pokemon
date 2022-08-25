import axios from 'axios';
import { sortAlphabetically } from '../utils/sortAlphabetically';

export interface Pokemon {
  name: string;
  url: string;
}

export const getPokemonList = async () => {
  const { data } = await axios.get<{ results: Pokemon[] }>(
    'https://pokeapi.co/api/v2/pokemon?limit=11'
  );
  return data.results.sort((pokemonA, pokemonB) =>
    sortAlphabetically(pokemonA.name, pokemonB.name)
  );
};
