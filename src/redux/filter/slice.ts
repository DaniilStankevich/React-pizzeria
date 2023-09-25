import { createSlice } from "@reduxjs/toolkit"
import { FilterSliceState } from "../filter/types"

const initialState:FilterSliceState  = {
    search: '',
    currentPage: 1,
    categoryId: 0,
    sort:  {name:'популярности',  sortProperty: 'rating'}
  }
  
  
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  
  reducers: { 
              setCategoryId(state, action) {
                  state.categoryId = action.payload
              },
  
              setSort(state, action) {
                state.sort = action.payload
              },
  
              setCurrentPage(state, action) {
                state.currentPage = action.payload
              },
  
              setFilters(state, action) {
                state.currentPage = action.payload.currentPage           
                state.sort = action.payload.sort
                state.categoryId = Number(action.payload.categoryId)
              },
    
              setSearch(state, action) {
                state.search = action.payload
              },
    }
})


export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearch} = filterSlice.actions
export default filterSlice.reducer

