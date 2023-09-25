import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import filter from './filter/slice'
import cart from './cart/slice'
import pizza from './pizza/slice'


export const store = configureStore({

  reducer: {
    filter,
    cart, 
    pizza
    }

})

//Получаем тип всего хранилища
type FuncType = typeof store.getState         //typeof возращаем тип операнда "store.getState"
export type RootState = ReturnType<FuncType>  //Превращаем содержимое в тип

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
