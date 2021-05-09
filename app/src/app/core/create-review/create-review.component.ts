import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { ReviewService } from 'src/app/services/review.service';
import { ApiClientService } from '../api-client.service';
import { Review } from '../models/review-model';
import { SimpleOption } from '../models/simple-option';

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
    ){
  }

  ngOnInit(): void {
    this.startForm();

    this.formNewReview.get('title').valueChanges.subscribe((title)=>{
      console.log(title)
      this.apiClient
        .get(`https://api.themoviedb.org/3/search/movie?api_key=d83d9bf26a31066155e617cf070d3004&query=${title}&language=es`)
        .subscribe((content)=>{
          if(content.results.length >0){
            const result = content.results[0];
            console.log(result)
            this.formNewReview.get('img').setValue(result.backdrop_path);
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
      console.log(this.formNewReview.getRawValue() as Review)
      this.reviewService.save(this.formNewReview.getRawValue() as Review).subscribe((review: Review) => {
        this.newReview.emit(review);
        this.startForm();
      });
    }
  }

  public fetchTitle = (value: string) => {
    if(value){
      const title = value.replace(' ', '+')
      return this.apiClient
        .get(`https://api.themoviedb.org/3/search/movie?api_key=d83d9bf26a31066155e617cf070d3004&query=${title}`)
        .pipe(
          map((items) => {
            return items.results.map(
              (item) => new SimpleOption(item.original_title, item.original_title),
            );
          }),
        );
    }
  }
}