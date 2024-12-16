import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PokemonDetail.css";

import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import ReactLoading from "react-loading";
import { PokemonDetail as PokemonDetailEntity } from "../../domain/models/PokemonDetail";
import { isServiceError } from "../../domain/models/ServiceError";
import { getPokemonDetail } from "../../domain/services/getPokemonDetail";

export const PokemonDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailEntity>();
	const [error, setError] = useState<Error>();
	const [movements, setMovements] = useState<PokemonDetailEntity["moves"]>([]);

	useEffect(() => {
		const onLoad = async () => {
			try {
				const detail = await getPokemonDetail(id as string);
				setPokemonDetail(detail);
				setMovements(detail.moves.slice(0, 10));
			} catch (error: any) {
				if (isServiceError(error)) {
					setError(error);
					return;
				}
				throw error;
			}
		};

		onLoad();
	}, [id]);

	const handleDeleteClick = (name: string) => {
		setMovements(movements.filter((movement) => movement.name !== name));
	};

	if (error) {
		return (
			<main className='main-content'>
				Ha habido un error de carga:
				<p>{error.message}</p>
				<Link to='/pokemons'>Volver a la lista de pokemons</Link>
			</main>
		);
	}

	if (pokemonDetail === undefined) {
		return (
			<main className='main-content'>
				<ReactLoading
					type='balls'
					color='ffffff'
					height={66}
					width={66}
				/>
			</main>
		);
	}

	return (
		<main className='main-content'>
			<h1>Pokemon {pokemonDetail.name}</h1>
			<div className='pokemon-container'>
				<div className='pokemon-image'>
					<img
						src={pokemonDetail.sprites.back_default}
						alt={pokemonDetail.name}
					/>
				</div>
				<div className='pokemon-detail'>
					<h2 className='pokemon-detail-header'>Caracteristicas</h2>
					<div className='pokemon-detail-field__label'>
						<span>Id:</span>
						<span className='pokemon-detail-field__value'>
							<span>{pokemonDetail.id}</span>
						</span>
					</div>

					<div className='pokemon-detail-field__label'>
						<span> Forma solo en batalla:</span>
						<span className='pokemon-detail-field__value'>
							<span>{pokemonDetail.isBattleOnly ? "Si" : "No"}</span>
						</span>
					</div>

					<div className='pokemon-detail-field__label'>
						Habilidades:
						<div>
							<ul>
								{pokemonDetail.abilities.map((ability) => {
									return (
										<li
											className='pokemon-detail-field__value'
											key={ability.name}
										>
											{ability.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<div className='pokemon-detail-field__label'>
						Movimientos:
						<div>
							{movements.length > 0 ? (
								<ul>
									{movements.map((move) => {
										return (
											<li
												className='pokemon-detail-field__value'
												key={move.name}
											>
												<span>{move.name}</span>
												<Chip
													variant='outlined'
													color='danger'
													onClick={() => handleDeleteClick(move.name)}
													endDecorator={
														<ChipDelete
															color='danger'
															variant='plain'
															onClick={() => handleDeleteClick(move.name)}
														></ChipDelete>
													}
												>
													Eliminar
												</Chip>
											</li>
										);
									})}
								</ul>
							) : (
								<span className='pokemon-detail-field__value'>
									No hay movimientos
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
