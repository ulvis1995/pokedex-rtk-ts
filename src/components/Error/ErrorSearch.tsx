import React from 'react';
import styles from './error.module.scss';
import pokeError from '../../img/errorPoke.png';

const Error: React.FC = () =>  {

  return (
    <div className={styles.error}>
      <h3>
        Такого покемона не существует. 
        Скорректируйте, пожалуйста, ваш запрос.
      </h3>
      <img src={pokeError}/>
    </div>
  )
}

export default Error;