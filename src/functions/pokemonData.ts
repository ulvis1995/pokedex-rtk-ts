import { PokemonStore } from "../types/pokemonType"

export const pokemonNumber = (poke: PokemonStore) => {
  return `${poke &&
    poke.id < 10
      ? '00'+poke.id
      : poke && poke.id >=10 && poke.id<100
      ? '0'+poke.id
      : poke?.id
    }`
}

export const pokemonName = (pokemon: PokemonStore) => {
  return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
}