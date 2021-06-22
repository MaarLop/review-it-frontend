import { Complaint } from "./complaint.model";
import { User } from "./user.model";

export class ComplaintUser extends Complaint{
    to: User;
    toId: number;
}