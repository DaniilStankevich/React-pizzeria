import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData} from '../redux/slices/pizzaSlice';
import qs from 'qs'
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';






export const Home: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isSeacrh = useRef(false) 
  const isMounted = useRef(false)


  const {items, status} = useSelector(selectPizzaData)
  const {categoryId, sort, currentPage, search} = useSelector(selectFilter)


const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id))  
}


const onChangePage = (page:  number) => {
    dispatch(setCurrentPage( page ))
}



const getPizzas = async () => {

  const sortBy = sort.sortProperty.replace('-', '');                // по чем сортировать (rating, price, name) 
  const order = sort.sortProperty.includes('-')? 'asc' : 'desc';    // убыванию-возрастанию
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const searchHome = search ? `&search=${search}` : '';

  dispatch(
    // @ts-ignore
    
    fetchPizzas({
          sortBy,                   
          order,                    
          category,
          searchHome,
          currentPage   
        }))
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


// Если был первый рендер, то проверем URL-параметры и сохраняем в redux
// Сработка после перезагрузки страницы
useEffect(() => {

  if (window.location.search) {    //Как вариант useSearchParams

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
}, [categoryId, sort.sortProperty, search, currentPage,    ])  


  
const pizzas =  items.map((obj: any) => (<Link key={obj.id}  to={`/pizza/${obj.id}`}>  <PizzaBlock  {...obj}/> </Link>))
const skeleton = [ ...new Array(4)].map((_, index)  =>  <Skeleton key={index}/> )


//value={categoryId} onChangeCategory={onChangeCategory} funPage={setCurrentPage}

return (
<div className="container">
  <div className="content__top">
        <Categories />
        <Sort/>
  </div>   
      <h2 className="content__title">Все пиццы</h2>
    
    {status === 'error' ? <div className="content__error-info">
      
        <h2>  Упсс... 😕</h2>
          <p> К сожалению, не удалось получить питсы.
        Попробуйте повторить попытку позже</p> </div> :  

      <div className="content__items"> {status === 'loading' ? skeleton : pizzas}</div>} 

      <Pagination />
</div>
)}

export default Home




