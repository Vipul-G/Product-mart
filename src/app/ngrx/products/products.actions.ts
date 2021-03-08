import { createAction, props } from '@ngrx/store'
import Product from '../../types/product'

export const loadProducts =
createAction('[Product Effect] load products');
export const loadProductsSuccess =
createAction('[Product Effect] load products success', props<{products: Product[]}>());
export const loadProductsFailure =
createAction('[Product Effect] load products failure', props<{error: string}>())

export const addProduct =
createAction('[Product Effect] add product', props<{product: FormData}>())
export const addProductSuccess =
createAction('[Product Effect] add product success', props<{product: Product}>())
export const addProductFailure =
createAction('[Product Effect] add product failure', props<{error: string}>())

export const updateProduct =
createAction('[Product Effect] update product', props<{ product: FormData }>())
export const updateProductSuccess =
createAction('[Product Effect] update product success', props<{ product: Product }>())
export const updateProductFailure =
createAction('[Product Effect] update product failure', props<{ error: string }>())

export const deleteProduct =
createAction('[Product Effect] delete product', props<{ id: number, imagePath: string }>());
export const deleteProductSuccess =
createAction('[Product Effect] delete product success', props<{id: number}>())
export const deleteProductFailure =
createAction('[Product Effect] delete product failure', props<{ error: string }>())


