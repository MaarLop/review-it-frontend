import { Review } from './review-model';
import { User } from './user.model';

export class Comment{
    message: string;
    review: Review;
    reviewId: string;
    user: User;
    userId: string;

    constructor(message: string, review: Review, reviewId: string, user: User, userId: string){
        this.message=message;
        this.review = review;
        this.user = user;
        this.userId = userId;
    }
}