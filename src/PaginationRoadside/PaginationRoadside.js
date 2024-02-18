import React, { useState } from "react"
import { useEffect } from "react";
import "./PaginationRoadside.css"

const PaginationRoadside = (props) => {

  const [products, setProducts] = useState([])
  const [page, setPages] = useState(1)

  const productsApi = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()

    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    productsApi()
  }, [])

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 &&
      selectedPage <= products.length/10 &&
      selectedPage !== page
    )
      setPages(selectedPage)
  }


  return (
    <div>
      {
        products.length > 0 && <div className="products">
          {
            products.slice(page * 10 - 10, page * 10).map((prod) => {
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              )
            })
          }
        </div>
      }

      {
        products.length > 0 && <div className="pagination">
          <span onClick={() => { selectPageHandler(page - 1) }}>{`  <  `}
          </span>
          {
            [...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => { selectPageHandler(i + 1) }}>
                  {i + 1}
                </span>
              )

            })
          }
          <span onClick={() => { selectPageHandler(page + 1) }}>{`  >  `}</span>
        </div>

      }
    </div>
  )
};

export default PaginationRoadside;
