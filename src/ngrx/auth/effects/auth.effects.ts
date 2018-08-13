import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { LoadingController, ToastController, Loading, App } from 'ionic-angular'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
} from '../stores/action'

import { UserCredential } from '@firebase/auth-types'
import { UserOptions } from '../../../interfaces/user-options'
import { AuthProvider } from '../../../providers/auth/auth'
import { TutorialPage } from '../../../pages/tutorial/tutorial';
import { LoginPage } from '../../../pages/login/login';

@Injectable()
export class AuthEffects {
  loading: Loading
  constructor(
    private actions$: Actions,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private app: App,
    private authProvider: AuthProvider,
  ) {
  }

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    map((action: any) => action.payload),
    exhaustMap((user: UserOptions) => {
      this.loading = this.loadingCtrl.create()
      this.loading.present()
      return this.authProvider.firebaseAuth.loginWithEmail(user.email, user.password)
      .pipe(
        map((user: UserCredential) => {
          this.loading.dismiss()
          return new LoginSuccess(user)
        }),
        catchError(error => {
          this.showToast("The login attempt failed", 'top')
          this.loading.dismiss()
          return of(new LoginFailure(error))
        })
      )
    })
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.app.getActiveNav().push(TutorialPage))
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REDIRECT, AuthActionTypes.LOGOUT),
    exhaustMap(() => {
      return this.authProvider.firebaseAuth.logout()
    }),
    tap(() => this.app.getActiveNav().push(LoginPage))
  )

  private showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position
    })
    toast.present()
  }
}