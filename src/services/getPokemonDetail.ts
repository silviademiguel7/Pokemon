import axios from 'axios';

//This interface don`t have all type definition
interface PokemonDetailDTO {
  id: string;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  forms: [{ name: string; url: string }];
  game_indices: [
    { game_index: number; version: { name: string; url: string } }
  ];
  held_items: [
    {
      item: { name: string; url: string };
      version_details: [
        { version: { name: string; url: string }; rarity: number }
      ];
    }
  ];
  location_area_encounters: string;
  moves: {
    move: { name: string; url: string };
    version_group_details: [
      {
        version_group: { name: string; url: string };
        level_learned_at: number;
        move_learn_method: { name: string; url: string };
      }
    ];
  }[];
  species: { name: string; url: string };
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  stats: [
    { base_stat: number; effort: number; stat: { name: string; url: string } }
  ];
  types: [{ type: { name: string; url: string } }];
}

export interface PokemonDetail {
  id: string;
  name: string;
  sprites: { back_default: string };
  abilities: {
    name: string;
    url: string;
  }[];
  moves: {
    name: string;
    url: string;
  }[];
  isBattleOnly: boolean;
}

export const getPokemonDetail = async (id: string) => {
  const { data } = await axios.get<PokemonDetailDTO>(
    'https://pokeapi.co/api/v2/pokemon/' + id
  );

  return pokemonDetailDTOToPokemonDetail(data);
};

async function getInfoPokemonForm(idForm: string) {
  const { data } = await axios.get<{ id: string; is_battle_only: boolean }>(
    'https://pokeapi.co/api/v2/pokemon-form/' + idForm
  );
  const { id, is_battle_only } = data;
  return {
    id,
    is_battle_only,
  };
}

async function pokemonDetailDTOToPokemonDetail(
  pokemonDetailDTO: PokemonDetailDTO
): Promise<PokemonDetail> {
  const { is_battle_only } = await getInfoPokemonForm(pokemonDetailDTO.id);

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
