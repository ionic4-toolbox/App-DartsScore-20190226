import { TestBed, ComponentFixture } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { IonicModule, Config } from 'ionic-angular'
import * as ScoreAction from '../../pages/score/store/action'
import * as ScoreStore from '../../pages/score/store/action'
import { ScoreTableComponent } from './score-table'
import { reducers } from '../../store'

// const mockScoreStore = {
//   push: jest.fn()
// };

describe('ScorePage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [ScoreTableComponent],
      imports: [IonicModule.forRoot(ScoreTableComponent), StoreModule.forRoot(reducers)],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  );

  describe('with injection', () => {
    let fixture: ComponentFixture<ScoreTableComponent>;
    let scoreTableComponent: ScoreTableComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(ScoreTableComponent);
      scoreTableComponent = fixture.componentInstance;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should be created.', () => {
      expect(scoreTableComponent).toBeTruthy();
    });
  });
});