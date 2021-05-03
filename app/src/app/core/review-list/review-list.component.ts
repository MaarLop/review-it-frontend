import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from '../models/review-model';

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

    loading = true;

    reviews$ = new BehaviorSubject<Review[]>([]);
    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    @Input() filter$?: BehaviorSubject<string>;
    @Input() initFilter$?: BehaviorSubject<boolean>;

    constructor(private reviewService: ReviewService, public snackBar: MatSnackBar){ }

    ngOnInit(): void {
        this.filter$?.subscribe((f)=>{
            this.page = 0;
            this.searchOption();
        });
    }

    getReviews(){
        if(this.finished) return;
        this.reviewService.getReviews(this.size, this.page, this.filter$?.value).subscribe((response)=>{
            const reviewList = this.filter$?.value !== '' ? [] : this.reviews$.value;

            this.reviews$.next([...reviewList, ...response.content]);
            this.finished = response.last;
            this.showSpinner = !this.finished;
            this.page+=1;
        });
    }

    searchOption(){
        this.reviewService.getSearchReviews(this.size, this.page, this.filter$?.value).subscribe((response)=>{
            const reviewList = this.page === 0 ? [] : this.reviews$.value;

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

}