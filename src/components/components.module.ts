import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table'
import { CricketKeyboardComponent } from './cricket-keyboard/cricket-keyboard'
import { DefaultKeyboardComponent } from './default-keyboard/default-keyboard'
import { ScoreDisplayComponent } from './score-display/score-display'
@NgModule({
	declarations: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent
	],
	imports: [IonicModule],
	exports: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent
	]
})
export class ComponentsModule {}
