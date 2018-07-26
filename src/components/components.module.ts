import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table'
import { CricketKeyboardComponent } from './cricket-keyboard/cricket-keyboard'
import { DefaultKeyboardComponent } from './default-keyboard/default-keyboard'
import { ScoreDisplayComponent } from './score-display/score-display'
import { CricketTableComponent } from './cricket-table/cricket-table'
<<<<<<< HEAD
import { CricketMark } from '../pipes/cricket-mark/cricket-mark'
=======
import { PipesModule } from '../pipes/pipes.module'
>>>>>>> feature_save_firebase

@NgModule({
	declarations: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent,
<<<<<<< HEAD
		CricketTableComponent,
		CricketMark
	],
	imports: [IonicModule],
=======
		CricketTableComponent
	],
	imports: [
		IonicModule,
		PipesModule
	],
>>>>>>> feature_save_firebase
	exports: [
		ScoreTableComponent,
		CricketKeyboardComponent,
		DefaultKeyboardComponent,
    ScoreDisplayComponent,
    CricketTableComponent
	]
})
export class ComponentsModule {}
