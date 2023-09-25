import { RootState } from "../store"

export const selectCart = (state: RootState) => state.cart
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.filter((obj) => obj.id === id).reduce((sum, obj) => obj.count + sum ,0 )

