import { Model, genderTypes } from './model.model';

export class User {
  id: number;
  userName: string;
  name: string;
  firstName?: string;
  lastName: string;
  isSuperuser?: boolean;
  telefono?: string;
  email: string;
  avatar: string;
  password: string;
  image: any;

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
