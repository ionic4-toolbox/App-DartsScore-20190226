import { User } from '@firebase/auth-types'

/**
 * 状態
 */
export interface State {
  user: User,
  hasLoggedIn: boolean,
}

/**
 * 初期状態
 */
export const initialState: State = {
  user: null,
  hasLoggedIn: false,
}