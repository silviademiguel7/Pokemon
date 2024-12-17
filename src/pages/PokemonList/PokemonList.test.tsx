import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { aPoKemon } from "../../domain/models/builders/aPokemon";
import * as getPokemonListService from "../../domain/services/getPokemonList";
import { getPokemosListServiceError } from "../../domain/services/getPokemonList";
import { buildServiceError } from "../../infrastructure/buildServiceError";
import { PokemonList } from "./PokemonList";

const mockedUsedNavigate = jest.fn();

jest.mock("../../domain/services/getPokemonList");
jest.mock("react-router-dom", () => {
	return {
		...jest.requireActual("react-router-dom"),
		useNavigate: () => mockedUsedNavigate,
	};
});

describe("PokemonList", () => {
	it("should render correctly", async () => {
		// Arrange
		jest
			.spyOn(getPokemonListService, "getPokemonList")
			.mockResolvedValue([aPoKemon({ name: "pikachu" }).build()]);

		// Act
		render(<PokemonList />);

		// Assert
		const pokemonName = await screen.findByText("pikachu");

		expect(getPokemonListService.getPokemonList).toHaveBeenCalled();
		expect(pokemonName).toBeInTheDocument();
	});

	it("when click on pokemon go to detail", async () => {
		// Arrange
		jest.spyOn(getPokemonListService, "getPokemonList").mockResolvedValue([
			{
				name: "pikachu",
				url: "https://pokeapi.co/api/v2/pokemon/12",
			},
		]);

		// Act
		render(<PokemonList />);

		// Assert
		const pokemonName = await screen.findByText("pikachu");
		userEvent.click(pokemonName);

		expect(mockedUsedNavigate).toHaveBeenCalledWith("/pokemons/12");
	});

	it("can search pokemons by name", async () => {
		// Arrange
		jest.spyOn(getPokemonListService, "getPokemonList").mockResolvedValue([
			{
				name: "pikachu",
				url: "https://pokeapi.co/api/v2/pokemon/12",
			},
			{
				name: "ditto",
				url: "https://pokeapi.co/api/v2/pokemon/13",
			},
		]);

		// Act
		render(<PokemonList />);

		// Assert
		const pikachu = await screen.findByText("pikachu");
		const ditto = screen.getByText("ditto");
		const searchInput = screen.getByPlaceholderText("...");
		userEvent.type(searchInput, "ditto");

		expect(pikachu).not.toBeInTheDocument();
		expect(ditto).toBeInTheDocument();
	});

	it("given no pokemons found, should show an error service message", async () => {
		// Arrange
		jest.spyOn(getPokemonListService, "getPokemonList").mockRejectedValue(
			buildServiceError<getPokemosListServiceError>({
				message: "No pokemons found",
				type: "NoResultsError",
			})
		);

		// Act
		render(<PokemonList />);

		// Assert
		const errorMessage = await screen.findByText(
			"Ha habido un error de carga:"
		);

		expect(errorMessage).toBeInTheDocument();
		expect(screen.getByText("No pokemons found")).toBeInTheDocument();
	});
});
