import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { TestBed, async } from '@angular/core/testing';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { Review } from '../core/models/review-model';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-d8bhv2ic.us.auth0.com',
          clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
        }),
      ],
    }).compileComponents();
    service = TestBed.inject(ReviewService);
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

  it('should return Observable<Review>', () => {
    let mockReview: any = [
      {
        createdDate: 1620259938000,
        lastModifiedDate: 1620259938000,
        id: 1,
        title: "prueba con usuario",
        description: "sdasad",
        points: 4,
        user: {
        createdDate: 1620251964000,
        lastModifiedDate: 1620251964000,
        id: 1,
        name: "Martín",
        lastName: "Castello",
        email: "castellomn94@gmail.com",
        userName: "castellomn94",
        password: "google-oauth2|115876121203654924468",
        avatar: "https://lh3.googleusercontent.com/a/AATXAJxDiyks0qyYHf6oWUsFWkUWk5JqpU_zBdksddLj=s96-c"
        },
        userId: null
        },
        {
        createdDate: 1620447464000,
        lastModifiedDate: 1620447464000,
        id: 2,
        title: "FRED 3: Camp Fred",
        description: "buenarda",
        points: 3,
        user: {
        createdDate: 1620251964000,
        lastModifiedDate: 1620251964000,
        id: 1,
        name: "Martín",
        lastName: "Castello",
        email: "castellomn94@gmail.com",
        userName: "castellomn94",
        password: "google-oauth2|115876121203654924468",
        avatar: "https://lh3.googleusercontent.com/a/AATXAJxDiyks0qyYHf6oWUsFWkUWk5JqpU_zBdksddLj=s96-c"
        },
        userId: null
        }
    ]
    service.getReviews(10, 0).subscribe((data) => {
      expect(data).toEqual(mockReview);
    });

    const httpRequest = httpTestingController.expectOne('http://localhost:8090/reviews?sort=id&order=desc&page=0&size=10');
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(mockReview);
  });
});
