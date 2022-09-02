import React from 'react';
import SliderPokeItem from '../../components/PokemonPageComponent/SliderPokeItem/SliderPokeItem';
import styles from './pokemon.module.scss';
import PokeInfoBlock from '../../components/PokemonPageComponent/PokeInfo/PokeInfoBlock';
import { useAppSelector } from '../../app/hooks';
import PokemonEvolution from '../../components/PokemonPageComponent/PokemonEvolution/PokemonEvolution';
import axios from 'axios';

type PokemonPageProps = {
  name: string | null
}

const PokemonPage: React.FC<PokemonPageProps> = ({name}) =>  {  
  const [species, setSpecies] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const pokemon = useAppSelector(state => 
    state.pokemonList.pokemonList.find(
      poke => poke.name === name
    ))  

    const loadDescpription = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon?.name}`)
      const data = response.data
      setSpecies( data.evolution_chain.url);
      setDescription (data.flavor_text_entries[0].flavor_text)
    }
  
    React.useEffect(() => {
      loadDescpription()
    }, [name])

  return (
    <div className={styles.pokemon_item_wrapper}>
      <div className={styles.pokemonContent}>
        <SliderPokeItem pokemon={pokemon}/>
        <PokeInfoBlock pokemon={pokemon} description={description}/>
        <PokemonEvolution species={species}/>
      </div>
    </div>
  )
}

export default PokemonPage