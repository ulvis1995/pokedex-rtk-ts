import React from 'react';
import styles from './pokeinfo.module.scss';
import bulb from '../../../img/1.svg';
import { useAppSelector } from '../../../app/hooks';
import axios from 'axios';
import { Pokemon, PokemonSpecies } from '../../../types/pokemonType';

type PokeInfoProps = {
  pokemon: Pokemon | undefined
}

const PokeInfoBlock: React.FC<PokeInfoProps> = ({pokemon}) => {
  const [species, setSpecies] = React.useState<PokemonSpecies | null>(null);

  const loadDescpription = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon?.name}`)
    const data = response.data
    setSpecies(data)
  }

  React.useEffect(() => {
    loadDescpription()
  }, [])

  const imagePokemon = pokemon?.sprites?.other?.dream_world?.front_default;

  return ( 
    <div className={styles.wrapper}>      
      <div className={styles.pokemonBlock}>
        <div className={styles.pokeImg}>
          <img src={imagePokemon ? imagePokemon : ''} alt={pokemon?.name}/>
        </div>
        <div className={styles.pokeInfo}>
          <div>
            <p>Height</p>
            <span>{`${pokemon && pokemon.height/10}m`}</span>
          </div>
          <div>
            <p>Weight</p>
            <span>{`${pokemon && pokemon.weight/10}kg`}</span>
          </div>
          <div>
            <p>Abilities</p>
            {pokemon && pokemon.abilities.map(item => <span key={item.ability.name}>{!item.is_hidden ? item.ability.name : ''}</span>)}
          </div>
          <div className={styles.versions}>
            <div>
              <p>Description</p>
            </div>
            <div className={styles.versionsText}>
              <p>{species?.flavor_text_entries[0].flavor_text}</p>
            </div>
          </div>
        </div>
      </div>    
      <div className={styles.types}>
        <h3>Types</h3>
        {pokemon?.types.map(type => (
                <p className={`${styles.typeItem} ` + type.type.name}
                  key={type.type.name}>
                  {type.type.name}
                </p>
              ))}
      </div>
      <div className={styles.stats_block}>
        <h3>Stats</h3>
        <div className={styles.stats}>
          {pokemon?.stats.map(stat => {
            const remain = 200 - stat.base_stat
            const divStyle = {
              background: `linear-gradient( #304079 ${remain}px, #d7d5af ${stat.base_stat}px)`
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
  )
}

export default PokeInfoBlock