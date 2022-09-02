import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { choosePokemon } from '../../../store/slices/PokemonDataSlice';
import { EvolutionChain, Pokemon } from '../../../types/pokemonType';
import styles from './evolution.module.scss';

type PokeInfoProps = {
  species: string,
}

const PokemonEvolution:React.FC<PokeInfoProps> = ({species}) => {
  const dispatch = useAppDispatch();
  const [evolutionListUrl, setEvolUrl] = React.useState<EvolutionChain | undefined>();
  const [evolutionList, setPokemons] = React.useState<Pokemon[]>([]);

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
    const responce = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await responce.data;
    setPokemons( (prev) => [...prev, {...data}])
  }

  const fetchEvolution = async () => {
    loadEvolutionStep(firstStep);
    loadEvolutionStep(secondStep);
    loadEvolutionStep(firdStep);
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
          const imagePokemon = poke?.sprites?.other?.dream_world?.front_default
          
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