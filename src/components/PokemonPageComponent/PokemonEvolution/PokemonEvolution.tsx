import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import styles from './evolution.module.scss';
import pokeball from '../../../img/pokeball-mini.png';

import LoadingEvo from '../../Loading/LoadingEvolution/LoadingEvo';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addPokemon, choosePokemon } from '../../../store/slices/PokemonDataSlice';
import { EvolutionChain, PokemonStore } from '../../../types/pokemonType';
import { PokeEvolutionProps } from '../../../types/componentProps';

import { pokemonDataResponse } from '../../../functions/pokemonDataResponse';
import { reduceArrayPokemonsStore } from '../../../functions/reduceArray';

const PokemonEvolution:React.FC<PokeEvolutionProps> = ({species}) => {
  const dispatch = useAppDispatch();
  const pokemonBase = useAppSelector(state => state.pokemonList.pokemonList);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [evolutionListUrl, setEvolUrl] = React.useState<EvolutionChain | undefined>();
  const [evolutionList, setPokemons] = React.useState<PokemonStore[]>([]);

  const loadSpecies = async () => {
    if (species !== '') {
      const response = await axios.get(species)
      const data = response.data;
      setEvolUrl(data)
    }
  }

  React.useEffect(() => {
    setPokemons([])
    setLoading(true);
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
        const newPokemon = pokemonDataResponse(data)
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
      setLoading(false);
      return () => {
        setPokemons([]);
      }
    }
  }, [evolutionListUrl])

  React.useEffect(() => {
    setLoading(false);
  }, [firstStep])


  return (
    <div className={styles.wrapper}>
      {loading 
      ? <LoadingEvo />
      :<>{evolutionList.length !== 0
        ? <div className={styles.content}>
          <div className={styles.title}>
            <h2>Evolution</h2>
          </div>
          <div className={styles.evolution_list}>
            {reduceArrayPokemonsStore(evolutionList).map(poke => {
                const imagePokemon = poke?.image !== null 
                  ? poke?.image : poke.image_2 !== null 
                    ? poke.image_2 : pokeball
              
              return (
                <Link to={{pathname: `/${poke.name}`}} 
                  className={styles.evolution_item}
                  key={poke.name}
                  onClick={() => dispatch(choosePokemon(poke.name))}>
                  <div className={styles.imageBlock}>
                    <img src={imagePokemon} alt={poke?.name}/>
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
        :<div className={styles.content}>
          <h1>Эволюционная цепочка не найдена</h1>
         </div>}
      </>
      }
    </div>
  )
}

export default PokemonEvolution;