import React from 'react';
import styles from './footer.module.scss';
import logoApi from '../../img/pokeapi.png';
import logoPokemon from '../../img/poke-logo.png'

const Footer: React.FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <div className={styles.blockItem}>
          <a href='https://pokeapi.co/' target="_blank">
            <p>Created with</p>
            <img src={logoApi} />
          </a>
        </div>
        <div className={styles.blockItem}>          
          <a href='https://www.pokemon.com/' target="_blank">
            <p>Original website</p>
            <img src={logoPokemon} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;