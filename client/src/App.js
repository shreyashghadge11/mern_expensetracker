import React from 'react';
import store from './store';
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import Header from './components/header';
import YearMonth from './components/yearmonth';


//import {connect} from 'react-redux';


function App() {
  




  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <YearMonth/>
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
