import React from 'react';
import store from "../store/RootStore";
import '../css/Counter.css';
import { observer } from 'mobx-react-lite';
import Counter from './Counter';

interface Item {
  id: string;
  number: number;
  type: string;
  date: string;
  automatic: boolean | null;
  values: number;
  description: string;
  address: string;
}

const ListsCounter = observer(() => { 
  return (
    <>
      {store.items.map((item: Item) => (
        <Counter key={item.id} item={item} />
      ))}
    </>
  )
})

export default ListsCounter;

 