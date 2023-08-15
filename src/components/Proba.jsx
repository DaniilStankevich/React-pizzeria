import React, { useState } from 'react'
import styles from './Search.module.scss'

//let newText = text.split('')



const  Trenazher  = () => {

const [ value, setValue  ] = useState('')    // Введенный тект в input



const [right, setRight] = useState(0)
const [ misstake, setMisstake ] = useState(0)


console.log(right, '- Верно')
console.log(misstake, '- Ошибка')


console.log(value)


let text =  'Пир в Питере'                       // Заданное значение при сабмите
const arrMain = [' ', 'П', 'и', 'р', ' ', 'в', ' ', 'П', 'и', 'т', 'е', 'р', 'е']     // Тоже значение только посимвольно в виде массива





const onChangeInput = (event) => {

    let takenVal = event.target.value
    //console.log(event.target.value)
    // setValue(event.target.value)
    


    setValue(takenVal)

    let sum = 0
    let sumM =  0


if (takenVal === '') {
    setRight(0)
        setMisstake(0)
}



if( takenVal !== '') {



    for(let i = 0; i <  takenVal.length; i++) {
        

     
        if(takenVal[i] === arrMain[i] ) {
      
            //console.log('Верно')
             sum = sum + 1 
             
        
        }




        if(takenVal[i] !== arrMain[i] ) {
            //console.log('Не верно')

            sumM = sumM + 1

            //setMisstake(sumM)
        }


        setRight(sum)
        setMisstake(sumM)

    }
    sum = 0
    sumM =  0



}


}





return  (


 
    <div className={styles.root}>

                <p>{text}</p>


            <input  onChange={onChangeInput} value={value}          className={styles.input}    />


    </div>




) 





}

export default Trenazher













                //for(let ine = 0; ine <  takenVal.length; ine++  ) {
                //    if ( takenVal[ine] === arrMain[ine] ) {
                //        sum = sum + 1
                //    setRight(sum)
                //}