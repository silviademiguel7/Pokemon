import React, { useEffect, useState } from 'react';
import { getPokemonList, Pokemon } from '../../services/getPokemonList.ts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const pokemonListResponse = await getPokemonList();
        setPokemons(pokemonListResponse);
        setPokemonsFiltered(pokemonListResponse);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    onLoad();
  }, []);

  const handleSearchPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toUpperCase();
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toUpperCase().includes(search)
    );
    setPokemonsFiltered(filteredPokemons);
  };
  return (
    <>
      <h1 className='title'>Pokemon List</h1>

      <label htmlFor='site-search'>Search pokemons:</label>
      <input
        id='site-search'
        name='site-search'
        onChange={handleSearchPokemon}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonsFiltered.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
