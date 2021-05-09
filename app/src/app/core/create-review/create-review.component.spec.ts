import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthModule } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { ReviewService } from 'src/app/services/review.service';
import { CreateReviewComponent } from './create-review.component';
import { ApiClientService } from '../api-client.service';

describe('CreateReviewComponent', () => {
  let component: CreateReviewComponent;
  let fixture: ComponentFixture<CreateReviewComponent>;
  let service: ReviewService;
  let httpTestingController: HttpTestingController;
  let apiClient: ApiClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ CreateReviewComponent ],
        imports: [
          HttpClientTestingModule,
          AuthModule.forRoot({
            domain: 'dev-d8bhv2ic.us.auth0.com',
            clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
          }),
        ],
        providers: [
            CreateReviewComponent,
            FormBuilder,
            MatSnackBar,
            Overlay,
            ApiClientService
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
      httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReviewComponent);
    component = fixture.componentInstance;
    service = component.reviewService;
    apiClient = component.apiClient;
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

  it('should show a new review with its points and description', (done) => {
    let mockReview: any = {
          title: "Cars",
          description: "Muy buena",
          points: 4,
          userId: 1
        }
    const compiled = fixture.debugElement.nativeElement;
    component.newReview = mockReview;
    compiled.querySelector('[data-testid="descriptionReview"]').textContent = 'Muy buena peli';
    component.catchRating(mockReview.points);
    fixture.whenStable().then(() => {
        expect(component.formNewReview.get('points').value).toBe(mockReview.points);
        expect(compiled.querySelector('[data-testid="descriptionReview"]').textContent).toContain(mockReview.description);
      done();
    })
});
  

  
});