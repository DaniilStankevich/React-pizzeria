export type FetchPizzasArgs = {
    sortBy: string, 
    order: string, 
    category: string,  
    searchHome: string, 
    currentPage: number,
}

export type Pizza = {
    id: string,
    name: string ,
    types: number[] , 
    price:  number, 
    sizes: number[],  
    imageUrl: string, 
}
  
export interface PizzaSliceState {
      items: Pizza[],
      status:  Status   //'idle' | 'loading' | 'success' | 'error' 
}
  
export  enum Status {
    LOADING = 'loading',
    SUCCES = 'success',
    ERROR = 'error'
}