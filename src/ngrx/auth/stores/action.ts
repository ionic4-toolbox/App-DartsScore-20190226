import { Action } from '@ngrx/store'
import { User } from '@firebase/auth-types'

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  SIGNUP = '[Auth] Signup',
  LOGOUT = '[Auth] Logout',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGIN_REDIRECT = '[Auth] Login Redirect',
  CHANGE_USER_STATE = '[Auth] Change User State',
}

/**
 * ログインのとき
 *
 * @export
 * @class Login
 * @implements {Action}
 * @argument payload 
 */
export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN
  constructor(public payload: {email: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP
  constructor(public payload: {email: string, password: string, username: string, thumbnail: string}) {}
}

/**
 * ログアウトのとき
 *
 * @export
 * @class Logout
 * @implements {Action}
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT
  constructor() {}
}

/**
 * ログインが成功したとき
 *
 * @export
 * @class LoginSuccess
 * @implements {Action}
 */
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS
  constructor(public payload: User) {}
}

/**
 * ログインが失敗したとき
 *
 * @export
 * @class LoginFailure
 * @implements {Action}
 */
export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE
  constructor(public payload: any) {}
}

/**
 * ログイン画面にリダイレクトするとき
 *
 * @export
 * @class LoginRedirect
 * @implements {Action}
 */
export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LOGIN_REDIRECT
  constructor() {}
}

export class ChangeUserState implements Action {
  readonly type = AuthActionTypes.CHANGE_USER_STATE
  constructor(public payload: User) {}
}

export type Actions = Login
                    | Signup
                    | LoginSuccess
                    | LoginFailure
                    | LoginRedirect
                    | Logout
                    | ChangeUserState