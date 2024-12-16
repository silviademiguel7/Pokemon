import { PokemonDetailDTO } from "../dtos/PokemonDetailDTO";
import { IsBattleOnly, PokemonDetail } from "../models/PokemonDetail";


export const buildPokemonDetail = async (
    pokemonDetailDTO: PokemonDetailDTO, is_battle_only : IsBattleOnly
  ): Promise<PokemonDetail>  => {
    
    return {
      id: pokemonDetailDTO.id,
      name: pokemonDetailDTO.name,
      sprites: {
        back_default: pokemonDetailDTO.sprites.back_default,
      },
      abilities: pokemonDetailDTO.abilities
        .filter((ability) => !ability.is_hidden)
        .map((ability) => ({
          name: ability.ability.name,
          url: ability.ability.url,
        })),
      moves: pokemonDetailDTO.moves
        .map((move) => ({
          name: move.move.name,
          url: move.move.url,
        }))
        .sort((moveA, moveB) => highestToLowest(moveA.url, moveB.url)),
      isBattleOnly: is_battle_only,
    };
  }
  
  function highestToLowest(urlA: string, urlB: string) {
    const idMoveA = urlA
      .split('https://pokeapi.co/api/v2/move/')[1]
      .split('/')[0];
    const idMoveB = urlB
      .split('https://pokeapi.co/api/v2/move/')[1]
      .split('/')[0];
  
    return parseInt(idMoveB) - parseInt(idMoveA);
  }
  