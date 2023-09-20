import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {  setCategoryId , selectFilter, setCurrentPage } from '../redux/slices/filterSlice'

//Пример типизации пропс 
type CategoriesProps  = {
  value: number,
  onChangeCategory: any
}

//React.FC<CategoriesProps> - лучше типизровать так


const Categories: React.FC = () => {

const {categoryId}  = useSelector(selectFilter)
const dispatch = useDispatch()


const onChangePage = (index: number) => {
  dispatch(setCategoryId(index))
  dispatch(setCurrentPage(1))
}


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]


return (  

    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
        <li  key={index} onClick={() => onChangePage(index)}  className={categoryId === index ? 'active' : ''} >{categoryName}</li> 
              ))}
      </ul>
    </div>

)}

 export default Categories;


