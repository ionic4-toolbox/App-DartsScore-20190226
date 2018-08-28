import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireStorage } from 'angularfire2/storage'
import { AuthAbstract } from '../auth/authAbstract'
import { UserCredential, User } from '@firebase/auth-types'
import { UploadTaskSnapshot } from 'firebase/storage'

import { from, Observable } from 'rxjs'
// import { map, catchError, flatMap, } from '../../../node_modules/rxjs/operators'
/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider extends AuthAbstract {

  constructor(
    public afAuth: AngularFireAuth,
    public afStorage: AngularFireStorage,
  ) {
    super()
  }

  public loginWithEmail(email: string, password: string): Observable<UserCredential> {
    return from(
      this.afAuth.auth
      .signInWithEmailAndPassword(email, password))
  }

  public signUp(email: string, password: string): Observable<UserCredential> {
    console.log("SINGUP: ", email, password)
    return from(
      this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
    )
  }

  public async saveProfile(username: string, thumbnail: string): User {
    const user: User = this.afAuth.auth.currentUser
    const uploadTaskSnapshot: UploadTaskSnapshot = await this.afStorage
    .ref(user.uid + '/profile-image')
    .putString(thumbnail, 'data_url')
    if(!uploadTaskSnapshot) {
      throw new Error("写真情報がない")
    }
    const url: string = await uploadTaskSnapshot.ref.getDownloadURL()
    if(!url) {
      throw new Error("写真のURLがない")
    }
    await this.afAuth.auth.currentUser.updateProfile({
      photoURL: url,
      displayName: username
    })
    return this.afAuth.auth.currentUser
  }

  public deleteUser(): Observable<void> {
    return from(this.afAuth.auth.currentUser.delete())
  }

  public logout(): Observable<void> {
    return from(
      this.afAuth.auth.signOut())
  }

}
