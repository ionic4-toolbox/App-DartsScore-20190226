import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table'
import { CricketKeyboardComponent } from './cricket-keyboard/cricket-keyboard'
import { DefaultKeyboardComponent } from './default-keyboard/default-keyboard'
@NgModule({
	declarations: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent
	],
	imports: [IonicModule],
	exports: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent
	]
})
export class ComponentsModule {}
