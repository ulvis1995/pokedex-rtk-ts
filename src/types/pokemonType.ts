export interface Pokemon {
  abilities: {
    ability: {name: string; url: string}, 
    is_hidden: boolean, 
    slot: number}[],
  base_experience: number,
  forms: {name: string, url: string}[],
  game_indices: {game_index: number, version: {name: string, url: string}}[],
  height: number,
  held_items: [],
  id: number,
  is_default?: boolean,
  location_area_encounters?: string,
  moves: {move: {name: string, url: string}, version_group_details: []}[],
  name: string,
  order: number,
  past_types: [],
  species: {name: string, url: string},
  sprites: {
    back_default: string | null, 
    back_female: string | null, 
    back_shiny: string | null, 
    back_shiny_female: string | null, 
    front_default: string | null, 
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null,
    other: {
      dream_world: {
        front_default: string,
        front_female: string | null
      },
      home: {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      },
      'official-artwork': {
        front_default: string | null
      },
    },
    versions: object,
  },
  stats: {base_stat: number, effort: number, stat: {name: string, url: string}}[],
  types: {slot: number, type: {name: string, url: string}}[],
  weight: number,
} 

export interface PokemonStore {
  abilities: {
    ability: {name: string; url: string}, 
    is_hidden: boolean, 
    slot: number}[],
  height: number,
  id: number,
  name: string,
  species: string,
  stats: {base_stat: number, effort: number, stat: {name: string, url: string}}[],
  types: {slot: number, type: {name: string, url: string}}[],
  weight: number,
  image: string,
} 

export interface PokemonSpecies {
  description: string,
  species: string
}

export interface EvolutionChain {
  baby_trigger_item: boolean,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: []
        evolves_to: [{
          evolution_details: [],
          evolves_to: [],
          is_baby: boolean,
          species: {name: string, url: string},
        }]
        is_baby: boolean
        species: {name: string, url: string},
      }
    ],
    is_baby: boolean,
    species: {name: string, url: string},
  }
  id: number,
}