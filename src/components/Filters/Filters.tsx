import React from 'react';
import styles from './filters.module.scss';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;


const Filters: React.FC = () => {

  const onSearch = (search: string) => {
    console.log(search)
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={styles.filters}>
      <Search 
        className={styles.search}
        placeholder="Поиск по имени или номеру" 
        allowClear 
        onSearch={onSearch} />
        <Select 
          className={styles.select}
          defaultValue="ascending_numbers"
          onChange={handleChange}>
            <Option value="ascending_numbers">Номера по возрастанию</Option>
            <Option value="descending_numbers">Номера по убыванию</Option>
            <Option value="alphabet_start_end">По алфавиту (от А к Z)</Option>
            <Option value="alphabet_end_start">По алфавиту (от Z к А)</Option>
        </Select>
    </div>
  )
}

export default Filters;