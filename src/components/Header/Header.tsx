import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';
import logo from '../../img/Pokédex_logo.webp';
import ball from '../../img/pokeball-mini.png';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchPokemon } from '../../store/slices/PokemonDataSlice';


 const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector( state => state.pokemonList.compare);
  
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <div>
        <Link to={`/`} className={styles.link}
          onClick={() => dispatch(searchPokemon(null))}>
          <img className={styles.img} src={logo}/>
        </Link>
        </div>
        <div>
        <Link to={'/compare'} className={styles.link}>
          <div className={styles.compare}>
            <div className={styles.image}>
              <img src={ball}/>
              <p>&#10073;</p>
              <img src={ball}/>
              {count.length === 0 ? '' : <p className={styles.counter}>{count.length}</p>}
            </div>
            <div className={styles.text}>
              <p>Сравнилка</p>
            </div>
          </div>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;