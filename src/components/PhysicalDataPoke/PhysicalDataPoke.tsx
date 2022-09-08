import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './physical.module.scss';
import { PhysicalProps } from '../../types/componentProps';

const PhysicalDataPoke: React.FC<PhysicalProps> = ({pokemon, description}) => {
  const location = useLocation();

  return (
    <div className={`${styles.pokeInfo} ${location.pathname === '/compare' ? styles.compare : ''}`}>
      <div>
        <p>Height</p>
        <span>{`${pokemon.height/10}m`}</span>
      </div>
      <div>
        <p>Weight</p>
        <span>{`${pokemon.weight/10}kg`}</span>
      </div>
      <div>
        <p>Abilities</p>
        { pokemon.abilities.map(item => <span key={item.ability.name}>{!item.is_hidden ? item.ability.name : ''}</span>)}
      </div>
      {description && description !== ''
      ?<div className={styles.versions}>
        <div>
          <p>Description</p>
        </div>
        <div className={styles.versionsText}>
          <p>{description}</p>
        </div>
      </div>
      : ''}
    </div>
  )
}

export default PhysicalDataPoke;