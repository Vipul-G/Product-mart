import { createAction } from '@ngrx/store';
import User from '../../types/user'

export const setUser = createAction('[user] set user', (payload: {user: User}) => {
  return {payload: payload.user}
})
export const unsetUser = createAction('[user] unset user')
