import React from 'react';
import { Link } from 'react-router-dom';

import styles from './minicard.module.scss';
import pokeball from '../../img/pokeball-mini.png';

import LoadingMini from '../Loading/LoadingMinicard/LoadingMini';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { choosePokemon, fetchPokemonItem, loadingState } from '../../store/slices/PokemonDataSlice';
import { MiniCardProps } from '../../types/componentProps';
import { pokemonName, pokemonNumber } from '../../functions/pokemonData';

const MiniCardPokemon: React.FC<MiniCardProps> = ({name}) => {
  const loading = useAppSelector(state => state.pokemonList.isLoading)
  const pokemon = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
        poke => isNaN(Number(name)) 
        ? poke.name === name
        : poke.id === Number(name)
    ))
  const dispatch = useAppDispatch();  
  
  React.useEffect(() => {
    if (!pokemon) {
    dispatch(fetchPokemonItem(name))
    }
    dispatch(loadingState())
  }, [name])

  const nameCapitalize = pokemon && pokemonName(pokemon);
  const imagePokemon = pokemon?.image !== null 
    ? pokemon?.image : pokemon.image_2 !== null 
      ? pokemon.image_2 : pokeball

  return (
      <div className={styles.pokemonItem}>
        {loading && !pokemon
        ? <LoadingMini />
        :<Link to={`/${pokemon?.name}`} className={styles.link}
          onClick={() => dispatch(choosePokemon(pokemon?.name))}>
          <div className={styles.imageBlock}>
            <img src={imagePokemon} alt={pokemon?.name}/>
          </div>
          <div className={styles.infoBlock}>
            <span>
              {`#${pokemon && pokemonNumber(pokemon)}`}
            </span>
            <h3>{nameCapitalize}</h3>
            <div className={styles.types}>
              {pokemon?.types.map(type => (
                <p className={`${styles.typeItem} ` + type.type.name}
                  key={type.type.name}>
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
        </Link>}
      </div>
  )
}

export default React.memo(MiniCardPokemon);