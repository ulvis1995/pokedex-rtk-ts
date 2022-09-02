import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchloadPokemonMore } from '../../../store/slices/LoadPokemonSlice';
import styles from './buttonMore.module.scss'

const ButtonLoadMore: React.FC = () =>  {  
  const dispatch = useAppDispatch();
  const next = useAppSelector(state => state.loadPokemon.next)

  return (
    <button className={styles.btn}  onClick={() => dispatch(fetchloadPokemonMore(next))}>Load More</button>
  )
}

export default ButtonLoadMore;