import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthModule } from '@auth0/auth0-angular';
import { User } from '../core/models/user.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing'
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    })
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-d8bhv2ic.us.auth0.com',
          clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
        }),
      ],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to compare marble to http request', (done) => {
    service.get(1).subscribe(value => {
      console.log(value)
      expect(value).toEqual({'content': 'nothing'});
      done();
    }, done.fail);
    const httpRequest = httpTestingController.expectOne('http://localhost:8090/users/info');
    expect(httpRequest.request.method).toBe('POST');
    httpRequest.flush({'content': "nothing"});
  });

  xit('#getData should return an empty object on error', () => {
    scheduler.run(({cold, hot, expectObservable}) => {
      const values = {a: 'Castello'};
      const source$ = hot('^-a', values)
      const expectedMarble = '--a';
      const expectedValues = {a: 'Mighty Castello'}

      const results$ = service.get(1).pipe(map(user => `Mighty ${user.lastName}`));
      console.log(results$)
      expectObservable(results$).toBe(expectedMarble, expectedValues);
    });
    /*const expectedData: any = {
      get: () => of(['test']),
    } 
    const testee$ = service.get(1);
    testee$.subscribe(data => {
      console.log("data");
      done();
    })
    console.log("aquiii")
    console.log(expectedData)*/
    //expect(expectedData).not.toBeNull();
    //expect(expectedData).toBe(expectedData);
    
 
    /*const testRequest = httpTestingController.expectOne('http://localhost:8090/users/info');
 
    testRequest.flush('error', { status: 500, statusText: 'Broken Service' });*/
  });

});