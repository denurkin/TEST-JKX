import React, { useState } from 'react';
import store from "../store/RootStore"; 
import '../css/Counter.css';
import { observer } from 'mobx-react-lite';
const Counter = observer((props: any) => { 
    const [check, setCheck] = useState(false)
    const item = props.item;
        
    
    return (
        <>
            <ul className='counter' key={item.id} onMouseEnter={() => {setCheck(!check)}}
        onMouseLeave={() => {setCheck(!check)}}>
              <li className='counter__number'>{`${item.number}`}</li>
              <li className='counter__type'>{item.type === "HotWaterAreaMeter" ? <div className='counter__image-fire' ></div> : <div className='counter__image-water'></div>}
              {item.type === "HotWaterAreaMeter" ? <p className='counter__type-text'>"ТПЛ"</p> : <p className='counter__type-text'>'ХВС'</p>}</li>
              <li className='counter__date'>{`${item.date.replaceAll('-', '.').substring(0, 10)}`}</li>
              <li className='counter__automatic'>{`${item.automatic === null ? "да" : "нет"}`}</li>
              <li className='counter__value'>{`${item.values}`}</li>
              <li className='counter__address'>{`${item.address}`}</li>
              <li className='counter__description'>{item.description }</li>

              {check === false ? "" : <button onClick={() => {store.removeItems(item.id)
              }} className='counter__delete'></button>}
            </ul>
        </>
    )
})

export default Counter