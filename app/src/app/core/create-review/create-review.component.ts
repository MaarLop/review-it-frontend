import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from '../models/review-model';

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

  constructor(private fb: FormBuilder, private reviewService: ReviewService){
  }

  ngOnInit(): void {
    this.startForm();
  }

  startForm(){
    this.formNewReview = this.fb.group(
      {
        title: [{value: '', disabled: false}],
        description: [{ value: '', disabled: false }],
        points: [{value: 0}]
      }
    )
  }

  catchRating(rate: number){
    this.formNewReview.get('points').setValue(rate);
  }

  createReview(){
    if(this.formNewReview.valid){
      this.reviewService.save(this.formNewReview.getRawValue() as Review).subscribe((review: Review) => {
        this.newReview.emit(review);
        this.startForm();
      });
    }
  }

}