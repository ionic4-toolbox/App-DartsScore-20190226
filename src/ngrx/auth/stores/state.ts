import { User } from '@firebase/auth-types'

type FormError = {
  code: string,
  message: string
}

/**
 * 状態
 */
export interface State {
  user: User,
  hasLoggedIn: boolean,
  signUpFormError: FormError
}

/**
 * 初期状態
 */
export const initialState: State = {
  user: null,
  hasLoggedIn: false,
  signUpFormError: {code: '', message: ''}
}