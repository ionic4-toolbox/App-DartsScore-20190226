import { TestBed, ComponentFixture } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { ScoreProvider } from '../../providers/score/score'
import { ScoreParserProvider } from '../../providers/score-parser/score-parser'
import { UserData } from '../../providers/user-data'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'
import { environment } from '../../app/environment'
// import * as ScoreAction from '../../pages/score/store/action'
// import * as ScoreStore from '../../pages/score/store/action'
import { DefaultKeyboardComponent } from './default-keyboard'
import { reducers } from '../../ngrx'

// const mockScoreStore = {
//   push: jest.fn()
// };

describe('ScorePage', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [DefaultKeyboardComponent],
      imports: [
        IonicModule.forRoot(DefaultKeyboardComponent),
        StoreModule.forRoot(reducers),
        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ScoreProvider, ScoreParserProvider, AngularFireDatabase, UserData]
    }).compileComponents()
  );

  describe('with injection', () => {
    let fixture: ComponentFixture<DefaultKeyboardComponent>;
    let defaultKeyboardComponent: DefaultKeyboardComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(DefaultKeyboardComponent);
      defaultKeyboardComponent = fixture.componentInstance;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should be created.', () => {
      expect(defaultKeyboardComponent).toBeTruthy();
    });
  });
});