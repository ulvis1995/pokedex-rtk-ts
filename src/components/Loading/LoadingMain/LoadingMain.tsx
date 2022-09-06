import React from 'react';
import gif from '../../../img/gif.gif';
import styles from './loadingMain.module.scss'

const LoadingMain: React.FC = () => {
  return (
    <div className={styles.wrapperLoad}>
      <h1>Загружаем данные...</h1>
      <img src={gif} alt='Загрузка'/>
    </div>
  )
}

export default React.memo(LoadingMain);