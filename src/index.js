import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



import {BrowserRouter} from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from './redux/store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>

        <Provider store={store} > 
          <App />
        </Provider>

    </BrowserRouter>
    
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


// Придумать случайное срабатывание цикла на каждой итерации //

/* 
const arr = document.querySelectorAll(".pvs-list__item--line-separated .artdeco-button--secondary");
for (let i = 0;i < arr.length; i++){
arr[i].click();
}

*/
