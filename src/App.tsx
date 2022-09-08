import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import ButtonScroll from './components/Buttons/Scroll/ButtonScroll';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import { useAppSelector } from './app/hooks';
import ComparePage from './pages/Compare/ComparePage';

function App() {
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
