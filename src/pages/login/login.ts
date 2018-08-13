import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { NavController } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'

import { UserOptions } from '../../interfaces/user-options'

import { SignupPage } from '../signup/signup'
import { AuthAbstract } from '../../providers/auth/authAbstract'
import * as fromAuth from '../../ngrx/auth/stores/state'
import * as AuthActions from '../../ngrx/auth/stores/action'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthProvider]
})
export class LoginPage {
  login: UserOptions = { username: '', email: '', password: '' }
  submitted = false
  auth: AuthAbstract

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    private store: Store<fromAuth.State>
  ) {
    this.auth = authProvider.firebaseAuth
  }

  async onLogin(form: NgForm) {
    this.submitted = true
    if(form.valid) {
      this.store.dispatch(new AuthActions.Login({
        email: this.login.email,
        password: this.login.password
      }))
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }
}
