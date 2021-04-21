import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';
// import * as _ from 'loadash' es una libreria

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    loading = true;
    hashtags1: string []= ['#Accion', '#Drama', '#Netflix', '#Hoy']
    hashtags2: string []= ['#hashtags']
    hashtags3: string []= ['#SorryButNoTSorry', '#estoEsUnaReseña', '#malisimaaa']

    reviews$ = new BehaviorSubject<Review[]>([]);

    batch: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    constructor(private reviewService: ReviewService){ }

    ngOnInit(): void {
        this.getReviews();
    }

    getReviews(){
        if(this.finished) return;

        this.reviewService.getReviews(this.batch, this.page).subscribe((response)=>{
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
}