import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { UserCredential, User } from '@firebase/auth-types'
import { Camera, CameraOptions } from '@ionic-native/camera'
import * as fromAuth from '../../ngrx/auth/stores/state'
import * as authActions from '../../ngrx/auth/stores/action'
import * as authStores from '../../ngrx/auth/stores'
import { ToastController, Platform, LoadingController, IonicPage } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'
import { Storage } from '@ionic/storage'
import { AuthAbstract } from '../../providers/auth/authAbstract'

type FormError = {
  code: string,
  message: string
}

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthProvider, Camera]
})
export class SignupPage {
  signup: any = { username: '', email: '' , password: '' }
  imageData: string = 'assets/img/none.png'
  submitted = false
  formError: FormError = { code: '', message: '' }
  auth: AuthAbstract
  readonly options: CameraOptions = {
    quality: 100,
    allowEdit: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  HAS_LOGGED_IN = 'hasLoggedIn'
  constructor(
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public authProvider: AuthProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    private store: Store<fromAuth.State>,
  ) {
    this.auth = authProvider.firebaseAuth
    this.store.pipe(select(authStores.getSignUpFormError))
    .subscribe(data => this.formError = data)
  }

  async onSignup(form: NgForm) {
    this.submitted = true
    if (this.imageData == 'assets/img/none.png') {
      this.formError.code = "thumbnail/invalid"
      return
    }
    if (form.valid) {
      let loading = this.loadingCtrl.create()
      loading.present()
      const userCredencial: UserCredential = await this.auth.signUp(this.signup.email, this.signup.password)
      .catch ((error) => {
        this.showToast("The login attempt failed", 'top')
        loading.dismiss()
        this.storage.remove(this.HAS_LOGGED_IN)
        this.store.dispatch(new authActions.LoginFailure(error))
        return null
      })
      if (!userCredencial) return

      const signupedUser: User = await this.auth.saveProfile(this.signup.username, this.imageData)
      .catch ((error) => {
        this.showToast("something wrong", 'top')
        loading.dismiss()
        this.authProvider.firebaseAuth.deleteUser()
        this.storage.remove(this.HAS_LOGGED_IN)
        this.store.dispatch(new authActions.LoginFailure(error))
        return null
      })
      if (!signupedUser) return

      this.storage.set(this.HAS_LOGGED_IN, true)
      this.store.dispatch(new authActions.LoginSuccess(signupedUser))
      loading.dismiss()
    }
  }

  async setIcon() {
    const imageData: string
      = await this.camera.getPicture(this.options)
          .catch(err => {
            alert(JSON.stringify(err))
          })
    if (imageData) {
      this.imageData = 'data:image/jpeg;base64,' + imageData
    }
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
