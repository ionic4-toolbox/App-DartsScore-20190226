import { Component } from '@angular/core'

import { Store, select } from '@ngrx/store'
import * as ScoreStore from '../../pages/score/store'
import { CricketMark } from '../../pipes/cricket-mark/cricket-mark'
/**
 * Generated class for the CricketTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cricket-table',
  templateUrl: 'cricket-table.html'
})
export class CricketTableComponent {
  cricketTable: object

  constructor(
    private store: Store<ScoreStore.State>
  ) {
    this.store.pipe(select(ScoreStore.getCricketTable))
    .subscribe((data: ScoreStore.State) => {
      console.log(JSON.stringify(data))
      this.cricketTable = data
    })
  }

}
