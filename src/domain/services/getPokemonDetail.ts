import { apiClient } from "../../infrastructure/apliClient";
import { buildServiceError } from "../../infrastructure/buildServiceError";
import { PokemonDetailDTO } from "../dtos/PokemonDetailDTO";
import { buildPokemonDetail } from "../factories/buildPokemontDetail";
import { PokemonDetail } from "../models/PokemonDetail";

export type getPokemonDetailServiceError = "InvalidIdError";

export const getPokemonDetail = async (id: string): Promise<PokemonDetail> => {
	if (isNaN(parseInt(id))) {
		throw buildServiceError<getPokemonDetailServiceError>({
			type: "InvalidIdError",
			message: "Invalid id",
		});
	}
	const { data } = await apiClient.get<PokemonDetailDTO>("pokemon/" + id);
	const { is_battle_only } = await getInfoPokemonForm(id);

	return buildPokemonDetail(data, is_battle_only);
};

async function getInfoPokemonForm(id: string) {
	const { data } = await apiClient.get<{ is_battle_only: boolean }>(
		"pokemon-form/" + id
	);
	const { is_battle_only } = data;
	return {
		is_battle_only,
	};
}
