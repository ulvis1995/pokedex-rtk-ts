import React from 'react';

import st from './compare.module.scss';
import noneCompare from '../../img/errorMain.webp';

import { useAppSelector } from '../../app/hooks';
import ButtonCompare from '../../components/Buttons/ButtonCompare/ButtonCompare';
import MiniCardPokemon from '../../components/MiniCardPokemon/MiniCardPokemon';
import PhysicalDataPoke from '../../components/PhysicalDataPoke/PhysicalDataPoke';
import ButtonMoreOrDelete from '../../components/Buttons/MoreOrDelete/ButtonMoreOrDelete';

import { PokemonStore } from '../../types/pokemonType';
import ReactApexChart from 'react-apexcharts';
import { optionsCall, seriesCall } from './apexData';
import { reduceArrayPokemonsStore } from '../../functions/reduceArray';

const ComparePage: React.FC = () => {
  const compareList = useAppSelector (state => state.pokemonList.compare);
  const pokemons = useAppSelector (state => state.pokemonList.pokemonList);
  const stats = pokemons[0].stats.reduce((res: string[], i: any) => {
    res.push(i.stat.name)
    return res
    }, [])

  const comparablePokemons = reduceArrayPokemonsStore(
    compareList.reduce((res: PokemonStore[], poke) => {
    pokemons.forEach((item) => {
      if(item.name === poke)  res.push(item)
    })
    return res
  }, []))

  return (
    <div className={st.compare_wrapper}>
      {compareList.length === 0
      ?<div className={st.compare_content}>
        <h1>Пока к сравнению ничего не добавлено</h1>
        <img src={noneCompare} alt='Нет покемонов' className={st.none_compare}/>
      </div>
      :<div className={st.compare_content}>
        <ul className={st.list}>
          {comparablePokemons.map (poke => 
          <li className={st.item} key={poke.name}>
            <ButtonCompare name={poke.name}>Удалить</ButtonCompare>
            <MiniCardPokemon name={poke.name}/>
            <PhysicalDataPoke pokemon={poke} description={undefined}/>
          </li>)}
        </ul>
        <ReactApexChart
          options={optionsCall(stats)} series={seriesCall(comparablePokemons)} 
          type="bar" height={450} width={`100%`} />
        <ButtonMoreOrDelete>Удалить все</ButtonMoreOrDelete>
      </div>
      }
    </div>
  )
}

export default ComparePage