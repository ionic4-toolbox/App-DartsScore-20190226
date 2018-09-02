import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Storage } from '@ionic/storage'
import { LoadingController, ToastController, App } from 'ionic-angular'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess
} from '../stores/action'

import { UserCredential } from '@firebase/auth-types'
import { UserOptions } from '../../../interfaces/user-options'
import { AuthProvider } from '../../../providers/auth/auth'
import { AngularFireStorage } from 'angularfire2/storage'

@Injectable()
export class AuthEffects {
  HAS_LOGGED_IN = 'hasLoggedIn'
  constructor(
    private actions$: Actions,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public afStorage: AngularFireStorage,
    private app: App,
    private authProvider: AuthProvider,
  ) {
  }

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    map((action: any) => action.payload),
    exhaustMap((user: UserOptions) => {
      let loading = this.loadingCtrl.create()
      loading.present()
      return this.authProvider.firebaseAuth.loginWithEmail(user.email, user.password)
      .pipe(
        map((userCredential: UserCredential) => {
          console.log("loginwithemail: ", JSON.stringify(userCredential))
          loading.dismiss()
          this.storage.set(this.HAS_LOGGED_IN, true)
          return new LoginSuccess(userCredential.user)
        }),
        catchError(error => {
          this.showToast("The login attempt failed", 'top')
          loading.dismiss()
          this.storage.remove(this.HAS_LOGGED_IN)
          return of(new LoginFailure(error))
        })
      )
    })
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      console.log("loginsuccess: ")
      this.storage.get('hasSeenTutorial')
      .then(data => {
        console.log("inner loginsuccess: ", JSON.stringify(data))
        if (data) {
          this.app.getActiveNavs()[0].push('TabsPage')
        } else {
          this.app.getActiveNavs()[0].push('TutorialPage')
        }
      })
    })
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REDIRECT, AuthActionTypes.LOGOUT),
    exhaustMap(() => {
      this.storage.remove(this.HAS_LOGGED_IN)
      return this.authProvider.firebaseAuth.logout()
    })
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