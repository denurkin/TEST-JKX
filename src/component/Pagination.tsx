import React from 'react';
import store from "../store/RootStore"; 
import '../css/Pagination.css';
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {  
    return (
        <div className='pagination'>
          <button className='pagination__button' disabled={store.pagination === 1 ? true : false} onClick={() => {store.paginationDecrement()}}>⬅</button>
          <p className='pagination__text'>{store.pagination}</p>
          <button className='pagination__button' onClick={() => {store.paginationIncrement()}}>➡</button>
        </div>
    )
})

export default Pagination