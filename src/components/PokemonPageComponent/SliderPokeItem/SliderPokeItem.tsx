import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { choosePokemon, fetchPokemonItem } from '../../../store/slices/PokemonDataSlice';
import { PokemonStore } from '../../../types/pokemonType';
import styles from './sliderPoke.module.scss';

type SliderProps = {
  pokemon: PokemonStore | undefined
}

const SliderPokeItem: React.FC<SliderProps> = ({pokemon}) => {
  const dispatch = useAppDispatch ();

  const pokemonNext = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
      poke => poke.id === (pokemon && pokemon.id + 1)
    ))

  const pokemonPrev = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
      poke => poke.id === (pokemon && pokemon.id - 1)
    ))

  React.useEffect(() => {
    if (!pokemonNext && pokemon) {
      dispatch(fetchPokemonItem(pokemon.id+1))
    }
  
    if (!pokemonPrev && pokemon) {
      dispatch(fetchPokemonItem(pokemon.id-1))
    }
  }, [pokemon])

  const nameCapitalize = pokemon && 
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const nameCapNext = pokemonNext && 
    pokemonNext.name.charAt(0).toUpperCase() + pokemonNext.name.slice(1);
  const nameCapPrevious = pokemonPrev && 
    pokemonPrev.name.charAt(0).toUpperCase() + pokemonPrev.name.slice(1);

  return (
    <div className={styles.slider}>
      {pokemonPrev 
        ? 
        <Link to={{pathname: `/${pokemonPrev?.name}`}} 
          className={`${styles.pokemonStep} ${styles.left}`}
          onClick={() => dispatch(choosePokemon(pokemonPrev?.name))}>
          <button>&#10096;</button>
          <div>
            <p>{`${pokemonPrev &&
                pokemonPrev.id < 10
                  ? '00'+pokemonPrev.id
                  : pokemonPrev && pokemonPrev.id >=10 && pokemonPrev.id<100
                  ? '0'+pokemonPrev.id
                  : pokemonPrev?.id
                }`}</p>
            <p>{nameCapPrevious}</p>
          </div>
        </Link>
        : <div className={styles.pokemonStepEmpty}></div>}
      <div className={styles.pokemonId}>
        <p>{`${pokemon &&
              pokemon.id < 10
                ? '00'+pokemon.id
                : pokemon && pokemon.id >=10 && pokemon.id<100
                ? '0'+pokemon.id
                : pokemon?.id
              }`}
        </p>
        <p>{nameCapitalize}</p>
      </div>
      {pokemonNext
      ? <Link to={{pathname: `/${pokemonNext?.name}`}} 
          className={`${styles.pokemonStep} ${styles.right}`}
          onClick={() => dispatch(choosePokemon(pokemonNext?.name))}>
          <div>
            <p>{`${pokemonNext &&
                pokemonNext.id < 10
                  ? '00'+pokemonNext.id
                  : pokemonNext && pokemonNext.id >=10 && pokemonNext.id<100
                  ? '0'+pokemonNext.id
                  : pokemonNext?.id
                }`}</p>
            <p>{nameCapNext}</p>
          </div>
          <button>&#10097;</button>
        </Link>
        : <div className={styles.pokemonStepEmpty}></div>}
    </div>
  )
}

export default SliderPokeItem