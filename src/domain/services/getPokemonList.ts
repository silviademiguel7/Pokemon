import { apiClient } from "../../infrastructure/apliClient";
import { buildServiceError } from "../../infrastructure/buildServiceError";

import { Pokemon } from "../models/Pokemon";

export type getPokemosListServiceError = "NoResultsError";

export const getPokemonList = async (): Promise<Pokemon[]> => {
	const { data } = await apiClient.get<{ results: Pokemon[] }>(
		"pokemon?limit=11"
	);

	if (data.results.length === 0) {
		const serviceError = buildServiceError<getPokemosListServiceError>({
			message: "No pokemons found",
			type: "NoResultsError",
		});

		throw serviceError;
	}

	return data.results.sort((pokemonA, pokemonB) =>
		sortAlphabetically(pokemonA.name, pokemonB.name)
	);
};

const sortAlphabetically = (nameA: string, nameB: string) => {
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};
