import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../store";


export type CartItem = {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,

    count: number,
    uniqueValue: string
}

// MinusItem
interface MyActionPayload {
    id: number;
    type: string;
    size: number;
  }


//Только объект
interface CartSliceState {
    totalPrice: number
    items: CartItem[]
    amountPizzas: number
}


const initialState:CartSliceState  = {
    totalPrice: 0,
    items: [],
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



            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count  + sum
            }, 0)
                
            state.amountPizzas = state.items.reduce((sum, obj) => {
                return obj.count  + sum
            }, 0)
        },
        

        minusItem(state, action: PayloadAction<MyActionPayload>) {
               
            const findItem = state.items.find((obj) => obj.id === action.payload.id  &&  obj.type === action.payload.type && obj.size === action.payload.size )

            if (findItem && findItem.count > 1 ) {
                findItem.count--  
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count  + sum
            }, 0)
        }, 

        removeItem(state, action: PayloadAction<string>) {
            state.items  = state.items.filter((obj) => obj.uniqueValue  !== action.payload)

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count  + sum
              }, 0)
        },


        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        },

  }
})


export const selectCart = (state: RootState) => state.cart


export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.filter((obj) => obj.id === id).reduce((sum, obj) => obj.count + sum ,0 )




export const { addItem,  minusItem,  removeItem, clearItem } = cartSlice.actions
export default cartSlice.reducer

