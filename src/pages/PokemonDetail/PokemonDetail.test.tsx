import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import * as ReactRouterDomService from "react-router-dom";
import { aPokemonDetail } from "../../domain/models/builders/aPokemonDetail";
import * as getPokemonDetailService from "../../domain/services/getPokemonDetail";
import { getPokemonDetailServiceError } from "../../domain/services/getPokemonDetail";
import { buildServiceError } from "../../infrastructure/buildServiceError";
import { PokemonDetail } from "./PokemonDetail";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
	Link: ({ children, to }: { children: React.ReactElement; to: string }) => {
		return <a href={to}>{children}</a>;
	},
}));
jest.mock("../../domain/services/getPokemonDetail");

describe("PokemonDetail", () => {
	it("should render a loading spinner when the pokemon detail is not loaded", () => {
		// Arrange
		jest.spyOn(ReactRouterDomService, "useParams").mockReturnValue({ id: "1" });
		jest
			.spyOn(getPokemonDetailService, "getPokemonDetail")
			.mockResolvedValue(aPokemonDetail().build());

		// Act
		render(<PokemonDetail />);

		// Assert
		expect(screen.getByTestId("loading")).toBeInTheDocument();
	});

	it("should render the pokemon detail when it is loaded", async () => {
		// Arrange
		jest.spyOn(ReactRouterDomService, "useParams").mockReturnValue({ id: "1" });
		jest.spyOn(getPokemonDetailService, "getPokemonDetail").mockResolvedValue(
			aPokemonDetail({
				id: "1",
				name: "bulbasaur",
				sprites: { back_default: "https://bulbasaur.com" },
				isBattleOnly: false,
				abilities: [{ name: "overgrow", url: "https://overgrow.com" }],
				moves: [{ name: "tackle", url: "https://tackle.com" }],
			}).build()
		);

		// Act
		render(<PokemonDetail />);
		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		//Assert
		const pokemonName = screen.getByText("Pokemon bulbasaur");
		const pokimenonImage = screen.getByAltText("bulbasaur");
		const pokemonId = screen.getByText("1");
		const pokemonType = screen.getByText("No");
		const pokemonAbilities = screen.getByText("overgrow");
		const podkemonMoves = screen.getByText("tackle");
		expect(pokemonName).toBeInTheDocument();
		expect(pokimenonImage).toBeInTheDocument();
		expect(pokemonId).toBeInTheDocument();
		expect(pokemonType).toBeInTheDocument();
		expect(pokemonAbilities).toBeInTheDocument();
		expect(podkemonMoves).toBeInTheDocument();
	});

	it("given pokemon detail has not movements, should not render any movement", async () => {
		// Arrange
		jest.spyOn(ReactRouterDomService, "useParams").mockReturnValue({ id: "1" });
		jest.spyOn(getPokemonDetailService, "getPokemonDetail").mockResolvedValue(
			aPokemonDetail({
				id: "1",
				name: "bulbasaur",
				sprites: { back_default: "https://bulbasaur.com" },
				isBattleOnly: false,
				abilities: [{ name: "overgrow", url: "https://overgrow.com" }],
				moves: [],
			}).build()
		);

		// Act
		render(<PokemonDetail />);
		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		//Assert
		const pokemonMoves = screen.getByText("No hay movimientos");
		expect(pokemonMoves).toBeInTheDocument();
	});

	it("given there is a service error loading the pokemon detail, should render an error message and option to back home page", async () => {
		// Arrange
		jest.spyOn(ReactRouterDomService, "useParams").mockReturnValue({ id: "1" });
		jest.spyOn(getPokemonDetailService, "getPokemonDetail").mockRejectedValue(
			buildServiceError<getPokemonDetailServiceError>({
				type: "InvalidIdError",
				message: "Invalid id",
			})
		);

		// Act
		render(<PokemonDetail />);
		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		//Assert
		const errorMessage = screen.getByText(/Ha habido un error de carga/i);
		expect(errorMessage).toBeInTheDocument();
		expect(screen.getByText(/Invalid id/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Volver a la lista de pokemons/i)
		).toBeInTheDocument();
	});

	it("given  an error message shoul navigate to back home page", async () => {
		// Arrange
		jest.spyOn(ReactRouterDomService, "useParams").mockReturnValue({ id: "1" });
		jest.spyOn(getPokemonDetailService, "getPokemonDetail").mockRejectedValue(
			buildServiceError<getPokemonDetailServiceError>({
				type: "InvalidIdError",
				message: "Invalid id",
			})
		);

		// Act
		render(<PokemonDetail />);
		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		//Assert
		const errorMessage = screen.getByText(/Ha habido un error de carga/i);
		expect(errorMessage).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /Volver a la lista de pokemons/i })
		).toBeInTheDocument();
	});
});
