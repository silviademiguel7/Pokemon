import { PokemonDetailDTO } from "../PokemonDetailDTO";

export const aPokemonDetailDTO = (options: Partial<PokemonDetailDTO>) => {
	const defaultValue: PokemonDetailDTO = {
		id: "1",
		name: "bulbasaur",
		base_experience: 64,
		height: 7,
		is_default: true,
		order: 1,
		weight: 69,
		abilities: [
			{
				is_hidden: false,
				slot: 1,
				ability: {
					name: "overgrow",
					url: "https://pokeapi.co/api/v2/ability/65/",
				},
			},
			{
				is_hidden: true,
				slot: 3,
				ability: {
					name: "chlorophyll",
					url: "https://pokeapi.co/api/v2/ability/34/",
				},
			},
		],
		forms: [
			{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-form/1/" },
		],
		game_indices: [
			{
				game_index: 1,
				version: { name: "red", url: "https://pokeapi.co/api/v2/version/1/" },
			},
		],
		held_items: [
			{
				item: {
					name: "cheri-berry",
					url: "https://pokeapi.co/api/v2/item/36/",
				},
				version_details: [
					{
						version: {
							name: "ruby",
							url: "https://pokeapi.co/api/v2/version/3/",
						},
						rarity: 50,
					},
				],
			},
		],
		location_area_encounters: "https://pokeapi.co/api/v2/pokemon/1/encounters",
		moves: [
			{
				move: { name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/" },
				version_group_details: [
					{
						version_group: {
							name: "red-blue",
							url: "https://pokeapi.co/api/v2/version-group/1/",
						},
						level_learned_at: 0,
						move_learn_method: {
							name: "machine",
							url: "https://pokeapi.co/api/v2/move-learn-method/4/",
						},
					},
				],
			},
		],
		species: {
			name: "bulbasaur",
			url: "https://pokeapi.co/api/v2/pokemon-species/1/",
		},
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
			back_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
			front_shiny:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
			back_shiny:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
		},
		stats: [
			{
				base_stat: 45,
				effort: 0,
				stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
			},
		],
		types: [
			{ type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
		],
	};

	return {
		build: (): PokemonDetailDTO => {
			return Object.assign({}, defaultValue, options);
		},
	};
};
