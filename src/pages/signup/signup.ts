import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { NavController, Platform } from 'ionic-angular'
import { UserData } from '../../providers/user-data'
import { AuthProvider } from '../../providers/auth/auth'

import { UserCredential } from '@firebase/auth-types'
import { UserOptions } from '../../interfaces/user-options'

import { TutorialPage } from '../tutorial/tutorial'
import { AuthAbstract } from '../../providers/auth/authAbstract';

type FormError = {
  code: '',
  message: ''
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthProvider]
})
export class SignupPage {
  signup: UserOptions = { username: '', email: '' , password: '' }
  submitted = false
  formError: FormError = { code: '', message: '' }
  auth: AuthAbstract

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public platform: Platform,
    public authProvider: AuthProvider
  ) {
    this.auth = authProvider.firebaseAuth
  }

  onSignup(form: NgForm) {
    this.submitted = true
    this.auth
    .signUp(this.signup.email, this.signup.password)
    .then((userCredential: UserCredential) => { 
      if (form.valid) {
        userCredential.user.updateProfile({
          displayName: this.signup.username,
          photoURL: 'some/url'
        })
        .then(() => {
          this.userData.signup(userCredential.user)
          this.navCtrl.push(TutorialPage)
        })
      }
    })
    .catch(err => {
      this.formError = err
    })
  }
}
