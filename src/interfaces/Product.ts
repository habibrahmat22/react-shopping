export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface IResultAddToCart {
  id : number
  userId : number
  date  : string
  products : {
    productId : number
    quantity : number
  }
}
export interface IFilterParams {
  q: string
  category: string[]
  sortBy: string
}
