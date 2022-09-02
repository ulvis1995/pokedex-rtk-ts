import React from 'react';
import styles from './button.module.scss'

const ButtonScroll: React.FC = () =>  {
  const handlerScrollUp = () => {
    
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  return (
    <button className={styles.btn} onClick={() => handlerScrollUp()}>&#9650;</button>
  )
}

export default ButtonScroll;