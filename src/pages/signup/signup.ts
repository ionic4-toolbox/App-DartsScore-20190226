import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { NavController, Platform } from 'ionic-angular'
import { UserData } from '../../providers/user-data'

import { AngularFireAuth } from 'angularfire2/auth'
import { UserCredential, User } from '@firebase/auth-types'
import { UserOptions } from '../../interfaces/user-options'

import { TutorialPage } from '../tutorial/tutorial'


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: UserOptions = { username: '', email: '' , password: '' }
  submitted = false

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public afAuth: AngularFireAuth,
    public platform: Platform
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true
    this.afAuth
    .auth
    .createUserWithEmailAndPassword(this.signup.email, this.signup.password)
    .then((userCredential: UserCredential) => { 
      if (form.valid) {
        // User created now create the database user
        this.afAuth.authState
        .subscribe((user: User) => {
          user.updateProfile({
            displayName: this.signup.username,
            photoURL: 'some/url'
          })
          .then(() => {
            this.userData.signup(user)
            this.navCtrl.push(TutorialPage)
          })
        })
      }
    })
    .catch(err => {
      alert('Something went wrong:' + err.message)
    })
  }
}
