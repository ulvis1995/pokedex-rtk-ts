import React from 'react';
import styles from './filters.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { chooseType, fetchChooseType, fetchTypes } from '../../store/slices/TypesSlice';
import { searchPokemon } from '../../store/slices/PokemonDataSlice';

import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;


const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, types, type} = useAppSelector( ({types}) => types);

  const handleInputSearch = (search: string) => {    
    dispatch(searchPokemon(search))
    dispatch(chooseType(null))
  }

  const handleChangeTypes = (value: string) => {
    dispatch(chooseType(value))
  }

  React.useEffect(() => {
    dispatch(fetchTypes());
    if (type !== null) {
      dispatch(fetchChooseType(type))
    }
  }, [type])

  return (
    <div className={styles.filters}>
      <Search 
        className={styles.search}
        placeholder="Поиск по имени или номеру" 
        allowClear 
        onSearch={handleInputSearch} />
      {error === 'Types not loaded'
        ? ''
        : <Select
            value={type}
            placeholder='Тип' allowClear 
            className={styles.types}
            onChange={handleChangeTypes}>
              {types.map((type, index) => 
                <Option value={type.url} key={`${type.name}_${index}`}>
                    {type.name}
                </Option>)}
          </Select>
      }
    </div>
  )
}

export default Filters;