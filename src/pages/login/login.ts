import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { NavController } from 'ionic-angular'
import { AngularFireAuth } from 'angularfire2/auth'

import { UserData } from '../../providers/user-data'

import { UserOptions } from '../../interfaces/user-options'

import { TabsPage } from '../tabs-page/tabs-page'
import { SignupPage } from '../signup/signup'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', email: '', password: '' }
  submitted = false

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public afAuth: AngularFireAuth
  ) {
  }

  onLogin(form: NgForm) {
    this.submitted = true
    if(form.valid) {
      this.afAuth
      .auth
      .signInWithEmailAndPassword(this.login.email, this.login.password)
      .then(() => {
        this.userData.login(this.afAuth.auth.currentUser)
        this.navCtrl.push(TabsPage)
        alert('ログインしました。')
      })
      .catch(err => {
        alert('ログインに失敗しました。\n' + err)
      })
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }
}
