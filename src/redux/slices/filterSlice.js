import { createSlice } from "@reduxjs/toolkit"


const initialState = {


  openSer: true,
  search: '',



  currentPage: 1,

  categoryId: 0,

  sort:  {name:'цене', 
          sortProperty: 'rating'}



}

const filterSlice = createSlice({
  name: 'filter',
  initialState,


  reducers: { 
            setCategoryId(state, action) {
                state.categoryId = action.payload
                console.log(action)
            },

            setSort(state, action) {
              state.sort = action.payload
            },

            setCurrentPage(state, action) {
              state.currentPage = action.payload
            },




            setSearch(state, action) {
              state.search = action.payload
            },

            setOpen(state, action) {
              state.openSer = action.payload         
            }

  }
})



                       
//action это - {type: 'filter/setCategoryId', payload: 1}   name/metod
 
export const {setCategoryId, setSort, setCurrentPage,     setSearch,setOpen} = filterSlice.actions
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