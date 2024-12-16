import { PokemonDetail } from "../PokemonDetail";

export const aPokemonDetail = (options?: Partial<PokemonDetail>) => {
	const defaultValue: PokemonDetail = {
		id: "1",
		name: "bulbasaur",
		sprites: {
			back_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
		},
		abilities: [
			{
				name: "overgrow",
				url: "https://pokeapi.co/api/v2/ability/65/",
			},
		],
		moves: [{ name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/" }],
		isBattleOnly: false,
	};
	return {
		build: (): PokemonDetail => {
			return Object.assign({}, defaultValue, options);
		},
	};
};
