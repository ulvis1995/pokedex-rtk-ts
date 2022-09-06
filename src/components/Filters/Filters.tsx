import React from 'react';
import styles from './filters.module.scss';
import { Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { chooseMainFilter, searchPokemon } from '../../store/slices/LoadPokemonSlice';
import { chooseType, fetchChooseType, fetchTypes } from '../../store/slices/TypesSlice';
const { Search } = Input;
const { Option } = Select;


const Filters: React.FC = () => {
  const errorType = useAppSelector( state => state.types.error);
  const types = useAppSelector (state => state.types.types);
  const urlType = useAppSelector ( state => state.types.type);
  const dispatch = useAppDispatch();

  const handleInputSearch = (search: string) => {    
    dispatch(searchPokemon(search))
  }

  const handleChangeTypes = (value: string) => {
    dispatch(chooseType(value))
  }

  React.useEffect(() => {
    dispatch(fetchTypes());
    if (urlType !== null) {
      dispatch(fetchChooseType(urlType))
    }
  }, [urlType])

  return (
    <div className={styles.filters}>
      <Search 
        className={styles.search}
        placeholder="Поиск по имени или номеру" 
        allowClear 
        onSearch={handleInputSearch} />
      {errorType === 'Types not loaded'
        ? ''
        : <Select
            value={urlType}
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