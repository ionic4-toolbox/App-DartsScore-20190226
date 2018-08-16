import { UserCredential } from "@firebase/auth-types"
import { Observable } from 'rxjs'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class AuthAbstract {
  abstract loginWithEmail(email: string, password: string): Observable<any| UserCredential>
  abstract signUp(email: string, password: string): Observable<any | UserCredential>
  abstract logout(): Observable<void>
}
