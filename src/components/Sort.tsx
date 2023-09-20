import { useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort} from "../redux/slices/filterSlice";
import { useRef } from 'react';
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";




type SortItem = {
  name: string
  sortProperty: string
}


export const list: SortItem[] = [ 
  {name:'популярности',  sortProperty: 'rating' },
  {name:'популярности',  sortProperty: '-rating' }, 

  {name:'цене', sortProperty: 'price' },  
  {name:'цене', sortProperty: '-price' },  
  
  {name:'алфавиту', sortProperty: 'name'}, 
  {name:'алфавиту', sortProperty: '-name'} 
 ]



 const listRender: SortItem[]  = [
  {name:'популярности',  sortProperty: 'rating' },
  {name:'цене', sortProperty: 'price' },  
  {name:'алфавиту', sortProperty: 'name'} 
 ]


function Sort () {

const [open, setOpen] = useState(false)   


const dispatch  = useDispatch()
const sort = useSelector(selectSort)

const sortRef = useRef<HTMLDivElement>(null)
const sortName = sort.name


const OnClickListItem = (obj: SortItem, objState: SortItem) => {

    if (obj.name !== objState.name) {
      setOpen(false)
      dispatch(setSort(objState))
    }

    if(obj.name === objState.name )  {
      setOpen(false)

    let newSent = list.filter((el) => el.name === obj.name && el.sortProperty !== obj.sortProperty )


      dispatch(setSort(newSent[0])) 
    }  
}


  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if(!event.composedPath().includes(sortRef.current)) {
        setOpen(false)
    }
    }
    
    document.body.addEventListener('click', handleClickOutside )
   
    return () => {
      document.body.removeEventListener('click', handleClickOutside );
    };
},[] )
  


  return (
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>

          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}>{sortName}</span>

           {sort.sortProperty.includes('-') ?<IoArrowDownSharp className="sort__popup_icon"  />: <IoArrowUpSharp className="sort__popup_icon" />}   

        </div>

      {open && 
        <div className="sort__popup">
          <ul>
           { listRender.map((obj, i) => (

              <li
                key={i}
                 onClick={() => OnClickListItem(sort, obj)} 

                className={sort.name == obj.name ? 'active': ''}>

                {obj.name}  

              </li>
              

           ))}
          </ul>
        </div>}

     
           

      </div>)
  }
  
export default Sort;