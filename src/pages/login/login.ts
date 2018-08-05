import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { NavController, ToastController } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'

import { UserData } from '../../providers/user-data'

import { UserOptions } from '../../interfaces/user-options'

import { TabsPage } from '../tabs-page/tabs-page'
import { SignupPage } from '../signup/signup'
import { UserCredential } from '@firebase/auth-types'
import { AuthAbstract } from '../../providers/auth/authAbstract'

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
    public toastCtrl: ToastController,
    public userData: UserData,
    public authProvider: AuthProvider
  ) {
    this.auth = authProvider.firebaseAuth
  }

  onLogin(form: NgForm) {
    this.submitted = true
    if(form.valid) {
      this.auth
      .loginWithEmail(this.login.email, this.login.password)
      .then((userCredential: UserCredential) => {
        this.userData.login(userCredential.user)
        this.navCtrl.push(TabsPage)
      })
      .catch(err => {
        this.showToast("The login attempt failed", 'top')
      })
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }

  private showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position
    })
    toast.present()
  }
}
