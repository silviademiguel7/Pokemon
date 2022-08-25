import React, { useState, useEffect } from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';
import {
  getPokemonDetail,
  PokemonDetail as PokemonDetailEntity,
} from '../../services/getPokemonDetail.ts';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

export const PokemonDetail = () => {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pokemonDetail, setPokemonDetail] =
    useState<PokemonDetailEntity>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movements, setMovements] = useState<PokemonDetailEntity['moves']>([]);

  const onLoad = async () => {
    if (id === undefined || isNaN(parseInt(id))) {
      navigate('/pokemons/', { replace: true });
      return;
    }
    try {
      const detail = await getPokemonDetail(id);
      setPokemonDetail(detail);
      setMovements(detail.moves.slice(0, 10));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleDeleteClick = (name: string) => {
    setMovements(movements.filter((movement) => movement.name !== name));
  };

  if (isLoading) {
    return (
      <main className='main-content'>
        <ReactLoading type='balls' color='ffffff' height={66} width={66} />
      </main>
    );
  }

  if (error) {
    return <main className='main-content'>Ha habido un error de carga</main>;
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
              <span>{pokemonDetail.isBatleOnlue ? 'Si' : 'No'}</span>
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
              <ul>
                {movements.map((move) => {
                  return (
                    <li className='pokemon-detail-field__value' key={move.name}>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
