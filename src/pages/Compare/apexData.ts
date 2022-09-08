import { PokemonStore } from '../../types/pokemonType';
import { ApexOptions } from 'apexcharts';


export const seriesCall = (comparablePokemons: PokemonStore[]) => {
  const series = [...comparablePokemons.map(poke => ({
    name: poke.name,
    data: poke.stats.map(stat => stat.base_stat)
  }))]
  return series
}

export const optionsCall = (stats: string[]) => {
  const options: ApexOptions = {
    chart: {
      background: 'rgb(11, 21, 62)',
      foreColor: '#fff',
      toolbar: {show: false}
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      fontWeight: 'bold',
      itemMargin: {
        vertical: 10
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [...stats],
      labels: {
        style: {
          colors: '#fff',
          fontWeight: 'bold'
        }
      }
    },
    yaxis: {
      title: {
        text: ''
      },
      labels: {
        style: {
          colors: '#fff',
          fontWeight: 'bold'
        }
      }
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val
        }
      }
    }}
    return options
}

