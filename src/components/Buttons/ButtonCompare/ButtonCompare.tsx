import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { addPokemonToCompare, removePokemonCompare } from '../../../store/slices/PokemonDataSlice';

import styles from './buttonCompare.module.scss';

import { ButtonCompareProps } from '../../../types/componentProps';


const ButtonCompare: React.FC<ButtonCompareProps> = (props) =>  {  
  const dispatch = useAppDispatch();
  const compareList = useAppSelector( state => state.pokemonList.compare);
  const nameCheck = compareList.find(poke => poke === props.name);
  const checkAddOrDelete = () => {
    if (props.children === 'Сравнить') {
      dispatch(addPokemonToCompare(props.name))
    }
    if (props.children === 'Удалить') {
      dispatch(removePokemonCompare(props.name))
    }
  }

  return (
    <button 
      className={`${styles.btn} ${
        nameCheck && props.children === 'Сравнить' ? styles.unvisible : ''
      }${
        props.children === 'Удалить' ? styles.remove_poke : ''
      }`} 
      onClick={checkAddOrDelete}>{props.children}</button>
  )
}

export default ButtonCompare;