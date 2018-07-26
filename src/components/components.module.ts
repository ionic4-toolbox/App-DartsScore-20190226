import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table'
import { CricketKeyboardComponent } from './cricket-keyboard/cricket-keyboard'
import { DefaultKeyboardComponent } from './default-keyboard/default-keyboard'
import { ScoreDisplayComponent } from './score-display/score-display'
import { CricketTableComponent } from './cricket-table/cricket-table'
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
	declarations: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent,
		CricketTableComponent
	],
	imports: [
		IonicModule,
		PipesModule
	],
	exports: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent,
    CricketTableComponent
	]
})
export class ComponentsModule {}
