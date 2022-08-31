import React from 'react';
import Filters from '../../components/Filters/Filters';
import MiniCartPokemon from '../../components/MiniCartPokemon/MiniCartPokemon';
import styles from './main.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFirstLoading } from '../../store/slices/FirstLoadingSlice';

const Main: React.FC = () => {
  const firstLoading = useAppSelector(state => state.firstLoading.firstLoading)

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchFirstLoading())
  }, [])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <Filters />
        <div className={styles.block}>
          {firstLoading?.results.map((pokemon, index) => <MiniCartPokemon name={pokemon.name} key={index}/>)}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Main);