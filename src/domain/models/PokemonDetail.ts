export type IsBattleOnly = boolean;

export interface PokemonDetail {
	id: string;
	name: string;
	sprites: { back_default: string };
	abilities: {
		name: string;
		url: string;
	}[];
	moves: {
		name: string;
		url: string;
	}[];
	isBattleOnly: IsBattleOnly;
}
