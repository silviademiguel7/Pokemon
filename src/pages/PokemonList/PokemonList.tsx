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
import styled from 'styled-components';

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
      <Container>
        <ReactLoading type='balls' color='ffffff' height={66} width={66} />
      </Container>
    );
  }
  if (error) {
    return <Container>Ha habido un error de carga</Container>;
  }
  return (
    <Container>
      <h1>Pokemons</h1>
      <SearchWrapper>
        <SearchLabel htmlFor='inputText'>Busca pokemons</SearchLabel>
        <SearchInput
          type='text'
          id='inputText'
          name='inputText'
          placeholder='...'
          onChange={handleChangeFilter}
        />
      </SearchWrapper>
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
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  height: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 20px 0px;
`;

const SearchInput = styled.input`
  border-color: aquamarine;
  border: solid 3px rgb(120, 160, 160);
  height: 25px;
  width: 400px;
  font-size: 20px;
  color: rgb(34, 30, 30);
  padding: 17px;
`;

const SearchLabel = styled.label`
  margin-right: 8px;
`;
