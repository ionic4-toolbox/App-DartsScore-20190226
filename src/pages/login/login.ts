import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { NavController, ToastController, LoadingController } from 'ionic-angular'
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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public userData: UserData,
    public authProvider: AuthProvider
  ) {
    this.auth = authProvider.firebaseAuth
  }

  async onLogin(form: NgForm) {
    this.submitted = true
    if(form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      })
      loading.present()
      const userCredential: UserCredential
        = await this.auth
            .loginWithEmail(this.login.email, this.login.password)
            .catch((/*err*/) => {
              this.showToast("The login attempt failed", 'top')
              loading.dismiss()
              return
            })
      this.userData.login(userCredential.user)
      this.navCtrl.push(TabsPage)
      loading.dismiss()
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
