import styles from './Pagination.module.scss'
import React from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';


/* 
type PaginationProps = {
  currentPage: number,
  coChangePage: any
}

React.FC<PaginationProps>
*/

const Pagination: React.FC = () => {

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