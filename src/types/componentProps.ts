import { PokemonStore } from "./pokemonType";

export interface ButtonCompareProps {
  name: string,
  children: React.ReactNode,
}

export interface ButtonProps {
  children: React.ReactNode,
}

export interface MiniCartProps {
  name: string,
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