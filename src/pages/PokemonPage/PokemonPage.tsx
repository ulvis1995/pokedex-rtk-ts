import React from 'react';
import SliderPokeItem from '../../components/PokemonPageComponent/SliderPokeItem/SliderPokeItem';
import styles from './pokemon.module.scss';
import PokeInfoBlock from '../../components/PokemonPageComponent/PokeInfo/PokeInfoBlock';
import { useAppSelector } from '../../app/hooks';

type PokemonPageProps = {
  name: string | null
}

const PokemonPage: React.FC<PokemonPageProps> = ({name}) =>  {
  const pokemon = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
      poke => poke.name === name
    ))

  return (
    <div className={styles.pokemon_item_wrapper}>
      <div className={styles.pokemonContent}>
        <SliderPokeItem pokemon={pokemon}/>
        <PokeInfoBlock pokemon={pokemon}/>
      </div>
    </div>
  )
}

export default PokemonPage