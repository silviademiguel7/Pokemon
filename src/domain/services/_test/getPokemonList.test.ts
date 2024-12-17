import { AxiosResponse } from "axios";

import { apiClient } from "../../../infrastructure/apliClient";
import { aPoKemon } from "../../models/builders/aPokemon";
import { ServiceError } from "../../models/ServiceError";
import { getPokemonList, getPokemosListServiceError } from "../getPokemonList";

jest.mock("../../../infrastructure/apliClient");

describe("getPokemonList", () => {
	it("should return list of pokemons", async () => {
		// Arrange
		const response = aPoKemon({
			name: "bulbasaur",
			url: "pokemon/1/",
		}).build();
		jest
			.spyOn(apiClient, "get")
			.mockResolvedValue({ data: { results: [response] } } as AxiosResponse);

		// Act
		const result = await getPokemonList();

		// Assert
		expect(result).toEqual([response]);
	});

	it("should call apiClient with correct url", async () => {
		// Arrange
		const response = aPoKemon({
			name: "bulbasaur",
			url: "pokemon/1/",
		}).build();
		const getSpy = jest
			.spyOn(apiClient, "get")
			.mockResolvedValue({ data: { results: [response] } } as AxiosResponse);

		// Act
		await getPokemonList();

		// Assert
		expect(getSpy).toHaveBeenCalledWith("pokemon?limit=11");
	});

	it("should throw error when there is not pokemos", async () => {
		// Arrange
		jest
			.spyOn(apiClient, "get")
			.mockResolvedValue({ data: { results: [] } } as AxiosResponse);

		// Act
		let error: ServiceError<getPokemosListServiceError> | undefined;
		try {
			await getPokemonList();
		} catch (err: any) {
			error = err;
		}

		// Assert
		expect(error instanceof ServiceError).toBe(true);
		expect(error?.type).toBe("NoResultsError");
	});
});
