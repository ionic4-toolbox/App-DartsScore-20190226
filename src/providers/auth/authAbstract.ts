import { UserCredential } from "../../../node_modules/@firebase/auth-types";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class AuthAbstract {
  abstract loginWithEmail(email: string, password: string): Promise<any>
  abstract signUp(email: string, password: string): Promise<any | UserCredential>
  abstract logout(): Promise<void>
}
