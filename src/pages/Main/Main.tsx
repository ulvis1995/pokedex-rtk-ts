import React from 'react';
import Filters from '../../components/Filters/Filters';
import MiniCartPokemon from '../../components/MiniCartPokemon/MiniCartPokemon';
import styles from './main.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchloadPokemon, Results } from '../../store/slices/LoadPokemonSlice';
import ButtonLoadMore from '../../components/Buttons/More/ButtonLoadMore';
import { fetchPokemonItem } from '../../store/slices/PokemonDataSlice';
import Error from '../../components/Error/ErrorSearch';
import ErrorMain from '../../components/Error/ErrorMain';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadPokemon = useAppSelector(state => state.loadPokemon.results);
  const search = useAppSelector( state => state.loadPokemon.search);
  const errorMain = useAppSelector( state => state.loadPokemon.error);
  const error = useAppSelector(state => state.pokemonList.error);
  const urlType = useAppSelector ( state => state.types.type);
  const pokemonType = useAppSelector (state => state.types.pokemonType)
  const pokemons = loadPokemon.reduce((res: Results[], poke) => {
    if (!res.find(i => i.name === poke.name)) {
      res.push(poke)
    }
    return res
  }, [])

  React.useEffect(() => {
    if (search && search !== null) {
      dispatch(fetchPokemonItem(search))
    }
    if (search === null && pokemons.length === 0) {
      dispatch(fetchloadPokemon())
    }
  }, [search, urlType])

  return (
    <div className={styles.mainWrapper}>
      {errorMain === 'Not found'
        ? <ErrorMain /> 
        
        : <div className={styles.mainContent}>
            <Filters />
            {search && search !== null
              ? error === 'Pokemon not found'
                ? <Error />
                : <div className={styles.block}>
                    <MiniCartPokemon name={search}/>
                  </div>
              : urlType !== null
                ? <div className={styles.block}>
                  {pokemonType.map((pokemon, index) => 
                      <MiniCartPokemon name={pokemon.name} key={index}/>)}
                  </div>
                :<div className={styles.block}>
                  {pokemons.map((pokemon, index) => 
                    <MiniCartPokemon name={pokemon.name} key={index}/>)}
                </div>
                }
            {search !== null
              ? <div className={styles.empty}></div> 
              : <ButtonLoadMore />}
          </div>
      } 
    </div>
  )
}

export default React.memo(Main);