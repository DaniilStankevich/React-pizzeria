import axios from 'axios'
import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit"
import { RootState } from '../store'

// Если имеются только одни строчки - Record<string, string>
//<string, string> - страка ключ и значение ключ

type FetchPizzasArgs = {
  sortBy: string, 
  order: string, 
  category: string,  
  searchHome: string, 
  currentPage: number,
}

export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs >( 'pizza/fetchPizzaStatus', async (params, thunkApi  ) => {

  const { sortBy, order,  category,  searchHome, currentPage }  = params
  const { data  } =  await axios.get(`https://645f47507da4477ba9542dc4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchHome}`)

  if(data.length === 0) {
    return thunkApi.rejectWithValue('Пиццы пустые')
  }

  return  data     //thunkApi.fulfillWithValue(data)
})

type Pizza = {
  id: string,
  name: string ,
  types: number[] , 
  price:  number, 
  sizes: number[],  
  imageUrl: string, 
}

interface PizzaSliceState {
    items: Pizza[],
    status:  Status   //'idle' | 'loading' | 'success' | 'error' ,
}




enum Status {
  LOADING = 'loading',
  SUCCES = 'success',
  ERROR = 'error'
}


const initialState: PizzaSliceState  = {
    items: [],
    status: Status.LOADING, // loading | success | error 
}


const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: { 
    
            setItems(state, action) {
                state.items = action.payload
            }, 
  },

  extraReducers: (builder) => {

    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCES
    })

    builder.addCase(fetchPizzas.rejected , (state, action) => {
      state.status = Status.ERROR 
      state.items = []
    })
  }

})


export const selectPizzaData = (state: RootState) => state.pizza
export const selectPizzaSTATUS = (state: RootState) => state.pizza.status

export const {  setItems  } =  pizzaSlice.actions
export default pizzaSlice.reducer



