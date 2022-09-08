import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';

import styles from './App.module.scss';

import Main from './pages/Main/Main';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import ComparePage from './pages/Compare/ComparePage';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ButtonScroll from './components/Buttons/Scroll/ButtonScroll';

const App: React.FC = () => {
  const name = useAppSelector( state => state.pokemonList.currentPokemon);

  return (
    <div className={styles.app}>
      <Header/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/compare' element={<ComparePage />} />
        <Route path ={`/${name}`} element={<PokemonPage name={name}/>} />
      </Routes>
      <Footer />
      <ButtonScroll />
    </div>
  );
}

export default App;
