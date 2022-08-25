import React from 'react';
import Filters from '../Filters/Filters';
import MiniCartPokemon from '../MiniCartPokemon/MiniCartPokemon';
import styles from './main.module.scss';

const Main: React.FC = () => {

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <Filters />
        <div className={styles.block}>
          <MiniCartPokemon />          
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
          <MiniCartPokemon />
        </div>
      </div>
    </div>
  )
}

export default Main;