import { PokemonDetailDTO } from "../../dtos/PokemonDetailDTO";
import { aPokemonDetail } from "../../models/builders/aPokemonDetail";
import { buildPokemonDetail } from "../buildPokemontDetail";

describe("buildPokemonDetail", () => {
	it("should return a PokemonDetail", async () => {
		//Arrange
		const pokemonDetailDTO: PokemonDetailDTO = {
			abilities: [
				{
					ability: {
						name: "torrent",
						url: "https://pokeapi.co/api/v2/ability/67/",
					},
					is_hidden: false,
					slot: 1,
				},
				{
					ability: {
						name: "rain-dish",
						url: "https://pokeapi.co/api/v2/ability/44/",
					},
					is_hidden: true,
					slot: 3,
				},
			],
			base_experience: 265,
			forms: [
				{
					name: "blastoise",
					url: "https://pokeapi.co/api/v2/pokemon-form/9/",
				},
			],
			game_indices: [
				{
					game_index: 28,
					version: {
						name: "red",
						url: "https://pokeapi.co/api/v2/version/1/",
					},
				},
			],
			height: 16,
			held_items: [
				{
					item: {
						name: "shell-bell",
						url: "https://pokeapi.co/api/v2/item/253/",
					},
					version_details: [
						{
							rarity: 50,
							version: {
								name: "diamond",
								url: "https://pokeapi.co/api/v2/version/12/",
							},
						},
					],
				},
			],
			id: "9",
			is_default: true,
			location_area_encounters:
				"https://pokeapi.co/api/v2/pokemon/9/encounters",
			moves: [
				{
					move: {
						name: "mega-punch",
						url: "https://pokeapi.co/api/v2/move/5/",
					},
					version_group_details: [
						{
							level_learned_at: 0,
							move_learn_method: {
								name: "machine",
								url: "https://pokeapi.co/api/v2/move-learn-method/4/",
							},
							version_group: {
								name: "red-blue",
								url: "https://pokeapi.co/api/v2/version-group/1/",
							},
						},
					],
				},
			],
			name: "blastoise",
			order: 12,
			species: {
				name: "blastoise",
				url: "https://pokeapi.co/api/v2/pokemon-species/9/",
			},
			sprites: {
				back_default:
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
				back_shiny:
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/9.png",
				front_default:
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
				front_shiny:
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png",
			},
			stats: [
				{
					base_stat: 79,
					effort: 0,
					stat: {
						name: "hp",
						url: "https://pokeapi.co/api/v2/stat/1/",
					},
				},
			],
			types: [
				{
					type: {
						name: "water",
						url: "https://pokeapi.co/api/v2/type/11/",
					},
				},
			],
			weight: 855,
		};

		//Act
		const pokemonDetail = await buildPokemonDetail(pokemonDetailDTO, false);

		//Assert
		expect(pokemonDetail).toEqual(
			aPokemonDetail({
				id: "9",
				moves: [
					{
						name: "mega-punch",
						url: "https://pokeapi.co/api/v2/move/5/",
					},
				],
				name: "blastoise",
				abilities: [
					{
						name: "torrent",
						url: "https://pokeapi.co/api/v2/ability/67/",
					},
				],
				sprites: {
					back_default:
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png",
				},
			}).build()
		);
	});
});
