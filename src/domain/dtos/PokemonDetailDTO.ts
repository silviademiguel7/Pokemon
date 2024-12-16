export interface PokemonDetailDTO {
	id: string;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: {
		is_hidden: boolean;
		slot: number;
		ability: {
			name: string;
			url: string;
		};
	}[];
	forms: [{ name: string; url: string }];
	game_indices: [
		{ game_index: number; version: { name: string; url: string } }
	];
	held_items: [
		{
			item: { name: string; url: string };
			version_details: [
				{ version: { name: string; url: string }; rarity: number }
			];
		}
	];
	location_area_encounters: string;
	moves: {
		move: { name: string; url: string };
		version_group_details: [
			{
				version_group: { name: string; url: string };
				level_learned_at: number;
				move_learn_method: { name: string; url: string };
			}
		];
	}[];
	species: { name: string; url: string };
	sprites: {
		front_default: string;
		back_default: string;
		front_shiny: string;
		back_shiny: string;
	};
	stats: [
		{ base_stat: number; effort: number; stat: { name: string; url: string } }
	];
	types: [{ type: { name: string; url: string } }];
}
