import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { ScoreTableComponent } from './score-table/score-table';
@NgModule({
	declarations: [ScoreTableComponent],
	imports: [IonicModule],
	exports: [ScoreTableComponent]
})
export class ComponentsModule {}
