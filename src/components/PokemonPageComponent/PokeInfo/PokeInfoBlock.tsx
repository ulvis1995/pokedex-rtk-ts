import React from 'react';
import styles from './pokeinfo.module.scss';
import pokeball from '../../../img/pokeball-mini.png';

import ButtonCompare from '../../Buttons/ButtonCompare/ButtonCompare';
import PhysicalDataPoke from '../../PhysicalDataPoke/PhysicalDataPoke';

import { PokeInfoProps } from '../../../types/componentProps';

const PokeInfoBlock: React.FC<PokeInfoProps> = ({pokemon, description}) => {
  const imagePokemon = 
    pokemon?.image !== null ? pokemon?.image : pokemon.image_2 !== null 
      ? pokemon.image_2 : pokeball

  return ( 
    <>
    {pokemon 
    ?<div className={styles.wrapper}>      
        <div className={styles.pokemonBlock}>
          <div className={styles.pokeImg}>
            <img src={imagePokemon} alt={pokemon.name}/>
          </div>
          <PhysicalDataPoke pokemon={pokemon} description={description}/>
          <ButtonCompare name={pokemon.name}>Сравнить</ButtonCompare>
        </div>    
        <div className={styles.types}>
          <h3>Types</h3>
          {pokemon.types.map(type => (
                  <p className={`${styles.typeItem} ` + type.type.name}
                    key={type.type.name}>
                    {type.type.name}
                  </p>
                ))}
        </div>
        <div className={styles.stats_block}>
          <h3>Stats</h3>
          <div className={styles.stats}>
            {pokemon.stats.map(stat => {
              const remain = 200 - stat.base_stat
              const divStyle = {
                background: `linear-gradient(180deg, #304079 ${remain}px, #d7d5af ${stat.base_stat}px)`
              }

              return (
                <div key={stat.stat.name} className={styles.stat_item}>
                  <div style={divStyle}><p>{stat.base_stat}</p></div>
                  <p>{stat.stat.name}</p>
                </div>
                )}
            )}
          </div>
        </div>
      </div>
    : <div className={styles.wrapper}>Ошибка загрузки</div>} 
    </>
  )
}

export default PokeInfoBlock