import React from 'react';
import '../css/Table.css';
import ListsCounter from './ListsCounter';
import Pagination from './Pagination'; 


const Table = () => {
    return (
        <div className='table__wrapper'>
            <div className='table'>
                <ul className='table__titles'>
                    <li className='table__number'>№</li>
                    <li className='table__type'>Тип</li>
                    <li className='table__date'>Дата установки</li>
                    <li className='table__automatic'>Автоматический</li>
                    <li className='table__value'>Текущие показания</li>
                    <li className='table__address'>Адрес</li>
                    <li className='table__description'>Примечание</li>
                </ul>
                <div className='table__list'>
                    <ListsCounter/>
                </div>
            </div>
            <Pagination/>
        </div>
    )
}

export default Table