import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from '../models/review-model';

@Component({
  selector: 'app-user-review-card',
  templateUrl: './user-review-card.component.html',
  styleUrls: ['./user-review-card.component.scss']
})
export class UserReviewCardComponent implements OnInit {
  @Input() review : Review;
  currentRate: Number;

  constructor() { }

  ngOnInit(): void {
    this.currentRate=this.review.points
  }

}
