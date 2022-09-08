// types data about pokemon for write store
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
  image_2: string
} 

//initialState from PokemonDataSlice
export interface pokemonListState {
  pokemonList: PokemonStore[],
  currentPokemon: string ,
  error: string ,
  isLoading: boolean,
  compare: string[]
}

//type for response to each pokemon
export interface PokemonResponse {
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
        front_default: string
      },
    },
    versions: object,
  },
  stats: {base_stat: number, effort: number, stat: {name: string, url: string}}[],
  types: {slot: number, type: {name: string, url: string}}[],
  weight: number,
} 

//type for response from evolution chain
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