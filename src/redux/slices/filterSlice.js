import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  openSer: true,
  search: '',

  currentPage: 1,
  categoryId: 0,
  sort:  {name:'популярности', 
          sortProperty: 'rating'}
}


//  {name:'популярности (DESC)',  sortProperty: 'rating' },


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

            setOpen(state, action) {

              state.openSer = action.payload         
            }

  }
})

                  
export const {setCategoryId, setSort, setCurrentPage, setFilters,   setSearch,setOpen} = filterSlice.actions
export default filterSlice.reducer



















/*
const initialState = {
 index: 0,
  arr: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]
}
export const categorySlice = 
createSlice({
        name: 'category',
        initialState: initialState,
        reducers: {
            chengeCategory: (state, action) => {   state.index  =  action.payload},
        },
})
export const { chengeCategory } = categorySlice.actions
export default categorySlice.reducer
*/