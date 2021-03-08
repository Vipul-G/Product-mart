import { Action, createReducer, on} from '@ngrx/store';
import * as actions from './products.actions'
import { ProductState } from '../types'


const initialState: ProductState = {
  products: [],
  loading: false,
  error: ''
}

const reducer = createReducer(
  initialState,
  on(actions.loadProducts, (state) => ({...state, loading: true}) ),
  on(actions.loadProductsSuccess, (state, {products}) => ({
    products,
    loading: false,
    error: ''
  })),
  on(actions.loadProductsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(actions.addProduct, (state) => state),
  on(actions.addProductSuccess, (state, action) => ({
    loading: false,
    error: '',
    products: [action.product, ...state.products]
  })),
  on(actions.addProductFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

  on(actions.updateProduct, (state) => state),
  on(actions.updateProductSuccess, (state, action) => ({
    loading: false,
    error: '',
    products: state.products.map((p) => {
      if(p.id == +action.product.id) {
        return action.product
      }
      return p
    })
  })),
  on(actions.updateProductFailure, (state, action) => ({
    ...state,
    error: action.error
  })),

  on(actions.deleteProduct, (state) => state),
  on(actions.deleteProductSuccess, (state, action) => ({
    loading: state.loading,
    error: '',
    products: state.products.filter((p) => p.id !== action.id)
  })),
  on(actions.deleteProductFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
)

export const productFeatureKey = 'productState'

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}
