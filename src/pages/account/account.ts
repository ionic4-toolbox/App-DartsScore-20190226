import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { IonicPage, ToastController, NavController, NavParams, LoadingController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { AngularFireStorage } from 'angularfire2/storage'
import * as fromAuth from '../../ngrx/auth/stores/state'
import * as authActions from '../../ngrx/auth/stores/action'
import * as AuthStore from '../../ngrx/auth/stores'
import { Store, select } from '@ngrx/store'
import { AuthProvider } from '../../providers/auth/auth'
import { User } from 'firebase'

import { AuthAbstract } from '../../providers/auth/authAbstract'

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [Camera]
})
export class AccountPage {
  auth: AuthAbstract
  account: any = { username: '' }
  imageData: string = ''
  user: User
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
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public afStorage: AngularFireStorage,
    public camera: Camera,
    public authProvider: AuthProvider,
    private store: Store<fromAuth.State>,
  ) {
    this.auth = authProvider.firebaseAuth
    this.store.pipe(select(AuthStore.getUser))
    .subscribe((data: User) => {
      this.user = data
      this.account.username = data.displayName
      this.imageData = data.photoURL
    })
  }

  async update(form: NgForm) {
    if (form.valid) {
      const loading = this.loadingCtrl.create()
      loading.present()
      const updatedUser: User = await this.auth.saveProfile(this.account.username, this.imageData)
        .catch ((/*error*/) => {
          this.showToast("something wrong", 'top')
          loading.dismiss()
          return null
        })
      if (!updatedUser) return
      this.store.dispatch(new authActions.ChangeUserState(updatedUser))
      this.showToast("更新しました", "top")
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
