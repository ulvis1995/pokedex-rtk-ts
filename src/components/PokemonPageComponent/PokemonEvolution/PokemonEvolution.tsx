import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addPokemon, choosePokemon } from '../../../store/slices/PokemonDataSlice';
import { EvolutionChain, PokemonStore } from '../../../types/pokemonType';
import styles from './evolution.module.scss';

type PokeInfoProps = {
  species: string,
}

const PokemonEvolution:React.FC<PokeInfoProps> = ({species}) => {
  const dispatch = useAppDispatch();
  const pokemonBase = useAppSelector(state => state.pokemonList.pokemonList)
  const [evolutionListUrl, setEvolUrl] = React.useState<EvolutionChain | undefined>();
  const [evolutionList, setPokemons] = React.useState<PokemonStore[]>([]);

  const loadSpecies = async () => {
    if (species) {
      const response = await axios.get(species)
      const data = response.data;
      setEvolUrl(data)
    }
  }

  React.useEffect(() => {
    loadSpecies()
  }, [species])

  const firstStep = evolutionListUrl?.chain?.species.name;
  const secondStep = evolutionListUrl?.chain?.evolves_to?.[0]?.species?.name;
  const firdStep = evolutionListUrl?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name;

  const loadEvolutionStep = async (name: string | undefined) => {
    if (name) {
      const pokemonLoad = pokemonBase.find(poke => poke.name === name)
      if (pokemonLoad) {
        setPokemons((prev) => [...prev, {...pokemonLoad}])
      } else {
        const responce = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await responce.data;
        const newPokemon = {
          name: data.name,
          abilities: data.abilities,
          height: data.height,
          id: data.id,
          species: data.species.url,
          image: data.sprites.other.dream_world.front_default,
          stats: data.stats,
          types: data.types, 
          weight: data.weight
        }
        setPokemons((prev) => [...prev, {...newPokemon}])
        dispatch(addPokemon(newPokemon))
      }
    }    
  }

  const fetchEvolution = async () => {
    await loadEvolutionStep(firstStep);
    await loadEvolutionStep(secondStep);
    await loadEvolutionStep(firdStep);
  }

  React.useEffect(() => {
    if (evolutionListUrl) {
      fetchEvolution();
      return () => {
        setPokemons([])
      }
    }
  }, [evolutionListUrl])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>Evolution</h2>
      </div>
      <div className={styles.evolution_list}>
        {evolutionList.map(poke => {
          const imagePokemon = poke?.image
          
          return (
            <Link to={{pathname: `/${poke.name}`}} 
              className={styles.evolution_item}
              key={poke.name}
              onClick={() => dispatch(choosePokemon(poke.name))}>
              <div className={styles.imageBlock}>
                <img src={imagePokemon ? imagePokemon : ''} alt={poke?.name}/>
              </div>
              <div className={styles.info}>
                <h3>{poke?.name}</h3>
                <div className={styles.types}>
                  {poke?.types.map(type => 
                    <p className={`${styles.typeItem} ` + type.type.name}
                      key={type.type.name}>
                      {type.type.name}
                    </p>
                    )}
                </div>
              </div>
            </Link >
          )})}
      </div>
    </div>
  )
}

export default PokemonEvolution;