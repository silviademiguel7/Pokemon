import { render, screen } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import * as getPokemonListService from '../../services/getPokemonList';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();
jest.mock('../../services/getPokemonList.ts');
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('PokemonList', () => {
  it('should render correctly', async () => {
    jest.spyOn(getPokemonListService, 'getPokemonList').mockResolvedValue([
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/12',
      },
    ]);
    render(<PokemonList />);

    const pokemonName = await screen.findByText('pikachu');

    expect(getPokemonListService.getPokemonList).toHaveBeenCalled();
    expect(pokemonName).toBeInTheDocument();
  });

  it('when click on pokemon go to deatil', async () => {
    jest.spyOn(getPokemonListService, 'getPokemonList').mockResolvedValue([
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/12',
      },
    ]);
    render(<PokemonList />);

    const pokemonName = await screen.findByText('pikachu');
    userEvent.click(pokemonName);

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  it('can search pokemons by name', async () => {
    jest.spyOn(getPokemonListService, 'getPokemonList').mockResolvedValue([
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/12',
      },
      {
        name: 'ditto',
        url: 'https://pokeapi.co/api/v2/pokemon/13',
      },
    ]);
    render(<PokemonList />);

    const pikachu = await screen.findByText('pikachu');
    const ditto = screen.getByText('ditto');

    const searchInput = screen.getByPlaceholderText('...');
    userEvent.type(searchInput, 'ditto');

    expect(pikachu).not.toBeInTheDocument();
    expect(ditto).toBeInTheDocument();
  });
});
