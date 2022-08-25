import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './minicart.module.scss';
import bulb from '../../img/1.svg';

const MiniCartPokemon: React.FC = () => {
  return (
    // <Link to={`/`}>
      <div className={styles.pokemonItem}>
        <div className={styles.imageBlock}>
          <img src={bulb} />
        </div>
        <div className={styles.infoBlock}>
          <span>#001</span>
          <h3>Bulbasaur</h3>
          <div className={styles.types}>
            <p>Grass</p>
            <p>Poison</p>
          </div>
        </div>
      </div>
    // {/* </Link> */}
  )
}

export default MiniCartPokemon;