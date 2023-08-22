import { useState, useEffect,  /* useContext */ } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import axios from 'axios'
import qs from 'qs'



export const Home = () => {

  const isSeacrh = useRef(false) //хранение значений для внутренних данных компонента
  const isMounted = useRef(false)

  const [items, setItems] = useState([])            
  const [isLoading, setIsloading] = useState(true)  


 // const [currentPage, setCurrentPage] = useState(1)  // Какая страница будет первой 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {categoryId, sort, currentPage, search} = useSelector((state) =>  state.redOne)




const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))      
}

const onChangePage = (number) => {
    dispatch(setCurrentPage( number ))
}


const fetchPizzas = () => {

  setIsloading(true) 
  const sortBy = sort.sortProperty.replace('-', '');                // по чем сортировать (rating, price, name) 
  const order = sort.sortProperty.includes('-')? 'asc' : 'desc';    // убыванию возрастанию
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const searchHome = search ? `&search=${search}` : '';


axios
  .get(`https://645f47507da4477ba9542dc4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchHome}`)
  .then(res => {   
  setItems(res.data)
  setIsloading(false)
})
}



// ПЕРЕХОД НА СПАРСЕНЫЙ АДРЕС
useEffect(() => {
  if(isMounted.current) {
    const qeryString = qs.stringify({   //qs.stringify - делаем строку

      sortProperty: sort.sortProperty,
      categoryId,
      currentPage

   })

   navigate(`?${qeryString}`);          // формированием строки на основе состояние диспатча
  }


  isMounted.current = true;

}, [categoryId, sort.sortProperty, currentPage]) 





// Если был первый рендер, то проверем URL-параметры и сохраняем в Redux
useEffect(() => {
  if (window.location.search) {

    const params = qs.parse(window.location.search.substring(1))  // qs.parse - позволяет спаристь данные из ссылки в объект 

    const sort = list.find(obj => obj.sortProperty === params.sortProperty)
  

    dispatch(setFilters({...params, sort }))

    isSeacrh.current = true; 
  }
  
}, [])





useEffect (() => {

    if( !isSeacrh.current ) {
      fetchPizzas();
    }
    isSeacrh.current = false

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





