import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { of, Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { ReviewService } from './services/review.service';

describe('AppComponent', () => {

  let serviceReview: ReviewService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-d8bhv2ic.us.auth0.com',
          clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
        }),
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
    serviceReview = TestBed.inject(ReviewService);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ReviewIt!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ReviewIt!');
  });

  /*it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('app app is running!');
  });*/
});
