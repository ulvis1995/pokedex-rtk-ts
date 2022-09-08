import { Results } from "../types/loadPokemonAndFilter"
import { PokemonStore } from "../types/pokemonType"

export const reduceArrayPokemons = (array: Results[]) => {
  return array.reduce((res: Results[], poke) => {
    if (!res.find(i => i.name === poke.name)) {
      res.push(poke)
    }
    return res
  }, [])
}

export const reduceArrayPokemonsStore = (array: PokemonStore[]) => {
  return array.reduce((res: PokemonStore[], poke) => {
    if (!res.find(i => i.name === poke.name)) {
      res.push(poke)
    }
    return res
  }, [])
}