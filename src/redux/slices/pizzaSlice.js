import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



export const fetchPizzas = createAsyncThunk( 'pizza/fetchPizzaStatus', async (params) => {

  const { sortBy, order,  category,  searchHome, currentPage }  = params

  const { data } =  await axios.get(`https://645f47507da4477ba9542dc4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchHome}`)
    return data
  }
)

const initialState = {
    items: [],
    status: 'loading', // loading ,success, error 
}



const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: { 
    
            setItems(state, action) {
                state.items = action.payload
            },
  },

  extraReducers:  {

    [fetchPizzas.pending ]:  (state) => {
        state.status = 'loading'
        state.items = []
    },
   
    [fetchPizzas.fulfilled ]:  (state, action) => {
        state.items = action.payload
        state.status = 'success'
    },

    [fetchPizzas.rejected ]:  (state, action) => {
        state.status = 'error'
        state.items = []
    }
  

    }
})


export const {  setItems  } =  pizzaSlice.actions
export default pizzaSlice.reducer

