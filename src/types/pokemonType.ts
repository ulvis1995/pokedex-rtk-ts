export interface Pokemon {
  abilities: {
    ability: {name: string; url: string}, 
    is_hidden: boolean, 
    slot: number}[],
  base_experience: number,
  forms: {name: string, url: string}[],
  game_indices: {game_index: number, version: {name: string, url: string}}[]
  height: number
  held_items: []
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: {move: {name: string, url: string}, version_group_details: []}[]
  name: string
  order: number
  past_types: []
  species: {name: string, url: string}
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
        front_default: string | null | undefined,
        front_female: string | null | undefined
      } | undefined,
      home: {
        front_default: string | null
        front_female: string | null
        front_shiny: string | null
        front_shiny_female: string | null
      },
      'official-artwork': {
        front_default: string | null
      },
    } | undefined,
    versions: object,
  } | undefined
  stats: {base_stat: number, effort: number, stat: {name: string, url: string}}[],
  types: {slot: number, type: {name: string, url: string}}[],
  weight: number,
} 

export interface PokemonSpecies {
  base_happiness: number,
  capture_rate: number,
  color: {name: string, url: string},
  egg_groups: {name: string, url: string} [],
  evolution_chain: {url: string},
  evolves_from_species: {name: string, url: string},
  flavor_text_entries: {
    flavor_text: string,
    language: {name: string, url: string},
    version: {name: string, url: string}
  } [],
  form_descriptions: [],
  forms_switchable: boolean,
  gender_rate: number,
  genera: [],
  generation: {name: string, url: string},
  growth_rate: {name: string, url: string},
  habitat: {name: string, url: string},
  has_gender_differences: boolean,
  hatch_counter: number,
  id: number,
  is_baby: boolean,
  is_legendary: boolean,
  is_mythical: boolean,
  name: string,
  names: {language: {name: string, url: string}}[],
  order: number
  pal_park_encounters: []
  pokedex_numbers: []
  shape: {name: string, url: string}
  varieties: []
}