import { Review } from "./review-model";
import { User } from "./user.model";

export class Like{
    id: number;
    review: Review;
    reviewId: number;
    user: User;
    userId: number;

    constructor(reviewId: number, userId: number){
        this.reviewId = reviewId;
        this.userId = userId;
    }
}