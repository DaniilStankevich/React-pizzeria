import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData} from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import qs from 'qs'





export const Home = () => {

  const isSeacrh = useRef(false) 
  const isMounted = useRef(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {items, status} = useSelector(selectPizzaData)
  const {categoryId, sort, currentPage, search} = useSelector(selectFilter)



const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))  
}


const onChangePage = (number) => {
    dispatch(setCurrentPage( number ))
}


const getPizzas = async () => {

  const sortBy = sort.sortProperty.replace('-', '');                // по чем сортировать (rating, price, name) 
  const order = sort.sortProperty.includes('-')? 'asc' : 'desc';    // убыванию-возрастанию
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const searchHome = search ? `&search=${search}` : '';

  dispatch(fetchPizzas({
          sortBy,
          order,
          category,
          searchHome,
          currentPage   }))
}



// ПЕРЕХОД НА СПАРСЕНЫЙ АДРЕС
useEffect(() => {


  if(isMounted.current) {
    const qeryString = qs.stringify({       //qs.stringify - делаем строку

      sortProperty: sort.sortProperty,      
      categoryId,
      currentPage
   })

   navigate(`?${qeryString}`);  // формированием строки на основе состояние диспатча - qeryString
  }                             // вставка адреса 

  isMounted.current = true;
}, [categoryId, sort.sortProperty, currentPage]) 




//console.log('(------Render home-------)')



// Если был первый рендер, то проверем URL-параметры и сохраняем в Redux
// Сработка после перезагрузки страницы
useEffect(() => {


  if (window.location.search) {

    const params = qs.parse(window.location.search.substring(1))  // qs.parse - позволяет спаристь данные из ссылки в объект 
    const sort = list.find(obj => obj.sortProperty === params.sortProperty)
  
    dispatch(setFilters({ ...params, sort }))

    isSeacrh.current = true; 
  }
}, [])



useEffect (() => {

    if( !isSeacrh.current ) {
        getPizzas();
    }

    isSeacrh.current = false

}, [categoryId, sort.sortProperty, search, currentPage, /* isMounted.current */ ])  





const pizzas =  items.map((obj) => (<PizzaBlock key={obj.id}  {...obj}   /* title={item.name} price={item.price}imageUrl={item.imageUrl} sizes={item.sizes} types={item.types}  */ />))
const skeleton = [ ...new Array(4)].map((_, index)  =>  <Skeleton key={index}/> )


return (
<div className="container">
  <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} funPage={setCurrentPage}/>
        <Sort/>
  </div>   
      <h2 className="content__title">Все пиццы</h2>
    
    {status === 'error' ? <div className="content__error-info">
      
        <h2> Корзина пустая 😕</h2>
          <p> К сожалению, не удалось получить питсы.
        Попробуйте повторить попытку позже</p> </div> :  

      <div className="content__items"> {status === 'loading' ? skeleton : pizzas}</div>} 

      <Pagination  currentPage={currentPage}   onChangePage={onChangePage}/>
</div>
)}

export default Home


/* Доп функционал 

1. Без цифр в поисковике 
2. Удаление пробелов после поиска
3. Добавиление пицц разны катеогорий и размеров 
4. При выходе из корзины (запрос) - done 

5. Селекты
6. При запросе '123' условие. Сравнить даные при голой ошибке и ошибки без найденного 123



1. Side effects
*/


