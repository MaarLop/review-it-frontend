import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthModule } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let service: ReviewService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ HomePageComponent ],
        imports: [
          HttpClientTestingModule,
          AuthModule.forRoot({
            domain: 'dev-d8bhv2ic.us.auth0.com',
            clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
          }),
        ],
        providers: [
            HomePageComponent,
            MatSnackBar,
            Overlay
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
      httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    service = component.reviewService;
    fixture.detectChanges();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

    afterAll(() => {
        TestBed.resetTestingModule();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject reviewService', () => {
      expect(service).toBeTruthy();
  })

  it('should call reviewService and the method getReviews', async () => {
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
    const reviews = spyOn(service, 'getReviews').and.returnValue(of(mockReview));
    component.getReviews();
    expect(reviews).toHaveBeenCalled();  
  });

  it('should call the method getReviews and return the reviews', async () => {
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
    service.getReviews(10, 0).subscribe(reviews => {
        expect(reviews).toEqual(mockReview)
    })
    const req = httpTestingController.expectOne('http://localhost:8090/reviews?sort=id&order=desc&page=0&size=10')
    expect(req.request.method).toBe('GET');
    req.flush(mockReview);
  });
});