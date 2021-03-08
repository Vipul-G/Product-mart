import { createAction, props } from '@ngrx/store';
import Product from '../../types/product'
import { CartProduct } from './cart';


export const loadCart = createAction('[Cart] loadCart')
export const loadCartSuccess =
createAction('[Cart] load cart success', props<{cartProducts: CartProduct[]}>())
export const loadCartFailure =
createAction('[Cart] load cart failure', props<{error: string}>())

export const addProduct =
createAction('[Cart] add product', props<{ product: Product }>())
export const addProductSuccess =
createAction('[Cart] add product success', props<{ product: Product }>())
export const addProductFailure =
createAction('[Cart] add product failure', props<{ error: string }>())

export const removeProduct =
createAction('[Cart] remove product', props<{ product_id: number }>())
export const removeProductSuccess =
createAction('[Cart] remove product success', props<{ product_id: number }>())
export const removeProductFailure =
createAction('[Cart] remove product failure', props<{ error: string }>())

export const updateCount =
createAction('[Cart] update product count', props<{ product_id: number, count: number }>())
export const updateCountSuccess =
createAction('[Cart] update product count success', props<{ product_id: number, count: number }>())
export const updateCountFailure =
createAction('[Cart] update product count failure', props<{ error: string }>())

