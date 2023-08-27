import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'



// counterReducer - можно как угодно назвать эту функцию

export const store = configureStore({

  reducer: {
    redOne: filter,
    cart, 
    }

})



