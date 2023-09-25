export type Sort = {
    name: string,
    sortProperty: string  
}
  
export  interface FilterSliceState {
    search: string,
    currentPage: number,
    categoryId: number,
    sort: Sort 
}