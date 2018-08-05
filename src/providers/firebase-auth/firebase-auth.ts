import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'
import { AuthAbstract } from '../auth/authAbstract'
import { UserCredential } from '@firebase/auth-types'
/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider extends AuthAbstract {

  constructor(
    public afAuth: AngularFireAuth
  ) {
    super()
  }

  public loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
  }

  public signUp(email: string, password: string): Promise<UserCredential> {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
  }

}
