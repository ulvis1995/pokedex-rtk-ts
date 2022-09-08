import React from 'react';
import styles from './header.module.scss';
import logo from '../../img/Pokédex_logo.webp';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { searchPokemon } from '../../store/slices/LoadPokemonSlice';
import ball from '../../img/pokeball-mini.png'


 const Header: React.FC = () => {
  const dispatch = useAppDispatch();
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