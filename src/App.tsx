import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";

import store from "./store/RootStore"; 
import Table from "./component/Table";
import './css//App.css';


const App = observer(() => {

  useEffect(() => {

    store.fetchItems();

  }, []);

  

  return (
    <div>
      <h1 className="title">Список счетчиков</h1>
      {store.isLoading ? (
        ""
      ) : (
        <Table/>
      )}
    </div>
  );

});

export default App;