import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { errorEventsInterceptor } from "./errorEventsInterceptor";
import { PokemonDetail } from "./pages/PokemonDetail/PokemonDetail";
import { PokemonList } from "./pages/PokemonList/PokemonList";

export const App = () => {
	useEffect(() => errorEventsInterceptor(), []);
	return (
		<BrowserRouter>
			<div className='App-wrapper'>
				<Routes>
					<Route
						path='/'
						element={
							<Navigate
								to='/pokemons'
								replace
							/>
						}
					/>
					<Route
						path='/pokemons/:id'
						element={<PokemonDetail />}
					/>
					<Route
						path='/pokemons'
						element={<PokemonList />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
};
