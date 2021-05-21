import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { Review } from '../core/models/review-model';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../core/shared/errors/notification.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

    loading = true;

    reviews$ = new BehaviorSubject<Review[]>([]);

    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;

    constructor(public reviewService: ReviewService, 
        public snackBar: MatSnackBar, 
        public auth:AuthService, 
        private userService:UserService,
        private notificationService: NotificationService){ }

    ngOnInit(): void {
        this.auth.user$.subscribe(data =>{
            if(data){
                this.userService.signUp(data).subscribe((user) => {
                    sessionStorage.setItem('userId', user.id);
                })
            }
        });
        this.auth.isAuthenticated$.subscribe(
            loggedIn =>{
                if(loggedIn){
                    this.userService.getToken().subscribe(data => {
                        localStorage.setItem('auth_token', data.access_token);
                    });
                    this.getReviews();
                }
            }  
        )
        
    }

    getReviews(){
        if(this.finished) return;

        this.reviewService.getReviews(this.size, this.page, '').subscribe((response)=>{
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
        if(review){
            this.notificationService.showSuccess('Publicado exitosamente!');
        }
    }
    
}