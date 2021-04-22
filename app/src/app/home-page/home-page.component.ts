import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    
    
    constructor(private reviewService: ReviewService, public snackBar: MatSnackBar){ }

    ngOnInit(): void {
        this.reviewService.getReviews().subscribe((data) => {
            this.reviews = data.content;
            this.loading = false;
        });
    }

    newReview(review: Review){
        if(review){
            this.reviews.push(review);
            this.snackBar.open('Publicado exitosamente!', 'x', {
                duration: 3000,
                panelClass: ['success-snackbar']
             });
        }
        else{
            this.snackBar.open('No se ha realizado la publicación 😟', 'x',{
                duration: 3000,
                panelClass: ['fail-snackbar']
             });
        }
    }
}