import React from 'react';
import { Link } from 'react-router-dom';

import styles from './sliderPoke.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { choosePokemon, fetchPokemonItem } from '../../../store/slices/PokemonDataSlice';
import { SliderProps } from '../../../types/componentProps';
import { pokemonName, pokemonNumber } from '../../../functions/pokemonData';

const SliderPokeItem: React.FC<SliderProps> = ({pokemon}) => {
  const dispatch = useAppDispatch ();

  const pokemonNext = useAppSelector(state => 
    state.pokemonList.pokemonList.find(poke => {
      if (pokemon && pokemon.id + 1 === 906) {
        return poke.id === 1
      }
      return poke.id === (pokemon && pokemon.id + 1)}
    ))

  const pokemonPrev = useAppSelector(state => 
    state.pokemonList.pokemonList.find(poke => { 
      if (pokemon && pokemon.id - 1 === 0) {
        return poke.id === 905
      } 
      return poke.id === (pokemon && pokemon.id - 1)}
    ))

  React.useEffect(() => {
    if (!pokemonNext && pokemon && (pokemon.id + 1 < 906)) {
      dispatch(fetchPokemonItem(pokemon.id+1))
    }
  
    if (!pokemonPrev && pokemon && (pokemon.id - 1 !== 0) && (pokemon.id < 906) ) {
      dispatch(fetchPokemonItem(pokemon.id-1))
    }
  }, [pokemon])

  const nameCapitalize = pokemon && pokemonName(pokemon);
  const nameCapNext = pokemonNext && pokemonName(pokemonNext);
  const nameCapPrevious = pokemonPrev && pokemonName(pokemonPrev);

  return (
    <div className={styles.slider}>
      {pokemonPrev 
        ? 
        <Link to={{pathname: `/${pokemonPrev?.name}`}} 
          className={`${styles.pokemonStep} ${styles.left}`}
          onClick={() => dispatch(choosePokemon(pokemonPrev?.name))}>
          <button>&#10096;</button>
          <div>
            <p>{pokemonNumber(pokemonPrev)}</p>
            <p>{nameCapPrevious}</p>
          </div>
        </Link>
        : <div className={styles.pokemonStepEmpty}></div>}
      <div className={styles.pokemonId}>
        <p>{pokemon && pokemonNumber(pokemon)}
        </p>
        <p>{nameCapitalize}</p>
      </div>
      {pokemonNext
      ? <Link to={{pathname: `/${pokemonNext?.name}`}} 
          className={`${styles.pokemonStep} ${styles.right}`}
          onClick={() => dispatch(choosePokemon(pokemonNext?.name))}>
          <div>
            <p>{pokemonNumber(pokemonNext)}</p>
            <p>{nameCapNext}</p>
          </div>
          <button>&#10097;</button>
        </Link>
        : <div className={styles.pokemonStepEmpty}></div>}
    </div>
  )
}

export default SliderPokeItem;