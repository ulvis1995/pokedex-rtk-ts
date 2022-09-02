import React from 'react';
import Filters from '../../components/Filters/Filters';
import MiniCartPokemon from '../../components/MiniCartPokemon/MiniCartPokemon';
import styles from './main.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchloadPokemon, Results } from '../../store/slices/LoadPokemonSlice';
import ButtonLoadMore from '../../components/Buttons/More/ButtonLoadMore';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadPokemon = useAppSelector(state => state.loadPokemon.results)
  const pokemons = loadPokemon.reduce((res: Results[], poke) => {
    if (!res.find(i => i.name === poke.name)) {
      res.push(poke)
    }
    return res
  }, [])

  React.useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchloadPokemon())
    }
  }, [])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <Filters />
        <div className={styles.block}>
          {pokemons.map((pokemon, index) => <MiniCartPokemon name={pokemon.name} key={index}/>)}
        </div>
        <ButtonLoadMore />
      </div>
    </div>
  )
}

export default React.memo(Main);