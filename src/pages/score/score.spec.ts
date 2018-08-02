import { TestBed, ComponentFixture } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../../app/environment'

import { UserData } from '../../providers/user-data'
// import * as ScoreAction from './store/action'
// import * as ScoreStore from './store'
import { ScorePage } from './score'
import { reducers } from '../../store'

// const mockScoreStore = {
//   push: jest.fn()
// };

describe('ScorePage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [ScorePage],
      imports: [
        IonicModule.forRoot(ScorePage),
        StoreModule.forRoot(reducers),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [UserData]
    }).compileComponents()
  );

  describe('with injection', () => {
    let fixture: ComponentFixture<ScorePage>;
    let scorePage: ScorePage;

    beforeEach(() => {
      fixture = TestBed.createComponent(ScorePage);
      scorePage = fixture.componentInstance;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should be created.', () => {
      expect(scorePage).toBeTruthy();
    });
  });
});