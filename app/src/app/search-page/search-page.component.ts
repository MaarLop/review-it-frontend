import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';


@Component({
    selector: 'app-home-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchComponent {
    windowScrolled: boolean;
    loading = true;
    hashtags1: string []= ['#Accion', '#Drama', '#Netflix', '#Hoy']
    hashtags2: string []= ['#hashtags']
    hashtags3: string []= ['#SorryButNoTSorry', '#estoEsUnaReseña', '#malisimaaa']

    reviews$ = new BehaviorSubject<Review[]>([]);

    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    constructor(private reviewService: ReviewService, public snackBar: MatSnackBar, @Inject(DOCUMENT) private document: Document){
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }

    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }

    ngOnInit(): void {
        this.getReviews();
    }

    getReviews(){
        if(this.finished) return;

        this.reviewService.getReviews(this.size, this.page).subscribe((response)=>{
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

    newReview(review: Review){
        console.log(review)
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