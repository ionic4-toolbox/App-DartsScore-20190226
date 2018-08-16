import { TestBed, ComponentFixture } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
// import * as ScoreAction from '../../pages/score/store/action'
// import * as ScoreStore from '../../pages/score/store/action'
import { CricketKeyboardComponent } from './cricket-keyboard'
import { ScoreParserProvider } from '../../providers/score-parser/score-parser'

import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'
import { environment } from '../../app/environment'
import { reducers } from '../../ngrx'

// const mockScoreStore = {
//   push: jest.fn()
// };

describe('ScorePage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [CricketKeyboardComponent],
      imports: [
        IonicModule.forRoot(CricketKeyboardComponent),
        StoreModule.forRoot(reducers),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ScoreParserProvider, AngularFireDatabase]
    }).compileComponents()
  );

  describe('with injection', () => {
    let fixture: ComponentFixture<CricketKeyboardComponent>;
    let cricketKeyboardComponent: CricketKeyboardComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(CricketKeyboardComponent);
      cricketKeyboardComponent = fixture.componentInstance;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should be created.', () => {
      expect(cricketKeyboardComponent).toBeTruthy();
    });
  });
});