import React, { useCallback, useMemo, useState } from "react";
import { useWhyDidYouUpdate } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors'

//Пример типизации пропс 
type CategoriesProps  = {
  value: number,
  onChangeCategory: any
}

//React.FC<CategoriesProps> - лучше типизровать так


const Categories: React.FC = () => {

const dispatch = useDispatch()
const {categoryId}  = useSelector(selectFilter)

const onChangePage = useCallback((index: number) => {
  dispatch(setCategoryId(index))
  dispatch(setCurrentPage(1))
}, [])

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]


return (  

    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
        <li key={index} onClick={() => onChangePage(index)}  className={categoryId === index ? 'active' : ''} >{categoryName}</li> 
              ))}
      </ul>
    </div>

)}

export default React.memo(Categories);
