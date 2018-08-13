import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { reducer } from './stores/reducer'
import { AuthEffects } from './effects/auth.effects'

@NgModule({
  imports: [
    StoreModule.forFeature('Auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }