import React from 'react';
import styles from './error.module.scss';
import pokeError from '../../img/errorMain.webp';

const ErrorMain: React.FC = () =>  {

  return (
    <div className={styles.error}>
      <h3>
        Что-то пошло не так... 
        Попробуйте вернуться через некоторое время или перезагрузить страничку
      </h3>
      <img src={pokeError}/>
    </div>
  )
}

export default ErrorMain;