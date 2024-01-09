import { HeartIcon, StarIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/solid"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toggleBookmark, addProductTocart } from "../../../store/products/actions"
import { RootState } from "../../../store/reducers"
import { IProduct } from "../../../interfaces/Product"
import { ShoppingBagIcon } from "@heroicons/react/outline"
import moment from 'moment'
interface Props {
  product: IProduct
}
interface   IDataSend{
  userId : number ;
  date : string ;
  products:[{
    productId : number
    quantity : number
  }]
}

const SingleProduct = ({ product }: Props) => {
  const bookmarkIds: number[] = useSelector((state: RootState) => state.products.bookmarkedIds)
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch()

  const handleBookmarkChange = (e) => {
    dispatch(toggleBookmark(product.id))
  }
  const  handleAddCart =(id) =>{
    // addProductTocart
    const userData  = JSON.parse(currentUser)
    const dataSend :IDataSend = {
      userId:userData.id,
      date:moment().format("YYYY-MM-DD"),
      products:[{productId:id,quantity:1}]
  }
  dispatch(addProductTocart(dataSend))
  }
  return (
    <>
      <div key={product.id} className="relative p-5 shadow hover:shadow-xl rounded-md">
        <button className="absolute z-10 top-2 right-2 bg-white rounded-3xl" onClick={handleBookmarkChange}>
          {bookmarkIds.includes(product.id) ? (
            <HeartIconSolid className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
          ) : (
            <HeartIcon className="m-3 h-7 w-7 text-pink-400 hover:text-pink-600" />
          )}
        </button>
        <div className="w-full min-h-60 bg-gray-200 aspect-w-3 aspect-h-4 rounded-md overflow-hidden lg:h-60">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-center object-fill lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <p className="mt-1 text-sm text-white mb-4 font-bold text-center bg-teal-300">{product.category.toUpperCase()}</p>
          <h3 className="text-sm text-gray-700 text-ellipsis truncate" title={product.title}>
            <Link to={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>

          <p className="mt-1 flex gap-1 mb-5 items-center text-sm text-gray-500">
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
            {/* <Rating value={product.rating.rate}  /> */}
            | {product.rating.count}
          </p>
          <div className="flex">
          <p className="text-sm mt-[5px]  font-medium text-gray-900">${product.price}</p>
          <button onClick={()=> handleAddCart(product.id)} className="absolute right-6   ml-auto text-white bg-teal-500  border-transparent border-0  py-1 px-2  hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50 rounded">
          <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
