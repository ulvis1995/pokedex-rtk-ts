import { PokemonResponse } from "../types/pokemonType"

export const pokemonDataResponse = (data: PokemonResponse) => {
  return {
    name: data.name,
    abilities: data.abilities,
    height: data.height,
    id: data.id,
    species: data.species.url,
    image: data.sprites.other.dream_world.front_default,
    image_2: data.sprites.other['official-artwork'].front_default,
    stats: data.stats,
    types: data.types, 
    weight: data.weight
  }
}