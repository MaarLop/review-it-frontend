import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, map } from 'rxjs/operators';
import { ReviewService } from 'src/app/services/review.service';
import { ApiClientService } from '../api-client.service';
import { Review } from '../models/review-model';
import { SimpleOption } from '../models/simple-option';
import { NotificationService } from '../shared/errors/notification.service';

@Component({
  selector: 'app-create-review',
  templateUrl: 'create-review.component.html',
  styleUrls: ['create-review.component.scss'],
})


export class CreateReviewComponent implements OnInit {
  @ViewChild('namebutton') namebutton: ElementRef;
  formNewReview: FormGroup;
  star_rate = 'star_rate';
  @Output() newReview = new EventEmitter<Review>();

  constructor( 
    private fb: FormBuilder,
    public reviewService: ReviewService,
    public apiClient: ApiClientService,
    public snackBar: MatSnackBar,
    private notifier: NotificationService
    ){
  }

  ngOnInit(): void {
    this.startForm();

    this.formNewReview.get('title').valueChanges.subscribe((title)=>{
      this.apiClient
        .get(`https://api.themoviedb.org/3/search/movie?api_key=d83d9bf26a31066155e617cf070d3004&query=${title}&language=es`)
        .subscribe((content)=>{
          if(content.results.length >0){
            const result = content.results[0];
            this.formNewReview.get('img').setValue(`http://image.tmdb.org/t/p/w342${result.poster_path}`);
            this.formNewReview.get('genresId').setValue(result.genre_ids);
            this.formNewReview.get('overview').setValue(result.overview);
          }
        })
    })
  }

  startForm(){
    this.formNewReview = this.fb.group(
      {
        title: [{value: '', disabled: false}],
        description: [{ value: '', disabled: false }],
        points: [{value: 0}],
        userId: sessionStorage.getItem('userId'),
        overview: [{ value: '', disabled: false }],
        img: [{ value: '', disabled: false }],
        genresId: [{ value: '', disabled: false }],
      }
    )
  }

  catchRating(rate: number){
    this.formNewReview.get('points').setValue(rate);
  }

  createReview(){
    if(this.formNewReview.valid){
      this.reviewService.create(this.formNewReview.getRawValue() as Review).subscribe((review: Review) => {
        this.newReview.emit(review);
        this.startForm();
      },
        err => {
          const title = err.error.title ? err.error.title+'\n' : '';
          const description = err.error.description ? err.error.description+'\n' : '';
          const points = err.error.points ? err.error.points : ''
          this.notifier.showError(title+description+points);
        }
      );
    }
  }

  public fetchTitle = (value: string) => {
    if(value){
      const title = value.replace(' ', '+')
      return this.apiClient
        .get(`https://api.themoviedb.org/3/search/movie?api_key=d83d9bf26a31066155e617cf070d3004&query=${title}`)
        .pipe(
          map((items) => {
            console.log(items);
            return items.results.map(
              (item) => new SimpleOption(item.original_title, item.original_title),
            );
          }),
        );
    }
  }
}