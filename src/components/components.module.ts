import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table'
import { CricketKeyboardComponent } from './cricket-keyboard/cricket-keyboard'
@NgModule({
	declarations: [ScoreTableComponent,
    CricketKeyboardComponent],
	imports: [IonicModule],
	exports: [ScoreTableComponent,
    CricketKeyboardComponent]
})
export class ComponentsModule {}
