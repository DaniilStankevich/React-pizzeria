import { useState, useEffect,  /* useContext */ } from 'react';
//import { SearchContext } from '../App'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

///////////////////////////////////////////////////////
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios'


export const Home = () => {


  const [items, setItems] = useState([])            // Пиццы пришедшие с бэка
  const [isLoading, setIsloading] = useState(true)  // Лодеры пиц  




 // const [currentPage, setCurrentPage] = useState(1)  // Какая страница будет первой 

  // Redux-данные
  const dispatch = useDispatch()
  const {categoryId, sort, currentPage,   search} = useSelector((state) =>  state.redOne)






const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))      //Функция все равно пробрасвает объект: {type: 'filter/setCategoryId', payload: 1}
}

const onChangePage = (number) => {
    dispatch(setCurrentPage( number ))
}



useEffect (() => {        
  setIsloading(true) 

const sortBy = sort.sortProperty.replace('-', '');                // по чем сортировать (rating, price, name) 
const order = sort.sortProperty.includes('-')? 'asc' : 'desc';    // убыванию возрастанию
const category = categoryId > 0 ? `category=${categoryId}` : '';
const searchEEE = search ? `&search=${search}` : '';

axios
  .get(`https://645f47507da4477ba9542dc4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchEEE}`)
  .then(res => {   
  setItems(res.data)
  setIsloading(false)
})
  // window.scrollTo(0, 0)

}, [categoryId, sort.sortProperty, search, currentPage])  
  



const pizzas = items.map((item) => (<PizzaBlock key={item.id} title={item.name} price={item.price}imageUrl={item.imageUrl} sizes={item.sizes} types={item.types}/>))
const skeleton = [ ...new Array(4)].map((_, index)  =>  <Skeleton key={index}/> )


return (
<div className="container">
  <div className="content__top">

        <Categories value={categoryId} onChangeCategory={onChangeCategory} funPage={setCurrentPage}/>
        <Sort/>

  </div>   

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items"> {isLoading ? skeleton : pizzas}</div> 
    
       <Pagination  currentPage={currentPage}   onChangePage={onChangePage}/>

</div>
)}



export default Home





/* УДАЛЕНИЕ ПРОБЕЛОВ
let forValue =  Array.from(searchValue)

let newSas = forValue.filter((el) => {

  if(el == ' ') {
    return false
  }
  return true
})

let word = newSas.join('')

console.log(word)
*/

/*  Пример поиска в статичном массиве 
items.filter((obj) => {

  if(obj.name.toLocaleLowerCase().includes(cleanedQuery.toLocaleLowerCase()))  {     //searchValue может быть пробелом
    return true
  }
  return false

  }).
*/