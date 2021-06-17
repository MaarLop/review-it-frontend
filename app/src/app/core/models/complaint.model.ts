import { User } from "./user.model";
import { ComplaintReason } from './complaintReason.model';

export class Complaint{
    user: User;
    userId: number;
    reason: ComplaintReason;
    comment: string;
}