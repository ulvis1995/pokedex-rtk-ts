import React from 'react';
import Filters from '../../components/Filters/Filters';
import MiniCartPokemon from '../../components/MiniCartPokemon/MiniCartPokemon';
import styles from './main.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchloadPokemon} from '../../store/slices/LoadPokemonSlice';
import ButtonMoreOrDelete from '../../components/Buttons/More/ButtonMoreOrDelete';
import { fetchPokemonItem } from '../../store/slices/PokemonDataSlice';
import Error from '../../components/Error/ErrorSearch';
import ErrorMain from '../../components/Error/ErrorMain';
import LoadingMain from '../../components/Loading/LoadingMain/LoadingMain';
import { Results } from '../../types/loadPokemonAndFilter';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const {results, search, error, isLoading} = useAppSelector (({loadPokemon}) => loadPokemon)
  const urlType = useAppSelector ( state => state.types.type);
  const pokemonType = useAppSelector (state => state.types.pokemonType);
  const pokemons = results.reduce((res: Results[], poke) => {
    if (!res.find(i => i.name === poke.name)) {
      res.push(poke)
    }
    return res
  }, []);

  React.useEffect(() => {
    if (search && search !== null) {
      dispatch(fetchPokemonItem(search))
    }
    if (search === null && pokemons.length === 0) {
      dispatch(fetchloadPokemon())
    }
  }, [search, urlType])

  return (
    <>
    {isLoading 
    ? <LoadingMain />
    :<div className={styles.mainWrapper}>
      {error === 'Not found'
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
            {search !== null || urlType !== null
              ? <div className={styles.empty}></div> 
              : <ButtonMoreOrDelete>Загрузить еще...</ButtonMoreOrDelete>}
          </div>
      } 
    </div>}
    </>
  )
}

export default React.memo(Main);