import { User } from "./user.model";

export class Review{
    title: string;
    description: string;
    points: number;
    date: Date;
    hashtags: string[];
    user: User;
    userId: string;

    constructor(titulo: string, descripcion: string, fecha: Date, puntaje: number, hashtags, user: User, userId: string){
        this.title=titulo;
        this.description= descripcion;
        this.date= fecha;
        this.points = puntaje;
        this.hashtags = hashtags;
        this.user = user;
        this.userId = userId;
    }
}