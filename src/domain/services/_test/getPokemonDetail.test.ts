import { AxiosResponse } from "axios";
import { apiClient } from "../../../infrastructure/apliClient";
import { aPokemonDetailDTO } from "../../dtos/builders/aPokemonDetailDTO";

import { aPokemonDetail } from "../../models/builders/aPokemonDetail";
import { isServerError, ServerError } from "../../models/ServerError";
import { isServiceError, ServiceError } from "../../models/ServiceError";
import {
	getPokemonDetail,
	getPokemonDetailServiceError,
} from "../getPokemonDetail";

jest.mock("../../../infrastructure/apliClient");

describe("getPokemonDetail", () => {
	it("should call pokemon and pokemon-form url api with the id", async () => {
		// Arrange
		jest.spyOn(apiClient, "get").mockResolvedValueOnce({
			data: aPokemonDetailDTO({ id: " 1" }).build(),
		} as AxiosResponse);
		jest.spyOn(apiClient, "get").mockResolvedValueOnce({
			data: { is_battle_only: true },
		} as AxiosResponse);

		// Act
		await getPokemonDetail("1");

		// Assert
		expect(apiClient.get).toHaveBeenNthCalledWith(1, "pokemon/1");
		expect(apiClient.get).toHaveBeenNthCalledWith(2, "pokemon-form/1");
	});

	it("should return a detail of pokemon", async () => {
		// Arrange
		jest.spyOn(apiClient, "get").mockResolvedValueOnce({
			data: aPokemonDetailDTO({ id: "1" }).build(),
		} as AxiosResponse);
		jest.spyOn(apiClient, "get").mockResolvedValueOnce({
			data: { is_battle_only: true },
		} as AxiosResponse);

		const expectedResponse = aPokemonDetail({
			id: "1",
			isBattleOnly: true,
		}).build();

		// Act
		const response = await getPokemonDetail("1");

		// Assert
		expect(response).toStrictEqual(expectedResponse);
	});

	it("should throw service error when id is not valid", async () => {
		// Arrange
		const notValidId = "not valid id";

		// Act
		let error: ServiceError<getPokemonDetailServiceError> | undefined;
		try {
			await getPokemonDetail(notValidId);
		} catch (e: any) {
			error = e;
		}

		// Assert
		expect(isServiceError(error)).toBe(true);
		expect(error?.type).toBe("InvalidIdError");
	});

	it("should throw service error when there is an error in the request", async () => {
		// Arrange
		jest.spyOn(apiClient, "get").mockRejectedValue({
			config: {
				method: "GET",
				url: "pokemon/1",
			},
			headers: {},
			data: {},
			status: 500,
			statusText: "Internal Server Error",
		});

		// Act
		let error: ServerError | undefined;
		try {
			await getPokemonDetail("1");
		} catch (e: any) {
			error = e;
		}

		// Assert
		expect(isServerError(error)).toBe(true);
		expect(error?.status).toBe(500);
		expect(error?.statusText).toBe("Internal Server Error");
	});
});
