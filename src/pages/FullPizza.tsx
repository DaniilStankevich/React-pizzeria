import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"

const FullPizza: React.FC = () => {
  const { id } = useParams() //Вытаскиеваем параметр из строки

  const [pizza, setData] = useState<{
    imageUrl: string
    name: string
    price: number
    description: string
  }>({
    imageUrl: "",
    name: "",
    price: 0,
    description: "",
  })

  useEffect(() => {
    async function fecthPizza() {
      try {
        const { data } = await axios.get(
          "https://645f47507da4477ba9542dc4.mockapi.io/items/" + id
        )
        setData(data)
      } catch (console) {
        alert("Ошибка при получение пиццы!")
      }
    }

    fecthPizza()
  }, [])

  //<div className="container__fullPizza-loading">
  // <h1>Загрузка...</h1>
  //</div>
  //
  if (!pizza) {
    return (
      <div className="container__fullPizza-loading">
        <h1>Загрузка...</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="container__content">
        <div className="container__fullPizza">
          <img
            className="container__fullPizza-image"
            src={pizza.imageUrl}
          />

          <div>
            <h2>{pizza.name} </h2>
            <p> {pizza.description} </p>
            <h4>от {pizza.price} ₽</h4>
          </div>
        </div>

        <Link
          to="/"
          className="container__fullPizza-button"
        >
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}

export default FullPizza
