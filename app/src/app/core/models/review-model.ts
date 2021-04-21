export class Review{
    title: string;
    descrioption: string;
    points: number;
    date: Date;
    hashtags: string[];

    constructor(titulo: string, descripcion: string, fecha: Date, puntaje: number, hashtags){
        this.title=titulo;
        this.descrioption= descripcion;
        this.date= fecha;
        this.points = puntaje;
        this.hashtags = hashtags;
    }
}