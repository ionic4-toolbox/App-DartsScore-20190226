import { Component } from '@angular/core';

/**
 * Generated class for the ScoreTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-table',
  templateUrl: 'score-table.html'
})
export class ScoreTableComponent {

  text: string;

  constructor() {
    console.log('Hello ScoreTableComponent Component');
    this.text = 'Score Table';
  }

}
