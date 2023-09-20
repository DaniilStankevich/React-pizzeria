import React from 'react'
import styles from './NotFoundBlock.module.scss';


const NotFoundBlcok: React.FC = () => {
  return (
    <div className={styles.root}>
    <h1>
        <span>:(</span>

        <br />

        Ничего не найдено

    </h1>

    <p className={styles.description}> К сожалению данная страница отсутсвует в нашей пиццерии</p>
    </div>
  )
}


export default NotFoundBlcok;