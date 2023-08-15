import React from 'react'

import styles from './NotFoundBlock.module.scss';


console.log(styles);

const NotFoundBlcok = () => {
  return (
    <div className={styles.root}>
    <h1>
        <span>:(</span>

        <br />

        Ничего не найдено

    </h1>

    <p className={styles.description}> К сожалению данная страница отсуттсвует в нашей пиццерии</p>
    </div>
  )
}


export default NotFoundBlcok;