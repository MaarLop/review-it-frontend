import { User } from "./user.model";

export class Review{
    id: number;
    title: string;
    description: string;
    points: number;
    date?: Date;
    hashtags?: string[];
    user: User;
    userId: string;
    overview?: string;
    img?: string;
    genresId?: any;

    constructor(id: number, titulo: string, descripcion: string, fecha: Date,
        puntaje: number, hashtags, user: User, userId: string, overview?: string,
        img?: string, genres?: any){
        this.title=titulo;
        this.description= descripcion;
        this.date= fecha;
        this.points = puntaje;
        this.hashtags = hashtags;
        this.user = user;
        this.userId = userId;
        this.overview = overview;
        this.img = img;
        this.genresId = genres;
    }
}