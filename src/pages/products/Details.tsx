import { HeartIcon, PlusIcon, StarIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleProduct, toggleBookmark } from "../../store/products/actions"
import { RootState } from "../../store/reducers"
import Loader from "../../common/components/Loader"
import { IProduct } from "../../interfaces/Product"

const Details: React.FC = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const product: IProduct = useSelector((state: RootState) => state.products.singleProduct)
  const bookmarkIds: number[] = useSelector((state: RootState) => state.products.bookmarkedIds)

  useEffect(() => {
    setLoading(true)
    dispatch(
      getSingleProduct(Number(params.id), () => {
        setLoading(false)
      })
    )
  }, [dispatch, params.id])

  /**
   * Toggle bookmark
   * @param e
   */
  const handleBookmarkChange = (e) => {
    dispatch(toggleBookmark(product.id))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="text-gray-700 overflow-hidden">
          <div className="container px-5 py-10 mx-auto bg-white">
            <div className="border-b border-gray-200 mb-10 text-xxl">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-5">{product?.title}</h1>
            </div>
            <div className="lg:w-full mx-auto flex flex-wrap">
              <div className="border border-gray-200 rounded p-[20px] shadow">
                <img
                  className="lg:w-[500px] h-[500px] w-full object-fill object-center"
                  src={product?.image}
                  alt={product?.title}
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.category.toUpperCase()}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <>
                        {Math.floor(product?.rating.rate) > rating ? (
                          <StarIconSolid
                            key={rating + product?.rating.rate}
                            className="h-5 w-5 flex-shrink-0 text-yellow-300"
                            aria-hidden="true"
                          />
                        ) : (
                          <StarIcon
                            key={rating + product?.rating.rate}
                            className="h-4 w-4 flex-shrink-0 text-yellow-300"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    ))}
                    <span className="text-gray-600 ml-3">
                      {product?.rating.rate} / {product?.rating.count} Reviews
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">{product?.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none  text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                  <button className="flex ml-auto text-white bg-teal-500 border border-transparent border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50 rounded">
                    <PlusIcon className="flex justify-around h-5 w-5 mr-1" aria-hidden="true" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBookmarkChange}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-pink-400 hover:text-pink-600 ml-4"
                  >
                    {bookmarkIds.includes(product?.id) ? (
                      <HeartIconSolid className="m-3 h-8 w-8 text-pink-400 hover:text-pink-700" />
                    ) : (
                      <HeartIcon className="m-3 h-8 w-8 text-pink-400 hover:text-pink-700" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Details
