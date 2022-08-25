import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import { getPokemonList, Pokemon } from '../../services/getPokemonList.ts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

export const PokemonList = () => {
  let navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const pokemonListResponse = await getPokemonList();
        setPokemons(pokemonListResponse);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    onLoad();
  }, []);

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value.toUpperCase();
    setFilterValue(filterValue);
  };

  const handleClickPokemon = (url: string) => {
    const idUrl = url.split('https://pokeapi.co/api/v2/pokemon/')[1];
    const id = idUrl.split('/')[0];
    navigate(`/pokemons/${id}`, { replace: true });
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
      <h1 className='title'>Pokemons</h1>
      <div className='search-container__filterInput'>
        <label htmlFor='inputText'>Search pokemons</label>
        <input
          type='text'
          id='inputText'
          name='inputText'
          placeholder='Busca tu pokemon'
          onChange={handleChangeFilter}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons
              .filter((pokemon) =>
                pokemon.name.toUpperCase().includes(filterValue)
              )
              .map((pokemon) => (
                <TableRow
                  key={pokemon.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    handleClickPokemon(pokemon.url);
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {pokemon.name}
                  </TableCell>
                  <TableCell align='right'>{pokemon.url}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
