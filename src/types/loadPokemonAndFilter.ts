export interface Results {
  name: string,
  url: string
}

//initialState for LoadPokemonSlice
export interface loadPokemonState {
  isLoadingFirst: boolean,
  isLoadingMore: boolean,
  error: string,
  next: string | null,
  previous: string | null,
  count: number | null,
  results: Results[]
}

//type for response to list pokemon
export interface loadPokemonResponse {
  count: number,
  next: string,
  previous: string,
  results: Results []
}

//initialState for TypesSlice
export interface TypesState {
  type: string | null,
  types: Results[],
  error: string,
  isLoading: boolean,
  pokemonType: Results[]
}

//type for response from list types
export interface typeResponse {
  count: number,
  next: string,
  previous: string,
  results: Results[]
} 

//type for response to each type
export interface typeItemResponse {
  damage_relations: {
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from:  [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: []
  },
  game_indices: [],
  generation: {name: string, url: string},
  id: number,
  move_damage_class: {name: string, url: string},
  moves: [],
  name: string,
  names: [],
  past_damage_relations: [],
  pokemon: {
    pokemon: {name: string, url: string},
    slot: number
  }[]
}
