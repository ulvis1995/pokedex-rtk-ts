import React from 'react';
import pokeball from '../../../img/pokeballLoad.png';
import styles from './loadingMini.module.scss';
import { Skeleton } from 'antd';

const LoadingMini: React.FC = () =>  {
  return (
    <div className={styles.loading}>
      <div className={styles.imageBlock}>
        <img src={pokeball} alt='Loading...' />
      </div>
      <div className={styles.info}>
        <Skeleton active loading paragraph={{rows: 3}}/>
      </div>
    </div>
  )
}

export default React.memo(LoadingMini);