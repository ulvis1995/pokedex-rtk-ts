import React from 'react';
import axios from 'axios';

import styles from './pokemon.module.scss';
import SliderPokeItem from '../../components/PokemonPageComponent/SliderPokeItem/SliderPokeItem';
import PokeInfoBlock from '../../components/PokemonPageComponent/PokeInfo/PokeInfoBlock';
import PokemonEvolution from '../../components/PokemonPageComponent/PokemonEvolution/PokemonEvolution';
import LoadingMain from '../../components/Loading/LoadingMain/LoadingMain';

import { useAppSelector } from '../../app/hooks';
import { PokemonPageProps } from '../../types/componentProps';

const PokemonPage: React.FC<PokemonPageProps> = ({name}) =>  {  
  const loading = useAppSelector (state => state.pokemonList.isLoading)
  const [species, setSpecies] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const pokemon = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
      poke => poke.name === name
    ))  

    const loadDescpription = async () => {
      const response = await axios.get(`${pokemon?.species}`)
      const data = response.data
      setSpecies( data.evolution_chain !== null ? data.evolution_chain.url : '');
      setDescription (data.flavor_text_entries[0].flavor_text)
    }
  
    React.useEffect(() => {
      loadDescpription()
    }, [name])

  return (
    <div className={styles.pokemon_item_wrapper}>
      {loading
      ? <LoadingMain />
      :<div className={styles.pokemonContent}>
        <SliderPokeItem pokemon={pokemon}/>
        <PokeInfoBlock pokemon={pokemon} description={description}/>
        <PokemonEvolution species={species}/>
      </div>}
    </div>
  )
}

export default PokemonPage;