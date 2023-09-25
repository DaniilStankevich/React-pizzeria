export type CartItem = {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,

    count: number,
    uniqueValue: string
}

export interface MyActionPayload {
    id: number;
    type: string;
    size: number;
  }

export interface CartSliceState {
    totalPrice: number
    items: CartItem[]
    amountPizzas: number
}