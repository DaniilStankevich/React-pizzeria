import { Routes, Route } from "react-router-dom";
import { createContext } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Carts from './pages/Carts'
import './scss/app.scss'



export const SearchContext = createContext()

function App() {


// const [searchValue, setSearchValue] = useState(''); 

  return ( 
  
   <> 
    <div className="wrapper">
      <SearchContext.Provider >
          <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={ <Home />} />       
            <Route path="/cart" element={ <Carts />} />
            <Route path="*" element={ <NotFound  />} />    
          </Routes>
        </div>
        </SearchContext.Provider>

    </div>
    </>
  );
}

export default App;







