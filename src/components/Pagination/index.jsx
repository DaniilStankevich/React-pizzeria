import styles from './Pagination.module.scss'
import React from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage,          selectFilter} from '../../redux/slices/filterSlice';




const Pagination = () => {

const {currentPage}  = useSelector(selectFilter)
const dispatch = useDispatch()


  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))                   }
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        />
  )
}


export default Pagination;