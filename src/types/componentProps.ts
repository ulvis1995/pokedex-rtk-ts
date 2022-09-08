import { Results } from "./loadPokemonAndFilter";
import { PokemonStore } from "./pokemonType";

export interface ButtonCompareProps {
  name: string,
  children: React.ReactNode,
}

export interface ButtonProps {
  children: React.ReactNode,
}

export interface MiniCardProps {
  name: string,
}

export interface MiniCardTermsProps {
  search: string | null,
  pokemons: Results[],
  urlType: string | null
}

export interface PokeInfoProps {
  pokemon: PokemonStore | undefined,
  description: string,
}

export interface PokeEvolutionProps {
  species: string,
}

export interface PokemonPageProps {
  name: string
}

export interface PhysicalProps {
  pokemon: PokemonStore,
  description: string | undefined
}

export interface SliderProps {
  pokemon: PokemonStore | undefined
}