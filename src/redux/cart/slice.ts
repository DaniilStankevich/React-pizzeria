import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
import { CartItem, CartSliceState, MyActionPayload } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const { totalPrice, items } = getCartFromLS()

const initialState: CartSliceState  = {
    totalPrice, 
    items,  
    amountPizzas: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {   
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => action.payload.id === obj.id  &&  action.payload.type === obj.type && action.payload.size === obj.size)

            if( findItem ) {
                findItem.count++ }
            else {
                state.items.push({...action.payload, count: 1, uniqueValue: uuidv4() })  
            }

            state.totalPrice =  calcTotalPrice(state.items)                        
            state.amountPizzas = state.items.reduce((sum, obj) => {
                return obj.count  + sum
            }, 0)
        },
        

        minusItem(state, action: PayloadAction<MyActionPayload>) {        
            const findItem = state.items.find((obj) => obj.id === action.payload.id  &&  obj.type === action.payload.type && obj.size === action.payload.size )

            if (findItem && findItem.count > 1 ) {
                findItem.count--  
            }
            state.totalPrice = calcTotalPrice(state.items)
        }, 

        removeItem(state, action: PayloadAction<string>) {
            state.items  = state.items.filter((obj) => obj.uniqueValue  !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },

        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        },
  }
})


export const { addItem,  minusItem,  removeItem, clearItem } = cartSlice.actions
export default cartSlice.reducer

