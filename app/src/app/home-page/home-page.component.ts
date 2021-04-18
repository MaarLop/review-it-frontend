import { Component } from '@angular/core';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';

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

reviews: Review[];
    
    constructor(private reviewService: ReviewService){ }

    ngOnInit(): void {
        this.reviewService.getReviews().subscribe(data => {
            this.reviews = data.content;
            this.loading = false;
        });
    }

    newReview(review: Review){
        this.reviews.push(review);
    }
}