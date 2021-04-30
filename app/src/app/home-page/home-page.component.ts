import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';
// import * as _ from 'loadash' es una libreria
import { Auth2Service } from '../services/auth2.service';

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

    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    constructor(private reviewService: ReviewService, public snackBar: MatSnackBar, public auth:AuthService, private auth2:Auth2Service){ }

    ngOnInit(): void {
        this.auth.user$.subscribe(data =>{
            if(data){
                this.auth2.signUp(data).subscribe(res => {
                    console.log("res")
                    console.log(res)
                    //sessionStorage.setItem('userId', res.userId);
                    // this.router.navigate(['/']);
                },
                    err => this.auth.logout()
                )   
            }
        });
        this.auth.isAuthenticated$.subscribe(
            loggedIn =>{
                if(loggedIn){
                    this.auth2.getToken().subscribe(data => {
                        localStorage.setItem('auth_token', data.access_token);
                    });
                    this.getReviews();
                }
            }  
        )
        
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