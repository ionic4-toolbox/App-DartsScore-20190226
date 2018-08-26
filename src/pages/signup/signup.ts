import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Camera, CameraOptions } from '@ionic-native/camera'
import * as fromAuth from '../../ngrx/auth/stores/state'
import * as authActions from '../../ngrx/auth/stores/action'
import * as authStores from '../../ngrx/auth/stores'
import { NavController, Platform, LoadingController, IonicPage } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'

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

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public authProvider: AuthProvider,
    private store: Store<fromAuth.State>,
  ) {
    this.auth = authProvider.firebaseAuth
    this.store.pipe(select(authStores.getSignUpFormError))
    .subscribe(data => this.formError = data)
  }

  onSignup(form: NgForm) {
    this.submitted = true
    if (this.imageData == 'assets/img/none.png') {
      this.formError.code = "thumbnail/invalid"
      return
    }
    if (form.valid) {
      this.store.dispatch(new authActions.Signup({
        email: this.signup.email,
        password: this.signup.password,
        thumbnail: this.imageData,
        username: this.signup.username
      }))
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
}
