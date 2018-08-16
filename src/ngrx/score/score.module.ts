import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { reducer } from './stores/reducer'

@NgModule({
  imports: [
    StoreModule.forFeature('Score', reducer),
  ]
})
export class ScoreModule { }