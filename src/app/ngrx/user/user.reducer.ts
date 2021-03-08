import { Action, createReducer, on} from '@ngrx/store';
import * as actions from './user.actions'
import State from '../../types/user'

const initialState: State | {} = {}

const reducer = createReducer(
  initialState,
  on(actions.setUser, (state, {payload}) => ({...payload}) ),
  on(actions.unsetUser, (state) => ({}))
)

export const authFeatureKey = 'userState'

export function userReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
