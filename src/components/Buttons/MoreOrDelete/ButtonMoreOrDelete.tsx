import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchloadPokemonMore } from '../../../store/slices/LoadPokemonSlice';
import { removeAllPokemonCompare } from '../../../store/slices/PokemonDataSlice';
import { ButtonProps } from '../../../types/componentProps';
import styles from './buttonMore.module.scss'

const ButtonMoreOrDelete: React.FC<ButtonProps> = (props) =>  {  
  const dispatch = useAppDispatch();
  const next = useAppSelector(state => state.loadPokemon.next);
  const checkAddOrDelete = () => {
    if (props.children === 'Загрузить еще...') {
      dispatch(fetchloadPokemonMore(next))
    }
    if (props.children === 'Удалить все') {
      dispatch(removeAllPokemonCompare())
    }
  }

  return (
    <button className={styles.btn}  onClick={checkAddOrDelete}>{props.children}</button>
  )
}

export default ButtonMoreOrDelete;