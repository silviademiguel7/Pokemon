import { Pokemon } from "../Pokemon";

export const aPoKemon = (options?: Partial<Pokemon>) => {
	const defaultValue: Pokemon = {
		name: "bulbasaur",
		url: "https://pokeapi.co/api/v2/pokemon/1/",
	};
	return {
		build: (): Pokemon => {
			return Object.assign({}, defaultValue, options);
		},
	};
};
