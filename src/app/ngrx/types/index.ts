import UserState from '../../types/user'
import Product from '../../types/product'
import { Cart } from '../cart/cart'

export interface AppState {
  userState: UserState;
  productState: ProductState;
  cartState: CartState;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: '';
}

export class CartState extends Cart {
  constructor(cartProds, loading: Boolean, error: string) {
    super(cartProds, loading, error)
  }
}



