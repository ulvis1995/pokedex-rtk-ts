import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
