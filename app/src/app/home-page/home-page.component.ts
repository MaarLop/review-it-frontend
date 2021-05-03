import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    loading = true;

    reviews$ = new BehaviorSubject<Review[]>([]);

    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    constructor(public snackBar: MatSnackBar){ }

    newReview(review: Review){
        if(review){
            let snack = this.snackBar.open('Publicado exitosamente!', 'x', {
                duration: 500,
                panelClass: ['success-snackbar']
            });
            snack.afterDismissed().subscribe(()=>{
                window.location.reload();
            })

        }
        else{
            this.snackBar.open('No se ha realizado la publicación 😟', 'x',{
                duration: 3000,
                panelClass: ['fail-snackbar']
             });
        }
    }
}