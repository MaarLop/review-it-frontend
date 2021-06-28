import { Complaint } from "./complaint.model";
import { Review } from "./review-model";

export class ComplaintReview extends Complaint{
    review: Review;
    reviewId: number;
}