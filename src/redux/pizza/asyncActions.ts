import axios from "axios"
import { FetchPizzasArgs, Pizza } from "./types"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs >( 'pizza/fetchPizzaStatus', async (params, thunkApi  ) => {

    const { sortBy, order,  category,  searchHome, currentPage }  = params
    const { data  } =  await axios.get(`https://645f47507da4477ba9542dc4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchHome}`)
  
    if(data.length === 0) {
      return thunkApi.rejectWithValue('Пиццы пустые')
    }
    
    //thunkApi.fulfillWithValue(data)
    return  data     
  })