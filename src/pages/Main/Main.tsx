import React from 'react';

import styles from './main.module.scss';
import Filters from '../../components/Filters/Filters';
import ButtonMoreOrDelete from '../../components/Buttons/MoreOrDelete/ButtonMoreOrDelete';
import ErrorMain from '../../components/Error/ErrorMain';
import LoadingMain from '../../components/Loading/LoadingMain/LoadingMain';
import MiniCardTerms from '../../components/MiniCardTerms/MiniCardTerms';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchloadPokemon} from '../../store/slices/LoadPokemonSlice';
import { fetchPokemonItem } from '../../store/slices/PokemonDataSlice';
import { reduceArrayPokemons } from '../../functions/reduceArray';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const {results, error, isLoadingFirst} = useAppSelector (({loadPokemon}) => loadPokemon);
  const search = useAppSelector(state => state.pokemonList.search);
  const urlType = useAppSelector ( state => state.types.type);
  const pokemons = reduceArrayPokemons(results);

  React.useEffect(() => {
    if (search && search !== null) {
      dispatch(fetchPokemonItem(search))
    }
    if (search === null && pokemons.length === 0) {
      dispatch(fetchloadPokemon())
      dispatch(fetchPokemonItem(905))
    }
  }, [search, urlType])

  return (
    <>
    {isLoadingFirst 
    ? <LoadingMain />
    :<div className={styles.mainWrapper}>
      {error === 'Not found'
        ? <ErrorMain />         
        : <div className={styles.mainContent}>
            <Filters />
            <MiniCardTerms search={search} pokemons={pokemons} urlType={urlType}/>
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