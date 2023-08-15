import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

// counterReducer - мы можем как угодно назвать эту функцию

//import { categorySlice } from './slices/filterSlice'



//Хранилище
export const store = configureStore({

  reducer: {
    redOne: filter,

    
    }


})




//console.log(counterReducer)

//  В "reducer" добавили Ломтик, 
//  в котором есть 3 функции и 1 дефолтное состояние 
//  Ломтик "counter" отвечает за счетчик 
//  Можно обавить другой ломтик, который будет отвечать за что то еще

