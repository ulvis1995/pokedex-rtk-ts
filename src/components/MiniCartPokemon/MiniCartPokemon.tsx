import React from 'react';
import { Link } from 'react-router-dom';
import styles from './minicart.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { choosePokemon, fetchPokemonItem } from '../../store/slices/PokemonDataSlice';

interface MiniCartProps {
  name: string,
}
const MiniCartPokemon: React.FC<MiniCartProps> = ({name}) => {
  const pokemon = useAppSelector(state => 
    state.pokemonList.pokemonList[
      state.pokemonList.pokemonList.findIndex(
        poke => poke.name === name
      )])
  const dispatch = useAppDispatch();

  const nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1);

  React.useEffect(() => {
    if (!pokemon) {
    dispatch(fetchPokemonItem(name))
    }
  }, [])

  return (
      <div className={styles.pokemonItem}>
        <Link to={`/${name}`} className={styles.link}
          onClick={() => dispatch(choosePokemon(name))}>
          <div className={styles.imageBlock}>
            <img src={pokemon?.image} alt={pokemon?.name}/>
          </div>
          <div className={styles.infoBlock}>
            <span>{
            `#
            ${pokemon &&
              pokemon.id < 10
                ? '00'+pokemon.id
                : pokemon && pokemon.id >=10 && pokemon.id<100
                ? '0'+pokemon.id
                : pokemon?.id
              }`}</span>
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
        </Link>
      </div>
  )
}

export default React.memo(MiniCartPokemon);