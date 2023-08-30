import { Routes, Route } from "react-router-dom";
import { createContext } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Carts from './pages/Carts'
import './scss/app.scss'




function App() {

  return ( 
   
    <div className="wrapper">
          <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={ <Home />} />       
            <Route path="/cart" element={ <Carts />} />
            <Route path="*" element={ <NotFound  />} />    
          </Routes>
        </div>

    </div>
    
  );
}

export default App;







