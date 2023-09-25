import { RootState } from "../store"

export const selectPizzaData = (state: RootState) => state.pizza
export const selectPizzaSTATUS = (state: RootState) => state.pizza.status
