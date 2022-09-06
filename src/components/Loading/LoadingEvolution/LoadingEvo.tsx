import React from 'react';
import styles from './loadingEvo.module.scss'

const LoadingEvo: React.FC = () => {
  return (
    <div className={styles.evo}>
      <h1>Проверка эволюции...</h1>
    </div>
  )
}

export default React.memo(LoadingEvo);