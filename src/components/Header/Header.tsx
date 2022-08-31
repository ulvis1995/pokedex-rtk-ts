import React from 'react';
import styles from './header.module.scss';
import logo from '../../img/Pokédex_logo.webp';
import { Link } from 'react-router-dom';


 const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Link to={`/`} className={styles.link}>
          <img className={styles.img} src={logo}/>
        </Link>
      </div>
    </div>
  )
}

export default Header;