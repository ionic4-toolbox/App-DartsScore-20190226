import { Injectable } from '@angular/core'

import { Storage } from '@ionic/storage'
import { User } from '@firebase/auth-types'
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn'

  constructor(
    public storage: Storage,
    public afAuth: AngularFireAuth
  ) {}

  login(user: User): void {
    this.storage.set(this.HAS_LOGGED_IN, true)
    this.setUser(user)
  }

  signup(user: User): void {
    this.storage.set(this.HAS_LOGGED_IN, true)
    this.setUser(user)
  }

  logout(): void {
    this.afAuth.auth.signOut()
    .then(() => {
      this.storage.remove(this.HAS_LOGGED_IN)
      this.storage.remove('user')
    })
  }

  setUser(user: User): void {
    this.storage.set('user', JSON.stringify(user))
  }

  getUser(): Promise<User> {
    return this.storage.get('user').then((value) => {
      return JSON.parse(value)
    })
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true
    })
  }
}
