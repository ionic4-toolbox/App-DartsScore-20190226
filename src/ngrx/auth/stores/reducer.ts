import * as AuthAction from './action'
import { State, initialState } from './state'

/**
 * Reducer
 */
export function reducer(state = initialState, action: AuthAction.Actions): State {
  switch (action.type) {
    case AuthAction.AuthActionTypes.LOGIN_SUCCESS: {
      return Object.assign({}, state, { hasLoggedIn: true, user: action.payload })
    }
    case AuthAction.AuthActionTypes.LOGOUT: {
      return Object.assign({}, state, initialState)
    }
    default: {
      return state
    }
  }
}