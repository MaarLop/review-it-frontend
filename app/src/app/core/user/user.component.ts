import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from '../models/review-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formUser: FormGroup;
  
  reviews$ = new BehaviorSubject<Review[]>([]);

  size: number = 2;
  page: number = 0;
  finished = false;
  showSpinner = false;

  constructor(private reviewService: ReviewService, public snackBar: MatSnackBar, private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    this.startForm();
    this.getReviews();
  }

  getReviews(){
    if(this.finished) return;

    this.reviewService.getReviews(this.size, this.page).subscribe((response)=>{
        console.log(response)
        const reviewList = this.reviews$.value;
        this.reviews$.next([...reviewList, ...response.content]);
        this.finished = response.last;
        this.showSpinner = !this.finished;
        this.page+=1;
    });
  }

  onScroll(){
    setTimeout(() => {
        this.getReviews();
        this.showSpinner = false;
    }, 2000);
  }

  startForm(){
    this.formUser = this.fb.group(
      {
        name: [{value: '', disabled: true}],
        email: [{value: '', disabled: true }]
      }
    )
  }

  createReview(){
    /*if(this.formNewReview.valid){
      this.reviewService.save(this.formNewReview.getRawValue() as Review).subscribe((review: Review) => {
        this.newReview.emit(review);
        this.startForm();
      });
    }*/
  }

}
