import { Injectable } from '@angular/core'
import { FirebaseAuthProvider } from '../firebase-auth/firebase-auth'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(
    public firebaseAuth: FirebaseAuthProvider
  ) {
  }
}
