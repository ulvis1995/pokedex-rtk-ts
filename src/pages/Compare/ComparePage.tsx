import React from 'react';
import { useAppSelector } from '../../app/hooks';
import ButtonCompare from '../../components/Buttons/ButtonCompare/ButtonCompare';
import MiniCartPokemon from '../../components/MiniCartPokemon/MiniCartPokemon';
import PhysicalDataPoke from '../../components/PhysicalDataPoke/PhysicalDataPoke';
import { PokemonStore } from '../../types/pokemonType';
import st from './compare.module.scss';
import noneCompare from '../../img/errorMain.webp'
import ButtonMoreOrDelete from '../../components/Buttons/More/ButtonMoreOrDelete';
import ReactApexChart from 'react-apexcharts';
import { optionsCall, seriesCall } from './apexData';

const ComparePage: React.FC = () => {
  const compareList = useAppSelector (state => state.pokemonList.compare);
  const pokemons = useAppSelector (state => state.pokemonList.pokemonList);
  const stats = pokemons[0].stats.reduce((res: string[], i: any) => {
    res.push(i.stat.name)
    return res
    }, [])

  const comparablePokemons = compareList.reduce((res: PokemonStore[], poke) => {
    pokemons.forEach((item) => {
      if(item.name === poke)  res.push(item)
    })
    return res
  }, [])
  .reduce((res: PokemonStore[], poke) => {
    if (!res.find(i => i === poke)) {
      res.push(poke)
    }
    return res
  }, [])

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
            <MiniCartPokemon name={poke.name}/>
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