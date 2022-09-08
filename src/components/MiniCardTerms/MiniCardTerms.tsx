import React from 'react';
import styles from './miniCartTerms.module.scss';

import MiniCartPokemon from '../MiniCartPokemon/MiniCardPokemon';
import Error from '../Error/ErrorSearch';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchloadPokemon} from '../../store/slices/LoadPokemonSlice';
import { fetchPokemonItem } from '../../store/slices/PokemonDataSlice';
import { MiniCardTermsProps } from '../../types/componentProps';


const MiniCardTerms: React.FC<MiniCardTermsProps> = (props) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector (state => state.pokemonList.error);
  const pokemonType = useAppSelector (state => state.types.pokemonType);

  React.useEffect(() => {
    if (props.search !== null) {
      dispatch(fetchPokemonItem(props.search))
    }
    if (props.search === null && props.pokemons.length === 0) {
      dispatch(fetchloadPokemon())
    }
  }, [props.search, props.urlType])

  return (
    <>
    {props.search !== null
      ? error === 'Pokemon not found'
        ? <Error />
        : <div className={styles.block}>
            <MiniCartPokemon name={props.search}/>
          </div>
      : <div className={styles.block}>
        {(props.urlType !== null ? pokemonType : props.pokemons)
          .map((pokemon, index) => 
            <MiniCartPokemon name={pokemon.name} key={index}/>)}
        </div>
      }
    </>
  )
}

export default MiniCardTerms;