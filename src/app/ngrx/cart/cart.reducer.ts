import { state } from '@angular/animations';
import { Action, createReducer, on} from '@ngrx/store';
import { CartState } from '../types'
import * as actions from './cart.actions'


const initialState: CartState = new CartState([], false, '')

const reducer = createReducer(
  initialState,

  // loadProduct
  on(actions.loadCart, (state) => new CartState(state.cartProducts, true, '')),
  on(actions.loadCartSuccess, (state, action) => {
    return new CartState(action.cartProducts, false, '')
  }),
  on(actions.loadCartFailure, (state, action) => {
    return new CartState(state.cartProducts, false, action.error)
  }),

  // addProduct
  on(actions.addProduct, (state) => {
    return new CartState(state.cartProducts, true, '')
  }),
  on(actions.addProductSuccess, (state, action) => {
    const cart = new CartState(state.cartProducts, false, '')
    cart.addProduct(action.product)
    return cart
  }),
  on(actions.addProductFailure, (state, action) => {
    const cart = new CartState(state.cartProducts, false, action.error)
    return cart
  }),

  // updateCount
  on(actions.updateCount, (state) => new CartState(state.cartProducts, true, '')),
  on(actions.updateCountSuccess, (state, action) => {
    const cart = new CartState(state.cartProducts, false, '')
    cart.updateCount(action.product_id, action.count, -1)
    return cart
  }),
  on(actions.updateCountFailure, (state, action) => new CartState(state.cartProducts, false, action.error)),

  //removeProduct
  on(actions.removeProduct, (state) => new CartState(state.cartProducts, true, '')),
  on(actions.removeProductSuccess, (state, action) => {
    const cart = new CartState(state.cartProducts, false, '')
    cart.removeProduct(action.product_id)
    return cart
  }),
  on(actions.removeProductFailure, (state, action) => new CartState(state.cartProducts, false, action.error))
)

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
