import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ScorePage } from './score'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ScorePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ScorePage),
  ],
})
export class ScorePageModule {}
