import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { Camera, CameraOptions } from '@ionic-native/camera'
import { AngularFireStorage } from 'angularfire2/storage'
import { NavController, Platform, LoadingController } from 'ionic-angular'
import { UserData } from '../../providers/user-data'
import { AuthProvider } from '../../providers/auth/auth'

import { UserCredential, /*User*/ } from '@firebase/auth-types'
import { UserOptions } from '../../interfaces/user-options'

import { TutorialPage } from '../tutorial/tutorial'
import { AuthAbstract } from '../../providers/auth/authAbstract'
import { UploadTaskSnapshot } from '../../../node_modules/@firebase/storage-types';

type FormError = {
  code: '',
  message: ''
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthProvider, Camera]
})
export class SignupPage {
  signup: UserOptions = { username: '', email: '' , password: '' }
  submitted = false
  formError: FormError = { code: '', message: '' }
  auth: AuthAbstract
  imageData: string = 'assets/img/none.png'
  readonly options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public userData: UserData,
    public platform: Platform,
    public authProvider: AuthProvider,
    public camera: Camera,
    public afStorage: AngularFireStorage
  ) {
    this.auth = authProvider.firebaseAuth
  }

  async onSignup(form: NgForm) {
    this.submitted = true
    if (form.valid) {
      let loading = this.loadingCtrl.create()
      loading.present()
      const userCredential: UserCredential
        = await this.auth
            .signUp(this.signup.email, this.signup.password)
            .catch(err => {
              this.formError = err
              loading.dismiss()
            })
      if(!userCredential) return

      const uploadTaskSnapshot: UploadTaskSnapshot 
        = await this.afStorage
            .ref(userCredential.user.uid + '/profile-image')
            .putString(this.imageData, 'data_url')
            .catch(err => {
              alert(JSON.stringify(err))
              loading.dismiss()
            })
      if(!uploadTaskSnapshot) return

      const url = await uploadTaskSnapshot.ref.getDownloadURL()
      if(!url) return

      await userCredential.user.updateProfile({
        displayName: this.signup.username,
        photoURL: url
      })

      this.userData.signup(userCredential.user)
      this.navCtrl.push(TutorialPage)
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
}
