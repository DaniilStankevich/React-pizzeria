import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
//import { chengeCategory } from "../redux/slices/filterSlice";


function Categories({ value, onChangeCategory }) {




function command (i) {
  onChangeCategory(i)     //Выбор категории             //Переброс на page 1  при смене категории
}


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]


return (  

    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
        <li  key={i} onClick={() => command(i)}  className={value === i ? 'active' : ''} >{categoryName}</li> 
              ))}
      </ul>
    </div>

)}

 export default Categories;


//Необходимое для Redux 
//const CATEGOR = useSelector((state) => state.category.index)
//const dispatch = useDispatch(chengeCategory(2))
//const arnik = useSelector((state) => state.category.arr)
