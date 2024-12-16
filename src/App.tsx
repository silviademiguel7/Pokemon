import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { errorEventsInterceptor } from "./errorEventsInterceptor";
import { PokemonDetail } from "./pages/PokemonDetail/PokemonDetail";
import { PokemonList } from "./pages/PokemonList/PokemonList";
import { ServerErrorModal } from "./pages/components/ServerErrorModal";

export const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => errorEventsInterceptor(() => setIsOpen(true)), []);

	return (
		<BrowserRouter>
			<div className='App-wrapper'>
				<ServerErrorModal
					open={isOpen}
					onClose={() => setIsOpen(false)}
				/>
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
