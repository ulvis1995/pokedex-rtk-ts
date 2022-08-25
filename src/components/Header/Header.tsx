import React from 'react';
import styles from './header.module.scss';
import logo from '../../img/Pokédex_logo.webp';


 const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <img className={styles.img} src={logo}/>
      </div>
    </div>
  )
}

export default Header;