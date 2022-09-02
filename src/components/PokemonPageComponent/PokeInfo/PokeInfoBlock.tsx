import React from 'react';
import styles from './pokeinfo.module.scss';
import {PokemonSpecies, PokemonStore } from '../../../types/pokemonType';

type PokeInfoProps = {
  pokemon: PokemonStore | undefined,
  description: string,
}

const PokeInfoBlock: React.FC<PokeInfoProps> = ({pokemon, description}) => {

  return ( 
    <>
    {pokemon 
    ?
      <div className={styles.wrapper}>      
        <div className={styles.pokemonBlock}>
          <div className={styles.pokeImg}>
            <img src={pokemon.image} alt={pokemon.name}/>
          </div>
          <div className={styles.pokeInfo}>
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
            <div className={styles.versions}>
              <div>
                <p>Description</p>
              </div>
              <div className={styles.versionsText}>
                <p>{description}</p>
              </div>
            </div>
          </div>
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