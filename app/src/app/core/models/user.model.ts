import { Review } from "./review-model";

export class User {
  id: number;
  userName: string;
  name: string;
  firstName?: string;
  lastName: string;
  isPrivate?: boolean;
  telefono?: string;
  email: string;
  avatar: string;
  password: string;
  image: any;
  blocked: boolean;
  blockedUsers: User[];
  blockedReviews: Review[];

  constructor(id: number, userName: string, name: string, lastName: string, email, avatar: string, password: string){
    this.id=id;
    this.userName= userName;
    this.name= name;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.password = password;
  }
}
