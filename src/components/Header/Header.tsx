import React from 'react';
import styles from './header.module.scss';
import logo from '../../img/Pokédex_logo.webp';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { searchPokemon } from '../../store/slices/LoadPokemonSlice';


 const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Link to={`/`} className={styles.link}
          onClick={() => dispatch(searchPokemon(null))}>
          <img className={styles.img} src={logo}/>
        </Link>
      </div>
    </div>
  )
}

export default Header;